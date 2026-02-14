import { useState, useRef, useEffect } from "react";
import "../Styles/ValentineQuiz.css";

const QUESTIONS = [
  {
    question: "When is our first Drink?",
    options: ["Moonraft", "Dhanush house", "You dont know"],
    correctIndex: 0,
  },
  {
    question: "What is the first gift you gave me?",
    options: ["Rose", "Chocolate", "plant"],
    correctIndex: 2,
  },
  {
    question: "What is our favorite place?",
    options: ["Sleeping on bed", "chatting on roads", "Night walk"],
    correctIndex: 1,
  },
  {
    question: "Where do we had our first kiss?",
    options: ["near Zoo", "Dhanush house", "you dont know"],
    correctIndex: 0,
  },
  {
    question: "Where do we spend time so much?",
    options: ["smoke shop Haahaa", "in bed Heehee", "roaming around Mmm,mm"],
    correctIndex: 1,
  },
];

export default function QuizTab() {
  const [participantName, setParticipantName] = useState("");
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const emailSentRef = useRef(false);

  useEffect(() => {
    if (showScore) {
      sendResultEmailWeb3(score);
      emailSentRef.current = true;
    }
  }, [showScore]);

  const sendResultEmailWeb3 = async (finalScore: number) => {
    const message =
      finalScore === QUESTIONS.length
        ? "Perfect match 💍"
        : "Still my favorite human 💖";

    const payload = {
      access_key: "0a06ebf3-24b9-4baa-820a-d5a110acc959",
      subject: "💘 Valentine Quiz Result",
      from_name: "Valentine Quiz",
      name: participantName,
      score: finalScore,
      total: QUESTIONS.length,
      message: `
Name: ${participantName}
Score: ${finalScore} / ${QUESTIONS.length}

${message}
    `,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        console.log("Result email sent 💌");
      } else {
        console.error("Web3Forms error:", data);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const handleClick = (index: number) => {
    if (selectedIndex !== null) return;

    setSelectedIndex(index);

    const isCorrect = index === QUESTIONS[currentQuestion].correctIndex;
    const updatedScore = isCorrect ? score + 1 : score;

    setTimeout(() => {
      setSelectedIndex(null);

      if (currentQuestion + 1 < QUESTIONS.length) {
        setScore(updatedScore);
        setCurrentQuestion((prev) => prev + 1);
      } else {
        setScore(updatedScore);
        setShowScore(true);
      }
    }, 1500);
  };

  const restartQuiz = () => {
    setParticipantName("");
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedIndex(null);
    setScore(0);
    setShowScore(false);
    emailSentRef.current = false;
  };

  if (!quizStarted) {
    return (
      <div className="quiz-container">
        <h1 className="quiz-title">💘How much you know about us💘</h1>

        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter your name 💖"
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
            className="name-input"
          />

          <button
            className={participantName ? "enable-button" : "start-btn"}
            disabled={!participantName.trim()}
            onClick={() => setQuizStarted(true)}
          >
            Start Quiz 💌
          </button>
        </div>
      </div>
    );
  }

  if (showScore) {
    return (
      <div className="quiz-container">
        <h1 className="quiz-title">💖Quiz Completed💖</h1>

        <h2 className="score-text">
          {participantName}, you scored {score} / {QUESTIONS.length}
        </h2>

        <button className="restart-btn" onClick={restartQuiz}>
          Play Again 💘
        </button>

        <form style={{ display: "none" }}>
          <input type="text" name="name" value={participantName} readOnly />
          <input type="text" name="score" value={score} readOnly />
          <input type="text" name="total" value={QUESTIONS.length} readOnly />
          <textarea
            name="message"
            value={
              score === QUESTIONS.length
                ? "Perfect match 💍"
                : "Still my favorite human 💖"
            }
            readOnly
          />
        </form>
      </div>
    );
  }

  const question = QUESTIONS[currentQuestion];

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">💘 Valentine Quiz 💘</h1>

      <h2 className="question">{question.question}</h2>

      <div className="options">
        {question.options.map((option, index) => {
          const isSelected = selectedIndex === index;
          const isCorrect = index === question.correctIndex;

          let className = "option";
          if (isSelected) {
            className += isCorrect ? " correct" : " wrong";
          }

          return (
            <button
              key={index}
              className={className}
              onClick={() => handleClick(index)}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
