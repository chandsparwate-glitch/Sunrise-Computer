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

const questionBank: Question[] = [
  {
    question: { mr: "Input Device म्हणजे काय?", en: "What is an input device?" },
    options: { mr: ["Computer मध्ये data/command देण्यासाठी वापरले जाणारे device", "Computer मधून result दाखवणारे device", "फक्त data save करणारे device", "फक्त power देणारे device"], en: ["A device used to enter data/commands into a computer", "A device that shows output from a computer", "A device used only to save data", "A device used only to provide power"] },
    answer: { mr: "Computer मध्ये data/command देण्यासाठी वापरले जाणारे device", en: "A device used to enter data/commands into a computer" },
  },
  {
    question: { mr: "Output Device म्हणजे काय?", en: "What is an output device?" },
    options: { mr: ["Computer मधून result/user ला information देणारे device", "Computer मध्ये data टाकणारे device", "फक्त keyboard", "फक्त storage device"], en: ["A device that gives/shows result or information from a computer", "A device used to enter data into a computer", "Only keyboard", "Only storage device"] },
    answer: { mr: "Computer मधून result/user ला information देणारे device", en: "A device that gives/shows result or information from a computer" },
  },
  {
    question: { mr: "Keyboard कोणत्या प्रकारचे device आहे?", en: "Keyboard is which type of device?" },
    options: { mr: ["Input Device", "Output Device", "Storage Device", "Processing Device"], en: ["Input Device", "Output Device", "Storage Device", "Processing Device"] },
    answer: { mr: "Input Device", en: "Input Device" },
  },
  {
    question: { mr: "Monitor कोणत्या प्रकारचे device आहे?", en: "Monitor is which type of device?" },
    options: { mr: ["Output Device", "Input Device", "Storage Device", "Power Device"], en: ["Output Device", "Input Device", "Storage Device", "Power Device"] },
    answer: { mr: "Output Device", en: "Output Device" },
  },
  {
    question: { mr: "Mouse चा उपयोग मुख्यतः कशासाठी होतो?", en: "What is the main use of a mouse?" },
    options: { mr: ["Pointer control आणि selection साठी", "Sound output साठी", "Printing साठी", "Data storage साठी"], en: ["To control pointer and selection", "For sound output", "For printing", "For data storage"] },
    answer: { mr: "Pointer control आणि selection साठी", en: "To control pointer and selection" },
  },
  {
    question: { mr: "Printer कोणत्या प्रकारचे device आहे?", en: "Printer is which type of device?" },
    options: { mr: ["Output Device", "Input Device", "Processing Device", "Memory Device"], en: ["Output Device", "Input Device", "Processing Device", "Memory Device"] },
    answer: { mr: "Output Device", en: "Output Device" },
  },
  {
    question: { mr: "Scanner चा उपयोग कशासाठी होतो?", en: "What is a scanner used for?" },
    options: { mr: ["कागदावरील text/photo computer मध्ये घेण्यासाठी", "Sound ऐकण्यासाठी", "Print काढण्यासाठी", "Power backup साठी"], en: ["To take paper text/photo into the computer", "To listen to sound", "To print documents", "For power backup"] },
    answer: { mr: "कागदावरील text/photo computer मध्ये घेण्यासाठी", en: "To take paper text/photo into the computer" },
  },
  {
    question: { mr: "Speaker कोणत्या प्रकारचे device आहे?", en: "Speaker is which type of device?" },
    options: { mr: ["Output Device", "Input Device", "Storage Device", "Input आणि Output दोन्ही नाही"], en: ["Output Device", "Input Device", "Storage Device", "Neither input nor output"] },
    answer: { mr: "Output Device", en: "Output Device" },
  },
  {
    question: { mr: "Microphone कोणत्या प्रकारचे device आहे?", en: "Microphone is which type of device?" },
    options: { mr: ["Input Device", "Output Device", "Storage Device", "Display Device"], en: ["Input Device", "Output Device", "Storage Device", "Display Device"] },
    answer: { mr: "Input Device", en: "Input Device" },
  },
  {
    question: { mr: "Webcam चा उपयोग कशासाठी होतो?", en: "What is a webcam used for?" },
    options: { mr: ["Photo/Video input घेण्यासाठी", "Hard copy print करण्यासाठी", "Sound output साठी", "Data backup साठी"], en: ["To capture photo/video input", "To print hard copy", "For sound output", "For data backup"] },
    answer: { mr: "Photo/Video input घेण्यासाठी", en: "To capture photo/video input" },
  },
  {
    question: { mr: "Touch Screen कोणत्या प्रकारचे device आहे?", en: "Touch screen is which type of device?" },
    options: { mr: ["Input आणि Output दोन्ही", "फक्त Input", "फक्त Output", "Storage Device"], en: ["Both Input and Output", "Only Input", "Only Output", "Storage Device"] },
    answer: { mr: "Input आणि Output दोन्ही", en: "Both Input and Output" },
  },
  {
    question: { mr: "Plotter कोणत्या प्रकारचे device आहे?", en: "Plotter is which type of device?" },
    options: { mr: ["Output Device", "Input Device", "Memory Device", "Network Device"], en: ["Output Device", "Input Device", "Memory Device", "Network Device"] },
    answer: { mr: "Output Device", en: "Output Device" },
  },
  {
    question: { mr: "Joystick चा उपयोग मुख्यतः कशासाठी होतो?", en: "What is a joystick mainly used for?" },
    options: { mr: ["Games आणि control साठी input", "Printing साठी", "Sound output साठी", "Document save करण्यासाठी"], en: ["Input for games and control", "For printing", "For sound output", "To save documents"] },
    answer: { mr: "Games आणि control साठी input", en: "Input for games and control" },
  },
  {
    question: { mr: "Barcode Reader कोणत्या प्रकारचे device आहे?", en: "Barcode reader is which type of device?" },
    options: { mr: ["Input Device", "Output Device", "Display Device", "Power Device"], en: ["Input Device", "Output Device", "Display Device", "Power Device"] },
    answer: { mr: "Input Device", en: "Input Device" },
  },
  {
    question: { mr: "OMR चा full form काय आहे?", en: "What is the full form of OMR?" },
    options: { mr: ["Optical Mark Recognition", "Online Mark Reader", "Output Machine Reader", "Optical Memory Register"], en: ["Optical Mark Recognition", "Online Mark Reader", "Output Machine Reader", "Optical Memory Register"] },
    answer: { mr: "Optical Mark Recognition", en: "Optical Mark Recognition" },
  },
  {
    question: { mr: "OCR चा full form काय आहे?", en: "What is the full form of OCR?" },
    options: { mr: ["Optical Character Recognition", "Online Character Reader", "Output Code Reader", "Optical Computer RAM"], en: ["Optical Character Recognition", "Online Character Reader", "Output Code Reader", "Optical Computer RAM"] },
    answer: { mr: "Optical Character Recognition", en: "Optical Character Recognition" },
  },
  {
    question: { mr: "MICR मुख्यतः कुठे वापरतात?", en: "MICR is mainly used where?" },
    options: { mr: ["Bank cheque processing मध्ये", "Music output मध्ये", "Photo editing मध्ये", "Video calling मध्ये"], en: ["In bank cheque processing", "In music output", "In photo editing", "In video calling"] },
    answer: { mr: "Bank cheque processing मध्ये", en: "In bank cheque processing" },
  },
  {
    question: { mr: "Softcopy म्हणजे काय?", en: "What is a softcopy?" },
    options: { mr: ["Screen वर दिसणारा digital output", "Paper वर print केलेली copy", "Keyboard input", "Mouse pointer"], en: ["Digital output displayed on screen", "Printed copy on paper", "Keyboard input", "Mouse pointer"] },
    answer: { mr: "Screen वर दिसणारा digital output", en: "Digital output displayed on screen" },
  },
  {
    question: { mr: "Hardcopy म्हणजे काय?", en: "What is a hardcopy?" },
    options: { mr: ["Paper वर print केलेली copy", "Screen वर दिसणारी file", "Sound output", "Touch input"], en: ["Printed copy on paper", "File shown on screen", "Sound output", "Touch input"] },
    answer: { mr: "Paper वर print केलेली copy", en: "Printed copy on paper" },
  },
  {
    question: { mr: "VDU म्हणजे काय?", en: "What does VDU mean?" },
    options: { mr: ["Visual Display Unit", "Video Data Unit", "Virtual Disk Utility", "Voice Display User"], en: ["Visual Display Unit", "Video Data Unit", "Virtual Disk Utility", "Voice Display User"] },
    answer: { mr: "Visual Display Unit", en: "Visual Display Unit" },
  },
  {
    question: { mr: "Monitor ला दुसऱ्या नावाने काय म्हणतात?", en: "Monitor is also called what?" },
    options: { mr: ["VDU", "CPU", "UPS", "ROM"], en: ["VDU", "CPU", "UPS", "ROM"] },
    answer: { mr: "VDU", en: "VDU" },
  },
  {
    question: { mr: "Laser Printer कोणत्या technology वर काम करते?", en: "Laser printer works on which technology?" },
    options: { mr: ["Laser beam आणि toner", "Ink spray only", "Magnetic tape", "Touch sensor"], en: ["Laser beam and toner", "Ink spray only", "Magnetic tape", "Touch sensor"] },
    answer: { mr: "Laser beam आणि toner", en: "Laser beam and toner" },
  },
  {
    question: { mr: "Inkjet Printer मध्ये print करण्यासाठी काय वापरले जाते?", en: "What is used for printing in an inkjet printer?" },
    options: { mr: ["Ink droplets", "Laser only", "Magnetic ink only", "Heat only"], en: ["Ink droplets", "Laser only", "Magnetic ink only", "Heat only"] },
    answer: { mr: "Ink droplets", en: "Ink droplets" },
  },
  {
    question: { mr: "Dot Matrix Printer कसा printer आहे?", en: "Dot Matrix Printer is what type of printer?" },
    options: { mr: ["Impact Printer", "Non-impact Printer", "Laser Printer", "Thermal Printer only"], en: ["Impact Printer", "Non-impact Printer", "Laser Printer", "Thermal Printer only"] },
    answer: { mr: "Impact Printer", en: "Impact Printer" },
  },
  {
    question: { mr: "Impact Printer चे उदाहरण कोणते?", en: "Which is an example of an impact printer?" },
    options: { mr: ["Dot Matrix Printer", "Laser Printer", "Inkjet Printer", "LED Monitor"], en: ["Dot Matrix Printer", "Laser Printer", "Inkjet Printer", "LED Monitor"] },
    answer: { mr: "Dot Matrix Printer", en: "Dot Matrix Printer" },
  },
  {
    question: { mr: "Non-impact Printer चे उदाहरण कोणते?", en: "Which is an example of a non-impact printer?" },
    options: { mr: ["Laser Printer", "Dot Matrix Printer", "Keyboard", "Mouse"], en: ["Laser Printer", "Dot Matrix Printer", "Keyboard", "Mouse"] },
    answer: { mr: "Laser Printer", en: "Laser Printer" },
  },
  {
    question: { mr: "Headphone कोणत्या प्रकारचे device आहे?", en: "Headphone is which type of device?" },
    options: { mr: ["Output Device", "Input Device", "Storage Device", "Processing Device"], en: ["Output Device", "Input Device", "Storage Device", "Processing Device"] },
    answer: { mr: "Output Device", en: "Output Device" },
  },
  {
    question: { mr: "Projector कोणत्या प्रकारचे device आहे?", en: "Projector is which type of device?" },
    options: { mr: ["Output Device", "Input Device", "Memory Device", "Scanner"], en: ["Output Device", "Input Device", "Memory Device", "Scanner"] },
    answer: { mr: "Output Device", en: "Output Device" },
  },
  {
    question: { mr: "Light Pen कोणत्या प्रकारचे device आहे?", en: "Light pen is which type of device?" },
    options: { mr: ["Input Device", "Output Device", "Storage Device", "Printer"], en: ["Input Device", "Output Device", "Storage Device", "Printer"] },
    answer: { mr: "Input Device", en: "Input Device" },
  },
  {
    question: { mr: "Trackball कोणत्या device सारखे काम करते?", en: "Trackball works similar to which device?" },
    options: { mr: ["Mouse", "Printer", "Monitor", "Speaker"], en: ["Mouse", "Printer", "Monitor", "Speaker"] },
    answer: { mr: "Mouse", en: "Mouse" },
  },
  {
    question: { mr: "Digitizer/Graphics Tablet चा उपयोग कशासाठी होतो?", en: "Digitizer/Graphics tablet is used for what?" },
    options: { mr: ["Drawing/design input साठी", "Sound output साठी", "Hard disk format साठी", "Printing साठी"], en: ["For drawing/design input", "For sound output", "For hard disk format", "For printing"] },
    answer: { mr: "Drawing/design input साठी", en: "For drawing/design input" },
  },
  {
    question: { mr: "Card Reader कोणत्या प्रकारचे device आहे?", en: "Card reader is which type of device?" },
    options: { mr: ["Input Device", "Output Device", "Display Device", "Speaker"], en: ["Input Device", "Output Device", "Display Device", "Speaker"] },
    answer: { mr: "Input Device", en: "Input Device" },
  },
  {
    question: { mr: "Biometric Scanner चा उपयोग कशासाठी होतो?", en: "What is a biometric scanner used for?" },
    options: { mr: ["Fingerprint/identity input साठी", "Printout साठी", "Music साठी", "Screen display साठी"], en: ["For fingerprint/identity input", "For printout", "For music", "For screen display"] },
    answer: { mr: "Fingerprint/identity input साठी", en: "For fingerprint/identity input" },
  },
  {
    question: { mr: "QR Code Scanner कोणत्या प्रकारचे device आहे?", en: "QR code scanner is which type of device?" },
    options: { mr: ["Input Device", "Output Device", "Processing Device", "Memory Device"], en: ["Input Device", "Output Device", "Processing Device", "Memory Device"] },
    answer: { mr: "Input Device", en: "Input Device" },
  },
  {
    question: { mr: "Input चे example कोणते?", en: "Which is an example of input?" },
    options: { mr: ["Keyboard ने नाव type करणे", "Monitor वर result दिसणे", "Printer ने print काढणे", "Speaker मधून आवाज येणे"], en: ["Typing a name using keyboard", "Seeing result on monitor", "Taking print from printer", "Hearing sound from speaker"] },
    answer: { mr: "Keyboard ने नाव type करणे", en: "Typing a name using keyboard" },
  },
  {
    question: { mr: "Output चे example कोणते?", en: "Which is an example of output?" },
    options: { mr: ["Monitor वर result दिसणे", "Keyboard ने data टाकणे", "Mouse click करणे", "Scanner ने photo scan करणे"], en: ["Result displayed on monitor", "Entering data using keyboard", "Mouse click", "Scanning photo using scanner"] },
    answer: { mr: "Monitor वर result दिसणे", en: "Result displayed on monitor" },
  },
  {
    question: { mr: "CPU कोणत्या प्रकारचा भाग आहे?", en: "CPU is which type of component?" },
    options: { mr: ["Processing Device", "Input Device", "Output Device", "Only Storage Device"], en: ["Processing Device", "Input Device", "Output Device", "Only Storage Device"] },
    answer: { mr: "Processing Device", en: "Processing Device" },
  },
  {
    question: { mr: "Pen Drive कोणत्या प्रकारचे device आहे?", en: "Pen drive is which type of device?" },
    options: { mr: ["Storage Device", "Input Device", "Output Device", "Processing Device"], en: ["Storage Device", "Input Device", "Output Device", "Processing Device"] },
    answer: { mr: "Storage Device", en: "Storage Device" },
  },
  {
    question: { mr: "Keyboard वरील Enter key चा उपयोग काय?", en: "What is the use of Enter key on keyboard?" },
    options: { mr: ["Command confirm/new line साठी", "Screen बंद करण्यासाठी", "Sound वाढवण्यासाठी", "Print काढण्यासाठी"], en: ["To confirm command/new line", "To turn off screen", "To increase sound", "To print"] },
    answer: { mr: "Command confirm/new line साठी", en: "To confirm command/new line" },
  },
  {
    question: { mr: "Keyboard वरील Backspace key चा उपयोग काय?", en: "What is the use of Backspace key?" },
    options: { mr: ["डावीकडील character delete करण्यासाठी", "Print काढण्यासाठी", "Sound play करण्यासाठी", "Mouse move करण्यासाठी"], en: ["To delete character on the left", "To print", "To play sound", "To move mouse"] },
    answer: { mr: "डावीकडील character delete करण्यासाठी", en: "To delete character on the left" },
  },
  {
    question: { mr: "Keyboard वरील Caps Lock key चा उपयोग काय?", en: "What is the use of Caps Lock key?" },
    options: { mr: ["Capital letters type करण्यासाठी", "Computer restart करण्यासाठी", "Print preview साठी", "Speaker mute साठी"], en: ["To type capital letters", "To restart computer", "For print preview", "To mute speaker"] },
    answer: { mr: "Capital letters type करण्यासाठी", en: "To type capital letters" },
  },
  {
    question: { mr: "Mouse मधील left click चा उपयोग काय?", en: "What is the use of left click of mouse?" },
    options: { mr: ["Select/open करण्यासाठी", "Only delete करण्यासाठी", "Print करण्यासाठी", "Sound record करण्यासाठी"], en: ["To select/open", "Only to delete", "To print", "To record sound"] },
    answer: { mr: "Select/open करण्यासाठी", en: "To select/open" },
  },
  {
    question: { mr: "Mouse मधील right click चा उपयोग काय?", en: "What is the use of right click of mouse?" },
    options: { mr: ["Shortcut/context menu उघडण्यासाठी", "Text type करण्यासाठी", "Sound output साठी", "Screen clean करण्यासाठी"], en: ["To open shortcut/context menu", "To type text", "For sound output", "To clean screen"] },
    answer: { mr: "Shortcut/context menu उघडण्यासाठी", en: "To open shortcut/context menu" },
  },
  {
    question: { mr: "Mouse scroll wheel चा उपयोग काय?", en: "What is the use of mouse scroll wheel?" },
    options: { mr: ["Page वर-खाली scroll करण्यासाठी", "Typing करण्यासाठी", "Print काढण्यासाठी", "Recording करण्यासाठी"], en: ["To scroll page up and down", "For typing", "To print", "For recording"] },
    answer: { mr: "Page वर-खाली scroll करण्यासाठी", en: "To scroll page up and down" },
  },
  {
    question: { mr: "Scanner ने तयार होणारी file साधारण कोणत्या स्वरूपात असू शकते?", en: "Scanner output can usually be in which form?" },
    options: { mr: ["Image/PDF file", "Only sound file", "Only printed paper", "Only keyboard signal"], en: ["Image/PDF file", "Only sound file", "Only printed paper", "Only keyboard signal"] },
    answer: { mr: "Image/PDF file", en: "Image/PDF file" },
  },
  {
    question: { mr: "Voice input साठी कोणते device वापरतात?", en: "Which device is used for voice input?" },
    options: { mr: ["Microphone", "Speaker", "Monitor", "Printer"], en: ["Microphone", "Speaker", "Monitor", "Printer"] },
    answer: { mr: "Microphone", en: "Microphone" },
  },
  {
    question: { mr: "Sound output साठी कोणते device वापरतात?", en: "Which device is used for sound output?" },
    options: { mr: ["Speaker", "Keyboard", "Scanner", "Mouse"], en: ["Speaker", "Keyboard", "Scanner", "Mouse"] },
    answer: { mr: "Speaker", en: "Speaker" },
  },
  {
    question: { mr: "Display output साठी कोणते device वापरतात?", en: "Which device is used for display output?" },
    options: { mr: ["Monitor", "Keyboard", "Mouse", "Microphone"], en: ["Monitor", "Keyboard", "Mouse", "Microphone"] },
    answer: { mr: "Monitor", en: "Monitor" },
  },
  {
    question: { mr: "Printed output साठी कोणते device वापरतात?", en: "Which device is used for printed output?" },
    options: { mr: ["Printer", "Keyboard", "Mouse", "Webcam"], en: ["Printer", "Keyboard", "Mouse", "Webcam"] },
    answer: { mr: "Printer", en: "Printer" },
  },
  {
    question: { mr: "POS machine मध्ये barcode/item data वाचण्यासाठी कोणते device वापरतात?", en: "Which device is used in POS machines to read barcode/item data?" },
    options: { mr: ["Barcode Scanner", "Speaker", "Plotter", "Projector"], en: ["Barcode Scanner", "Speaker", "Plotter", "Projector"] },
    answer: { mr: "Barcode Scanner", en: "Barcode Scanner" },
  },

];

