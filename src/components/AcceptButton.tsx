import { useEffect, useState } from "react";
import "../Styles/App.css";

const INITIAL_POPUP = {
  visible: false,
  message: "",
  buttonText: "",
};

export default function AcceptButton() {
  const [noPosition, setNoPosition] = useState({ top: "50%", left: "50%" });
  const [isEscaping, setIsEscaping] = useState(false);
  const [noClickCount, setNoClickCount] = useState(0);
  const [popup, setPopup] = useState(INITIAL_POPUP);
  const [heartBlast, setHeartBlast] = useState(false);
  const openPopup = (message: string, buttonText: string) => {
    setPopup({
      visible: true,
      message,
      buttonText,
    });
  };

  useEffect(() => {
    if (heartBlast) {
      document.body.classList.add("heart-cursor");
    } else {
      document.body.classList.remove("heart-cursor");
    }

    return () => {
      document.body.classList.remove("heart-cursor");
    };
  }, [heartBlast]);

  const resetState = () => {
    setPopup(INITIAL_POPUP);
    setNoClickCount(0);
    setIsEscaping(false);
    setNoPosition({ top: "50%", left: "50%" });
  };

  const moveNoButton = () => {
    setIsEscaping(true);

    setNoClickCount((prev) => {
      const next = prev + 1;
      setHeartBlast(true);
      if (next > 10) {
        openPopup(
          "No way to escape heeheee. You have only two options: say Yes or stay with me 💘",
          "Okay"
        );
      }

      return next;
    });

    const x = Math.random() * 90;
    const y = Math.random() * 70;

    setNoPosition({
      top: `${y}%`,
      left: `${x}%`,
    });
  };

  const handleYes = () => {
    setHeartBlast(true);

    openPopup(
      "Thanks for accepting my love 💖 Now try clicking the No button 10 times 😏",
      "Click on No"
    );
    setNoClickCount(0);
  };

  return (
    <div className="acceptButtonContainer">
      {/* Curved Valentine Text */}
      <svg width="100%" className="responsive-svg" viewBox="0 0 600 160">
        <path
          id="invertedCurve"
          d="M 50 120 Q 300 20 550 120"
          fill="transparent"
        />
        <text
          fill="#b82f46"
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

      {/* Buttons */}
      <div className="buttonsRow">
        <button className="buttonContainer" onClick={handleYes}>
          Yes
        </button>

        <button
          className={`buttonContainer noButton ${isEscaping ? "escape" : ""}`}
          onMouseEnter={moveNoButton}
          onClick={moveNoButton}
          style={isEscaping || noClickCount ? noPosition : {}}
        >
          No
        </button>
      </div>

      {popup.visible && (
        <div className="popupOverlay">
          {[...Array(5)].map((_, i) => (
            <span key={`t-${i}`} className="blast-heart top" />
          ))}

          {/* Right */}
          {[...Array(5)].map((_, i) => (
            <span key={`r-${i}`} className="blast-heart right" />
          ))}

          {/* Bottom */}
          {[...Array(5)].map((_, i) => (
            <span key={`b-${i}`} className="blast-heart bottom" />
          ))}

          {/* Left */}
          {[...Array(5)].map((_, i) => (
            <span key={`l-${i}`} className="blast-heart left" />
          ))}
          <div className={`heart-blast ${heartBlast ? "blast" : ""}`}>
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="blast-heart" />
            ))}

            <div className="popup">
              <p className="reasonMessage">{popup.message}</p>
              <button
                className="buttonContainerPopup"
                onClick={() => {
                  resetState();
                  setHeartBlast(false);
                }}
              >
                {popup.buttonText}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
