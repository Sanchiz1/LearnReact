import React from 'react';
import useAudio from '../hooks/useAudio';
import '../styles/PlayerCard.css';

interface PlayerCardProps {
  audioSrc: string;
  audioName: string;
}

function PlayerCard({ audioSrc, audioName }: PlayerCardProps) {
  const {
    isPlaying,
    togglePlayPause,
    volume,
    changeVolume,
    progress,
    duration,
    seek,
  } = useAudio(audioSrc);

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    seek(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    changeVolume(newVolume);
  };

  return (
    <div className="player-card">
      <h2 className="player-title">{audioName}</h2>
      <div className="controls">
        <button className="play-pause-btn" onClick={togglePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <div className="progress-container">
          <input
            type="range"
            className="progress-bar"
            min="0"
            max={duration}
            value={progress}
            onChange={handleSeekChange}
          />
          <span className="progress-time">
            {Math.floor(progress)} / {Math.floor(duration)}
          </span>
        </div>
        <div className="volume-control">
          <input
            type="range"
            className="volume-bar"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
          <span className="volume-level">{Math.round(volume * 100)}%</span>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;