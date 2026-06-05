import React, { useEffect, useState } from 'react';
import { Lobby } from './components/Lobby';
import { Room } from './components/Room';
import { AnimeHome } from './components/AnimeHome';

export interface LocalUser {
  uid: string;
  username: string;
  avatar?: string;
}

const SESSION_KEY = 'jvante.session';

export default function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [uid, setUid] = useState<string | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<LocalUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPublicRoom, setIsPublicRoom] = useState(true);
  const [roomName, setRoomName] = useState<string | null>(null);
  const [view, setView] = useState<'lobby' | 'room' | 'anime'>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('view') === 'anime' ? 'anime' : 'lobby';
  });

  useEffect(() => {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) {
      try {
        const user = JSON.parse(raw) as LocalUser;
        setCurrentUser(user);
        setUid(user.uid);
        setUsername(user.username);
        setAvatar(user.avatar || null);
      } catch {
        localStorage.removeItem(SESSION_KEY);
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (user: LocalUser) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    setCurrentUser(user);
    setUid(user.uid);
    setUsername(user.username);
    setAvatar(user.avatar || null);
  };

  const handleLogout = () => {
    localStorage.removeItem(SESSION_KEY);
    setCurrentUser(null);
    setUid(null);
    setUsername(null);
    setAvatar(null);
    setRoomId(null);
    setRoomName(null);
    setView('lobby');
  };

  const handleProfileUpdate = (next: { username: string; avatar?: string }) => {
    if (!currentUser) return;
    const user = { ...currentUser, username: next.username, avatar: next.avatar || '' };
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    setCurrentUser(user);
    setUsername(user.username);
    setAvatar(user.avatar || null);
  };

  const handleJoin = (joinedUsername: string, joinedRoomId: string, joinedAvatar?: string, isPublic = true, joinedRoomName?: string) => {
    setUsername(joinedUsername);
    if (joinedAvatar !== undefined) setAvatar(joinedAvatar);
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return view === 'room' && roomId && username ? (
    <Room
      roomId={roomId}
      roomName={roomName || undefined}
      username={username}
      uid={uid || undefined}
      avatar={avatar || undefined}
      onLeave={handleLeave}
      isPublic={isPublicRoom}
    />
  ) : view === 'anime' ? (
    <AnimeHome onBack={() => setView('lobby')} user={currentUser} username={username} avatar={avatar} />
  ) : (
    <Lobby
      onJoin={handleJoin}
      onWatchAnime={() => setView('anime')}
      user={currentUser}
      defaultUsername={username}
      defaultAvatar={avatar}
      onLogin={handleLogin}
      onLogout={handleLogout}
      onProfileUpdate={handleProfileUpdate}
    />
  );
}
