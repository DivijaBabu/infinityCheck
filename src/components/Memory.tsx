import "../Styles/App.css";

import { useEffect, useState } from "react";
import FirstOut from "../assets/FirstOut.jpg"
import FirstTrip from "../assets/FirstTrip.jpg"
import FirstDay from "../assets/firstDay.jpg"
type TeamMember = {
  name: string;
  memory: string;
  image: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "_____Our First Out_____",
    memory:
      "Our first outing to the zoo felt like the world quietly leaning in to watch us fall into an easy kind of magic. We wandered from enclosure to enclosure with no rush, laughing at the silly moments, pointing out tiny details, and stealing glances at each other when we thought the other wasn’t looking. The animals were beautiful, but somehow everything felt brighter just because we were side by side—our conversations flowing as naturally as our steps. Between shared smiles, playful teasing, and those soft pauses where words weren’t needed, time slipped away unnoticed. By the end of the day, it wasn’t the zoo I wanted to remember most—it was the warmth of being with you, the feeling that this was the beginning of something gentle, exciting, and quietly unforgettable.",

    image:FirstOut
  },
  {
    name: "_____Our First Trip_____",
    memory:
      "Our first trip to Goa felt like stepping into a dream we didn’t want to wake up from. The air was warm, the sea endless, and somehow every moment felt lighter just because we were together. We walked barefoot along the beach, letting the waves kiss our feet, laughing as the sun dipped into the horizon and painted the sky just for us. Days blurred into each other with shared coffees, salty breezes, spontaneous plans, and long conversations that felt deeper under the stars. Nights were soft and slow, filled with music, moonlight, and the comfort of being wrapped in each other’s presence. Goa gave us beautiful views, but the real magic was us—discovering how perfectly our hearts traveled together, turning a simple trip into a memory we’d carry forever.",
    image:FirstTrip
  },
  {
    name: "_____Our First Day together_____",
    memory:
      "Our first day in our home felt quiet and sacred, like the world had finally given us a space that belonged only to us. The rooms were still learning our footsteps, the walls holding onto our laughter as we unpacked little pieces of our lives and placed them side by side. We moved slowly, unhurried, savoring the simple joy of being there together—every glance carrying comfort, every touch feeling like a promise. As night settled in, the house grew softer, warmer. We lay down together, wrapped in the calm of knowing we were exactly where we were meant to be. Sharing that first sleep felt intimate in the purest way—breathing in sync, hearts close, the quiet broken only by the reassurance of each other’s presence. It wasn’t just a night spent together; it was the beginning of countless mornings, shared dreams, and a life built gently, lovingly, as one.",
    image:FirstDay
  },
];

export default function Memory() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const updateCarousel = (newIndex: number) => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentIndex((newIndex + teamMembers.length) % teamMembers.length);

    setTimeout(() => setIsAnimating(false), 800);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") updateCarousel(currentIndex - 1);
      if (e.key === "ArrowDown") updateCarousel(currentIndex + 1);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentIndex]);

  const getCardClass = (index: number) => {
    const offset =
      (index - currentIndex + teamMembers.length) % teamMembers.length;

    if (offset === 0) return "card center";
    if (offset === 1) return "card down-1";
    if (offset === teamMembers.length - 1) return "card up-1";
    return "card hidden";
  };

  return (
    <>
      <div className="memoryContainer">
        <div>
          <h1 className="timeLineHeading">Our Memories Together</h1>
        </div>
        <div className="main-container">
          <div className="carousel-section">
            <button
              className="nav-arrow"
              onClick={() => updateCarousel(currentIndex - 1)}
            >
              <span className="chevron left"></span>
            </button>
            <div className="carousel-track">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className={getCardClass(index)}
                  onClick={() => updateCarousel(index)}
                >
                  <img src={member.image} alt={member.name} />
                </div>
              ))}
            </div>
            <button
              className="nav-arrow"
              onClick={() => updateCarousel(currentIndex + 1)}
            >
              <span className="chevron right"></span>
            </button>
          </div>

          <div className="member-info">
            <h2 className="member-name">{teamMembers[currentIndex].name}</h2>
            <p className="member-role">{teamMembers[currentIndex].memory}</p>
          </div>
        </div>
        <div className="dots">
          {teamMembers.map((_, i) => (
            <div
              key={i}
              className={`dot ${i === currentIndex ? "active" : ""}`}
              onClick={() => updateCarousel(i)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
