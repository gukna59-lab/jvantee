import React, { useState, useEffect } from 'react';
import { Lobby } from './components/Lobby';
import { Room } from './components/Room';
import { AnimeHome } from './components/AnimeHome';
import { auth, db } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, collection, query, where, onSnapshot, deleteDoc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { Video, X } from 'lucide-react';

export default function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [uid, setUid] = useState<string | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [isPublicRoom, setIsPublicRoom] = useState(true);
  const [invites, setInvites] = useState<any[]>([]);
  const [view, setView] = useState<'lobby' | 'room' | 'anime'>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('view') === 'anime' ? 'anime' : 'lobby';
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        setUid(user.uid);
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
           setUsername(docSnap.data().username);
           setAvatar(docSnap.data().avatar || null);
        } else {
           setUsername(user.email?.replace('@jvante.local', '').split('@')[0] || 'User');
        }
      } else {
        setUid(null);
        setUsername(null);
        setAvatar(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!uid) return;
    const q = query(collection(db, 'room_invites'), where('to', '==', uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
           const invite = { id: change.doc.id, ...change.doc.data() };
           setInvites(prev => [...prev, invite]);
        }
        if (change.type === 'removed') {
           setInvites(prev => prev.filter(i => i.id !== change.doc.id));
        }
      });
    });
    return () => unsubscribe();
  }, [uid]);

  const handleAcceptInvite = async (invite: any) => {
     handleJoin(username || 'User', invite.roomId, avatar || undefined, invite.isPublic, invite.roomName);
     setInvites(prev => prev.filter(i => i.id !== invite.id));
     await deleteDoc(doc(db, 'room_invites', invite.id));
  };

  const handleDeclineInvite = async (inviteId: string) => {
     setInvites(prev => prev.filter(i => i.id !== inviteId));
     await deleteDoc(doc(db, 'room_invites', inviteId));
  };

  const [roomName, setRoomName] = useState<string | null>(null);

  const handleJoin = (joinedUsername: string, joinedRoomId: string, joinedAvatar?: string, isPublic = true, joinedRoomName?: string) => {
    // Note: joinedUsername might just be the loaded one from Firebase
    setUsername(joinedUsername);
    if (joinedAvatar) setAvatar(joinedAvatar);
    setRoomId(joinedRoomId);
    setIsPublicRoom(isPublic);
    setRoomName(joinedRoomName || null);
    setView('room');
  };


  const handleLeave = () => {
    setRoomId(null);
    setRoomName(null);
    setView('lobby');
    const url = new URL(window.location.href);
    url.searchParams.delete('room');
    url.searchParams.delete('isPublic');
    window.history.replaceState({}, '', url.toString());
  };

  if (loading) {
     return <div className="min-h-screen flex items-center justify-center bg-black"><div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin"></div></div>;
  }

  return (
    <>
      <AnimatePresence>
         {view === 'lobby' && invites.map(invite => (
            <motion.div
               key={invite.id}
               initial={{ opacity: 0, scale: 0.9, y: -20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: -20 }}
               className="fixed top-4 right-4 z-50 bg-[#11141A] border border-blue-500/30 shadow-2xl shadow-blue-500/10 p-4 rounded-2xl w-80"
            >
               <button onClick={() => handleDeclineInvite(invite.id)} className="absolute top-2 right-2 text-zinc-500 hover:text-white"><X className="w-4 h-4" /></button>
               <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center shrink-0">
                     <Video className="w-5 h-5" />
                  </div>
                  <div>
                     <h4 className="font-bold text-sm">Приглашение!</h4>
                     <p className="text-xs text-zinc-400 mt-1"><span className="text-white font-medium">{invite.fromUsername}</span> зовет вас посмотреть видео в комнате <span className="font-medium text-blue-400">{invite.roomName}</span>.</p>
                     
                     <div className="flex gap-2 mt-3">
                        <button onClick={() => handleAcceptInvite(invite)} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold py-2 rounded-lg transition-colors">Войти</button>
                     </div>
                  </div>
               </div>
            </motion.div>
         ))}
      </AnimatePresence>
      {view === 'room' && roomId && username ? (
        <Room roomId={roomId} roomName={roomName || undefined} username={username} uid={uid || undefined} avatar={avatar || undefined} onLeave={handleLeave} isPublic={isPublicRoom} />
      ) : view === 'anime' ? (
        <AnimeHome onBack={() => setView('lobby')} user={currentUser} username={username} avatar={avatar} />
      ) : (
        <Lobby onJoin={handleJoin} onWatchAnime={() => setView('anime')} user={currentUser} defaultUsername={username} defaultAvatar={avatar} />
      )}
    </>
  );
}
