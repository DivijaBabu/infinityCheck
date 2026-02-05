import { useState } from "react";
import "../App.css";

export default function AcceptButton() {
  const [noPos, setNoPos] = useState({ top: "50%", left: "50%" });
  const [noChange, setNoChange] = useState(false);
  const [count, setCount] = useState(0);
  const [showPopup, setShowPopup] = useState({ visible: false, message: "" });
  const moveNoButton = () => {
    setNoChange(true);
    setCount((prev) => {
      const next = prev + 1;
      if (next > 10 || count > 10) {
        setShowPopup({
          visible: true,
          message: "So Finally you are interested to say yes.",
        });
      }
      return next;
    });
    if (!noChange) {
      setNoPos({ top: "50%", left: "50%" });
    }

    const x = Math.random() * 90;
    const y = Math.random() * 70;
    setNoPos({ top: `${y}%`, left: `${x}%` });
  };

  const handleYes = () => {
    setShowPopup({
      visible: true,
      message:
        "Thanks for accepting my love and ending up with me for your entire life.",
    });
    setCount(0);
  };



  return (
    <div className="acceptButtonContainer">
      <svg width="100%" className="responsive-svg" viewBox="0 0 600 160">
        <path
          id="invertedCurve"
          d="M 50 120 Q 300 20 550 120"
          fill="transparent"
        />
        <text
          fill="var(--white)"
          fontSize="32"
          fontWeight="bold"
          fontFamily="Lora"
          fontStyle="italic"
        >
          <textPath href="#invertedCurve" startOffset="50%" textAnchor="middle">
            Will you be my Valentine?
          </textPath>
        </text>
      </svg>

      <div className="buttonsRow">
        <button className="buttonContainer" onClick={handleYes}>
          Yes
        </button>

        <button
          className={`buttonContainer noButton ${noChange ? "escape" : ""}`}
          onMouseEnter={moveNoButton}
          onClick={moveNoButton}
          style={noChange ? { top: noPos.top, left: noPos.left } : {}}
        >
          No
        </button>
      </div>

      {showPopup.visible && (
        <div className="popupOverlay">
          <div className="popup">
            <h2>Okay okay 😭</h2>
            <p>{showPopup.message}</p>
            <button
              className="buttonContainer"
              onClick={() => {
                setShowPopup({ visible: false, message: "" });
                setCount(0);
              }}
            >
              Fine 😌
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
