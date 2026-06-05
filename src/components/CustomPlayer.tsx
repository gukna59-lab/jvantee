import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, Settings } from 'lucide-react';
import * as Slider from '@radix-ui/react-slider';

interface CustomPlayerProps {
  src: string;
}

export function CustomPlayer({ src }: CustomPlayerProps) {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hls, setHls] = useState<Hls | null>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<any>(null);

  const [levels, setLevels] = useState<any[]>([]);
  const [currentLevel, setCurrentLevel] = useState<number>(-1); // -1 = Auto
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let newHls: Hls | null = null;

    if (src.includes('.mp4')) {
      video.src = src;
      return;
    }

    if (Hls.isSupported()) {
      newHls = new Hls({
        maxBufferLength: 30,
        enableWorker: true,
      });
      newHls.loadSource(src);
      newHls.attachMedia(video);

      newHls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
        setLevels(data.levels);
      });

      setHls(newHls);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // For Safari
      video.src = src;
    }

    return () => {
      if (newHls) {
        newHls.destroy();
      }
    };
  }, [src]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
      setShowSettings(false);
    }
  };

  const handleDurationChange = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (value: number[]) => {
    if (videoRef.current && duration) {
      const time = (value[0] / 100) * duration;
      videoRef.current.currentTime = time;
      setProgress(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    if (videoRef.current) {
      const newVolume = value[0];
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
      if (newMuted) {
        setVolume(0);
      } else {
        setVolume(1);
        videoRef.current.volume = 1;
      }
    }
  };

  const toggleFullscreen = async () => {
    if (!videoContainerRef.current) return;

    if (!document.fullscreenElement) {
      await videoContainerRef.current.requestFullscreen().catch(err => {
        console.error("Error attempting to enable fullscreen:", err);
      });
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  const handleLevelChange = (index: number) => {
    if (hls) {
      hls.currentLevel = index;
      setCurrentLevel(index);
    }
    setShowSettings(false);
  };

  const formatTime = (timeInSeconds: number) => {
    const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
    return result.startsWith('00:') ? result.substring(3) : result;
  };

  return (
    <div 
      ref={videoContainerRef} 
      className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden group cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      onClick={() => setShowSettings(false)}
    >
      <video
        ref={videoRef}
        className="w-full h-full max-h-full object-contain"
        onTimeUpdate={handleTimeUpdate}
        onDurationChange={handleDurationChange}
        onClick={(e) => {
          e.stopPropagation();
          togglePlay();
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        playsInline
      />

      {/* Play/Pause Center Indicator */}
      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-16 h-16 md:w-24 md:h-24 bg-white/20 backdrop-blur-md flex items-center justify-center rounded-full text-white">
             <Play className="w-8 h-8 md:w-12 md:h-12 ml-2" fill="currentColor" />
          </div>
        </div>
      )}

      {/* Controls Overlay */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 md:p-6 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress Bar */}
        <div className="flex items-center gap-4 mb-4">
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-5 cursor-pointer group"
            value={[progress]}
            max={100}
            step={0.1}
            onValueChange={handleSeek}
          >
            <Slider.Track className="bg-white/20 relative grow rounded-full h-1.5 transition-all group-hover:h-2 cursor-pointer">
              <Slider.Range className="absolute bg-[#F43F5E] rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb className="block w-4 h-4 bg-[#F43F5E] shadow-md rounded-full focus:outline-none focus:ring-2 focus:ring-[#F43F5E]/50 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Slider.Root>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-6">
            <button onClick={togglePlay} className="text-white hover:text-[#F43F5E] transition-colors">
              {isPlaying ? <Pause className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" /> : <Play className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" />}
            </button>
            <div className="flex items-center gap-2 group">
              <button onClick={toggleMute} className="text-white hover:text-[#F43F5E] transition-colors">
                {isMuted || volume === 0 ? <VolumeX className="w-5 h-5 md:w-6 md:h-6" /> : <Volume2 className="w-5 h-5 md:w-6 md:h-6" />}
              </button>
              <div className="w-0 overflow-hidden group-hover:w-20 transition-all duration-300 ease-out">
                <Slider.Root
                  className="relative flex items-center select-none touch-none w-full h-5"
                  value={[volume]}
                  max={1}
                  step={0.05}
                  onValueChange={handleVolumeChange}
                >
                  <Slider.Track className="bg-white/20 relative grow rounded-full h-1.5">
                    <Slider.Range className="absolute bg-white rounded-full h-full" />
                  </Slider.Track>
                  <Slider.Thumb className="block w-3 h-3 bg-white shadow-md rounded-full focus:outline-none" />
                </Slider.Root>
              </div>
            </div>
            <div className="text-white/80 text-xs md:text-sm font-medium tabular-nums shadow-sm">
              {formatTime(currentTime)} <span className="text-white/40 mx-1">/</span> {formatTime(duration || 0)}
            </div>
          </div>

          <div className="flex items-center gap-4 relative">
            <div className="relative">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSettings(!showSettings);
                }}
                className={`text-white hover:text-white transition-transform duration-300 ${showSettings ? 'rotate-90 text-white' : 'text-white/80'}`}
              >
                <Settings className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              {showSettings && levels.length > 0 && (
                <div className="absolute bottom-full right-0 mb-4 bg-zinc-900/90 backdrop-blur-md rounded-xl border border-white/10 p-2 min-w-[120px] shadow-2xl flex flex-col gap-1 z-50">
                  <div className="text-xs font-bold text-white/50 uppercase tracking-wider px-3 py-1.5 mb-1">Качество</div>
                  <button
                    onClick={() => handleLevelChange(-1)}
                    className={`text-left px-3 py-2 text-sm md:text-base font-medium rounded-lg transition-colors ${currentLevel === -1 ? 'bg-[#F43F5E] text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
                  >
                    Авто
                  </button>
                  {levels.map((level, i) => (
                    <button
                      key={i}
                      onClick={() => handleLevelChange(i)}
                      className={`text-left px-3 py-2 text-sm md:text-base font-medium rounded-lg transition-colors ${currentLevel === i ? 'bg-[#F43F5E] text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
                    >
                      {level.height}p
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={toggleFullscreen} className="text-white/80 hover:text-white transition-colors">
              {isFullscreen ? <Minimize className="w-5 h-5 md:w-6 md:h-6" /> : <Maximize className="w-5 h-5 md:w-6 md:h-6" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
