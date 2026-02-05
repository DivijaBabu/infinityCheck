import "../App.css";
export default function Reason() {
  const reasons = [
    {
      title: "Dramatic",
      message:
        "Loved you because you always chooses me, even on ordinary days when nothing dramatic is happening. Being by your presence feels like home, no stress inside my head, it is like watching a fireworks very warm and peace to rest in.",
    },
    {
      title: "Care taker",
      message:
        "You always listens to me not for a shake, not just for to reply, but to understand what I mean beneath the words.You always remembers the small things: how I take your tea, what scares me, what makes me laugh when I'm tired.",
    },
    {
      title: "Happiness",
      message:
        "You always respects my dreams and doesn’t feel threatened by your growth. You always tries to get with me even when you're imperfect — and takes responsibility when you hurts me.",
    },
    {
      title: "My Safe Place",
      message:
        "You always makes love feel safe, not confusing, not anxious, not like something you have to earn. Because when the world is heavy, you always been there to console me and make the discomport disappear.",
    },
  ];
  return (
    <div className="reasonsContainer">
      <div>
        <h2 className="reasonsHeading">Reasons to Love you</h2>
      </div>
      <div className="content">
        {reasons.map((item, index) => (
          <div
            key={index}
            className={`heart ${index % 2 === 0 ? "left" : "right"}`}
          >
            <div className="title">
              <h2 className="reasonTitle">{item.title}</h2>
            </div>
            <div className="messageWrapper">
              <h2 className="reasonMessage">{item.message}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
