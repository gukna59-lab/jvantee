import React, { useState, useEffect } from 'react';
import { PlaySquare, Users, Video, LogOut, Settings, Upload, X, Search, Key, Plus, Lock, Globe, UserPlus, Check, XCircle, MonitorPlay, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, User as FirebaseUser } from 'firebase/auth';
import { doc, setDoc, getDocs, collection, query, where, updateDoc, arrayUnion, onSnapshot, deleteDoc, getDoc } from 'firebase/firestore';
import logoSrc from '../assets/images/jvante_logo.svg';

interface LobbyProps {
  onJoin: (username: string, roomId: string, avatar?: string, isPublic?: boolean, roomName?: string) => void;
  onWatchAnime?: () => void;
  user: FirebaseUser | null;
  defaultUsername: string | null;
  defaultAvatar: string | null;
}

const fileToAvatarDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Выберите картинку.'));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Не удалось прочитать файл.'));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error('Не удалось открыть картинку.'));
      image.onload = () => {
        const size = 256;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Не удалось обработать картинку.'));
          return;
        }
        const scale = Math.max(size / image.width, size / image.height);
        const width = image.width * scale;
        const height = image.height * scale;
        const x = (size - width) / 2;
        const y = (size - height) / 2;
        ctx.drawImage(image, x, y, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      image.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
};

