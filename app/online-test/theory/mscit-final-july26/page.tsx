"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type OptionItem = { label: string; value: string };
type QuestionItem = {
  srNo: number;
  question: string;
  options: OptionItem[];
  correct: string;
  level?: 1 | 2 | 3;
  levelQuestionNo?: number;
};

type ExamStatus = "running" | "finished";

const LEVEL_1_COUNT = 6;
const LEVEL_2_COUNT = 6;
const LEVEL_3_COUNT = 3;
const TOTAL_QUESTIONS = LEVEL_1_COUNT + LEVEL_2_COUNT + LEVEL_3_COUNT;
const EXAM_SECONDS = 10 * 60;

// Image files इथे ठेवा: public/online-test/mscitexam/
const IMAGE_BASE_PATH = "/online-test/mscitexam/";

// MSCIT Final Exam July 26

const allQuestions: QuestionItem[] = [
{
    "srNo": 1,
    "level": 1,
    "levelQuestionNo": 1,
    "question": "……..ही लोक व स्त्रोत ह्यांना जोडण्यासाठी कॉम्प्यूटर नेटवर्कचा उपयोग करण्यासंबंधीची एक संकल्पना आहे.",
    "options": [
      { "label": "A", "value": "डेटा" },
      { "label": "B", "value": "माहिती (इन्फर्मेशन)" },
      { "label": "C", "value": "जोडणे (लिंकिंग)" },
      { "label": "D", "value": "कनेक्टिविटी" }
    ],
    "correct": "कनेक्टिविटी"
  },

  {
    "srNo": 2,
    "level": 1,
    "levelQuestionNo": 2,
    "question": "इलेक्ट्रॉनिक दस्तऐवज पारंपरिक पध्दतीने पाठविणे व स्वीकारणे ह्यासाठी ......... हा जलद व कार्यक्षम असा पर्याय उपलब्ध करुन देतो.",
    "options": [
      { "label": "A", "value": "ई-मेल" },
      { "label": "B", "value": "जी-मेल" },
      { "label": "C", "value": "ई-शॉपिंग" },
      { "label": "D", "value": "ह्यापैकी कोणतेच नाही" }
    ],
    "correct": "ई-मेल"
  },

  {
    "srNo": 3,
    "level": 1,
    "levelQuestionNo": 3,
    "question": "फेव्हरेट लिस्ट मध्ये हव्या असलेल्या वेबसाईटचा समावेश करण्यासाठी ........",
    "options": [
      { "label": "A", "value": "फेव्हरेट…. Add to Favorites वर क्लिक करा" },
      { "label": "B", "value": "add …. फेव्हरेट क्लिक करा" },
      { "label": "C", "value": "फाईल - फेव्हरेट क्लिक करा" },
      { "label": "D", "value": "यापैकी सर्व" }
    ],
    "correct": "फेव्हरेट…. Add to Favorites वर क्लिक करा"
  },

  {
    "srNo": 4,
    "level": 1,
    "levelQuestionNo": 4,
    "question": "खालीलपैकी कोणते विधान इनपुट उपकरणे कशा प्रकारे कार्य करतात हे सर्वोत्कृष्टपणे वर्णन करते?",
    "options": [
      { "label": "A", "value": "इनपुट उपकरणे संगणकाच्या मेमरीत डेटा आणि आदेश संचयित करतात" },
      { "label": "B", "value": "इनपुट उपकरणे वापरकर्त्याच्या क्रिया संगणक प्रणालीसाठी प्रक्रिया करण्यायोग्य स्वरूपात रूपांतरित करतात" },
      { "label": "C", "value": "इनपुट उपकरणे वापरकर्त्याला डेटा आणि माहिती प्रदर्शित करण्यासाठी वापरली जातात" },
      { "label": "D", "value": "इनपुट उपकरणे संगणकाच्या हार्डवेअर घटकांमधील डेटा प्रवाहाचे व्यवस्थापन करतात" }
    ],
    "correct": "इनपुट उपकरणे वापरकर्त्याच्या क्रिया संगणक प्रणालीसाठी प्रक्रिया करण्यायोग्य स्वरूपात रूपांतरित करतात"
  },

  {
    "srNo": 5,
    "level": 1,
    "levelQuestionNo": 5,
    "question": "……..ह्यांना सर्व्हिस प्रोग्राम्स असेही म्हणतात.",
    "options": [
      { "label": "A", "value": "ओएस" },
      { "label": "B", "value": "डिव्हाइस ड्रायव्हर्स" },
      { "label": "C", "value": "युटिलिटीज" },
      { "label": "D", "value": "वरीलपैकी सर्व" }
    ],
    "correct": "युटिलिटीज"
  },

  {
    "srNo": 6,
    "level": 1,
    "levelQuestionNo": 6,
    "question": "……... ही रिमूव्हेबल स्टोअरेज उपकरणे असून त्यांचा उपयोग प्रचंड मोठी माहिती साठविण्यासाठी केला जातो.",
    "options": [
      { "label": "A", "value": "हार्ड डिस्क पॅक्स" },
      { "label": "B", "value": "फ्लॉपी डिस्क" },
      { "label": "C", "value": "सीडी" },
      { "label": "D", "value": "ह्यापैकी कोणतेच नाही" }
    ],
    "correct": "हार्ड डिस्क पॅक्स"
  },

  // Level 2
  {
    "srNo": 7,
    "level": 2,
    "levelQuestionNo": 1,
    "question": "माहितीला सेकंडरी स्टोअरेज उपकरणात जतन करण्याच्या प्रक्रियेला काय म्हणतात?",
    "options": [
      { "label": "A", "value": "वाचन (Reading)" },
      { "label": "B", "value": "लेखन (Writing)" },
      { "label": "C", "value": "भाषांतर (Translating)" },
      { "label": "D", "value": "प्रवेश (Accessing)" }
    ],
    "correct": "लेखन (Writing)"
  },

  {
    "srNo": 8,
    "level": 2,
    "levelQuestionNo": 2,
    "question": "एखादे लक्षण चालू / बंद (ऑन अँड ऑफ) करणार्‍या कॅप्स लॉक सारख्या कीज् ना ... म्हटले जाते.",
    "options": [
      { "label": "A", "value": "फंक्शन कीज्" },
      { "label": "B", "value": "काँबिनेशन कीज्" },
      { "label": "C", "value": "टॉगल कीज्" },
      { "label": "D", "value": "स्पेशलपरपज कीज्" }
    ],
    "correct": "टॉगल कीज्"
  },

  {
    "srNo": 9,
    "level": 2,
    "levelQuestionNo": 3,
    "question": "पुढीलपैकी कोणते उपकरणे हे इनपुट डिव्हाइस नाही?",
    "options": [
      { "label": "A", "value": "मॉनिटर" },
      { "label": "B", "value": "माउस" },
      { "label": "C", "value": "कीबोर्ड" },
      { "label": "D", "value": "जॉयस्टिक" }
    ],
    "correct": "मॉनिटर"
  },

  {
    "srNo": 10,
    "level": 2,
    "levelQuestionNo": 4,
    "question": "प्रत्येक ट्रॅक ज्या गोलाकार (पाचरीच्या) आकाराच्या तुकड्यांमध्ये विभागलेला असतो, त्याला ____ म्हणतात.",
    "options": [
      { "label": "A", "value": "प्लॅटर्स" },
      { "label": "B", "value": "सिलिंडर्स" },
      { "label": "C", "value": "डिस्कस्" },
      { "label": "D", "value": "सेक्टर्स" }
    ],
    "correct": "सेक्टर्स"
  },

  {
    "srNo": 11,
    "level": 2,
    "levelQuestionNo": 5,
    "question": "तुम्ही संगणकांची जोडणी कम्युनिकेट आणि माहितीची देवाण-घेवाण करण्यासाठी केल्यास त्याचा परिणाम म्हणजे ........",
    "options": [
      { "label": "A", "value": "नेटवर्क" },
      { "label": "B", "value": "इंट्रानेट" },
      { "label": "C", "value": "इंटरनेट" },
      { "label": "D", "value": "वरील सर्व" }
    ],
    "correct": "नेटवर्क"
  },

  {
    "srNo": 12,
    "level": 2,
    "levelQuestionNo": 6,
    "question": "संगणक प्रणालीच्या संदर्भात, सिस्टम युनिटचा संदर्भ देण्यासाठी आणखी कोणती संज्ञा वापरली जाते?",
    "options": [
      { "label": "A", "value": "सी पी यु" },
      { "label": "B", "value": "सिस्टीम चासीस" },
      { "label": "C", "value": "हार्ड ड्राईव्ह" },
      { "label": "D", "value": "मदरबोर्ड" }
    ],
    "correct": "सिस्टीम चासीस"
  },

  // Level 3
  {
    "srNo": 13,
    "level": 3,
    "levelQuestionNo": 1,
    "question": "कोणत्या प्रकारचे युटिलिटी प्रोग्राम मुलांसाठी वेब कन्टेन्टची सुरक्षितता आणि योग्यतेसाठी डिझाइन केलेले आहेत?",
    "options": [
      { "label": "A", "value": "वेब युटिलिटीज" },
      { "label": "B", "value": "प्लग-इन्स" },
      { "label": "C", "value": "फाइल ट्रान्सफर युटिलिटीज" },
      { "label": "D", "value": "इंटरनेट सुरक्षा सुइट्स" }
    ],
    "correct": "वेब युटिलिटीज"
  },

  {
    "srNo": 14,
    "level": 3,
    "levelQuestionNo": 2,
    "question": "कंप्यूटरला कसे काम करायचे या साठी ..... यामध्ये पायरीपायरीने सूचना दिलेल्या असतात.",
    "options": [
      { "label": "A", "value": "प्रोग्रॅम" },
      { "label": "B", "value": "हार्डवेअर" },
      { "label": "C", "value": "डेटा" },
      { "label": "D", "value": "ऑब्जेक्टस्" }
    ],
    "correct": "प्रोग्रॅम"
  },

  {
    "srNo": 15,
    "level": 3,
    "levelQuestionNo": 3,
    "question": "व्यवसाय-ते-ग्राहक (B2C) नवीन कंपन्यांना मोठ्या स्थापित कंपन्यांशी स्पर्धा कशी करू देते याचे विश्लेषण करा.",
    "options": [
      { "label": "A", "value": "पारंपारिक किरकोळ (Retail) आऊटलेट्स आणि मोठ्या विपणन कर्मचाऱ्यांची गरज कमी करून" },
      { "label": "B", "value": "किरकोळ (Retail) आऊटलेट्ससाठी मोठ्या प्रमाणावर गुंतवणूक आवश्यक करून" },
      { "label": "C", "value": "फक्त स्थानिक ग्राहकांवर लक्ष केंद्रित करून" },
      { "label": "D", "value": "फक्त ऑनलाइन बँकिंगसाठी त्यांच्या उत्पादनांची आणि सेवा मर्यादित करून" }
    ],
    "correct": "पारंपारिक किरकोळ (Retail) आऊटलेट्स आणि मोठ्या विपणन कर्मचाऱ्यांची गरज कमी करून"
  }
];

