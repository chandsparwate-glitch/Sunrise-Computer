"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Lang = "mr" | "en";
type QuestionStatus = "pending" | "current" | "solved" | "timeover";

type Question = {
  question: {
    mr: string;
    en: string;
  };
  options: {
    mr: string[];
    en: string[];
  };
  answer: {
    mr: string;
    en: string;
  };
};

type SubmittedAnswer = {
  question: string;
  selected: string;
  correct: string;
  marks: number;
  status: "answered" | "timeover";
} | null;

const questions: Question[] = [
  {
    question: {
      mr: "Computer म्हणजे काय?",
      en: "What is a computer?",
    },
    options: {
      mr: [
        "फक्त टायपिंग करणारे यंत्र",
        "डेटा स्वीकारून प्रक्रिया करून माहिती देणारे इलेक्ट्रॉनिक यंत्र",
        "फक्त गेम खेळण्यासाठी वापरले जाणारे यंत्र",
        "फक्त इंटरनेट वापरण्याचे साधन",
      ],
      en: [
        "A device used only for typing",
        "An electronic device that accepts data, processes it, and gives information",
        "A device used only for games",
        "A device used only for internet",
      ],
    },
    answer: {
      mr: "डेटा स्वीकारून प्रक्रिया करून माहिती देणारे इलेक्ट्रॉनिक यंत्र",
      en: "An electronic device that accepts data, processes it, and gives information",
    },
  },
  {
    question: {
      mr: "Computer चा मेंदू कोणता भाग मानला जातो?",
      en: "Which part is known as the brain of the computer?",
    },
    options: {
      mr: ["Monitor", "Keyboard", "CPU", "Mouse"],
      en: ["Monitor", "Keyboard", "CPU", "Mouse"],
    },
    answer: { mr: "CPU", en: "CPU" },
  },
  {
    question: {
      mr: "खालीलपैकी Input Device कोणते आहे?",
      en: "Which of the following is an input device?",
    },
    options: {
      mr: ["Monitor", "Printer", "Keyboard", "Speaker"],
      en: ["Monitor", "Printer", "Keyboard", "Speaker"],
    },
    answer: { mr: "Keyboard", en: "Keyboard" },
  },
  {
    question: {
      mr: "खालीलपैकी Output Device कोणते आहे?",
      en: "Which of the following is an output device?",
    },
    options: {
      mr: ["Mouse", "Keyboard", "Scanner", "Monitor"],
      en: ["Mouse", "Keyboard", "Scanner", "Monitor"],
    },
    answer: { mr: "Monitor", en: "Monitor" },
  },
  {
    question: {
      mr: "Information Technology म्हणजे काय?",
      en: "What is Information Technology?",
    },
    options: {
      mr: [
        "फक्त मोबाईल वापरणे",
        "माहिती तयार करणे, साठवणे, प्रक्रिया करणे आणि पाठवणे यासाठी तंत्रज्ञानाचा वापर",
        "फक्त गेम खेळणे",
        "फक्त चित्र काढणे",
      ],
      en: [
        "Only using mobile phones",
        "Use of technology to create, store, process, and transmit information",
        "Only playing games",
        "Only drawing pictures",
      ],
    },
    answer: {
      mr: "माहिती तयार करणे, साठवणे, प्रक्रिया करणे आणि पाठवणे यासाठी तंत्रज्ञानाचा वापर",
      en: "Use of technology to create, store, process, and transmit information",
    },
  },
  {
    question: {
      mr: "पहिल्या पिढीतील Computer मध्ये कोणत्या तंत्रज्ञानाचा वापर झाला?",
      en: "Which technology was used in first generation computers?",
    },
    options: {
      mr: ["Transistor", "Vacuum Tube", "Microprocessor", "Artificial Intelligence"],
      en: ["Transistor", "Vacuum Tube", "Microprocessor", "Artificial Intelligence"],
    },
    answer: { mr: "Vacuum Tube", en: "Vacuum Tube" },
  },
  {
    question: {
      mr: "दुसऱ्या पिढीतील Computer मध्ये कोणत्या तंत्रज्ञानाचा वापर झाला?",
      en: "Which technology was used in second generation computers?",
    },
    options: {
      mr: ["Vacuum Tube", "Transistor", "IC", "Microprocessor"],
      en: ["Vacuum Tube", "Transistor", "IC", "Microprocessor"],
    },
    answer: { mr: "Transistor", en: "Transistor" },
  },
  {
    question: {
      mr: "तिसऱ्या पिढीतील Computer मध्ये कोणत्या तंत्रज्ञानाचा वापर झाला?",
      en: "Which technology was used in third generation computers?",
    },
    options: {
      mr: ["IC", "Vacuum Tube", "Punch Card", "AI"],
      en: ["IC", "Vacuum Tube", "Punch Card", "AI"],
    },
    answer: { mr: "IC", en: "IC" },
  },
  {
    question: {
      mr: "चौथ्या पिढीतील Computer मध्ये कोणत्या तंत्रज्ञानाचा वापर झाला?",
      en: "Which technology was used in fourth generation computers?",
    },
    options: {
      mr: ["Microprocessor", "Vacuum Tube", "Transistor", "Mechanical Gear"],
      en: ["Microprocessor", "Vacuum Tube", "Transistor", "Mechanical Gear"],
    },
    answer: { mr: "Microprocessor", en: "Microprocessor" },
  },
  {
    question: {
      mr: "पाचव्या पिढीतील Computer कोणत्या तंत्रज्ञानाशी संबंधित आहे?",
      en: "Fifth generation computers are related to which technology?",
    },
    options: {
      mr: ["Artificial Intelligence", "Vacuum Tube", "Abacus", "Typewriter"],
      en: ["Artificial Intelligence", "Vacuum Tube", "Abacus", "Typewriter"],
    },
    answer: { mr: "Artificial Intelligence", en: "Artificial Intelligence" },
  },
  {
    question: {
      mr: "Super Computer चा उपयोग कशासाठी होतो?",
      en: "What is a supercomputer used for?",
    },
    options: {
      mr: [
        "सामान्य टायपिंगसाठी",
        "अतिशय वेगवान आणि मोठ्या गणनांसाठी",
        "फक्त संगीत ऐकण्यासाठी",
        "फक्त फोटो पाहण्यासाठी",
      ],
      en: [
        "For normal typing",
        "For very fast and large calculations",
        "Only for listening to music",
        "Only for viewing photos",
      ],
    },
    answer: {
      mr: "अतिशय वेगवान आणि मोठ्या गणनांसाठी",
      en: "For very fast and large calculations",
    },
  },
  {
    question: {
      mr: "Personal Computer ला संक्षिप्त रूपात काय म्हणतात?",
      en: "What is the short form of Personal Computer?",
    },
    options: {
      mr: ["PC", "CPU", "UPS", "RAM"],
      en: ["PC", "CPU", "UPS", "RAM"],
    },
    answer: { mr: "PC", en: "PC" },
  },
  {
    question: {
      mr: "Laptop हा कोणत्या प्रकारचा Computer आहे?",
      en: "Laptop is which type of computer?",
    },
    options: {
      mr: ["Portable Computer", "Super Computer", "Mainframe Computer", "Analog Computer"],
      en: ["Portable Computer", "Super Computer", "Mainframe Computer", "Analog Computer"],
    },
    answer: { mr: "Portable Computer", en: "Portable Computer" },
  },
  {
    question: {
      mr: "Hardware म्हणजे काय?",
      en: "What is hardware?",
    },
    options: {
      mr: [
        "Computer चे स्पर्श करता येणारे भाग",
        "Computer मधील सूचना",
        "Internet service",
        "फक्त MS Word",
      ],
      en: [
        "Physical parts of a computer",
        "Instructions in a computer",
        "Internet service",
        "Only MS Word",
      ],
    },
    answer: {
      mr: "Computer चे स्पर्श करता येणारे भाग",
      en: "Physical parts of a computer",
    },
  },
  {
    question: {
      mr: "Software म्हणजे काय?",
      en: "What is software?",
    },
    options: {
      mr: [
        "Computer चे physical parts",
        "Computer ला काम करण्यासाठी दिलेल्या सूचना / programs",
        "फक्त monitor",
        "फक्त keyboard",
      ],
      en: [
        "Physical parts of computer",
        "Instructions or programs given to a computer",
        "Only monitor",
        "Only keyboard",
      ],
    },
    answer: {
      mr: "Computer ला काम करण्यासाठी दिलेल्या सूचना / programs",
      en: "Instructions or programs given to a computer",
    },
  },
  {
    question: {
      mr: "Operating System चे उदाहरण कोणते?",
      en: "Which is an example of an operating system?",
    },
    options: {
      mr: ["Windows", "Keyboard", "Printer", "Mouse"],
      en: ["Windows", "Keyboard", "Printer", "Mouse"],
    },
    answer: { mr: "Windows", en: "Windows" },
  },
  {
    question: {
      mr: "RAM चे full form काय आहे?",
      en: "What is the full form of RAM?",
    },
    options: {
      mr: [
        "Read Access Memory",
        "Random Access Memory",
        "Run Access Machine",
        "Read Automatic Memory",
      ],
      en: [
        "Read Access Memory",
        "Random Access Memory",
        "Run Access Machine",
        "Read Automatic Memory",
      ],
    },
    answer: { mr: "Random Access Memory", en: "Random Access Memory" },
  },
  {
    question: {
      mr: "ROM चे full form काय आहे?",
      en: "What is the full form of ROM?",
    },
    options: {
      mr: [
        "Read Only Memory",
        "Random Only Memory",
        "Run Only Machine",
        "Read Output Memory",
      ],
      en: [
        "Read Only Memory",
        "Random Only Memory",
        "Run Only Machine",
        "Read Output Memory",
      ],
    },
    answer: { mr: "Read Only Memory", en: "Read Only Memory" },
  },
  {
    question: {
      mr: "Data म्हणजे काय?",
      en: "What is data?",
    },
    options: {
      mr: ["अर्थपूर्ण माहिती", "कच्चे तथ्य आणि आकडे", "फक्त चित्र", "फक्त आवाज"],
      en: ["Meaningful information", "Raw facts and figures", "Only picture", "Only sound"],
    },
    answer: { mr: "कच्चे तथ्य आणि आकडे", en: "Raw facts and figures" },
  },
  {
    question: {
      mr: "Process केलेल्या data ला काय म्हणतात?",
      en: "What is processed data called?",
    },
    options: {
      mr: ["Information", "Hardware", "Input", "Virus"],
      en: ["Information", "Hardware", "Input", "Virus"],
    },
    answer: { mr: "Information", en: "Information" },
  },
  {
    question: {
      mr: "Storage device चे उदाहरण कोणते?",
      en: "Which is an example of a storage device?",
    },
    options: {
      mr: ["Pen Drive", "Monitor", "Keyboard", "Mouse"],
      en: ["Pen Drive", "Monitor", "Keyboard", "Mouse"],
    },
    answer: { mr: "Pen Drive", en: "Pen Drive" },
  },
  {
    question: {
      mr: "Computer Virus म्हणजे काय?",
      en: "What is a computer virus?",
    },
    options: {
      mr: [
        "उपयोगी program",
        "Computer ला नुकसान करणारा program",
        "Printer चा भाग",
        "Monitor चे button",
      ],
      en: [
        "Useful program",
        "A program that can harm the computer",
        "Part of printer",
        "Button of monitor",
      ],
    },
    answer: {
      mr: "Computer ला नुकसान करणारा program",
      en: "A program that can harm the computer",
    },
  },
  {
    question: {
      mr: "Antivirus software कशासाठी वापरतात?",
      en: "What is antivirus software used for?",
    },
    options: {
      mr: [
        "Virus पासून संरक्षणासाठी",
        "Typing speed वाढवण्यासाठी",
        "Monitor चालू करण्यासाठी",
        "Printer साफ करण्यासाठी",
      ],
      en: [
        "To protect from viruses",
        "To increase typing speed",
        "To turn on monitor",
        "To clean printer",
      ],
    },
    answer: {
      mr: "Virus पासून संरक्षणासाठी",
      en: "To protect from viruses",
    },
  },
  {
    question: {
      mr: "Internet म्हणजे काय?",
      en: "What is the Internet?",
    },
    options: {
      mr: [
        "Computer चे आतले भाग",
        "जगभरातील computers चे network",
        "फक्त game",
        "फक्त keyboard",
      ],
      en: [
        "Internal parts of computer",
        "A worldwide network of computers",
        "Only game",
        "Only keyboard",
      ],
    },
    answer: {
      mr: "जगभरातील computers चे network",
      en: "A worldwide network of computers",
    },
  },
  {
    question: {
      mr: "Browser चे उदाहरण कोणते?",
      en: "Which is an example of a browser?",
    },
    options: {
      mr: ["Google Chrome", "MS Paint", "Calculator", "Notepad"],
      en: ["Google Chrome", "MS Paint", "Calculator", "Notepad"],
    },
    answer: { mr: "Google Chrome", en: "Google Chrome" },
  },
];

