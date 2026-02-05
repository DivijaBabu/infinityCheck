import { useState } from "react";
import "../App.css";

export default function LoveNote() {
  const [play, setPlay] = useState(false);

  const handlePlay = () => {
    setPlay(true);
  };

  return (
    <div className="loveNoteContainer">
      <div>
        <h1 className="LoveNoteHeading">
          This song makes me feel you are always near me.
        </h1>
        <p className="LoveNotePara">
          Every note of this song feels like a gentle whisper from you, wrapping
          me in warmth and making me feel cherished. Its melody carries memories
          of your laughter, your touch, and the quiet moments we’ve shared.
          Whenever I hear it, my heart drifts to you, and I am reminded of how
          special you make me feel—like I’m the only person in the world that
          matters. This song isn’t just music; it’s a little love letter from my
          soul to yours.
        </p>
        <div className="playButtonConatiner">
          <button className="playButton" onClick={handlePlay}>This song dedicated to you</button>
        </div>
        {play && (
          <iframe
            src="https://open.spotify.com/embed/track/YOUR_TRACK_ID"
            width="300"
            height="80"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            // allowTransparency="true"
            title="Spotify Player"
          ></iframe>
        )}
      </div>
    </div>
  );
}