function shuffleArray<T>(items: T[]) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildExamQuestions() {
  const picked = shuffleArray(allQuestions.slice(0, TOTAL_QUESTIONS));
  return picked.map((q, index) => {
    let level: 1 | 2 | 3 = 1;
    let levelQuestionNo = index + 1;
    if (index < LEVEL_1_COUNT) {
      level = 1;
      levelQuestionNo = index + 1;
    } else if (index < LEVEL_1_COUNT + LEVEL_2_COUNT) {
      level = 2;
      levelQuestionNo = index - LEVEL_1_COUNT + 1;
    } else {
      level = 3;
      levelQuestionNo = index - LEVEL_1_COUNT - LEVEL_2_COUNT + 1;
    }
    return { ...q, level, levelQuestionNo };
  });
}

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function isImageValue(value: string) {
  return /\.(png|jpg|jpeg|gif|webp)$/i.test(value.trim());
}

function getImageSrc(value: string) {
  const cleanName = value
    .trim()
    .replace(/\s+/g, "_")
    .replace(/_+/g, "_")
    .toLowerCase();

  return `${IMAGE_BASE_PATH}${cleanName}`;
}

function normalizeValue(value: string) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

function getStudentName() {
  if (typeof window === "undefined") return "Student";
  return localStorage.getItem("studentFullName") || "Student";
}