export default function FundamentalTestPage() {
  const [studentName, setStudentName] = useState("Student");
  const [language, setLanguage] = useState<Lang>("mr");
  const [batchTime, setBatchTime] = useState("");
  const [examStarted, setExamStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isFinished, setIsFinished] = useState(false);
  const [warning, setWarning] = useState("");
  const [showCertificate, setShowCertificate] = useState(false);

  const certificateRef = useRef<HTMLDivElement | null>(null);

  const [questionStatuses, setQuestionStatuses] = useState<QuestionStatus[]>(
    questions.map((_, i) => (i === 0 ? "current" : "pending"))
  );

  const [submittedAnswers, setSubmittedAnswers] = useState<SubmittedAnswer[]>(
    questions.map(() => null)
  );

  const currentQuestion = questions[currentIndex];
  const studentInitial = studentName?.trim()?.charAt(0)?.toUpperCase() || "S";
  const certificateDate = new Date().toLocaleDateString("en-GB").replaceAll("/", ".");

  useEffect(() => {
    const savedName = localStorage.getItem("studentFullName");
    if (savedName) setStudentName(savedName);
  }, []);

  useEffect(() => {
  const html = document.documentElement;
  const body = document.body;

  if (examStarted && !isFinished) {
    html.classList.add("exam-fullscreen-mode");
    body.classList.add("exam-fullscreen-mode");
  } else {
    html.classList.remove("exam-fullscreen-mode");
    body.classList.remove("exam-fullscreen-mode");
  }

  return () => {
    html.classList.remove("exam-fullscreen-mode");
    body.classList.remove("exam-fullscreen-mode");
  };
}, [examStarted, isFinished]);

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

  const t = {
    title: "Computer Fundamental Test",
    startExam: "Start Exam",
    totalQuestions: language === "mr" ? "एकूण प्रश्न" : "Total Questions",
    eachQuestion: language === "mr" ? "प्रत्येक प्रश्न" : "Each Question",
    timeOverMarks: "Time Over Marks",
    selectLanguage: language === "mr" ? "भाषा निवडा" : "Select Language",
    batchTime: "Batch Time",
    typeBatch: language === "mr" ? "उदा. 8 AM ते 9 AM" : "Example: 8 AM to 9 AM",
    next: "Next Question",
    submit: "Submit Test",
    warning:
      language === "mr"
        ? "कृपया answer select करा. Answer select केल्यावरच Next Question सुरू होईल."
        : "Please select an answer. Next question will open only after selecting an answer.",
    bottom:
      language === "mr"
        ? "Answer select केल्यावरच Next होईल. Time over झाल्यास 0 marks मिळतील."
        : "Next will work only after selecting an answer. Time over gives 0 marks.",
  };

  const handleOptionSelect = (option: string) => {
    setSelectedAnswer(option);
    setWarning("");
  };

  const startExam = () => {
    if (batchTime.trim() === "") {
      setWarning(language === "mr" ? "कृपया Batch Time टाका." : "Please enter Batch Time.");
      return;
    }

    localStorage.setItem("studentBatchTime", batchTime);
    localStorage.setItem("testLanguage", language);
    setWarning("");
    setExamStarted(true);
  };

  const handleNext = (timeOver = false) => {
    if (!timeOver && selectedAnswer === "") {
      setWarning(t.warning);
      return;
    }

    const selected = timeOver ? "Time Over" : selectedAnswer;
    const correct = currentQuestion.answer[language];
    const isCorrect = !timeOver && selectedAnswer === correct;
    const marks = isCorrect ? 1 : 0;

    if (isCorrect) setScore((prev) => prev + 1);

    const updatedAnswers = [...submittedAnswers];
    updatedAnswers[currentIndex] = {
      question: currentQuestion.question[language],
      selected,
      correct,
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
    setShowCertificate(false);
    setQuestionStatuses(questions.map((_, i) => (i === 0 ? "current" : "pending")));
    setSubmittedAnswers(questions.map(() => null));
  };

  const handlePrintCertificate = () => {
    const printWindow = window.open("", "_blank", "width=1400,height=900");
    if (!printWindow) {
      alert("Please allow popups for printing.");
      return;
    }

    const bgUrl = `${window.location.origin}/certificate-bg.jpg`;

    printWindow.document.open();
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Certificate Print</title>
          <meta charset="utf-8" />
          <style>
            @page {
              size: A4 landscape;
              margin: 0;
            }

            html, body {
              margin: 0;
              padding: 0;
              width: 100%;
              height: 100%;
              background: #ffffff;
              overflow: hidden;
              font-family: Arial, sans-serif;
            }

            body {
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .printWrap {
              width: 297mm;
              height: 210mm;
              position: relative;
              overflow: hidden;
              background: #fff;
            }

            .certificateBg {
              position: absolute;
              inset: 0;
              width: 100%;
              height: 100%;
              object-fit: cover;
              display: block;
            }

            .certPresented {
              position: absolute;
              top: 39.8%;
              left: 53.2%;
              transform: translateX(-50%);
              width: 78%;
              text-align: center;
              font-family: Georgia, "Times New Roman", serif;
              font-size: 22px;
              font-style: italic;
              color: #111827;
              line-height: 1.2;
            }

            .certStudentName {
              position: absolute;
              top: 45.2%;
              left: 53.2%;
              transform: translateX(-50%);
              width: 82%;
              text-align: center;
              font-size: 32px;
              font-weight: 950;
              color: #2b74b8;
              font-family: Arial, sans-serif;
              line-height: 1.1;
            }

            .certLineOne {
              position: absolute;
              top: 52.8%;
              left: 53.2%;
              transform: translateX(-50%);
              width: 82%;
              text-align: center;
              font-family: Georgia, "Times New Roman", serif;
              font-size: 23px;
              font-style: italic;
              color: #111827;
              line-height: 1.25;
            }

            .certLineOne b {
              font-weight: 900;
              color: #111827;
            }

            .certLineTwo {
              position: absolute;
              top: 58.2%;
              left: 53.2%;
              transform: translateX(-50%);
              width: 82%;
              text-align: center;
              font-family: Georgia, "Times New Roman", serif;
              font-size: 20px;
              font-style: italic;
              color: #111827;
              line-height: 1.2;
            }

            .certWish {
              position: absolute;
              top: 63.4%;
              left: 53.2%;
              transform: translateX(-50%);
              width: 82%;
              text-align: center;
              font-family: Georgia, "Times New Roman", serif;
              font-size: 20px;
              font-style: italic;
              color: #111827;
              line-height: 1.2;
            }

            .certMeta {
              position: absolute;
              top: 69.2%;
              left: 53.2%;
              transform: translateX(-50%);
              width: 72%;
              display: flex;
              justify-content: center;
              gap: 44px;
              text-align: center;
              font-family: Georgia, "Times New Roman", serif;
              font-size: 21px;
              font-style: italic;
              color: #111827;
              line-height: 1.2;
            }

            .certMeta b {
              font-weight: 900;
            }
          </style>
        </head>
        <body>
          <div class="printWrap">
            <img src="${bgUrl}" alt="Certificate" class="certificateBg" />

            <div class="certPresented">This Certificate is presented to</div>

            <div class="certStudentName">${studentName}</div>

            <div class="certLineOne">
  <span>for participating in </span>
  <b>Fundamental Test</b>
</div>

            <div class="certLineTwo">
              held on ${certificateDate} at Sangadi
            </div>

            <div class="certWish">
              Best wishes for all your future endeavours.
            </div>

            <div class="certMeta">
              <span><b>Batch Time</b> : ${batchTime}</span>
              <span><b>Score</b> : ${score}/${questions.length}</span>
            </div>
          </div>

          <script>
            const img = document.querySelector(".certificateBg");

            function startPrint() {
              setTimeout(() => {
                window.focus();
                window.print();
              }, 600);
            }

            if (img) {
              if (img.complete) {
                startPrint();
              } else {
                img.onload = startPrint;
                img.onerror = startPrint;
              }
            } else {
              startPrint();
            }

            window.onafterprint = () => {
              window.close();
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
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
          <div className="startBadge">ACTIVE TEST</div>
          <h1>{t.title}</h1>
          <p className="studentLine">Student: {studentName}</p>

          <div className="startForm">
            <label>{t.selectLanguage}</label>

            <div className="languageBox">
              <button
                type="button"
                className={language === "mr" ? "langBtn activeLang" : "langBtn"}
                onClick={() => setLanguage("mr")}
              >
                मराठी
              </button>

              <button
                type="button"
                className={language === "en" ? "langBtn activeLang" : "langBtn"}
                onClick={() => setLanguage("en")}
              >
                English
              </button>
            </div>

            <label>{t.batchTime}</label>
            <input
              value={batchTime}
              onChange={(e) => setBatchTime(e.target.value)}
              placeholder={t.typeBatch}
            />
          </div>

          <div className="rulesGrid">
            <div>
              <b>25</b>
              <span>{t.totalQuestions}</span>
            </div>
            <div>
              <b>30s</b>
              <span>{t.eachQuestion}</span>
            </div>
            <div>
              <b>0</b>
              <span>{t.timeOverMarks}</span>
            </div>
          </div>

          {warning && <div className="warningBox startWarning">{warning}</div>}

          <button onClick={startExam} className="startExamBtn">
            {t.startExam}
          </button>

          <Link href="/online-test" className="backLink">
            Back to Online Test
          </Link>
        </section>

        <style jsx>{styles}</style>

        <style jsx global>{`
  body.exam-fullscreen-mode nav,
  body.exam-fullscreen-mode header,
  body.exam-fullscreen-mode .navbar {
    display: none !important;
  }

  body.exam-fullscreen-mode {
    overflow-x: hidden;
  }
`}</style>
      </main>
    );
  }

  if (isFinished) {
    return (
      <main className="examPage">
        <section className="resultWrapper">
          <div className="resultTop">
            <span className="badge">TEST RESULT</span>
            <h1>Computer Fundamental Test Result</h1>
            <p>Student Name: {studentName}</p>
            <p>Batch Time: {batchTime}</p>
            <p>Language: {language === "mr" ? "Marathi" : "English"}</p>
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
            {score >= 20
              ? "Excellent! तुमची तयारी खूप चांगली आहे."
              : score >= 13
              ? "Good! अजून थोडी practice केल्यास अजून चांगला score येईल."
              : "Practice आवश्यक आहे. पुन्हा test solve करा."}
          </p>

          <div className="resultButtons">
            <button onClick={restartTest}>Retake Test</button>

            <Link href="/online-test">Back to Online Test</Link>

            <button onClick={() => setShowCertificate(true)} className="certificateBtn">
              View Certificate
            </button>
          </div>

          {showCertificate && (
            <div className="certificateSection">
              <div className="certificateActions">
                <button onClick={handlePrintCertificate}>Print Certificate</button>
                <button onClick={() => setShowCertificate(false)}>Close</button>
              </div>

              <div className="certificatePrintArea" ref={certificateRef}>
                <img
                  src="/certificate-bg.jpg"
                  alt="Certificate"
                  className="certificateBg"
                />

                <div className="certPresented">
                  This Certificate is presented to
                </div>

                <div className="certStudentName">
                  {studentName}
                </div>

                <div className="certLineOne">
  <span>for participating in</span>
  <b>Fundamental Test</b>
</div>

                <div className="certLineTwo">
                  held on {certificateDate} at Sangadi
                </div>

                <div className="certWish">
                  Best wishes for all your future endeavours.
                </div>

                <div className="certMeta">
                  <span>
                    <b>Batch Time</b> : {batchTime}
                  </span>

                  <span>
                    <b>Score</b> : {score}/{questions.length}
                  </span>
                </div>
              </div>
            </div>
          )}

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

<style jsx global>{`
  body.exam-fullscreen-mode nav,
  body.exam-fullscreen-mode header,
  body.exam-fullscreen-mode footer,
  body.exam-fullscreen-mode .navbar,
  body.exam-fullscreen-mode .top-notification,
  body.exam-fullscreen-mode .TopNotification,
  body.exam-fullscreen-mode .footer {
    display: none !important;
  }

  body.exam-fullscreen-mode {
    margin: 0 !important;
    padding: 0 !important;
    overflow-x: hidden !important;
  }

  body.exam-fullscreen-mode .examPage {
    min-height: 100vh !important;
    padding-top: 8px !important;
  }
`}</style>
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
                <em>{batchTime}</em>
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
            <h2>{currentQuestion.question[language]}</h2>

            <div className="optionsWrap">
              {currentQuestion.options[language].map((option, index) => (
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
            <p>{t.bottom}</p>

            <button onClick={() => handleNext(false)} className="nextBtn">
              {currentIndex + 1 === questions.length ? t.submit : t.next}
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

      <style jsx global>{`
        body.exam-fullscreen-mode nav,
        body.exam-fullscreen-mode header,
        body.exam-fullscreen-mode footer,
        body.exam-fullscreen-mode .navbar,
        body.exam-fullscreen-mode .top-notification,
        body.exam-fullscreen-mode .TopNotification,
        body.exam-fullscreen-mode .footer {
          display: none !important;
        }

        body.exam-fullscreen-mode {
          margin: 0 !important;
          padding: 0 !important;
          overflow-x: hidden !important;
        }

        body.exam-fullscreen-mode .examPage {
          min-height: 100vh !important;
          padding-top: 8px !important;
        }
      `}</style>
    </main>
  );
}

const styles = `
  .examPage {
    min-height: 100vh;
    padding: 8px 10px 12px;
    background: linear-gradient(135deg, #eef6ff, #fff7ed);
    font-family: Arial, sans-serif;
  }

  .startCard {
    max-width: 700px;
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

  .startForm {
    max-width: 520px;
    margin: 0 auto 14px;
    text-align: left;
    display: grid;
    gap: 9px;
  }

  .startForm label {
    font-size: 14px;
    font-weight: 900;
    color: #0f172a;
  }

  .startForm input {
    width: 100%;
    padding: 13px 14px;
    border: 1px solid #cbd5e1;
    border-radius: 14px;
    font-size: 15px;
    outline: none;
  }

  .languageBox {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .langBtn {
    border: 1px solid #cbd5e1;
    background: #f8fafc;
    color: #0f172a;
    padding: 13px;
    border-radius: 14px;
    font-size: 16px;
    font-weight: 950;
    cursor: pointer;
  }

  .activeLang {
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    color: white;
    border-color: #2563eb;
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
    box-shadow: 0 7px 16px rgba(37, 99, 235, 0.22), 0 0 0 4px #dbeafe;
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

  .studentMiniText em {
    display: block;
    color: #64748b;
    font-style: normal;
    font-size: 12px;
    font-weight: 800;
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

  .startWarning {
    max-width: 520px;
    margin: 10px auto;
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
    background: linear-gradient(#ffffff, #ffffff) padding-box, linear-gradient(135deg, #2563eb, #16a34a, #f97316) border-box;
    border: 2px solid transparent;
    position: relative;
    overflow: hidden;
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
  }

  .qNumber.pending {
    background: linear-gradient(135deg, #ffffff, #f1f5f9);
    color: #334155;
    border: 1px solid #cbd5e1;
  }

  .qNumber.current {
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    color: #ffffff;
    animation: pulseCurrent 1s infinite;
  }

  .qNumber.solved {
    background: linear-gradient(135deg, #22c55e, #16a34a);
    color: #ffffff;
  }

  .qNumber.timeover {
    background: linear-gradient(135deg, #ef4444, #dc2626);
    color: #ffffff;
  }

  .legend {
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
  }

  .dot {
    width: 13px;
    height: 13px;
    border-radius: 50%;
    display: inline-block;
    flex-shrink: 0;
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

  .certificateBtn {
    background: linear-gradient(135deg, #f97316, #dc2626) !important;
    color: #ffffff !important;
  }

  .certificateSection {
    margin-top: 24px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 18px;
    padding: 16px;
  }

  .certificateActions {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 14px;
    flex-wrap: wrap;
  }

  .certificateActions button {
    border: none;
    background: #0f172a;
    color: #ffffff;
    padding: 11px 18px;
    border-radius: 13px;
    font-size: 15px;
    font-weight: 900;
    cursor: pointer;
  }

  .certificateActions button:first-child {
    background: linear-gradient(135deg, #16a34a, #15803d);
  }

  .certificatePrintArea {
    width: 100%;
    max-width: 1050px;
    margin: 0 auto;
    position: relative;
    background: #ffffff;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid #cbd5e1;
    box-shadow: 0 12px 30px rgba(15, 23, 42, 0.12);
  }

  .certificateBg {
    width: 100%;
    display: block;
  }

  .certPresented {
  position: absolute;
  top: 39.8%;
  left: 52.4%;
  transform: translateX(-50%);
  width: 78%;
  text-align: center;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 22px;
  font-style: italic;
  color: #111827;
  line-height: 1.2;
}

.certStudentName {
  position: absolute;
  top: 45.2%;
  left: 52.4%;
  transform: translateX(-50%);
  width: 82%;
  text-align: center;
  font-size: 32px;
  font-weight: 950;
  color: #2b74b8;
  font-family: Arial, sans-serif;
  line-height: 1.1;
}

.certLineOne {
  position: absolute;
  top: 52.6%;
  left: 52.4%;
  transform: translateX(-50%);
  width: 82%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  text-align: center;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 21px;
  font-style: italic;
  color: #111827;
  line-height: 1.2;
}

.certLineOne span {
  display: inline-block;
  font-weight: 500;
}

.certLineOne b {
  display: inline-block;
  font-weight: 900;
  color: #111827;
}

.certLineTwo {
  position: absolute;
  top: 58.2%;
  left: 52.4%;
  transform: translateX(-50%);
  width: 82%;
  text-align: center;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 20px;
  font-style: italic;
  color: #111827;
  line-height: 1.2;
}

.certWish {
  position: absolute;
  top: 63.4%;
  left: 52.4%;
  transform: translateX(-50%);
  width: 82%;
  text-align: center;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 20px;
  font-style: italic;
  color: #111827;
  line-height: 1.2;
}

.certMeta {
  position: absolute;
  top: 69.2%;
  left: 52.4%;
  transform: translateX(-50%);
  width: 72%;
  display: flex;
  justify-content: center;
  gap: 44px;
  text-align: center;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 21px;
  font-style: italic;
  color: #111827;
  line-height: 1.2;
}

.certMeta b {
  font-weight: 900;
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

    .rulesGrid,
    .languageBox {
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

    .certificateSection {
      padding: 8px;
    }

    .certPresented {
      top: 39.8%;
      left: 53.2%;
      font-size: 9.5px;
    }

    .certStudentName {
      top: 45%;
      left: 53.2%;
      font-size: 14px;
    }

    .certLineOne {
      top: 52.5%;
      left: 53.2%;
      font-size: 10px;
    }

    .certLineTwo {
      top: 58%;
      left: 53.2%;
      font-size: 8.8px;
    }

    .certWish {
      top: 63.2%;
      left: 53.2%;
      font-size: 8.8px;
    }

    .certMeta {
      top: 69%;
      left: 53.2%;
      width: 78%;
      gap: 12px;
      font-size: 8.8px;
    }
  }
`;