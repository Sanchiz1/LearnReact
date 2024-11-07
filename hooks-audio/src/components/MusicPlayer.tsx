import useAudio from '../hooks/useAudio';
import '../styles/MusicPlayer.css'

const MusicPlayer = ({ src }: { src: string }) => {
    const [state, controls] = useAudio(src, { volume: 0.5 });

    return (
        <div className="music-player">
            <h2>Music Player</h2>

            <div className="controls">
                <button className="styled-button" onClick={state.isPlaying ? controls.pause : controls.play}>
                    {state.isPlaying ? 'Pause' : 'Play'}
                </button>
            </div>

            <div className="controls">
                <button className="styled-button" onClick={controls.mute} disabled={state.muted}>Mute</button>
                <button className="styled-button" onClick={controls.unmute} disabled={!state.muted}>Unmute</button>
            </div>

            <div className="controls">
                <label>
                    Volume:
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={state.volume}
                        onChange={(e) => controls.setVolume(parseFloat(e.target.value))}
                    />
                </label>
            </div>

            <div className="controls">
                <label>
                    Seek:
                    <input
                        type="range"
                        min="0"
                        max={state.duration}
                        value={state.currentTime}
                        onChange={(e) => controls.seek(parseFloat(e.target.value))}
                    />
                </label>
                <span>
                    {Math.floor(state.currentTime)} / {Math.floor(state.duration)}
                </span>
            </div>
        </div>
    );
};

export default MusicPlayer;
