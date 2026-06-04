import express from 'express';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: { origin: '*' }
  });

  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  // Real-time State
  interface User {
    id: string;
    uid?: string;
    username: string;
    avatar?: string;
    color: string;
    currentTimestamp: number;
  }

  interface Message {
    id: string;
    userId: string;
    username: string;
    avatar?: string;
    color: string;
    text: string;
    type?: 'text' | 'image' | 'voice' | 'file';
    mediaUrl?: string;
    createdAt: number;
  }

  interface Room {
    id: string;
    name: string;
    isPublic: boolean;
    creatorId: string;
    creatorUid?: string;
    adminId: string;
    videoUrl: string | null;
    videoTitle?: string | null;
    isPlaying: boolean;
    timestamp: number;
    lastUpdateAt: number;
    users: Record<string, User>;
    chat: Message[];
    queue: { url: string; title: string }[];
  }

  const rooms: Record<string, Room> = {};
  const onlineUids = new Set<string>();

  // API Route for fetching rooms
  app.get('/api/rooms', (req, res) => {
    const activeRooms = Object.values(rooms).map(room => ({
      id: room.id,
      name: room.name,
      isPublic: room.isPublic,
      users: Object.values(room.users).map(u => ({ id: u.id, uid: u.uid, username: u.username, avatar: u.avatar })),
      userCount: Object.keys(room.users).length,
      videoUrl: room.videoUrl,
      videoTitle: room.videoTitle,
      creatorUid: room.creatorUid
    }));
    res.json(activeRooms);
  });

  app.get('/api/users/online', (req, res) => {
    res.json(Array.from(onlineUids));
  });

  const canControlPlayback = (room: Room, socketId: string, uid?: string) => {
    return room.creatorId === socketId || (!!room.creatorUid && room.creatorUid === uid);
  };

  const colors = [
    '#ef4444', '#f97316', '#f59e0b', '#84cc16', '#22c55e', 
    '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6', 
    '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e'
  ];

  io.on('connection', (socket) => {
    let currentRoomId: string | null = null;
    let currentUser: User | null = null;

    socket.on('join_room', ({ roomId, roomName, username, uid, avatar, isPublic = true }) => {
      // Leave previous room if any
      if (currentRoomId && currentRoomId !== roomId) {
        socket.leave(currentRoomId);
        if (rooms[currentRoomId] && rooms[currentRoomId].users[socket.id]) {
          delete rooms[currentRoomId].users[socket.id];
          io.to(currentRoomId).emit('users_updated', Object.values(rooms[currentRoomId].users));
        }
      }

      socket.join(roomId);
      currentRoomId = roomId;

      if (!rooms[roomId]) {
        rooms[roomId] = {
          id: roomId,
          name: roomName || `Комната ${roomId}`,
          isPublic,
          creatorId: socket.id,
          creatorUid: uid || undefined,
          adminId: socket.id,
          videoUrl: null,
          videoTitle: null,
          isPlaying: false,
          timestamp: 0,
          lastUpdateAt: Date.now(),
          users: {},
          chat: [],
          queue: []
        };
      }

      // If room is empty but still exists (e.g. all left but not GC'd), make the first joiner admin
      if (Object.keys(rooms[roomId].users).length === 0) {
        rooms[roomId].creatorId = socket.id;
        rooms[roomId].creatorUid = uid || undefined;
        rooms[roomId].adminId = socket.id;
      }

      const color = colors[Math.floor(Math.random() * colors.length)];
      currentUser = {
        id: socket.id,
        uid: uid || undefined,
        username: username || `User ${socket.id.substring(0, 4)}`,
        avatar: avatar || undefined,
        color,
        currentTimestamp: 0
      };

      if (uid) {
        onlineUids.add(uid);
      }

      rooms[roomId].users[socket.id] = currentUser;

      if (rooms[roomId].creatorUid && rooms[roomId].creatorUid === currentUser.uid && rooms[roomId].creatorId !== socket.id) {
        rooms[roomId].creatorId = socket.id;
        io.to(roomId).emit('creator_changed', socket.id);
      }

      // Send initial state to the user
      socket.emit('room_state', {
        roomState: {
          creatorId: rooms[roomId].creatorId,
          adminId: rooms[roomId].adminId,
          videoUrl: rooms[roomId].videoUrl,
          videoTitle: rooms[roomId].videoTitle,
          isPlaying: rooms[roomId].isPlaying,
          timestamp: rooms[roomId].timestamp,
          lastUpdateAt: rooms[roomId].lastUpdateAt,
          name: rooms[roomId].name,
          queue: rooms[roomId].queue
        },
        users: Object.values(rooms[roomId].users),
        chat: rooms[roomId].chat,
        me: currentUser
      });

      // Broadcast new user to everyone else
      socket.to(roomId).emit('users_updated', Object.values(rooms[roomId].users));
      
      const joinMessage: Message = {
        id: Math.random().toString(36).substring(2, 9),
        userId: 'system',
        username: 'Система',
        color: '#888',
        text: `${currentUser.username} присоединился к комнате`,
        createdAt: Date.now()
      };
      rooms[roomId].chat.push(joinMessage);
      io.to(roomId).emit('chat_message', joinMessage);
    });

    socket.on('update_video_url', ({ url, title }) => {
      // Handle both old client (string) and new client (object)
      const videoUrl = typeof url === 'string' ? url : arguments[0];
      const videoTitle = typeof title === 'string' ? title : null;

      if (!currentRoomId || !rooms[currentRoomId]) return;
      if (!canControlPlayback(rooms[currentRoomId], socket.id, currentUser?.uid)) return;

      rooms[currentRoomId].videoUrl = videoUrl;
      rooms[currentRoomId].videoTitle = videoTitle;
      rooms[currentRoomId].timestamp = 0;
      rooms[currentRoomId].isPlaying = false;
      rooms[currentRoomId].lastUpdateAt = Date.now();

      io.to(currentRoomId).emit('video_url_updated', { url: videoUrl, title: videoTitle });
      io.to(currentRoomId).emit('sync_playback', {
        isPlaying: false,
        timestamp: 0,
        updatedAt: Date.now()
      });
    });

    socket.on('add_to_queue', ({ url, title }) => {
      if (!currentRoomId || !rooms[currentRoomId]) return;
      rooms[currentRoomId].queue.push({ url, title: title || 'Без названия' });
      io.to(currentRoomId).emit('queue_updated', rooms[currentRoomId].queue);
    });

    socket.on('remove_from_queue', (index) => {
      if (!currentRoomId || !rooms[currentRoomId]) return;
      if (!canControlPlayback(rooms[currentRoomId], socket.id, currentUser?.uid)) return;
      
      rooms[currentRoomId].queue.splice(index, 1);
      io.to(currentRoomId).emit('queue_updated', rooms[currentRoomId].queue);
    });

    socket.on('play_next_queue', () => {
      if (!currentRoomId || !rooms[currentRoomId]) return;
      if (!canControlPlayback(rooms[currentRoomId], socket.id, currentUser?.uid)) return;
      
      if (rooms[currentRoomId].queue.length > 0) {
        const next = rooms[currentRoomId].queue.shift();
        rooms[currentRoomId].videoUrl = next!.url;
        rooms[currentRoomId].videoTitle = next!.title;
        rooms[currentRoomId].timestamp = 0;
        rooms[currentRoomId].isPlaying = false;
        rooms[currentRoomId].lastUpdateAt = Date.now();

        io.to(currentRoomId).emit('video_url_updated', { url: next!.url, title: next!.title });
        io.to(currentRoomId).emit('queue_updated', rooms[currentRoomId].queue);
        io.to(currentRoomId).emit('sync_playback', {
          isPlaying: false,
          timestamp: 0,
          updatedAt: Date.now()
        });
      }
    });

    socket.on('play_state_change', ({ isPlaying, timestamp }) => {
      if (!currentRoomId || !rooms[currentRoomId]) return;
      if (!canControlPlayback(rooms[currentRoomId], socket.id, currentUser?.uid)) return;

      rooms[currentRoomId].isPlaying = isPlaying;
      rooms[currentRoomId].timestamp = timestamp;
      rooms[currentRoomId].lastUpdateAt = Date.now();

      // Broadcast to everyone
      io.to(currentRoomId).emit('sync_playback', {
        isPlaying,
        timestamp,
        updatedAt: rooms[currentRoomId].lastUpdateAt
      });
    });

    socket.on('seek', (timestamp) => {
      if (!currentRoomId || !rooms[currentRoomId]) return;
      if (!canControlPlayback(rooms[currentRoomId], socket.id, currentUser?.uid)) return;

      rooms[currentRoomId].timestamp = timestamp;
      rooms[currentRoomId].lastUpdateAt = Date.now();

      // Force everyone to seek
      io.to(currentRoomId).emit('sync_playback', {
        isPlaying: rooms[currentRoomId].isPlaying,
        timestamp,
        updatedAt: rooms[currentRoomId].lastUpdateAt
      });
    });

    socket.on('force_sync', () => {
      if (!currentRoomId || !rooms[currentRoomId]) return;
      if (!canControlPlayback(rooms[currentRoomId], socket.id, currentUser?.uid)) return;

      // Broadcast the last known good state
      io.to(currentRoomId).emit('sync_playback', {
        isPlaying: rooms[currentRoomId].isPlaying,
        timestamp: rooms[currentRoomId].timestamp,
        updatedAt: rooms[currentRoomId].lastUpdateAt
      });
    });

    socket.on('transfer_admin', (newAdminId) => {
      if (!currentRoomId || !rooms[currentRoomId]) return;
      if (rooms[currentRoomId].adminId !== socket.id) return;
      if (!rooms[currentRoomId].users[newAdminId]) return;

      rooms[currentRoomId].adminId = newAdminId;
      io.to(currentRoomId).emit('admin_changed', newAdminId);
      
      const adminMessage: Message = {
        id: Math.random().toString(36).substring(2, 9),
        userId: 'system',
        username: 'Система',
        color: '#888',
        text: `${rooms[currentRoomId].users[newAdminId].username} стал администратором`,
        createdAt: Date.now()
      };
      rooms[currentRoomId].chat.push(adminMessage);
      io.to(currentRoomId).emit('chat_message', adminMessage);
    });

    socket.on('kick_user', (userIdToKick) => {
      if (!currentRoomId || !rooms[currentRoomId]) return;
      if (rooms[currentRoomId].adminId !== socket.id) return; // Only admin can kick
      if (!rooms[currentRoomId].users[userIdToKick]) return;

      const kickedUsername = rooms[currentRoomId].users[userIdToKick].username;
      
      // Tell the user they are kicked
      io.to(userIdToKick).emit('kicked');
      
      // Make them leave the room sockets
      const kickedSocket = io.sockets.sockets.get(userIdToKick);
      if (kickedSocket) {
         kickedSocket.leave(currentRoomId);
      }

      delete rooms[currentRoomId].users[userIdToKick];
      io.to(currentRoomId).emit('users_updated', Object.values(rooms[currentRoomId].users));

      const kickMsg: Message = {
        id: Math.random().toString(36).substring(2, 9),
        userId: 'system',
        username: 'Система',
        color: '#EF4444',
        text: `${kickedUsername} был исключен администратором.`,
        createdAt: Date.now()
      };
      rooms[currentRoomId].chat.push(kickMsg);
      io.to(currentRoomId).emit('chat_message', kickMsg);
    });

    socket.on('report_progress', (timestamp) => {
      if (!currentRoomId || !rooms[currentRoomId] || !currentUser) return;
      rooms[currentRoomId].users[socket.id].currentTimestamp = timestamp;
      // We could broadcast frequently, or just let users query. We'll broadcast every 2-3s in an interval for efficiency
    });

    socket.on('send_chat', ({ text, type = 'text', mediaUrl }) => {
      if (!currentRoomId || !rooms[currentRoomId] || !currentUser) return;

      const message: Message = {
        id: Math.random().toString(36).substring(2, 9),
        userId: socket.id,
        username: currentUser.username,
        avatar: currentUser.avatar,
        color: currentUser.color,
        text: text ? text.trim() : '',
        type,
        mediaUrl,
        createdAt: Date.now()
      };

      rooms[currentRoomId].chat.push(message);
      // Keep chat history bounded if necessary
      if (rooms[currentRoomId].chat.length > 500) {
        rooms[currentRoomId].chat.shift();
      }

      io.to(currentRoomId).emit('chat_message', message);
    });

    socket.on('send_reaction', (emoji) => {
      if (!currentRoomId || !currentUser) return;
      io.to(currentRoomId).emit('receive_reaction', {
         id: Math.random().toString(36).substring(7),
         emoji,
         username: currentUser.username,
         userId: socket.id
      });
    });

    // --- WebRTC Voice Chat Signaling ---
    socket.on('webrtc_offer', ({ target, offer }) => {
      io.to(target).emit('webrtc_offer', {
        sender: socket.id,
        offer
      });
    });

    socket.on('webrtc_answer', ({ target, answer }) => {
      io.to(target).emit('webrtc_answer', {
        sender: socket.id,
        answer
      });
    });

    socket.on('webrtc_ice_candidate', ({ target, candidate }) => {
      io.to(target).emit('webrtc_ice_candidate', {
        sender: socket.id,
        candidate
      });
    });

    socket.on('voice_joined', () => {
      if (currentRoomId) {
         socket.to(currentRoomId).emit('voice_user_joined', socket.id);
      }
    });

    socket.on('voice_left', () => {
      if (currentRoomId) {
         socket.to(currentRoomId).emit('voice_user_left', socket.id);
      }
    });

    socket.on('disconnect', () => {
      if (currentUser?.uid) {
         onlineUids.delete(currentUser.uid);
      }
      
      if (currentRoomId) {
         socket.to(currentRoomId).emit('voice_user_left', socket.id);
      }

      if (currentRoomId && rooms[currentRoomId]) {
        if (rooms[currentRoomId].users[socket.id]) {
          const username = rooms[currentRoomId].users[socket.id].username;
          delete rooms[currentRoomId].users[socket.id];
          io.to(currentRoomId).emit('users_updated', Object.values(rooms[currentRoomId].users));
          
          const leftMessage: Message = {
            id: Math.random().toString(36).substring(2, 9),
            userId: 'system',
            username: 'Система',
            color: '#888',
            text: `${username} покинул комнату`,
            createdAt: Date.now()
          };
          rooms[currentRoomId].chat.push(leftMessage);
          io.to(currentRoomId).emit('chat_message', leftMessage);

          // If the admin leaves, assign a new admin or clean up the room if empty
          const remainingUsers = Object.keys(rooms[currentRoomId].users);
          if (remainingUsers.length === 0) {
            delete rooms[currentRoomId];
          } else if (rooms[currentRoomId].creatorId === socket.id) {
            const nextCreator = remainingUsers[0];
            rooms[currentRoomId].creatorId = nextCreator;
            rooms[currentRoomId].creatorUid = rooms[currentRoomId].users[nextCreator].uid;
            io.to(currentRoomId).emit('creator_changed', nextCreator);
            if (rooms[currentRoomId].adminId === socket.id) {
              rooms[currentRoomId].adminId = nextCreator;
              io.to(currentRoomId).emit('admin_changed', nextCreator);
            }
          } else if (rooms[currentRoomId].adminId === socket.id) {
            const nextAdmin = remainingUsers[0];
            rooms[currentRoomId].adminId = nextAdmin;
            io.to(currentRoomId).emit('admin_changed', nextAdmin);
          }
        }
      }
    });
  });

  // Background interval to broadcast user progress (so the bottom info is up to date)
  setInterval(() => {
    Object.values(rooms).forEach((room) => {
      if (Object.keys(room.users).length > 0) {
        const progressMap: Record<string, number> = {};
        Object.values(room.users).forEach(u => {
          progressMap[u.id] = u.currentTimestamp;
        });
        io.to(room.id).emit('users_progress', progressMap);
      }
    });
  }, 2000);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