export function Lobby({ onJoin, onWatchAnime, user, defaultUsername, defaultAvatar }: LobbyProps) {
  const [username, setUsername] = useState(defaultUsername || '');
  const [avatar, setAvatar] = useState(defaultAvatar || '');
  
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [authError, setAuthError] = useState('');
  
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [activeModal, setActiveModal] = useState<'create' | 'join' | 'friends' | 'watchAlone' | null>(null);
  
  const [joinRoomId, setJoinRoomId] = useState('');
  
  const [friends, setFriends] = useState<string[]>([]);
  const [friendRequests, setFriendRequests] = useState<any[]>([]);
  const [searchUsername, setSearchUsername] = useState('');
  const [searchResult, setSearchResult] = useState<any | null>(null);
  const [searchError, setSearchError] = useState('');
  const [sentRequests, setSentRequests] = useState<string[]>([]);

  const [newRoomName, setNewRoomName] = useState('');
  const [onlineUsersMap, setOnlineUsersMap] = useState<string[]>([]);
  const [activeRooms, setActiveRooms] = useState<any[]>([]);

  const normalizeLogin = (value: string) => value.trim().toLowerCase();
  const loginToAuthEmail = (value: string) => `${normalizeLogin(value)}@jvante.local`;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roomParam = params.get('room');
    const isPublicParam = params.get('isPublic') !== 'false';
    if (roomParam) {
      onJoin(defaultUsername || 'Киноман', roomParam, defaultAvatar || '', isPublicParam);
    }
  }, []);

  useEffect(() => {
    if (defaultUsername) setUsername(defaultUsername);
    if (defaultAvatar) setAvatar(defaultAvatar);
  }, [defaultUsername, defaultAvatar]);

  const [friendsList, setFriendsList] = useState<any[]>([]);

  useEffect(() => {
    const fetchFriendsProfiles = async () => {
      const profiles = await Promise.all(
        friends.map(async (id) => {
          const d = await getDoc(doc(db, 'users', id));
          if (d.exists()) {
            return { id: d.id, ...d.data() };
          }
          return null;
        })
      );
      setFriendsList(profiles.filter(p => p !== null));
    };
    if (friends.length > 0) {
      fetchFriendsProfiles();
    } else {
      setFriendsList([]);
    }
  }, [friends]);

  // Realtime Friends and Requests
  useEffect(() => {
    if (!user) return;
    
    // Listen to current user document for friends list
    const unsubUser = onSnapshot(doc(db, 'users', user.uid), (docSnap) => {
      if (docSnap.exists()) {
        setFriends(docSnap.data().friends || []);
      }
    }, (error) => {
      console.error("Listening for User docs failed", error);
    });

    // Listen to friend requests to me
    const qRequests = query(collection(db, 'friend_requests'), where('to', '==', user.uid));
    const unsubRequests = onSnapshot(qRequests, (snap) => {
      const reqs: any[] = [];
      snap.forEach(d => reqs.push({ id: d.id, ...d.data() }));
      setFriendRequests(reqs);
    }, (error) => {
      console.error("Listening for Friend requests failed", error);
    });

    return () => {
      unsubUser();
      unsubRequests();
    };
  }, [user]);

  // Fetch active rooms and online users
  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        const [roomsRes, onlineRes] = await Promise.all([
          fetch('/api/rooms'),
          fetch('/api/users/online')
        ]);
        const roomsData = await roomsRes.json();
        const onlineData = await onlineRes.json();
        setActiveRooms(roomsData);
        setOnlineUsersMap(onlineData);
      } catch (err) {
        console.error('Failed to fetch data', err);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, [user]);

  const handleCreateRoom = (isPublic: boolean) => {
    const newRoomId = Math.random().toString(36).substring(2, 9);
    onJoin(username || 'Киноман', newRoomId, avatar, isPublic, newRoomName.trim() || `Комната ${newRoomId}`);
    setNewRoomName('');
  };

  const handleJoinById = (e: React.FormEvent) => {
    e.preventDefault();
    if (joinRoomId.trim() === '') return;
    onJoin(username || 'Киноман', joinRoomId.trim(), avatar, false); // private join by default
  };

  const handleSearchUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError('');
    setSearchResult(null);
    if (!searchUsername.trim()) return;
    
    if (searchUsername.toLowerCase() === username.toLowerCase()) {
      setSearchError('Вы не можете добавить себя');
      return;
    }

    try {
      const q = query(collection(db, 'users'), where('username', '==', searchUsername.trim()));
      const snaps = await getDocs(q);
      if (snaps.empty) {
        setSearchError('Пользователь не найден');
      } else {
        const foundUser = snaps.docs[0];
        setSearchResult({ id: foundUser.id, ...foundUser.data() });
      }
    } catch (err) {
      setSearchError('Ошибка поиска');
    }
  };

  const handleSendRequest = async () => {
    if (!user || !searchResult) return;
    try {
      const reqRef = doc(collection(db, 'friend_requests'));
      await setDoc(reqRef, {
        from: user.uid,
        to: searchResult.id,
        fromUsername: username,
        fromAvatar: avatar,
        createdAt: Date.now()
      });
      setSentRequests(prev => [...prev, searchResult.id]);
    } catch (err) {
      alert('Ошибка при отправке заявки');
    }
  };

  const handleAcceptRequest = async (req: any) => {
    if (!user) return;
    try {
      // Add each other
      await updateDoc(doc(db, 'users', user.uid), {
        friends: arrayUnion(req.from)
      });
      await updateDoc(doc(db, 'users', req.from), {
        friends: arrayUnion(user.uid)
      });
      // Delete request
      await deleteDoc(doc(db, 'friend_requests', req.id));
    } catch (err) {
      alert('Ошибка при принятии');
    }
  };

  const handleDeclineRequest = async (reqId: string) => {
    try {
      await deleteDoc(doc(db, 'friend_requests', reqId));
    } catch (err) {}
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const normalizedLogin = normalizeLogin(login);
    if (!/^[a-z0-9_.-]{3,24}$/.test(normalizedLogin)) {
      setAuthError('Login must be 3-24 chars: latin letters, numbers, . _ -');
      return;
    }
    try {
      if (isRegistering) {
        const existing = await getDocs(query(collection(db, 'users'), where('login', '==', normalizedLogin)));
        if (!existing.empty) {
          setAuthError('This login is already taken');
          return;
        }
        const userCred = await createUserWithEmailAndPassword(auth, loginToAuthEmail(normalizedLogin), password);
        await setDoc(doc(db, 'users', userCred.user.uid), {
          username: normalizedLogin,
          login: normalizedLogin,
          authEmail: loginToAuthEmail(normalizedLogin),
          avatar: '',
          friends: [],
          createdAt: Date.now()
        });
        alert('Письмо отправлено на почту.');
      } else {
        await signInWithEmailAndPassword(auth, loginToAuthEmail(normalizedLogin), password);
      }
    } catch (err: any) {
      setAuthError(err.message || 'Ошибка аутентификации');
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        username: username || 'User',
        avatar: avatar || ''
      });
      setIsEditingProfile(false);
    } catch (err: any) {
      alert("Error saving profile: " + err.message);
    }
  };

  const handleAvatarFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await fileToAvatarDataUrl(file);
      setAvatar(dataUrl);
    } catch (err: any) {
      alert(err.message || 'Не удалось загрузить аватарку.');
    } finally {
      e.target.value = '';
    }
  };

  // --- RENDERS ---
  
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#0A0C10] font-sans">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-[#11141A] border border-[#1F2937] rounded-3xl p-8 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-[#0F172A] rounded-2xl flex items-center justify-center border border-[#1F2937] shadow-inner overflow-hidden">
              <img src={logoSrc} alt="Jvante Logo" className="w-full h-full object-contain p-1" />
            </div>
            <h1 className="text-3xl font-black tracking-tighter text-[#3B82F6]">JVANTE</h1>
          </div>
          <form onSubmit={handleAuth} className="space-y-4">
            {authError && <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-xl text-sm">{authError}</div>}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300 ml-1">Логин</label>
              <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} required autoComplete="username" className="w-full bg-[#0A0C10] border border-[#1F2937] rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300 ml-1">Пароль</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete={isRegistering ? 'new-password' : 'current-password'} className="w-full bg-[#0A0C10] border border-[#1F2937] rounded-xl px-4 py-3 text-zinc-100 placeholder-zinc-600 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all outline-none" />
            </div>
            <button type="submit" className="w-full bg-[#3B82F6] hover:bg-blue-600 text-white font-semibold rounded-xl px-4 py-3 transition-all mt-4">{isRegistering ? 'Зарегистрироваться' : 'Войти'}</button>
            <div className="text-center mt-4">
              <button type="button" onClick={() => setIsRegistering(!isRegistering)} className="text-sm text-blue-400 hover:text-blue-300 block w-full mb-2">{isRegistering ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Создать'}</button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  // Determine rooms to show:
  // Public rooms, or private rooms if a friend is inside.
  const displayRooms = activeRooms.filter(room => {
    if (room.isPublic) return true;
    const hasFriend = room.users.some((u: any) => friends.includes(u.uid));
    return hasFriend;
  });

  return (
    <div className="min-h-screen bg-[#0A0C10] text-zinc-100 font-sans flex flex-col items-center">
      
      {/* Header Profile */}
      <header className="w-full max-w-4xl px-4 py-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#11141A] rounded-2xl flex items-center justify-center border border-[#1F2937] overflow-hidden">
            {avatar ? <img src={avatar} alt="avatar" className="w-full h-full object-cover" /> : <img src={logoSrc} alt="Jvante Logo" className="w-full h-full object-contain p-1" />}
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight truncate max-w-[150px]">{username}</h1>
            <button onClick={() => auth.signOut()} className="text-xs text-zinc-500 hover:text-red-400 outline-none flex items-center gap-1 transition-colors">
              <LogOut className="w-3 h-3" /> Выйти
            </button>
          </div>
        </div>
        <button onClick={() => setIsEditingProfile(!isEditingProfile)} className="p-3 bg-[#11141A] hover:bg-[#1E293B] rounded-xl border border-[#1F2937] transition-colors relative">
          <Settings className="w-5 h-5 text-zinc-400" />
          {friendRequests.length > 0 && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#11141A]"></span>
          )}
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-4xl px-4 flex flex-col gap-6 relative pb-32">
        {isEditingProfile && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-[#11141A] p-5 rounded-2xl border border-[#1F2937] space-y-4">
             <h3 className="text-sm font-semibold text-zinc-300">Настройки профиля</h3>
             <div className="space-y-2">
               <label className="text-xs font-medium text-zinc-400 ml-1">Никнейм</label>
               <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-[#0A0C10] border border-[#1F2937] rounded-xl px-4 py-2 text-sm focus:border-blue-500/50 outline-none" />
             </div>
             <div className="space-y-2">
               <label className="text-xs font-medium text-zinc-400 ml-1">Установить аватар</label>
               <label className="flex items-center justify-center gap-2 bg-[#1E293B] hover:bg-[#334155] text-white rounded-xl px-4 py-2 text-sm font-medium cursor-pointer transition-colors border border-[#374151]">
                  <Upload className="w-4 h-4" /> Выбрать фото
                  <input type="file" accept="image/*" onChange={handleAvatarFileChange} className="hidden" />
               </label>
               {avatar && (
                 <button onClick={() => setAvatar('')} className="text-xs text-red-400 mt-2 hover:underline">Удалить аватарку</button>
               )}
             </div>
             <button onClick={handleSaveProfile} className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-4 py-2 text-sm font-medium transition-colors">Сохранить</button>
          </motion.div>
        )}

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold tracking-tight px-2 flex items-center gap-2">
            <Globe className="w-6 h-6 text-blue-500" />
            Активные комнаты
          </h2>
          {displayRooms.length === 0 ? (
            <div className="text-center py-12 bg-[#11141A] rounded-3xl border border-[#1F2937] border-dashed">
              <Video className="w-12 h-12 text-[#374151] mx-auto mb-3" />
              <p className="text-zinc-500 text-sm">Нет активных комнат.</p>
              <p className="text-zinc-600 text-xs mt-1">Создайте свою и пригласите друзей!</p>
            </div>
          ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {displayRooms.sort((a, b) => {
                const aFriend = a.users.some((u: any) => friends.includes(u.uid));
                const bFriend = b.users.some((u: any) => friends.includes(u.uid));
                return (bFriend ? 1 : 0) - (aFriend ? 1 : 0);
              }).map(room => {
                const hasFriend = room.users.some((u: any) => friends.includes(u.uid));
                const creator = room.users.find((u: any) => u.uid === room.creatorUid) || room.users[0];

                return (
                  <motion.div whileHover={{ scale: 1.02 }} key={room.id} onClick={() => onJoin(username, room.id, avatar, room.isPublic, room.name)} className="bg-[#11141A] border border-[#1F2937] hover:border-blue-500/50 rounded-2xl p-5 cursor-pointer transition-all relative overflow-hidden group flex flex-col h-full">
                    {hasFriend && (
                      <div className="absolute top-0 right-0 bg-blue-500/20 text-blue-400 text-[10px] px-2 py-1 rounded-bl-lg font-semibold flex items-center gap-1">
                        <Users className="w-3 h-3" /> Друг смотрит
                      </div>
                    )}
                    <h3 className="font-semibold text-lg flex items-center gap-2 truncate pr-16 mb-1">
                      {room.isPublic ? <Globe className="w-4 h-4 text-zinc-400 shrink-0" /> : <Lock className="w-4 h-4 text-zinc-400 shrink-0" />}
                      <span className="truncate">{room.name || `Комната ${room.id}`}</span>
                    </h3>
                    
                    <div className="flex-1">
                      {creator && (
                         <p className="text-xs text-zinc-400 mb-1 flex items-center gap-1 truncate">
                           Создатель: <span className="font-medium text-zinc-300 truncate">{creator.username}</span>
                         </p>
                      )}
                      
                      {room.videoTitle && (
                         <p className="text-xs text-blue-400 mb-3 flex items-center gap-1 truncate">
                           <PlaySquare className="w-3 h-3 shrink-0" /> <span className="truncate">{room.videoTitle}</span>
                         </p>
                      )}
                    </div>

                    <div className="mt-auto pt-3 flex items-center justify-between border-t border-[#1F2937]">
                      <p className="text-xs text-zinc-500">{room.userCount} {room.userCount === 1 ? 'зритель' : 'зрителей'}</p>
                      <div className="flex -space-x-2">
                         {room.users.slice(0, 5).map((u: any, i: number) => (
                           <div key={i} title={u.username} className="w-6 h-6 rounded-full border-2 border-[#11141A] bg-[#1E293B] overflow-hidden flex items-center justify-center z-10" style={{ zIndex: 10 - i }}>
                             {u.avatar ? <img src={u.avatar} className="w-full h-full object-cover" /> : <span className="text-[8px] font-bold text-zinc-400">{u.username.substring(0, 2).toUpperCase()}</span>}
                           </div>
                         ))}
                         {room.users.length > 5 && (
                           <div className="w-6 h-6 rounded-full border-2 border-[#11141A] bg-[#3B82F6] flex items-center justify-center text-[8px] font-bold text-white z-0">
                             +{room.users.length - 5}
                           </div>
                         )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center px-4 z-50">
        <div className="bg-[#11141A]/90 backdrop-blur-xl border border-[#1F2937] p-2 rounded-2xl shadow-2xl flex items-center gap-2">
          <button onClick={() => setActiveModal('create')} className="flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-all group">
             <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
             <span className="hidden sm:inline">Создать лобби</span>
          </button>
          <div className="w-[1px] h-8 bg-[#1F2937] mx-1"></div>
          <button onClick={() => setActiveModal('friends')} className="p-3 bg-transparent hover:bg-[#1E293B] rounded-xl text-zinc-400 hover:text-white transition-all relative group" title="Поиск друзей">
             <Search className="w-6 h-6 group-hover:scale-110 transition-transform" />
             {friendRequests.length > 0 && (
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#11141A]"></span>
             )}
          </button>
          <button onClick={() => setActiveModal('watchAlone')} className="p-3 bg-transparent hover:bg-[#1E293B] rounded-xl text-zinc-400 hover:text-white transition-all relative group" title="Смотреть одному">
             <MonitorPlay className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
          <button onClick={() => setActiveModal('join')} className="p-3 bg-transparent hover:bg-[#1E293B] rounded-xl text-zinc-400 hover:text-white transition-all group" title="Войти по коду">
             <Key className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveModal(null)} className="absolute inset-0 bg-black/60 backdrop-blur-sm"></motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-sm bg-[#11141A] border border-[#1F2937] rounded-3xl p-6 shadow-2xl">
              <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-zinc-300 bg-[#1E293B] rounded-full transition-colors"><X className="w-4 h-4" /></button>
              
              {activeModal === 'create' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-2xl mx-auto flex items-center justify-center mb-4"><Plus className="w-6 h-6" /></div>
                    <h2 className="text-xl font-bold">Новая комната</h2>
                    <p className="text-xs text-zinc-500 mt-1">Как назовём вашу комнату?</p>
                  </div>
                  <div className="space-y-3">
                    <input type="text" value={newRoomName} onChange={e => setNewRoomName(e.target.value)} placeholder="Название лобби (необязательно)" maxLength={40} className="w-full bg-[#0A0C10] border border-[#1F2937] rounded-xl px-4 py-3 text-sm focus:border-blue-500/50 outline-none placeholder-zinc-600" />
                    
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <button onClick={() => { setActiveModal(null); handleCreateRoom(true); }} className="flex flex-col items-center justify-center p-4 bg-[#0A0C10] hover:bg-[#1E293B] border border-[#1F2937] hover:border-blue-500/50 rounded-2xl transition-all gap-2 group">
                        <Globe className="w-6 h-6 text-zinc-400 group-hover:text-blue-400" />
                        <span className="text-sm font-medium">Публичная</span>
                      </button>
                      <button onClick={() => { setActiveModal(null); handleCreateRoom(false); }} className="flex flex-col items-center justify-center p-4 bg-[#0A0C10] hover:bg-[#1E293B] border border-[#1F2937] hover:border-purple-500/50 rounded-2xl transition-all gap-2 group">
                        <Lock className="w-6 h-6 text-zinc-400 group-hover:text-purple-400" />
                        <span className="text-sm font-medium">Приватная</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeModal === 'join' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-2xl mx-auto flex items-center justify-center mb-4"><Key className="w-6 h-6" /></div>
                    <h2 className="text-xl font-bold">Войти по коду</h2>
                    <p className="text-xs text-zinc-500 mt-1">Введите ID комнаты.</p>
                  </div>
                  <form onSubmit={handleJoinById} className="space-y-4">
                    <input type="text" value={joinRoomId} onChange={e => setJoinRoomId(e.target.value)} placeholder="ID, например mxd8j2" className="w-full bg-[#0A0C10] text-center font-mono text-lg tracking-widest border border-[#1F2937] rounded-xl px-4 py-3 placeholder-zinc-600 focus:border-emerald-500/50 outline-none" required />
                    <button type="submit" className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all">Присоединиться</button>
                  </form>
                </div>
              )}

              {activeModal === 'friends' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-pink-500/20 text-pink-400 rounded-2xl mx-auto flex items-center justify-center mb-4"><UserPlus className="w-6 h-6" /></div>
                    <h2 className="text-xl font-bold">Друзья</h2>
                  </div>

                  {friendRequests.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Заявки в друзья</h3>
                      <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
                        {friendRequests.map(req => (
                          <div key={req.id} className="flex items-center justify-between p-3 bg-[#0A0C10] rounded-xl border border-[#1F2937]">
                            <div className="flex items-center gap-3">
                               <div className="w-8 h-8 rounded-full bg-[#1E293B] overflow-hidden">
                                  {req.fromAvatar ? <img src={req.fromAvatar} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-[10px] font-bold">{req.fromUsername.substring(0,2).toUpperCase()}</div>}
                               </div>
                               <span className="text-sm font-medium">{req.fromUsername}</span>
                            </div>
                            <div className="flex gap-2">
                               <button onClick={() => handleAcceptRequest(req)} className="p-1.5 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 rounded-lg"><Check className="w-4 h-4" /></button>
                               <button onClick={() => handleDeclineRequest(req.id)} className="p-1.5 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg"><XCircle className="w-4 h-4" /></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {friendsList.length > 0 && (
                    <div className="space-y-3 border-t border-[#1F2937] pt-4">
                      <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Мои друзья</h3>
                      <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
                        {friendsList.map(friend => {
                          const isOnline = onlineUsersMap.includes(friend.id);
                          return (
                          <div key={friend.id} className="flex items-center justify-between p-3 bg-[#0A0C10] rounded-xl border border-[#1F2937]">
                            <div className="flex items-center gap-3 relative">
                               <div className="w-8 h-8 rounded-full bg-[#1E293B] overflow-hidden">
                                  {friend.avatar ? <img src={friend.avatar} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-[10px] font-bold">{friend.username.substring(0,2).toUpperCase()}</div>}
                               </div>
                               <div className={`absolute bottom-0 left-6 w-2.5 h-2.5 rounded-full border border-[#0A0C10] ${isOnline ? 'bg-emerald-500' : 'bg-zinc-500'}`} title={isOnline ? 'Онлайн' : 'Оффлайн'}></div>
                               <span className="text-sm font-medium text-white">{friend.username}</span>
                            </div>
                          </div>
                        )})}
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <form onSubmit={handleSearchUser} className="relative">
                      <input type="text" value={searchUsername} onChange={e => setSearchUsername(e.target.value)} placeholder="Найти по нику..." className="w-full bg-[#0A0C10] border border-[#1F2937] rounded-xl pl-10 pr-4 py-2 text-sm focus:border-pink-500/50 outline-none" />
                      <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    </form>
                    {searchError && <p className="text-xs text-red-400 text-center">{searchError}</p>}
                    {searchResult && (
                      <div className="flex items-center justify-between p-3 bg-[#0A0C10] rounded-xl border border-pink-500/30">
                         <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-full bg-[#1E293B] overflow-hidden">
                                {searchResult.avatar ? <img src={searchResult.avatar} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-[10px] font-bold">{searchResult.username.substring(0,2).toUpperCase()}</div>}
                             </div>
                             <span className="text-sm font-medium truncate max-w-[100px]">{searchResult.username}</span>
                         </div>
                         <button onClick={handleSendRequest} disabled={friends.includes(searchResult.id) || sentRequests.includes(searchResult.id)} className="px-3 py-1.5 bg-pink-600 hover:bg-pink-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white text-xs font-semibold rounded-lg transition-colors">
                            {friends.includes(searchResult.id) ? 'Уже в друзьях' : (sentRequests.includes(searchResult.id) ? 'Заявка кинута' : 'Добавить')}
                         </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {activeModal === 'watchAlone' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-2xl mx-auto flex items-center justify-center mb-4"><MonitorPlay className="w-6 h-6" /></div>
                    <h2 className="text-xl font-bold">Смотреть одному</h2>
                    <p className="text-xs text-zinc-500 mt-1">Что вы хотите посмотреть?</p>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                     <button onClick={() => { setActiveModal(null); onWatchAnime?.(); }} className="p-4 bg-[#0A0C10] hover:bg-[#1E293B] border border-[#1F2937] hover:border-purple-500/50 rounded-2xl transition-all font-medium flex items-center justify-between group">
                        <span>Аниме</span>
                        <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-purple-400 transition-colors" />
                     </button>
                     <button className="p-4 bg-[#0A0C10] hover:bg-[#1E293B] border border-[#1F2937] hover:border-blue-500/50 rounded-2xl transition-all font-medium flex items-center justify-between group opacity-50 cursor-not-allowed" disabled>
                        <span>Фильмы (скоро)</span>
                        <ChevronRight className="w-5 h-5 text-zinc-600" />
                     </button>
                     <button className="p-4 bg-[#0A0C10] hover:bg-[#1E293B] border border-[#1F2937] hover:border-emerald-500/50 rounded-2xl transition-all font-medium flex items-center justify-between group opacity-50 cursor-not-allowed" disabled>
                        <span>Сериалы (скоро)</span>
                        <ChevronRight className="w-5 h-5 text-zinc-600" />
                     </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