const FINAL_TEST_QUESTION_COUNT = 25;

const shuffleArray = <T,>(items: T[]): T[] => {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const createFinalTestQuestions = (): Question[] => {
  return shuffleArray(questionBank).slice(0, FINAL_TEST_QUESTION_COUNT);
};

export default function InputOutputTestPage() {
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
  const [examQuestions, setExamQuestions] = useState<Question[]>(() => createFinalTestQuestions());

  const certificateRef = useRef<HTMLDivElement | null>(null);

  const [questionStatuses, setQuestionStatuses] = useState<QuestionStatus[]>(
    examQuestions.map((_, i) => (i === 0 ? "current" : "pending"))
  );

  const [submittedAnswers, setSubmittedAnswers] = useState<SubmittedAnswer[]>(
    examQuestions.map(() => null)
  );

  const currentQuestion = examQuestions[currentIndex];
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
    title: "Input Output Test",
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

  const openBrowserFullScreen = async () => {
    try {
      const element = document.documentElement;

      if (!document.fullscreenElement && element.requestFullscreen) {
        await element.requestFullscreen();
      }
    } catch {
      // Browser ने fullscreen block केला तरी test सुरू होईल
    }
  };

  const closeBrowserFullScreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch {
      // ignore
    }
  };

  const startExam = async () => {
    if (batchTime.trim() === "") {
      setWarning(language === "mr" ? "कृपया Batch Time टाका." : "Please enter Batch Time.");
      return;
    }

    const newQuestions = createFinalTestQuestions();
    setExamQuestions(newQuestions);
    setCurrentIndex(0);
    setSelectedAnswer("");
    setScore(0);
    setTimeLeft(30);
    setIsFinished(false);
    setShowCertificate(false);
    setQuestionStatuses(newQuestions.map((_, i) => (i === 0 ? "current" : "pending")));
    setSubmittedAnswers(newQuestions.map(() => null));

    localStorage.setItem("studentBatchTime", batchTime);
    localStorage.setItem("testLanguage", language);
    setWarning("");

    await openBrowserFullScreen();

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

    if (currentIndex + 1 < examQuestions.length) {
      updatedStatuses[currentIndex + 1] = "current";
      setQuestionStatuses(updatedStatuses);
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer("");
      setWarning("");
      setTimeLeft(30);
    } else {
      setQuestionStatuses(updatedStatuses);
      closeBrowserFullScreen();
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
    const newQuestions = createFinalTestQuestions();
    setExamQuestions(newQuestions);
    setQuestionStatuses(newQuestions.map((_, i) => (i === 0 ? "current" : "pending")));
    setSubmittedAnswers(newQuestions.map(() => null));
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
  <b>Input Output Test</b>
</div>

            <div class="certLineTwo">
              held on ${certificateDate} at Sangadi
            </div>

            <div class="certWish">
              Best wishes for all your future endeavours.
            </div>

            <div class="certMeta">
              <span><b>Batch Time</b> : ${batchTime}</span>
              <span><b>Score</b> : ${score}/${examQuestions.length}</span>
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
  const remainingCount = examQuestions.length - solvedCount;

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
  html.exam-fullscreen-mode nav,
  html.exam-fullscreen-mode header,
  html.exam-fullscreen-mode footer,
  html.exam-fullscreen-mode .navbar,
  html.exam-fullscreen-mode .top-notification,
  html.exam-fullscreen-mode .TopNotification,
  html.exam-fullscreen-mode .footer,
  body.exam-fullscreen-mode nav,
  body.exam-fullscreen-mode header,
  body.exam-fullscreen-mode footer,
  body.exam-fullscreen-mode .navbar,
  body.exam-fullscreen-mode .top-notification,
  body.exam-fullscreen-mode .TopNotification,
  body.exam-fullscreen-mode .footer {
    display: none !important;
  }

  html.exam-fullscreen-mode,
  body.exam-fullscreen-mode {
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
  }

  html.exam-fullscreen-mode .examPage,
  body.exam-fullscreen-mode .examPage {
    position: fixed !important;
    inset: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    min-height: 100vh !important;
    z-index: 999999 !important;
    padding: 8px 10px 12px !important;
    overflow-y: auto !important;
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
            <h1>Input Output Test Result</h1>
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
              <h2>{examQuestions.length}</h2>
              <p>Total Questions</p>
            </div>
            <div className="statBox">
              <h2>{attemptedCount}</h2>
              <p>Attempted</p>
            </div>
            <div className="statBox">
              <h2>{examQuestions.length - score}</h2>
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
  <b>Input Output Test</b>
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
                    <b>Score</b> : {score}/{examQuestions.length}
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
              Question {currentIndex + 1} / {examQuestions.length}
            </div>

            <div className={timeLeft <= 10 ? "timerCircle danger" : "timerCircle"}>
              <small>Time</small>
              <strong>{timeLeft}s</strong>
            </div>
          </div>

          <div className="progressWrap">
            <div
              className="progressBar"
              style={{ width: `${((currentIndex + 1) / examQuestions.length) * 100}%` }}
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
              {currentIndex + 1 === examQuestions.length ? t.submit : t.next}
            </button>
          </div>
        </section>

        <aside className="rightPanel">
          <div className="panelCard">
            <h2>Question Panel</h2>

            <div className="summaryMini">
              <div>
                <b>{examQuestions.length}</b>
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
        html.exam-fullscreen-mode nav,
        html.exam-fullscreen-mode header,
        html.exam-fullscreen-mode footer,
        html.exam-fullscreen-mode .navbar,
        html.exam-fullscreen-mode .top-notification,
        html.exam-fullscreen-mode .TopNotification,
        html.exam-fullscreen-mode .footer,
        body.exam-fullscreen-mode nav,
        body.exam-fullscreen-mode header,
        body.exam-fullscreen-mode footer,
        body.exam-fullscreen-mode .navbar,
        body.exam-fullscreen-mode .top-notification,
        body.exam-fullscreen-mode .TopNotification,
        body.exam-fullscreen-mode .footer {
          display: none !important;
        }

        html.exam-fullscreen-mode,
        body.exam-fullscreen-mode {
          margin: 0 !important;
          padding: 0 !important;
          overflow: hidden !important;
        }

        html.exam-fullscreen-mode .examPage,
        body.exam-fullscreen-mode .examPage {
          position: fixed !important;
          inset: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          min-height: 100vh !important;
          z-index: 999999 !important;
          padding: 8px 10px 12px !important;
          overflow-y: auto !important;
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