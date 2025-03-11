'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';

export default function CEOAddress() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  }, [videoRef.current?.onloadedmetadata]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      setIsMuted(false);
    }
  }, []);

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

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current && videoRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * videoRef.current.duration;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <section className="py-16 bg-black h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Message from Our CEO</h2>
        <div className="max-w-4xl mx-auto relative bg-black rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            className="w-full cursor-pointer"
            onTimeUpdate={handleTimeUpdate}
            onClick={togglePlay}
            onLoadedMetadata={() => {
              if (videoRef.current) {
                setDuration(videoRef.current.duration);
              }
            }}
            playsInline
            muted={false}
          >
            <source src="/ceo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Custom Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
            {/* Progress Bar */}
            <div
              ref={progressBarRef}
              className="w-full h-1 bg-gray-600 cursor-pointer mb-4"
              onClick={handleProgressBarClick}
            >
              <div
                className="h-full bg-green-600"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  className="text-white hover:text-green-500 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                </button>

                <button
                  onClick={toggleMute}
                  className="text-white hover:text-green-500 transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-6 h-6" />
                  ) : (
                    <Volume2 className="w-6 h-6" />
                  )}
                </button>

                <span className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <button
                onClick={handleFullscreen}
                className="text-white hover:text-green-500 transition-colors"
              >
                <Maximize2 className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