export default function MSCITFinalExamPage() {
  const [studentName, setStudentName] = useState("Student");
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [draftAnswers, setDraftAnswers] = useState<Record<number, string>>({});
  const [activeLevel, setActiveLevel] = useState<1 | 2 | 3>(1);
  const [timeLeft, setTimeLeft] = useState(EXAM_SECONDS);
  const [status, setStatus] = useState<ExamStatus>("running");
  const [started, setStarted] = useState(false);
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  useEffect(() => {
    setStudentName(getStudentName());
    setQuestions(buildExamQuestions());

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";


    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    if (status !== "running" || !started) return;
    const timer = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          setStatus("finished");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [status, started]);

  useEffect(() => {
    if (status === "finished") {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }
  }, [status]);

  const solvedCount = Object.keys(answers).length;
  const marks = useMemo(() => {
    return questions.reduce((score, q, index) => {
      const ans = answers[index];
      if (!ans) return score;
      return normalizeValue(ans) === normalizeValue(q.correct) ? score + 1 : score;
    }, 0);
  }, [answers, questions]);

  const wrongCount = solvedCount - marks;
  const percent = TOTAL_QUESTIONS > 0 ? Math.round((marks / TOTAL_QUESTIONS) * 100) : 0;
  const resultText = solvedCount < TOTAL_QUESTIONS ? "Pending" : percent >= 40 ? "Pass" : "Fail";

  const answeredInRange = (start: number, end: number) => {
    let count = 0;
    for (let i = start; i < end; i++) if (answers[i]) count++;
    return count;
  };

  const marksInRange = (start: number, end: number) => {
    let score = 0;
    for (let i = start; i < end; i++) {
      if (normalizeValue(answers[i] || "") === normalizeValue(questions[i]?.correct || "")) score++;
    }
    return score;
  };

  const submitQuestion = (index: number) => {
    const selected = draftAnswers[index];
    if (!selected || answers[index]) return;

    const isCorrect = normalizeValue(selected) === normalizeValue(questions[index].correct);
window.setTimeout(() => {
      setAnswers((prev) => ({ ...prev, [index]: selected }));
    }, 1800);
  };

  const endExam = async () => {
    if (solvedCount < TOTAL_QUESTIONS) return;
    setStatus("finished");
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
  };

  const startExam = async () => {
    const root = document.documentElement;
    if (root.requestFullscreen && !document.fullscreenElement) {
      await root.requestFullscreen().catch(() => {});
    }
    setStarted(true);
  };

  const openFullScreen = async () => {
    const root = document.documentElement;
    if (root.requestFullscreen && !document.fullscreenElement) {
      await root.requestFullscreen().catch(() => {});
    }
  };

  const levelQuestionList = (level: 1 | 2 | 3) => {
    return questions
      .map((q, index) => ({ q, index }))
      .filter((item) => item.q.level === level && !answers[item.index]);
  };

  const activeLevelQuestions = levelQuestionList(activeLevel);

  if (questions.length === 0) {
    return (
      <main className="examShell loadingShell">
        <div className="loadingBox">Loading MS-CIT Final Exam...</div>

      <style jsx global>{pageStyles}</style>
      </main>
    );
  }

  if (!started) {
    return (
      <main className="examStartPage">
        <section className="startCard">
          <div className="startLogo">MS-CIT</div>
          <h1>Final Exam Test</h1>
          <p>Welcome, <b>{studentName}</b></p>
          <div className="startInfoGrid">
            <div>Total Questions<br /><b>{TOTAL_QUESTIONS}</b></div>
            <div>Time<br /><b>10 Min</b></div>
            <div>Levels<br /><b>1 • 2 • 3</b></div>
          </div>
          <button type="button" className="startFullBtn" onClick={startExam}>
            START EXAM IN FULL SCREEN
          </button>
          <small>या button वर click केल्यावर exam full screen मध्ये open होईल आणि timer सुरू होईल.</small>
        </section>
        <style jsx global>{pageStyles}</style>
      </main>
    );
  }

  if (status === "finished") {
    return (
      <main className="resultPage">
        <section className="resultCard">
          <div className="resultTop">
            <div>
              <p className="miniTitle">MS-CIT Final Exam Result</p>
              <h1>Welcome, {studentName}</h1>
            </div>
            <Link href="/online-test" className="backBtn">Back</Link>
          </div>

          <div className="resultGrid">
            <div className="resultStat total">Total<br /><b>{TOTAL_QUESTIONS}</b></div>
            <div className="resultStat solved">Solved<br /><b>{solvedCount}</b></div>
            <div className="resultStat correct">Correct<br /><b>{marks}</b></div>
            <div className="resultStat wrong">Wrong<br /><b>{wrongCount}</b></div>
            <div className={percent >= 40 ? "resultStat pass" : "resultStat fail"}>Result<br /><b>{percent >= 40 ? "PASS" : "FAIL"}</b></div>
          </div>

          <div className="reviewTitle">Correct / Wrong Answer Review</div>
          <div className="reviewHelp">Green = Correct option, Red = Student selected wrong option</div>
          <div className="reviewList">
            {questions.map((q, index) => {
              const userAns = answers[index] || "Not Answered";
              const isCorrect = normalizeValue(userAns) === normalizeValue(q.correct);
              return (
                <div className={isCorrect ? "reviewItem right" : "reviewItem wrongAns"} key={index}>
                  <div className="reviewQuestion"><b>Level {q.level} - Question {q.levelQuestionNo}.</b> {q.question}</div>
                  <div className="reviewStatus">{isCorrect ? "✅ Correct" : "❌ Wrong"}</div>
                  <div className="reviewOptions">
                    {q.options.map((opt) => {
                      const optIsCorrect = normalizeValue(opt.value) === normalizeValue(q.correct);
                      const optIsStudentWrong = normalizeValue(opt.value) === normalizeValue(userAns) && !isCorrect;
                      const reviewClass = optIsCorrect ? "reviewOption correctOption" : optIsStudentWrong ? "reviewOption wrongOption" : "reviewOption";
                      return (
                        <div className={reviewClass} key={opt.label}>
                          <span className="reviewCircle"></span>
                          {isImageValue(opt.value) ? (
                            <img src={getImageSrc(opt.value)} alt="option" className="reviewImage" onClick={() => setZoomImage(getImageSrc(opt.value))} />
                          ) : (
                            <span>{opt.value}</span>
                          )}
                          {optIsCorrect && <b className="reviewBadge greenBadge">Correct Option</b>}
                          {optIsStudentWrong && <b className="reviewBadge redBadge">Your Wrong Answer</b>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        {zoomImage && (
          <div className="zoomOverlay" onClick={() => setZoomImage(null)}>
            <button type="button" className="zoomClose" onClick={() => setZoomImage(null)}>×</button>
            <img src={zoomImage} alt="zoom" className="zoomImage" />
          </div>
        )}
        <style jsx global>{pageStyles}</style>
      </main>
    );
  }

  return (
    <main className="examShell">
      <section className="examWindow">
        <header className="topHeader">
          <div className="studentPanel">
            <div className="photoBox">👩‍🎓</div>
            <div>
              <div className="studentName">Welcome, {studentName}</div>
              <div className="learnerId">MKCL Learner ID : MSCIT-2026</div>
              <div className="attemptNo">Attempt No : 1</div>
            </div>
          </div>

          <div className="summaryPanel">
            <table>
              <thead>
                <tr>
                  <th>Questions</th><th>Total</th><th>Answered</th><th>Unanswered</th><th>Marks</th><th>Result</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Level 1</td><td>{LEVEL_1_COUNT}</td><td>{answeredInRange(0, 6)}</td><td>{LEVEL_1_COUNT - answeredInRange(0, 6)}</td><td>{marksInRange(0, 6)}</td><td>-</td></tr>
                <tr><td>Level 2</td><td>{LEVEL_2_COUNT}</td><td>{answeredInRange(6, 12)}</td><td>{LEVEL_2_COUNT - answeredInRange(6, 12)}</td><td>{marksInRange(6, 12)}</td><td>-</td></tr>
                <tr><td>Level 3</td><td>{LEVEL_3_COUNT}</td><td>{answeredInRange(12, 15)}</td><td>{LEVEL_3_COUNT - answeredInRange(12, 15)}</td><td>{marksInRange(12, 15)}</td><td>-</td></tr>
                <tr className="totalRow"><td>Total</td><td>{TOTAL_QUESTIONS}</td><td>{solvedCount}</td><td>{TOTAL_QUESTIONS - solvedCount}</td><td>{marks}</td><td>{resultText}</td></tr>
              </tbody>
            </table>
          </div>

          <div className="timerPanel">
            <div className="timerLabel">COUNTDOWN</div>
            <div className="timerWatch">{formatTime(timeLeft)}</div>
          </div>
        </header>

        <div className="marksLine">
          <span>Total No. Of Questions : <b>{TOTAL_QUESTIONS}</b></span>
          <span>Total Marks : <b>{TOTAL_QUESTIONS}</b></span>
          <span>Solved : <b>{solvedCount}</b></span>
          <span>Marks : <b>{marks}</b></span>
        </div>

        <section className="levelStrip">
          {([1, 2, 3] as const).map((level) => {
            const remaining = levelQuestionList(level);
            return (
              <div className={activeLevel === level ? "levelBox activeLevel" : "levelBox"} key={level} onClick={() => setActiveLevel(level)}>
                <div className="levelTitle">LEVEL {level} : {level === 1 ? "LOW" : level === 2 ? "MEDIUM" : "HIGH"} DIFFICULTY</div>
                <div className="tabRow">
                  <button className="tabBtn objective" type="button" onClick={(e) => { e.stopPropagation(); setActiveLevel(level); }}>Objective / Open Level</button>
                  <button className="tabBtn practical disabled" type="button" disabled>Practical</button>
                </div>
                <div className="qNoRow">
                  {remaining.length > 0 ? remaining.map(({ q, index }) => (
                    <button key={index} type="button" className="qNoBtn" onClick={(e) => { e.stopPropagation(); setActiveLevel(level); document.getElementById(`q-${index}`)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}>Q{q.levelQuestionNo}</button>
                  )) : <span className="doneText">Completed</span>}
                </div>
              </div>
            );
          })}
        </section>

        <section className="questionScrollArea">
          {solvedCount >= TOTAL_QUESTIONS ? (
            <div className="allSolvedBox">
              <div className="allSolvedIcon">✅</div>
              <h2>All questions are solved.</h2>
              <p>Final result पाहण्यासाठी End Examination वर click करा.</p>
            </div>
          ) : activeLevelQuestions.length === 0 ? (
            <div className="allSolvedBox smallSolvedBox">
              <h2>Level {activeLevel} completed.</h2>
              <p>वरच्या Objective button मधून दुसरा level select करा.</p>
            </div>
          ) : (
            activeLevelQuestions.map(({ q, index }) => (
              <article className="questionCard" key={index} id={`q-${index}`}>
                <div className="questionLine">
                  <b>Question {q.levelQuestionNo}:</b>
                  <span>{q.question}</span>
                </div>
                <div className="answerLabel">Answer :</div>
                <div className="optionList">
                  {q.options.map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      className={draftAnswers[index] === opt.value ? "optionBtn selected" : "optionBtn"}
                      onClick={() => setDraftAnswers((prev) => ({ ...prev, [index]: opt.value }))}
                    >
                      <span className="circleMark"></span>
                      {isImageValue(opt.value) ? (
                        <span className="optionImageWrap">
                          <img
                            src={getImageSrc(opt.value)}
                            alt="option"
                            className="optionImage"
                            title="Click image to zoom"
                            onClick={(e) => {
                              e.stopPropagation();
                              setZoomImage(getImageSrc(opt.value));
                            }}
                          />
                        </span>
                      ) : (
                        <span>{opt.value}</span>
                      )}
                    </button>
                  ))}
                </div>
                <button type="button" className="submitAnswerBtn" disabled={!draftAnswers[index]} onClick={() => submitQuestion(index)}>
                  SUBMIT ANSWER
                </button>
              </article>
            ))
          )}
        </section>

        <footer className="examFooter">
          <span>INSTRUCTION: Please select the correct answer and click on Submit Answer button.</span>
          <button type="button" className={solvedCount >= TOTAL_QUESTIONS ? "endBtn ready" : "endBtn"} disabled={solvedCount < TOTAL_QUESTIONS} onClick={endExam}>
            END EXAMINATION
          </button>
          <b>MS-CIT</b>
        </footer>
      </section>
      {zoomImage && (
        <div className="zoomOverlay" onClick={() => setZoomImage(null)}>
          <button type="button" className="zoomClose" onClick={() => setZoomImage(null)}>×</button>
          <img src={zoomImage} alt="zoom" className="zoomImage" />
        </div>
      )}

      <style jsx global>{pageStyles}</style>
    </main>
  );
}

const pageStyles = `
  html, body { margin: 0 !important; padding: 0 !important; }
  * { box-sizing: border-box; }

  .examStartPage {
    position: fixed;
    inset: 0;
    z-index: 2147483647;
    width: 100vw;
    height: 100vh;
    height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at top left, #bfdbfe, transparent 34%), radial-gradient(circle at bottom right, #fed7aa, transparent 32%), linear-gradient(135deg, #eff6ff, #fff7ed);
    font-family: Arial, Helvetica, sans-serif;
    overflow: hidden;
  }
  .startCard { width: min(520px, calc(100vw - 28px)); background: rgba(255,255,255,0.96); border: 1px solid #dbeafe; box-shadow: 0 24px 60px rgba(15, 23, 42, 0.22); border-radius: 28px; padding: 34px; text-align: center; }
  .startLogo { width: fit-content; margin: 0 auto 14px; background: linear-gradient(135deg, #ef4444, #f97316); color: white; padding: 10px 20px; border-radius: 18px 18px 18px 4px; font-size: 26px; font-weight: 950; }
  .startCard h1 { margin: 0 0 8px; font-size: 34px; color: #0f172a; }
  .startCard p { margin: 0 0 18px; color: #334155; font-size: 18px; }
  .startInfoGrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 18px 0; }
  .startInfoGrid div { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 14px; padding: 12px 8px; font-size: 13px; font-weight: 900; color: #1e3a8a; }
  .startInfoGrid b { font-size: 20px; color: #0f172a; }
  .startFullBtn { width: 100%; border: none; background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; border-radius: 18px; padding: 16px 18px; font-size: 17px; font-weight: 950; cursor: pointer; box-shadow: 0 12px 28px rgba(37, 99, 235, 0.28); }
  .startCard small { display: block; margin-top: 14px; color: #64748b; font-weight: 800; line-height: 1.5; }

  

.examShell {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    height: 100dvh;
    z-index: 2147483647;
    background: #dbe4ef;
    font-family: Arial, Helvetica, sans-serif;
    overflow: hidden;
  }

  .loadingShell { display: flex; align-items: center; justify-content: center; }
  .loadingBox { background: white; padding: 24px 36px; border-radius: 14px; font-size: 22px; font-weight: 900; color: #1e3a8a; }

  .examWindow {
    width: 100vw;
    height: 100vh;
    height: 100dvh;
    background: #ffffff;
    display: grid;
    grid-template-rows: 100px 26px 120px minmax(0, 1fr) 42px;
    overflow: hidden;
    border: 1px solid #94a3b8;
  }

  .topHeader {
    display: grid;
    grid-template-columns: 36% 42% 22%;
    gap: 8px;
    padding: 8px 10px;
    background: linear-gradient(180deg, #eaf2fb, #ffffff);
    border-bottom: 1px solid #94a3b8;
    min-height: 0;
  }

  .studentPanel { display: flex; align-items: center; gap: 10px; overflow: hidden; }
  .photoBox { width: 70px; height: 84px; border: 1px solid #64748b; background: #e0f2fe; display: flex; align-items: center; justify-content: center; font-size: 42px; flex-shrink: 0; }
  .studentName { font-size: 18px; font-weight: 950; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .learnerId, .attemptNo { font-size: 12px; font-weight: 800; color: #334155; margin-top: 4px; }

  .summaryPanel { overflow: hidden; }
  .summaryPanel table { width: 100%; height: 100%; border-collapse: collapse; text-align: center; font-size: 11px; font-weight: 800; background: #ffffff; }
  .summaryPanel th { background: linear-gradient(180deg, #334155, #64748b); color: white; padding: 3px; border: 1px solid #94a3b8; }
  .summaryPanel td { border: 1px solid #cbd5e1; padding: 2px; font-weight: 800; color: #111827; }
  .totalRow td { background: #eff6ff; color: #1d4ed8; }

  .timerPanel { border-radius: 7px; background: radial-gradient(circle at top left, #fde68a, #92400e 72%); color: #fff7ed; display: flex; flex-direction: column; align-items: center; justify-content: center; border: 1px solid #78350f; }
  .timerLabel { font-size: 13px; font-weight: 950; letter-spacing: 1px; opacity: 0.88; }
  .timerWatch { font-size: 34px; line-height: 1; margin-top: 7px; font-weight: 950; text-shadow: 0 2px 6px rgba(0,0,0,0.35); }

  .marksLine { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 4px 14px; font-size: 13px; font-weight: 800; color: #0f172a; background: #f8fafc; border-bottom: 1px solid #cbd5e1; overflow: hidden; }
  .marksLine span { white-space: nowrap; }

  .levelStrip { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; padding: 7px 10px; background: #f1f5f9; border-bottom: 1px solid #cbd5e1; overflow: hidden; }
  .levelBox { border: 1px solid #94a3b8; background: white; overflow: hidden; display: grid; grid-template-rows: 28px 45px 34px; cursor: pointer; }
  .activeLevel { outline: 3px solid rgba(37, 99, 235, 0.25); }
  .levelTitle { text-align: center; font-size: 12px; font-weight: 950; padding: 6px 4px; color: #111827; background: #e5e7eb; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .tabRow { display: grid; grid-template-columns: 1fr 1fr; gap: 5px; padding: 6px; }
  .tabBtn { border: 1px solid #475569; color: white; border-radius: 4px; padding: 6px; font-weight: 950; font-size: 12px; cursor: pointer; }
  .objective { background: linear-gradient(180deg, #ef4444, #991b1b); }
  .practical { background: linear-gradient(180deg, #0ea5e9, #075985); }
  .practical.disabled { opacity: 0.45; cursor: not-allowed; filter: grayscale(0.4); }
  .qNoRow { display: flex; align-items: center; gap: 5px; padding: 2px 6px 7px; overflow-x: auto; white-space: nowrap; }
  .qNoBtn { min-width: 42px; height: 26px; border: 1px solid #94a3b8; background: #f8fafc; color: #0f172a; font-size: 12px; font-weight: 950; cursor: pointer; }
  .qNoBtn:hover { background: #dbeafe; border-color: #2563eb; }
  .doneText { font-size: 12px; color: #16a34a; font-weight: 950; margin: auto; }

  .questionScrollArea { padding: 10px 14px 12px; overflow-y: auto; background: linear-gradient(180deg, #ffffff, #f8fafc); scrollbar-width: thin; }
  .questionCard { max-width: 1120px; margin: 0 auto 12px; border: 1px solid #cbd5e1; border-radius: 8px; background: #ffffff; padding: 9px 10px; box-shadow: 0 4px 14px rgba(15, 23, 42, 0.05); }
  .questionLine { display: flex; align-items: flex-start; gap: 8px; font-size: 15px; line-height: 1.35; font-weight: 800; color: #111827; margin-bottom: 5px; }
  .questionLine b { color: #0f172a; white-space: nowrap; min-width: 86px; }
  .questionLine span { flex: 1; }
  .answerLabel { font-weight: 950; color: #111827; font-size: 13px; margin-bottom: 4px; }
  .optionList { display: grid; grid-template-columns: 1fr; gap: 4px; max-width: 900px; margin-left: 90px; }
  .optionBtn { border: 1px solid #cbd5e1; background: white; border-radius: 6px; padding: 6px 9px; display: flex; align-items: center; gap: 8px; text-align: left; cursor: pointer; font-size: 15px; font-weight: 850; color: #1e293b; min-height: 34px; }
  .optionBtn:hover { border-color: #2563eb; background: #eff6ff; }
  .optionBtn.selected { border-color: #16a34a; background: #dcfce7; color: #14532d; }
  .circleMark { width: 15px; height: 15px; border: 2px solid #64748b; border-radius: 999px; flex-shrink: 0; background: white; }
  .optionBtn.selected .circleMark { border-color: #16a34a; background: radial-gradient(circle, #16a34a 0 42%, white 45% 100%); }
  .optionImageWrap { display: inline-flex; align-items: center; gap: 8px; }
  .optionImage { max-height: 46px; max-width: 170px; object-fit: contain; border: 1px solid #e2e8f0; border-radius: 5px; background: white; cursor: zoom-in; }
  .submitAnswerBtn { margin-top: 7px; margin-left: 90px; min-width: 150px; border: 1px solid #1d4ed8; background: linear-gradient(180deg, #38bdf8, #1d4ed8); color: white; padding: 7px 16px; border-radius: 999px; font-size: 12px; font-weight: 950; cursor: pointer; }
  .submitAnswerBtn:disabled { opacity: 0.5; cursor: not-allowed; }

  .allSolvedBox { height: 100%; min-height: 260px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; background: linear-gradient(135deg, #ecfdf5, #eff6ff); border: 2px dashed #22c55e; border-radius: 14px; color: #0f172a; }
  .smallSolvedBox { min-height: 180px; }
  .allSolvedIcon { font-size: 48px; line-height: 1; margin-bottom: 8px; }
  .allSolvedBox h2 { margin: 0 0 8px; font-size: 25px; font-weight: 950; color: #166534; }
  .allSolvedBox p { margin: 0; font-weight: 800; color: #334155; }

  .examFooter { display: grid; grid-template-columns: 1fr auto 96px; align-items: center; gap: 10px; padding: 5px 12px; border-top: 1px solid #cbd5e1; font-size: 12px; color: #b91c1c; background: #f8fafc; overflow: hidden; }
  .examFooter span { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .examFooter b { font-size: 24px; color: #f97316; text-align: right; }
  .endBtn { min-width: 160px; border: 1px solid #991b1b; background: #fecaca; color: #7f1d1d; padding: 7px 12px; border-radius: 4px; font-size: 12px; font-weight: 950; cursor: not-allowed; }
  .endBtn.ready { background: linear-gradient(180deg, #ef4444, #b91c1c); color: white; cursor: pointer; }

  .resultPage { position: fixed; inset: 0; z-index: 2147483647; width: 100vw; height: 100vh; height: 100dvh; background: linear-gradient(135deg, #dbeafe, #fff7ed); padding: 24px; font-family: Arial, Helvetica, sans-serif; overflow-y: scroll !important; overflow-x: hidden; -webkit-overflow-scrolling: touch; }
  .resultCard { max-width: 1120px; margin: 0 auto 24px; background: white; border-radius: 24px; padding: 24px; box-shadow: 0 18px 40px rgba(15, 23, 42, 0.16); }
  .resultTop { display: flex; justify-content: space-between; align-items: center; gap: 14px; margin-bottom: 18px; }
  .miniTitle { margin: 0 0 6px; color: #2563eb; font-weight: 950; }
  .resultTop h1 { margin: 0; color: #0f172a; }
  .backBtn { text-decoration: none; background: #0f172a; color: white; padding: 11px 16px; border-radius: 12px; font-weight: 900; }
  .resultGrid { display: grid; grid-template-columns: repeat(5, minmax(0, 120px)); justify-content: center; gap: 8px; margin-bottom: 14px; }
  .resultStat { border-radius: 12px; padding: 8px 10px; text-align: center; font-weight: 900; color: white; font-size: 12px; line-height: 1.25; }
  .resultStat b { font-size: 20px; }
  .total { background: #2563eb; } .solved { background: #7c3aed; } .correct, .pass { background: #16a34a; } .wrong, .fail { background: #dc2626; }
  .reviewTitle { background: #f1f5f9; color: #0f172a; padding: 12px 14px; border-radius: 14px; font-weight: 950; margin-bottom: 6px; }
  .reviewHelp { margin-bottom: 12px; font-size: 13px; font-weight: 900; color: #475569; }
  .reviewList { display: grid; gap: 12px; padding-bottom: 30px; }
  .reviewItem { border-radius: 14px; padding: 12px; border: 1px solid #e2e8f0; background: #f8fafc; }
  .reviewItem.right { border-color: #86efac; background: #f0fdf4; }
  .reviewItem.wrongAns { border-color: #fca5a5; background: #fef2f2; }
  .reviewQuestion { font-weight: 900; color: #111827; margin-bottom: 8px; line-height: 1.5; }
  .reviewStatus { width: fit-content; border-radius: 999px; padding: 5px 10px; background: #ffffff; color: #0f172a; font-size: 12px; font-weight: 950; margin-bottom: 8px; }
  .reviewOptions { display: grid; gap: 6px; }
  .reviewOption { display: flex; align-items: center; gap: 9px; border: 1px solid #cbd5e1; border-radius: 10px; background: #ffffff; padding: 8px 10px; font-size: 14px; font-weight: 850; color: #1e293b; }
  .reviewCircle { width: 15px; height: 15px; border-radius: 999px; border: 2px solid #64748b; background: white; flex-shrink: 0; }
  .correctOption { border-color: #16a34a !important; background: #dcfce7 !important; color: #14532d !important; }
  .correctOption .reviewCircle { border-color: #16a34a; background: radial-gradient(circle, #16a34a 0 45%, white 48% 100%); }
  .wrongOption { border-color: #dc2626 !important; background: #fee2e2 !important; color: #7f1d1d !important; }
  .wrongOption .reviewCircle { border-color: #dc2626; background: radial-gradient(circle, #dc2626 0 45%, white 48% 100%); }
  .reviewBadge { margin-left: auto; border-radius: 999px; padding: 4px 8px; font-size: 11px; white-space: nowrap; }
  .greenBadge { background: #16a34a; color: white; }
  .redBadge { background: #dc2626; color: white; }
  .reviewImage { max-height: 58px; max-width: 190px; object-fit: contain; border: 1px solid #cbd5e1; border-radius: 6px; cursor: zoom-in; background: white; }

  .zoomOverlay { position: fixed; inset: 0; z-index: 2147483647; background: rgba(15, 23, 42, 0.88); display: flex; align-items: center; justify-content: center; padding: 22px; cursor: zoom-out; }
  .zoomImage { max-width: 96vw; max-height: 92vh; object-fit: contain; background: white; border-radius: 10px; padding: 8px; box-shadow: 0 18px 50px rgba(0,0,0,0.45); }
  .zoomClose { position: fixed; top: 18px; right: 24px; width: 44px; height: 44px; border: none; border-radius: 999px; background: #ef4444; color: white; font-size: 30px; line-height: 1; cursor: pointer; font-weight: 950; }

  @media (max-height: 720px) {
    .examWindow { grid-template-rows: 86px 24px 110px minmax(0, 1fr) 36px; }
    .photoBox { width: 58px; height: 70px; font-size: 30px; }
    .studentName { font-size: 15px; }
    .learnerId, .attemptNo { font-size: 11px; margin-top: 3px; }
    .summaryPanel table { font-size: 9px; }
    .timerWatch { font-size: 28px; }
    .levelBox { grid-template-rows: 24px 39px 30px; }
    .levelTitle { font-size: 10px; padding: 5px 3px; }
    .tabBtn { padding: 5px; font-size: 11px; }
    .qNoBtn { height: 22px; min-width: 36px; font-size: 11px; }
    .questionCard { padding: 7px 9px; margin-bottom: 9px; }
    .questionLine { font-size: 13px; margin-bottom: 3px; }
    .optionBtn { min-height: 30px; font-size: 14px; padding: 5px 8px; }
    .submitAnswerBtn { padding: 5px 14px; }
    .examFooter { font-size: 10px; padding: 4px 10px; }
    .examFooter b { font-size: 19px; }
  }

  @media (max-width: 900px) {
    .examWindow { grid-template-rows: 190px 30px 310px minmax(0, 1fr) 42px; }
    .topHeader { grid-template-columns: 1fr; }
    .timerPanel { min-height: 62px; }
    .levelStrip { grid-template-columns: 1fr; overflow-y: auto; }
    .marksLine { font-size: 11px; overflow-x: auto; }
    .optionList { margin-left: 0; }
    .submitAnswerBtn { margin-left: 0; }
    .questionLine { display: block; }
    .questionLine b { display: inline; margin-right: 6px; }
    .resultGrid { grid-template-columns: repeat(2, 1fr); }
    .reviewOption { align-items: flex-start; flex-wrap: wrap; }
    .reviewBadge { margin-left: 0; }
    .startInfoGrid { grid-template-columns: 1fr; }
  }
`;
