import { useState } from "react";
import "../Styles/App.css";

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
          <button className="playButton" onClick={handlePlay}>
            Song remind me of us
          </button>
        </div>
        {play && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              padding: "20px",
            }}
          >
            <iframe
              style={{ borderRadius: "12px" }}
              src="https://open.spotify.com/embed/track/1iF0JKo3hIKDDzXNtvyZOg"
              width="352"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </div>
  );
}
