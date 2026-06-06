import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Search, Grid, List, PlaySquare, TrendingUp, Star, Eye, ChevronRight, LayoutGrid, MonitorPlay, Film, Tv, Clock, Languages, ExternalLink } from 'lucide-react';
import logoSrc from '../assets/images/jvante_logo.svg';
import { animeData, Anime } from '../data/animeData';
import { CustomPlayer } from './CustomPlayer';

interface AnimeHomeProps {
  onBack: () => void;
  user: any;
  username: string | null;
  avatar: string | null;
}

interface AnimeSource {
  voice: string;
  provider: 'anilibria' | 'animevost';
  episodes: number[];
  qualities?: string[];
}

export function AnimeHome({ onBack, user, username, avatar }: AnimeHomeProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'Все' | 'Сериалы' | 'Фильмы' | 'ONA'>('Все');
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  
  // Specific states for detail view (player)
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [kodikUrl, setKodikUrl] = useState<string | null>(null);
  const [kodikLoading, setKodikLoading] = useState(false);
  const [kodikError, setKodikError] = useState<string | null>(null);
  const [showPlayerFallback, setShowPlayerFallback] = useState(false);
  const [sourceOptions, setSourceOptions] = useState<AnimeSource[]>([]);
  const [sourceLoading, setSourceLoading] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState('');

  React.useEffect(() => {
    setIsPlaying(false);
    setKodikUrl(null);
    setKodikError(null);
    setShowPlayerFallback(false);
  }, [selectedAnime, selectedEpisode, selectedVoice, selectedQuality]);

  const selectedSource = sourceOptions.find(source => source.voice === selectedVoice);
  const availableEpisodes = selectedSource?.episodes?.length
    ? selectedSource.episodes
    : Array.from({ length: selectedAnime?.episodes || 0 }, (_, index) => index + 1);
  const availableQualities = selectedSource?.qualities || [];

  React.useEffect(() => {
    if (!selectedAnime) {
      setSourceOptions([]);
      return;
    }

    let cancelled = false;
    setSourceLoading(true);
    setSourceOptions([]);

    const params = new URLSearchParams({
      title: selectedAnime.title,
      episodes: String(selectedAnime.episodes),
    });

    fetch(`/api/anime-sources?${params.toString()}`)
      .then(response => response.json())
      .then(data => {
        if (cancelled) return;
        const sources = Array.isArray(data.sources) ? data.sources as AnimeSource[] : [];
        setSourceOptions(sources);
        const firstSource = sources[0];
        setSelectedVoice(firstSource?.voice || selectedAnime.voiceovers?.[0] || '');
        setSelectedEpisode(firstSource?.episodes?.[0] || 1);
        setSelectedQuality(firstSource?.qualities?.[0] || '');
      })
      .catch(() => {
        if (cancelled) return;
        setSourceOptions([]);
        setSelectedVoice(selectedAnime.voiceovers?.[0] || '');
        setSelectedEpisode(1);
        setSelectedQuality('');
      })
      .finally(() => {
        if (!cancelled) setSourceLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedAnime]);

  React.useEffect(() => {
    if (!selectedSource) return;
    if (!selectedSource.episodes.includes(selectedEpisode)) {
      setSelectedEpisode(selectedSource.episodes[0] || 1);
    }
    if (selectedSource.qualities?.length && !selectedSource.qualities.includes(selectedQuality)) {
      setSelectedQuality(selectedSource.qualities[0]);
    }
    if (!selectedSource.qualities?.length && selectedQuality) {
      setSelectedQuality('');
    }
  }, [selectedSource, selectedEpisode, selectedQuality]);

  React.useEffect(() => {
    if (!kodikUrl) return;
    setShowPlayerFallback(false);
    const timer = window.setTimeout(() => setShowPlayerFallback(true), 4500);
    return () => window.clearTimeout(timer);
  }, [kodikUrl]);

  const fetchKodikPlayer = async (anime: Anime | null, qualityOverride = selectedQuality) => {
    if (!anime) return;
    setKodikLoading(true);
    setKodikError(null);
    setKodikUrl(null);

    try {
      const params = new URLSearchParams({
        shikimoriId: anime.shikimori_id,
        episode: String(selectedEpisode),
        title: anime.title,
      });
      if (selectedVoice) {
        params.set('voice', selectedVoice);
      }
      if (selectedSource?.provider) {
        params.set('provider', selectedSource.provider);
      }
      if (qualityOverride) {
        params.set('quality', qualityOverride);
      }
      const response = await fetch(`/api/anime-player?${params.toString()}`);
      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.url) {
        throw new Error(data.error || 'Плеер для этой серии сейчас недоступен.');
      }

      setKodikUrl(data.url);
      setIsPlaying(true);
    } catch (error: any) {
      setKodikError(error.message || 'Не удалось загрузить плеер.');
      setIsPlaying(false);
    } finally {
      setKodikLoading(false);
    }
  };

  const scrollToPlayer = () => {
    document.getElementById('anime-player-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredAnimeList = useMemo(() => {
    return animeData.filter(anime => {
      const matchFilter = filter === 'Все' || anime.type === filter;
      const matchSearch = anime.title.toLowerCase().includes(search.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [filter, search]);

  const handleRandomAnime = () => {
    const min = 0;
    const max = animeData.length - 1;
    const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
    const item = animeData[randomIndex];
    setSelectedVoice(item.voiceovers?.[0] || '');
    setSelectedEpisode(1);
    setSelectedAnime(item);
  };

  const handleSelectAnime = (anime: Anime) => {
    setSelectedVoice(anime.voiceovers?.[0] || '');
    setSelectedEpisode(1);
    setSelectedAnime(anime);
  };

  return (
    <div className="min-h-screen bg-[#0A0C10] text-zinc-100 font-sans flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#11141A]/90 backdrop-blur-xl border-b border-[#1F2937]">
         <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-6">
               <button onClick={() => selectedAnime ? setSelectedAnime(null) : onBack()} className="p-2 -ml-2 text-zinc-400 hover:text-white transition-colors" title={selectedAnime ? "Назад к списку" : "Назад в лобби"}>
                 <ArrowLeft className="w-6 h-6" />
               </button>
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#0F172A] rounded-xl flex items-center justify-center border border-[#1F2937] overflow-hidden p-1">
                     <img src={logoSrc} alt="Jvante" className="w-full h-full object-contain" />
                  </div>
                  <div className="hidden sm:block">
                     <h1 className="text-xl font-black tracking-tighter text-blue-500 leading-none">JVANTE</h1>
                     <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Anime</span>
                  </div>
               </div>
            </div>

            {!selectedAnime && (
              <div className="flex-1 max-w-2xl mx-8 hidden md:block">
                 <div className="relative group">
                    <input 
                      type="text" 
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      placeholder="Найти аниме по названию..." 
                      className="w-full bg-[#0A0C10] border border-[#1F2937] rounded-full pl-12 pr-4 py-2.5 text-sm focus:border-blue-500/50 outline-none transition-colors group-hover:border-zinc-700" 
                    />
                    <Search className="w-4 h-4 text-zinc-500 absolute left-5 top-1/2 -translate-y-1/2" />
                 </div>
              </div>
            )}

            <div className="flex items-center gap-4 ml-auto">
               <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-400">
                  <button onClick={() => { setSelectedAnime(null); setFilter('Все'); }} className="hover:text-white transition-colors">Главная</button>
                  <button onClick={() => { setSelectedAnime(null); setFilter('Все'); }} className="text-white">Аниме</button>
                  <button onClick={() => { setSelectedAnime(null); setFilter('Все'); }} className="hover:text-white transition-colors">Топ-100</button>
                  <button onClick={handleRandomAnime} className="hover:text-white transition-colors">Случайное</button>
               </nav>
               <div className="w-[1px] h-6 bg-[#1F2937] mx-2 hidden lg:block"></div>
               <div className="flex items-center gap-2">
                 <span className="text-sm font-semibold hidden md:block truncate max-w-[100px]">{username}</span>
                 <div className="w-9 h-9 rounded-full bg-[#1E293B] border border-[#1F2937] overflow-hidden relative">
                    {avatar ? <img src={avatar} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-xs font-bold">{username?.substring(0,2).toUpperCase()}</div>}
                 </div>
               </div>
            </div>
         </div>
      </header>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {!selectedAnime ? (
          <motion.main 
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 max-w-[1400px] w-full mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8"
          >
             {/* Left Column (Main list) */}
             <div className="flex-1 flex flex-col">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-[#11141A] border border-[#1F2937] p-3 rounded-2xl mb-6 gap-3">
                   <h2 className="text-lg font-bold ml-2">Топ аниме: {filter}</h2>
                   <div className="flex flex-wrap items-center gap-2">
                      <div className="flex bg-[#0A0C10] p-1 rounded-xl border border-[#1F2937]">
                        {(['Все', 'Сериалы', 'Фильмы', 'ONA'] as const).map(f => (
                            <button 
                               key={f}
                               onClick={() => setFilter(f)}
                               className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${filter === f ? 'bg-blue-600 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                            >
                               {f}
                            </button>
                         ))}
                      </div>
                      <div className="flex items-center gap-1 bg-[#0A0C10] p-1 rounded-xl border border-[#1F2937]">
                         <button className="p-1.5 bg-[#1F2937] text-white rounded-lg"><LayoutGrid className="w-4 h-4" /></button>
                         <button className="p-1.5 text-zinc-500 hover:text-white rounded-lg"><List className="w-4 h-4" /></button>
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                   {filteredAnimeList.map((anime) => (
                      <motion.div 
                        whileHover={{ y: -5 }} 
                        key={anime.id} 
                        onClick={() => handleSelectAnime(anime)}
                        className="group relative bg-[#11141A] border border-[#1F2937] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-xl flex flex-col"
                      >
                         <div className="absolute top-2 left-2 z-10 bg-amber-500 text-[#0F172A] text-xs font-black px-2 py-1 rounded-lg flex items-center gap-1 shadow-lg">
                            <Star className="w-3 h-3 fill-current" /> {anime.rating}
                         </div>
                         <div className="absolute top-2 right-2 z-10 bg-[#11141A]/90 backdrop-blur text-zinc-300 border border-[#1F2937] text-xs font-bold px-2 py-1 rounded-lg">
                            {anime.type}
                         </div>

                         <div className="aspect-[3/4] overflow-hidden relative border-b border-[#1F2937]">
                            <img src={anime.img} alt={anime.title} referrerPolicy="no-referrer" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#11141A] via-transparent to-transparent opacity-90"></div>
                         </div>

                         <div className="p-4 flex-1 flex flex-col justify-end bg-[#11141A]">
                            <h3 className="font-bold text-sm leading-tight line-clamp-2 text-white mb-2">{anime.title}</h3>
                            <div className="flex items-center justify-between text-xs text-zinc-500 font-medium mt-auto">
                               <span>IMDb</span>
                               <span>#{anime.rank} в рейтинге</span>
                            </div>
                         </div>
                      </motion.div>
                   ))}
                   {filteredAnimeList.length === 0 && (
                      <div className="col-span-full py-12 text-center text-zinc-500 font-medium">
                         Ничего не найдено по запросу «{search}»
                      </div>
                   )}
                </div>
             </div>

             {/* Right Column (Sidebar) */}
             <aside className="w-full lg:w-[320px] flex flex-col gap-6 shrink-0">
                {/* Stats Block - Reseted per request */}
                <div className="bg-[#11141A] border border-[#1F2937] rounded-3xl p-5">
                   <h3 className="font-bold text-sm text-center mb-4 tracking-widest uppercase text-zinc-500">Статистика сайта</h3>
                   <div className="space-y-3 text-sm font-medium">
                      <div className="flex justify-between items-center border-b border-[#1F2937] pb-2">
                         <span className="text-zinc-400">Вкладок открыто:</span>
                         <span className="text-white">0</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-[#1F2937] pb-2">
                         <span className="text-zinc-400">Пользователей:</span>
                         <div className="flex items-center gap-2">
                           <span className="text-white">0</span>
                           <span className="flex items-center gap-1 text-emerald-400"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> 1</span>
                         </div>
                      </div>
                      <div className="flex justify-between items-center border-b border-[#1F2937] pb-2">
                         <span className="text-zinc-400">Аниме в базе:</span>
                         <span className="text-white">{animeData.length}</span>
                      </div>
                   </div>
                </div>
             </aside>
          </motion.main>
        ) : (
          <motion.main 
            key="details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 max-w-[1400px] w-full mx-auto px-4 py-8"
          >
             <div className="flex flex-col lg:flex-row gap-8">
                {/* Poster & Info Sidebar */}
                <div className="w-full lg:w-[300px] shrink-0 flex flex-col gap-6">
                   <div className="bg-[#11141A] rounded-3xl border border-[#1F2937] overflow-hidden shadow-2xl">
                      <div className="aspect-[3/4] overflow-hidden">
                         <img src={selectedAnime.img} alt={selectedAnime.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      </div>
                      <div className="p-5 flex flex-col gap-4">
                         <div className="flex items-center justify-center gap-3 bg-[#0A0C10] p-3 rounded-xl border border-[#1F2937]">
                            <div className="flex items-center gap-1 text-amber-500 font-black text-xl">
                               <Star className="w-5 h-5 fill-current" /> {selectedAnime.rating}
                            </div>
                            <span className="text-zinc-500 text-sm font-bold">IMDb</span>
                         </div>
                         <button onClick={scrollToPlayer} className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                            <MonitorPlay className="w-5 h-5" /> Смотреть
                         </button>
                      </div>
                   </div>

                   <div className="bg-[#11141A] rounded-3xl border border-[#1F2937] p-5">
                      <h3 className="font-bold text-sm tracking-widest uppercase text-zinc-500 mb-4">Информация</h3>
                      <div className="space-y-4 text-sm font-medium">
                         <div className="flex justify-between items-center">
                            <span className="text-zinc-400 flex items-center gap-2"><Film className="w-4 h-4" /> Тип</span>
                            <span className="text-white bg-[#1F2937] px-2 py-1 rounded-md">{selectedAnime.type}</span>
                         </div>
                         <div className="flex justify-between items-center">
                            <span className="text-zinc-400 flex items-center gap-2"><Tv className="w-4 h-4" /> Эпизоды</span>
                            <span className="text-white">{availableEpisodes.length}</span>
                         </div>
                         <div className="flex justify-between items-center">
                            <span className="text-zinc-400 flex items-center gap-2"><TrendingUp className="w-4 h-4" /> Топ</span>
                            <span className="text-white">#{selectedAnime.rank}</span>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col gap-8">
                   <div className="bg-[#11141A] rounded-3xl border border-[#1F2937] p-6 lg:p-8">
                      <h1 className="text-3xl lg:text-4xl font-black text-white mb-4">{selectedAnime.title}</h1>
                      <div className="prose prose-invert max-w-none mb-8">
                         <h3 className="text-lg font-bold text-zinc-300 mb-2">Сюжет</h3>
                         <p className="text-zinc-400 leading-relaxed">
                            {selectedAnime.plot}
                         </p>
                      </div>

                      <h3 className="text-lg font-bold text-zinc-300 mb-4">Кадры из аниме</h3>
                      {selectedAnime.screenshots && selectedAnime.screenshots.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {selectedAnime.screenshots.map((src, i) => (
                            <div key={i} className="aspect-video rounded-2xl overflow-hidden border border-[#1F2937]">
                              <img
                                src={src}
                                alt={`Кадр ${i + 1}`}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-zinc-500 text-sm">Скриншоты не найдены</p>
                      )}
                   </div>

                   {/* Fake Player Section */}
                   <div id="anime-player-section" className="bg-[#11141A] rounded-3xl border border-[#1F2937] overflow-hidden scroll-mt-24">
                      {/* Player Controls Header */}
                      <div className="bg-[#0A0C10] border-b border-[#1F2937] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                         <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
                           <Languages className="w-5 h-5 text-zinc-500 shrink-0" />
                           {(sourceOptions.length ? sourceOptions.map(source => source.voice) : selectedAnime.voiceovers).map(voice => (
                              <button 
                                 key={voice}
                                 onClick={() => {
                                   const source = sourceOptions.find(item => item.voice === voice);
                                   setSelectedVoice(voice);
                                   setSelectedEpisode(source?.episodes?.[0] || 1);
                                   setSelectedQuality(source?.qualities?.[0] || '');
                                 }}
                                 className={`px-3 py-1.5 text-sm font-semibold rounded-lg whitespace-nowrap transition-colors ${selectedVoice === voice ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-zinc-400 hover:bg-[#1E293B]'}`}
                              >
                                 {voice}
                              </button>
                           ))}
                           {sourceLoading && (
                             <span className="px-3 py-1.5 text-sm text-zinc-500">Проверяю серии...</span>
                           )}
                         </div>
                      </div>

                       {/* Kodik Video Player */}
                      <div className="aspect-video bg-black relative group flex items-stretch justify-center">
                         {!isPlaying ? (
                           <>
                             <img 
                               src={selectedAnime.screenshots[0] || selectedAnime.img} 
                               onError={(e) => { e.currentTarget.src = selectedAnime.img; }}
                               referrerPolicy="no-referrer" 
                               className="absolute inset-0 w-full h-full object-cover opacity-30" 
                               alt="Player background"
                             />
                             <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                                {kodikError && (
                                  <div className="bg-red-500/20 border border-red-500/40 text-red-300 text-sm px-4 py-2 rounded-xl max-w-xs text-center">
                                    {kodikError}
                                  </div>
                                )}
                                <button 
                                  onClick={() => fetchKodikPlayer(selectedAnime)} 
                                  disabled={kodikLoading}
                                  className="w-20 h-20 rounded-full bg-blue-600/80 hover:bg-blue-500 hover:scale-110 flex items-center justify-center transition-all shadow-blue-500/50 shadow-lg backdrop-blur z-10 disabled:opacity-60 disabled:cursor-wait"
                                >
                                  {kodikLoading 
                                    ? <div className="w-8 h-8 rounded-full border-2 border-white border-t-transparent animate-spin" />
                                    : <PlaySquare className="w-8 h-8 ml-1 text-white" />
                                  }
                                </button>
                             </div>
                             <div className="absolute bottom-4 left-4 right-4 text-center z-10">
                                <span className="bg-black/60 text-white backdrop-blur text-sm font-bold px-4 py-2 rounded-xl">
                                   Озвучка: {selectedVoice} • Серия {selectedEpisode} из {selectedAnime.episodes}
                                </span>
                             </div>
                           </>
                         ) : kodikUrl ? (
                           /\.(m3u8|mp4)(\?|$)/i.test(kodikUrl) ? (
                             <CustomPlayer
                               src={kodikUrl}
                               title={selectedAnime.title}
                               poster={selectedAnime.screenshots[0] || selectedAnime.img}
                               qualities={availableQualities}
                               selectedQuality={selectedQuality}
                               onQualityChange={(quality) => {
                                 setSelectedQuality(quality);
                                 fetchKodikPlayer(selectedAnime, quality);
                               }}
                             />
                           ) : (
                             <iframe
                               src={kodikUrl}
                               className="w-full h-full border-0"
                               allowFullScreen
                               allow="autoplay; fullscreen"
                               referrerPolicy="no-referrer"
                               title={selectedAnime.title}
                             />
                           )
                         ) : (
                           <div className="w-full h-full flex items-center justify-center text-zinc-500">
                             Загрузка плеера...
                           </div>
                         )}
                         {isPlaying && kodikUrl && showPlayerFallback && !/\.(m3u8|mp4)(\?|$)/i.test(kodikUrl) && (
                           <div className="absolute inset-x-4 bottom-4 z-20 rounded-2xl border border-blue-500/30 bg-[#0A0C10]/90 p-4 backdrop-blur-xl shadow-2xl">
                             <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                               <div>
                                 <div className="text-sm font-bold text-white">Если встроенный плеер не открылся</div>
                                 <div className="text-xs text-zinc-400 mt-1">Источник может блокировать iframe на localhost. Откройте плеер в новой вкладке.</div>
                               </div>
                               <div className="flex flex-wrap gap-2">
                                 <a
                                   href={kodikUrl}
                                   target="_blank"
                                   rel="noreferrer"
                                   className="inline-flex items-center gap-2 rounded-xl border border-blue-500/30 bg-blue-600/20 px-3 py-2 text-xs font-bold text-blue-200 hover:bg-blue-600/30"
                                 >
                                   <ExternalLink className="w-3.5 h-3.5" />
                                   Открыть плеер
                                 </a>
                               </div>
                             </div>
                           </div>
                         )}
                      </div>

                      {/* Episode Selector */}
                      {selectedAnime.type === 'Сериалы' || selectedAnime.type === 'ONA' ? (
                        <div className="p-4 bg-[#0F172A]">
                           <h4 className="text-sm font-bold text-zinc-400 mb-3 ml-1 flex items-center gap-2"><Clock className="w-4 h-4" /> Выбор серии</h4>
                           <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                              {availableEpisodes.map((episode) => (
                                 <button 
                                    key={episode}
                                    onClick={() => setSelectedEpisode(episode)}
                                    className={`w-12 h-10 rounded-xl font-bold text-sm transition-all flex items-center justify-center ${selectedEpisode === episode ? 'bg-blue-600 text-white shadow-lg' : 'bg-[#1E293B] text-zinc-400 hover:bg-[#2DD4BF]/20 hover:text-[#2DD4BF] border border-[#334155]'}`}
                                 >
                                    {episode}
                                 </button>
                              ))}
                           </div>
                        </div>
                      ) : null}
                   </div>
                </div>
             </div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
