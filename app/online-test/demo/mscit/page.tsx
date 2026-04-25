"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Question = {
  question: string;
  options: string[];
  answer: string;
};

type QuestionStatus = "pending" | "current" | "solved" | "timeover";

type SubmittedAnswer = {
  question: string;
  selected: string;
  correct: string;
  marks: number;
  status: "answered" | "timeover";
} | null;

const questions: Question[] = [
  {
    question: "MS-CIT चा full form काय आहे?",
    options: [
      "Maharashtra State Certificate in Information Technology",
      "Microsoft State Course in Internet Training",
      "Modern Software Certificate in IT",
      "Maharashtra School Computer Internet Test",
    ],
    answer: "Maharashtra State Certificate in Information Technology",
  },
  {
    question: "Computer मध्ये data process करणारा मुख्य भाग कोणता?",
    options: ["Monitor", "Keyboard", "CPU", "Mouse"],
    answer: "CPU",
  },
  {
    question: "MS Word कशासाठी वापरले जाते?",
    options: [
      "Presentation तयार करण्यासाठी",
      "Document तयार करण्यासाठी",
      "Calculation करण्यासाठी",
      "Internet browsing साठी",
    ],
    answer: "Document तयार करण्यासाठी",
  },
  {
    question: "MS Excel मध्ये calculation करण्यासाठी काय वापरले जाते?",
    options: ["Slide", "Formula", "Paragraph", "Animation"],
    answer: "Formula",
  },
  {
    question: "PowerPoint मध्ये प्रत्येक पानाला काय म्हणतात?",
    options: ["Sheet", "Slide", "Page Setup", "Cell"],
    answer: "Slide",
  },
  {
    question: "Internet वापरण्यासाठी खालीलपैकी कोणते software वापरतात?",
    options: ["MS Paint", "Browser", "Notepad", "Calculator"],
    answer: "Browser",
  },
  {
    question: "Email पाठवण्यासाठी खालीलपैकी काय आवश्यक असते?",
    options: ["Email ID", "Printer", "Scanner", "Speaker"],
    answer: "Email ID",
  },
  {
    question: "Keyboard वरील Enter key चा उपयोग कशासाठी होतो?",
    options: [
      "Text delete करण्यासाठी",
      "Command confirm करण्यासाठी",
      "Mouse pointer move करण्यासाठी",
      "Screen बंद करण्यासाठी",
    ],
    answer: "Command confirm करण्यासाठी",
  },
  {
    question: "Computer मध्ये file save करण्यासाठी shortcut key कोणती?",
    options: ["Ctrl + S", "Ctrl + P", "Ctrl + C", "Ctrl + V"],
    answer: "Ctrl + S",
  },
  {
    question: "Online सुरक्षिततेसाठी password कसा असावा?",
    options: [
      "फक्त नाव ठेवावा",
      "सगळीकडे same password ठेवावा",
      "Strong आणि unique password ठेवावा",
      "Password सर्वांना सांगावा",
    ],
    answer: "Strong आणि unique password ठेवावा",
  },
];

