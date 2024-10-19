import React from 'react';
import PlayerCard from './components/PlayerCard';

function App() {
  return (
    <div className="App">
      <PlayerCard audioSrc="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" audioName='Space song'></PlayerCard>
    </div>
  );
}

export default App;