export default function DemoTestPage() {
  const [studentName, setStudentName] = useState("Student");
  const [examStarted, setExamStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isFinished, setIsFinished] = useState(false);
  const [warning, setWarning] = useState("");

  const [questionStatuses, setQuestionStatuses] = useState<QuestionStatus[]>(
    questions.map((_, i) => (i === 0 ? "current" : "pending"))
  );

  const [submittedAnswers, setSubmittedAnswers] = useState<SubmittedAnswer[]>(
    questions.map(() => null)
  );

  const currentQuestion = questions[currentIndex];
  const studentInitial = studentName?.trim()?.charAt(0)?.toUpperCase() || "S";

  useEffect(() => {
    const savedName = localStorage.getItem("studentFullName");
    if (savedName) setStudentName(savedName);
  }, []);

  useEffect(() => {
    if (!examStarted || isFinished) return;

    if (timeLeft === 0) {
      handleNext(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, isFinished, examStarted]);

  const handleOptionSelect = (option: string) => {
    setSelectedAnswer(option);
    setWarning("");
  };

  const handleNext = (timeOver = false) => {
    if (!timeOver && selectedAnswer === "") {
      setWarning(
        "कृपया answer select करा. Answer select केल्यावरच Next Question सुरू होईल."
      );
      return;
    }

    const selected = timeOver ? "Time Over" : selectedAnswer;
    const isCorrect = !timeOver && selectedAnswer === currentQuestion.answer;
    const marks = isCorrect ? 1 : 0;

    if (isCorrect) setScore((prev) => prev + 1);

    const updatedAnswers = [...submittedAnswers];
    updatedAnswers[currentIndex] = {
      question: currentQuestion.question,
      selected,
      correct: currentQuestion.answer,
      marks,
      status: timeOver ? "timeover" : "answered",
    };
    setSubmittedAnswers(updatedAnswers);

    const updatedStatuses = [...questionStatuses];
    updatedStatuses[currentIndex] = timeOver ? "timeover" : "solved";

    if (currentIndex + 1 < questions.length) {
      updatedStatuses[currentIndex + 1] = "current";
      setQuestionStatuses(updatedStatuses);
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer("");
      setWarning("");
      setTimeLeft(30);
    } else {
      setQuestionStatuses(updatedStatuses);
      setIsFinished(true);
    }
  };

  const restartTest = () => {
    setExamStarted(false);
    setCurrentIndex(0);
    setSelectedAnswer("");
    setScore(0);
    setTimeLeft(30);
    setIsFinished(false);
    setWarning("");
    setQuestionStatuses(questions.map((_, i) => (i === 0 ? "current" : "pending")));
    setSubmittedAnswers(questions.map(() => null));
  };

  const solvedCount = submittedAnswers.filter((item) => item !== null).length;
  const attemptedCount = submittedAnswers.filter(
    (item) => item && item.status === "answered"
  ).length;
  const remainingCount = questions.length - solvedCount;

  if (!examStarted && !isFinished) {
    return (
      <main className="examPage">
        <section className="startCard">
          <div className="startBadge">DEMO TEST</div>
          <h1>Online Demo Exam</h1>
          <p className="studentLine">Student: {studentName}</p>

          <div className="rulesGrid">
            <div>
              <b>10</b>
              <span>Total Questions</span>
            </div>
            <div>
              <b>30s</b>
              <span>Each Question</span>
            </div>
            <div>
              <b>0</b>
              <span>Time Over Marks</span>
            </div>
          </div>

          <p className="rulesText">
            Start Exam वर click केल्यानंतर timer सुरू होईल. Answer select
            केल्यावरच Next Question सुरू होईल. 30 seconds मध्ये answer दिला
            नाही तर question automatically next होईल आणि 0 marks मिळतील.
          </p>

          <button onClick={() => setExamStarted(true)} className="startExamBtn">
            Start Exam
          </button>

          <Link href="/online-test" className="backLink">
            Back to Online Test
          </Link>
        </section>

        <style jsx>{styles}</style>
      </main>
    );
  }

  if (isFinished) {
    return (
      <main className="examPage">
        <section className="resultWrapper">
          <div className="resultTop">
            <span className="badge">DEMO TEST RESULT</span>
            <h1>Demo Test Result</h1>
            <p>Student Name: {studentName}</p>
          </div>

          <div className="resultStats">
            <div className="statBox">
              <h2>{score}</h2>
              <p>Correct Marks</p>
            </div>
            <div className="statBox">
              <h2>{questions.length}</h2>
              <p>Total Questions</p>
            </div>
            <div className="statBox">
              <h2>{attemptedCount}</h2>
              <p>Attempted</p>
            </div>
            <div className="statBox">
              <h2>{questions.length - score}</h2>
              <p>Wrong / Zero</p>
            </div>
          </div>

          <p className="finalMessage">
            {score >= 8
              ? "Excellent! तुमची तयारी खूप चांगली आहे."
              : score >= 5
              ? "Good! अजून थोडी practice केल्यास अजून चांगला score येईल."
              : "Practice आवश्यक आहे. पुन्हा test solve करा."}
          </p>

          <div className="resultButtons">
            <button onClick={restartTest}>Retake Test</button>
            <Link href="/online-test">Back to Online Test</Link>
          </div>

          <div className="reviewSection">
            <h3>Question Review</h3>

            {submittedAnswers.map((item, index) => {
              if (!item) return null;

              return (
                <div className="reviewCard" key={index}>
                  <h4>
                    Q{index + 1}. {item.question}
                  </h4>

                  <p>
                    <b>Your Answer:</b> {item.selected}
                  </p>

                  <p className="correctAnswer">
                    <b>Correct Option:</b> {item.correct}
                  </p>

                  <span className={item.marks === 1 ? "markRight" : "markWrong"}>
                    Marks: {item.marks}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        <style jsx>{styles}</style>
      </main>
    );
  }

  return (
    <main className="examPage">
      <section className="examLayout">
        <section className="mainExam">
          <div className="examTopBar">
            <div className="studentHorizontal">
              <div className="photoMini">
                <span>{studentInitial}</span>
              </div>

              <div className="studentMiniText">
                <small>Student Name</small>
                <strong>{studentName}</strong>
              </div>
            </div>

            <div className="questionCount">
              Question {currentIndex + 1} / {questions.length}
            </div>

            <div className={timeLeft <= 10 ? "timerCircle danger" : "timerCircle"}>
              <small>Time</small>
              <strong>{timeLeft}s</strong>
            </div>
          </div>

          <div className="progressWrap">
            <div
              className="progressBar"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            ></div>
          </div>

          <div className="questionCard">
            <h2>{currentQuestion.question}</h2>

            <div className="optionsWrap">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  className={selectedAnswer === option ? "option selected" : "option"}
                >
                  <span className="optionIndex">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>
                </button>
              ))}
            </div>
          </div>

          {warning && <div className="warningBox">{warning}</div>}

          <div className="bottomBar">
            <p>Answer select केल्यावरच Next होईल. Time over झाल्यास 0 marks मिळतील.</p>

            <button onClick={() => handleNext(false)} className="nextBtn">
              {currentIndex + 1 === questions.length ? "Submit Test" : "Next Question"}
            </button>
          </div>
        </section>

        <aside className="rightPanel">
          <div className="panelCard">
            <h2>Question Panel</h2>

            <div className="summaryMini">
              <div>
                <b>{questions.length}</b>
                <span>Total</span>
              </div>
              <div>
                <b>{solvedCount}</b>
                <span>Solved</span>
              </div>
              <div>
                <b>{attemptedCount}</b>
                <span>Attempted</span>
              </div>
              <div>
                <b>{remainingCount}</b>
                <span>Remaining</span>
              </div>
            </div>

            <div className="questionPalette">
              {questionStatuses.map((status, index) => (
                <div key={index} className={`qNumber ${status}`}>
                  {index + 1}
                </div>
              ))}
            </div>

            <div className="legend">
              <div>
                <span className="dot solvedDot"></span> Solved
              </div>
              <div>
                <span className="dot currentDot"></span> Current
              </div>
              <div>
                <span className="dot pendingDot"></span> Pending
              </div>
              <div>
                <span className="dot timeDot"></span> Time Over
              </div>
            </div>
          </div>
        </aside>
      </section>

      <style jsx>{styles}</style>
    </main>
  );
}

const styles = `
  .examPage {
    min-height: calc(100vh - 95px);
    padding: 8px 10px 12px;
    background: linear-gradient(135deg, #eef6ff, #fff7ed);
    font-family: Arial, sans-serif;
  }

  .startCard {
    max-width: 660px;
    margin: 14px auto;
    background: #ffffff;
    border-radius: 20px;
    padding: 22px;
    text-align: center;
    box-shadow: 0 12px 28px rgba(15, 23, 42, 0.12);
    border: 1px solid #e2e8f0;
  }

  .startBadge,
  .badge {
    display: inline-block;
    background: #dbeafe;
    color: #1d4ed8;
    padding: 7px 13px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 900;
    margin-bottom: 8px;
  }

  .startCard h1 {
    margin: 2px 0 6px;
    font-size: 30px;
    color: #0f172a;
  }

  .studentLine {
    margin: 0 0 14px;
    color: #475569;
    font-weight: 800;
  }

  .rulesGrid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin: 14px 0;
  }

  .rulesGrid div {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 15px;
    padding: 12px;
  }

  .rulesGrid b {
    display: block;
    font-size: 26px;
    color: #1d4ed8;
  }

  .rulesGrid span {
    display: block;
    margin-top: 3px;
    color: #475569;
    font-size: 13px;
    font-weight: 800;
  }

  .rulesText {
    color: #475569;
    line-height: 1.5;
    font-weight: 700;
    margin: 8px 0 16px;
  }

  .startExamBtn {
    border: none;
    background: linear-gradient(135deg, #16a34a, #15803d);
    color: white;
    padding: 13px 32px;
    border-radius: 18px 18px 18px 4px;
    font-size: 18px;
    font-weight: 950;
    cursor: pointer;
    box-shadow: 0 12px 26px rgba(22, 163, 74, 0.25);
    animation: startBlink 1s infinite;
  }

  .backLink {
    display: block;
    margin-top: 13px;
    color: #1d4ed8;
    font-weight: 900;
    text-decoration: none;
  }

  .examLayout {
    max-width: 1220px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: minmax(0, 1fr) 270px;
    gap: 10px;
    align-items: start;
  }

  .mainExam,
  .panelCard,
  .resultWrapper {
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
    border: 1px solid #e2e8f0;
  }

  .mainExam {
    padding: 12px;
  }

  .rightPanel {
    position: sticky;
    top: 8px;
  }

  .examTopBar {
    display: grid;
    grid-template-columns: minmax(180px, 1fr) auto auto;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }

  .studentHorizontal {
    display: flex;
    align-items: center;
    gap: 10px;
    background: linear-gradient(135deg, #eff6ff, #ffffff);
    border: 1px solid #bfdbfe;
    border-radius: 18px;
    padding: 8px 12px;
    min-width: 0;
  }

  .photoMini {
    width: 54px;
    height: 54px;
    border-radius: 50%;
    background: linear-gradient(135deg, #2563eb, #f97316);
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 23px;
    font-weight: 950;
    border: 3px solid #ffffff;
    box-shadow:
      0 7px 16px rgba(37, 99, 235, 0.22),
      0 0 0 4px #dbeafe;
    flex-shrink: 0;
  }

  .studentMiniText {
    min-width: 0;
  }

  .studentMiniText small {
    display: block;
    color: #1d4ed8;
    font-size: 11px;
    font-weight: 950;
    margin-bottom: 2px;
  }

  .studentMiniText strong {
    display: block;
    color: #0f172a;
    font-size: 19px;
    font-weight: 950;
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .questionCount {
    background: #eff6ff;
    color: #1d4ed8;
    font-weight: 900;
    padding: 10px 14px;
    border-radius: 999px;
    white-space: nowrap;
    font-size: 14px;
  }

  .timerCircle {
    width: 68px;
    height: 68px;
    border-radius: 50%;
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .timerCircle small {
    font-size: 10px;
    font-weight: 800;
  }

  .timerCircle strong {
    font-size: 22px;
  }

  .timerCircle.danger {
    background: linear-gradient(135deg, #ef4444, #dc2626);
    animation: blinkTimer 0.8s infinite;
  }

  .progressWrap {
    height: 7px;
    background: #e2e8f0;
    border-radius: 999px;
    overflow: hidden;
    margin-bottom: 9px;
  }

  .progressBar {
    height: 100%;
    background: linear-gradient(135deg, #2563eb, #16a34a);
    border-radius: 999px;
  }

  .questionCard {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    padding: 10px;
  }

  .questionCard h2 {
    margin: 0 0 9px;
    color: #0f172a;
    font-size: 27px;
    line-height: 1.3;
  }

  .optionsWrap {
    display: grid;
    gap: 6px;
  }

  .option {
    width: 100%;
    border: 1px solid #cbd5e1;
    background: white;
    color: #0f172a;
    padding: 9px 12px;
    border-radius: 12px;
    cursor: pointer;
    text-align: left;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 18px;
    font-weight: 850;
    transition: 0.2s ease;
  }

  .option:hover {
    border-color: #2563eb;
  }

  .option.selected {
    background: #dbeafe;
    border-color: #2563eb;
    color: #1e3a8a;
  }

  .optionIndex {
    width: 31px;
    height: 31px;
    border-radius: 50%;
    background: #eff6ff;
    color: #1d4ed8;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 950;
    flex-shrink: 0;
  }

  .option.selected .optionIndex {
    background: #2563eb;
    color: #ffffff;
  }

  .warningBox {
    margin-top: 7px;
    background: #fff7ed;
    color: #c2410c;
    border: 1px solid #fed7aa;
    padding: 8px 11px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 900;
  }

  .bottomBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    margin-top: 6px;
  }

  .bottomBar p {
    margin: 0;
    color: #64748b;
    font-size: 13px;
    font-weight: 800;
  }

  .nextBtn {
    border: none;
    background: linear-gradient(135deg, #16a34a, #15803d);
    color: white;
    padding: 10px 18px;
    border-radius: 14px;
    font-size: 15px;
    font-weight: 950;
    cursor: pointer;
    white-space: nowrap;
  }

  .panelCard {
    padding: 14px;
    background:
      linear-gradient(#ffffff, #ffffff) padding-box,
      linear-gradient(135deg, #2563eb, #16a34a, #f97316) border-box;
    border: 2px solid transparent;
    position: relative;
    overflow: hidden;
  }

  .panelCard::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at top left, rgba(37, 99, 235, 0.08), transparent 35%),
      radial-gradient(circle at bottom right, rgba(249, 115, 22, 0.08), transparent 35%);
    pointer-events: none;
  }

  .panelCard h2 {
    position: relative;
    z-index: 1;
    width: fit-content;
    margin: 0 auto 12px;
    font-size: 20px;
    color: #ffffff;
    text-align: center;
    background: linear-gradient(135deg, #0f172a, #1d4ed8);
    padding: 9px 18px;
    border-radius: 18px 18px 18px 4px;
    box-shadow: 0 10px 20px rgba(37, 99, 235, 0.18);
  }

  .summaryMini {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-bottom: 12px;
  }

  .summaryMini div {
    border: 1px solid #dbeafe;
    border-radius: 14px;
    padding: 10px 6px;
    text-align: center;
    box-shadow: 0 8px 18px rgba(15, 23, 42, 0.05);
  }

  .summaryMini div:nth-child(1) { background: #eff6ff; }
  .summaryMini div:nth-child(2) { background: #f0fdf4; }
  .summaryMini div:nth-child(3) { background: #fff7ed; }
  .summaryMini div:nth-child(4) { background: #f8fafc; }

  .summaryMini b {
    display: block;
    font-size: 22px;
    color: #1d4ed8;
    font-weight: 950;
  }

  .summaryMini span {
    display: block;
    font-size: 10px;
    font-weight: 900;
    color: #475569;
  }

  .questionPalette {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 7px;
    margin-bottom: 12px;
    background: #f8fafc;
    padding: 10px;
    border-radius: 16px;
    border: 1px solid #e2e8f0;
  }

  .qNumber {
    height: 36px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 950;
    font-size: 13px;
    border: 1px solid transparent;
    box-shadow: 0 5px 10px rgba(15, 23, 42, 0.05);
  }

  .qNumber.pending {
    background: linear-gradient(135deg, #ffffff, #f1f5f9);
    color: #334155;
    border-color: #cbd5e1;
  }

  .qNumber.current {
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    color: #ffffff;
    border-color: #93c5fd;
    animation: pulseCurrent 1s infinite;
    box-shadow: 0 8px 18px rgba(37, 99, 235, 0.25);
  }

  .qNumber.solved {
    background: linear-gradient(135deg, #22c55e, #16a34a);
    color: #ffffff;
    border-color: #86efac;
    box-shadow: 0 8px 18px rgba(22, 163, 74, 0.18);
  }

  .qNumber.timeover {
    background: linear-gradient(135deg, #ef4444, #dc2626);
    color: #ffffff;
    border-color: #fecaca;
    box-shadow: 0 8px 18px rgba(239, 68, 68, 0.18);
  }

  .legend {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    font-size: 13px;
    color: #334155;
    font-weight: 950;
    background: #f8fafc;
    padding: 10px;
    border-radius: 14px;
    border: 1px dashed #cbd5e1;
  }

  .legend div {
    display: flex;
    align-items: center;
    gap: 7px;
    background: #ffffff;
    padding: 8px 7px;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 5px 12px rgba(15, 23, 42, 0.05);
  }

  .dot {
    width: 13px;
    height: 13px;
    border-radius: 50%;
    display: inline-block;
    flex-shrink: 0;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.9);
  }

  .solvedDot { background: #22c55e; }
  .currentDot { background: #3b82f6; }
  .pendingDot { background: #94a3b8; }
  .timeDot { background: #ef4444; }

  .resultWrapper {
    max-width: 900px;
    margin: 12px auto;
    padding: 22px;
  }

  .resultTop h1 {
    margin: 5px 0;
    font-size: 30px;
    color: #0f172a;
  }

  .resultTop p {
    margin: 0;
    color: #475569;
    font-weight: 800;
  }

  .resultStats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin: 16px 0;
  }

  .statBox {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 15px;
    padding: 14px;
    text-align: center;
  }

  .statBox h2 {
    margin: 0;
    font-size: 30px;
    color: #1d4ed8;
  }

  .statBox p {
    margin: 5px 0 0;
    color: #475569;
    font-weight: 850;
  }

  .finalMessage {
    font-size: 16px;
    font-weight: 850;
    color: #334155;
  }

  .resultButtons {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .resultButtons button,
  .resultButtons a {
    border: none;
    text-decoration: none;
    background: #0f172a;
    color: white;
    padding: 12px 16px;
    border-radius: 13px;
    font-size: 15px;
    font-weight: 900;
    cursor: pointer;
  }

  .resultButtons a {
    background: #16a34a;
  }

  .reviewSection {
    margin-top: 22px;
  }

  .reviewSection h3 {
    margin: 0 0 14px;
    color: #0f172a;
    font-size: 24px;
    font-weight: 950;
  }

  .reviewCard {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 15px;
    padding: 14px;
    margin-bottom: 12px;
  }

  .reviewCard h4 {
    margin: 0 0 8px;
    color: #0f172a;
    font-size: 16px;
    line-height: 1.45;
  }

  .reviewCard p {
    margin: 5px 0;
    color: #475569;
    font-size: 14px;
    line-height: 1.5;
  }

  .correctAnswer {
    color: #166534 !important;
    background: #dcfce7;
    padding: 8px 10px;
    border-radius: 10px;
    font-weight: 850;
  }

  .markRight {
    display: inline-block;
    margin-top: 8px;
    background: #16a34a;
    color: white;
    padding: 6px 10px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 950;
  }

  .markWrong {
    display: inline-block;
    margin-top: 8px;
    background: #dc2626;
    color: white;
    padding: 6px 10px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 950;
  }

  @keyframes blinkTimer {
    0% { transform: scale(1); }
    50% { transform: scale(1.06); }
    100% { transform: scale(1); }
  }

  @keyframes pulseCurrent {
    0% { transform: scale(1); }
    50% { transform: scale(1.06); }
    100% { transform: scale(1); }
  }

  @keyframes startBlink {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.05); opacity: 0.78; }
    100% { transform: scale(1); opacity: 1; }
  }

  @media (max-width: 991px) {
    .examLayout {
      grid-template-columns: 1fr;
    }

    .rightPanel {
      position: relative;
      top: auto;
    }

    .resultStats {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 640px) {
    .examPage {
      padding: 8px;
    }

    .examTopBar {
      grid-template-columns: 1fr auto;
    }

    .studentHorizontal {
      grid-column: 1 / -1;
      padding: 7px 10px;
    }

    .photoMini {
      width: 48px;
      height: 48px;
      font-size: 20px;
    }

    .studentMiniText strong {
      font-size: 17px;
    }

    .questionCount {
      padding: 8px 12px;
      font-size: 13px;
    }

    .timerCircle {
      width: 62px;
      height: 62px;
    }

    .timerCircle strong {
      font-size: 20px;
    }

    .questionCard h2 {
      font-size: 21px;
      margin-bottom: 8px;
    }

    .option {
      font-size: 16px;
      padding: 9px;
    }

    .optionIndex {
      width: 29px;
      height: 29px;
    }

    .bottomBar {
      flex-direction: column;
      align-items: stretch;
      margin-top: 6px;
    }

    .bottomBar p {
      font-size: 12px;
    }

    .nextBtn {
      width: 100%;
    }

    .rulesGrid {
      grid-template-columns: 1fr;
    }

    .summaryMini {
      grid-template-columns: repeat(4, 1fr);
    }

    .summaryMini b {
      font-size: 18px;
    }

    .summaryMini span {
      font-size: 9px;
    }

    .questionPalette {
      grid-template-columns: repeat(10, 1fr);
      gap: 6px;
      padding: 8px;
    }

    .qNumber {
      height: 32px;
      font-size: 12px;
    }

    .legend {
      grid-template-columns: 1fr 1fr;
      font-size: 12px;
    }
  }
`;