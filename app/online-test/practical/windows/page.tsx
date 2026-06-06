"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Lang = "mr" | "en";
type QuestionStatus = "pending" | "current" | "solved" | "timeover";

type Question = {
  question: { mr: string; en: string };
  options: { mr: string[]; en: string[] };
  answer: { mr: string; en: string };
};

type SubmittedAnswer = {
  question: string;
  selected: string;
  correct: string;
  marks: number;
  status: "answered" | "timeover";
} | null;

const FINAL_TEST_QUESTION_COUNT = 25;

const questionBank: Question[] = [
  {
    question: { mr: "Windows मध्ये file किंवा folder चे नाव बदलण्यासाठी कोणता option वापरतात?", en: "Which option is used to change the name of a file or folder in Windows?" },
    options: { mr: ["Copy", "Rename", "Delete", "Paste"], en: ["Copy", "Rename", "Delete", "Paste"] },
    answer: { mr: "Rename", en: "Rename" },
  },
  {
    question: { mr: "Rename करण्यासाठी shortcut key कोणती आहे?", en: "Which shortcut key is used to Rename?" },
    options: { mr: ["F1", "F2", "F5", "F12"], en: ["F1", "F2", "F5", "F12"] },
    answer: { mr: "F2", en: "F2" },
  },
  {
    question: { mr: "File delete करण्यासाठी keyboard वर कोणती key वापरतात?", en: "Which key is used on keyboard to delete a file?" },
    options: { mr: ["Enter", "Spacebar", "Delete", "Tab"], en: ["Enter", "Spacebar", "Delete", "Tab"] },
    answer: { mr: "Delete", en: "Delete" },
  },
  {
    question: { mr: "Delete केलेली file साधारणपणे कुठे जाते?", en: "Where does a deleted file usually go?" },
    options: { mr: ["This PC", "Recycle Bin", "Control Panel", "Taskbar"], en: ["This PC", "Recycle Bin", "Control Panel", "Taskbar"] },
    answer: { mr: "Recycle Bin", en: "Recycle Bin" },
  },
  {
    question: { mr: "File कायमची delete करण्यासाठी कोणती shortcut key वापरतात?", en: "Which shortcut key is used to permanently delete a file?" },
    options: { mr: ["Ctrl + D", "Shift + Delete", "Alt + Delete", "Ctrl + Shift"], en: ["Ctrl + D", "Shift + Delete", "Alt + Delete", "Ctrl + Shift"] },
    answer: { mr: "Shift + Delete", en: "Shift + Delete" },
  },
  {
    question: { mr: "Copy करण्यासाठी shortcut key कोणती आहे?", en: "Which shortcut key is used for Copy?" },
    options: { mr: ["Ctrl + C", "Ctrl + V", "Ctrl + X", "Ctrl + P"], en: ["Ctrl + C", "Ctrl + V", "Ctrl + X", "Ctrl + P"] },
    answer: { mr: "Ctrl + C", en: "Ctrl + C" },
  },
  {
    question: { mr: "Paste करण्यासाठी shortcut key कोणती आहे?", en: "Which shortcut key is used for Paste?" },
    options: { mr: ["Ctrl + C", "Ctrl + V", "Ctrl + X", "Ctrl + S"], en: ["Ctrl + C", "Ctrl + V", "Ctrl + X", "Ctrl + S"] },
    answer: { mr: "Ctrl + V", en: "Ctrl + V" },
  },
  {
    question: { mr: "Cut करण्यासाठी shortcut key कोणती आहे?", en: "Which shortcut key is used for Cut?" },
    options: { mr: ["Ctrl + X", "Ctrl + C", "Ctrl + V", "Ctrl + A"], en: ["Ctrl + X", "Ctrl + C", "Ctrl + V", "Ctrl + A"] },
    answer: { mr: "Ctrl + X", en: "Ctrl + X" },
  },
  {
    question: { mr: "Copy आणि Cut मध्ये फरक काय आहे?", en: "What is the difference between Copy and Cut?" },
    options: { mr: ["Copy file duplicate करते, Cut file move करण्यासाठी वापरतात", "Copy file delete करते", "Cut file print करते", "दोन्ही सारखेच आहेत"], en: ["Copy duplicates a file, Cut is used to move a file", "Copy deletes a file", "Cut prints a file", "Both are same"] },
    answer: { mr: "Copy file duplicate करते, Cut file move करण्यासाठी वापरतात", en: "Copy duplicates a file, Cut is used to move a file" },
  },
  {
    question: { mr: "File दुसऱ्या location ला हलवण्यासाठी कोणता option वापरतात?", en: "Which option is used to move a file to another location?" },
    options: { mr: ["Copy + Paste", "Cut + Paste", "Rename", "Refresh"], en: ["Copy + Paste", "Cut + Paste", "Rename", "Refresh"] },
    answer: { mr: "Cut + Paste", en: "Cut + Paste" },
  },
  {
    question: { mr: "File ची duplicate copy तयार करण्यासाठी कोणता option वापरतात?", en: "Which option is used to create a duplicate copy of a file?" },
    options: { mr: ["Copy + Paste", "Cut + Paste", "Delete", "Rename"], en: ["Copy + Paste", "Cut + Paste", "Delete", "Rename"] },
    answer: { mr: "Copy + Paste", en: "Copy + Paste" },
  },
  {
    question: { mr: "सर्व files select करण्यासाठी shortcut key कोणती आहे?", en: "Which shortcut key is used to select all files?" },
    options: { mr: ["Ctrl + A", "Ctrl + S", "Ctrl + F", "Ctrl + Z"], en: ["Ctrl + A", "Ctrl + S", "Ctrl + F", "Ctrl + Z"] },
    answer: { mr: "Ctrl + A", en: "Ctrl + A" },
  },
  {
    question: { mr: "चुकीने केलेली action परत मागे घेण्यासाठी कोणती shortcut key वापरतात?", en: "Which shortcut key is used to undo a wrong action?" },
    options: { mr: ["Ctrl + Y", "Ctrl + Z", "Ctrl + C", "Ctrl + X"], en: ["Ctrl + Y", "Ctrl + Z", "Ctrl + C", "Ctrl + X"] },
    answer: { mr: "Ctrl + Z", en: "Ctrl + Z" },
  },
  {
    question: { mr: "Undo केलेली action पुन्हा करण्यासाठी कोणती shortcut key वापरतात?", en: "Which shortcut key is used to redo an undone action?" },
    options: { mr: ["Ctrl + Y", "Ctrl + Z", "Ctrl + V", "Ctrl + A"], en: ["Ctrl + Y", "Ctrl + Z", "Ctrl + V", "Ctrl + A"] },
    answer: { mr: "Ctrl + Y", en: "Ctrl + Y" },
  },
  {
    question: { mr: "New folder तयार करण्यासाठी कोणता option वापरतात?", en: "Which option is used to create a new folder?" },
    options: { mr: ["New > Folder", "Delete", "Rename", "Open"], en: ["New > Folder", "Delete", "Rename", "Open"] },
    answer: { mr: "New > Folder", en: "New > Folder" },
  },
  {
    question: { mr: "New folder तयार करण्यासाठी shortcut key कोणती आहे?", en: "Which shortcut key is used to create a new folder?" },
    options: { mr: ["Ctrl + N", "Ctrl + Shift + N", "Ctrl + F", "Alt + F4"], en: ["Ctrl + N", "Ctrl + Shift + N", "Ctrl + F", "Alt + F4"] },
    answer: { mr: "Ctrl + Shift + N", en: "Ctrl + Shift + N" },
  },
  {
    question: { mr: "Folder म्हणजे काय?", en: "What is a folder?" },
    options: { mr: ["Files ठेवण्यासाठी जागा", "फक्त picture", "फक्त song", "फक्त shortcut"], en: ["A place to store files", "Only picture", "Only song", "Only shortcut"] },
    answer: { mr: "Files ठेवण्यासाठी जागा", en: "A place to store files" },
  },
  {
    question: { mr: "File म्हणजे काय?", en: "What is a file?" },
    options: { mr: ["Computer मध्ये save केलेली माहिती", "फक्त folder", "फक्त mouse", "फक्त monitor"], en: ["Information saved in a computer", "Only folder", "Only mouse", "Only monitor"] },
    answer: { mr: "Computer मध्ये save केलेली माहिती", en: "Information saved in a computer" },
  },
  {
    question: { mr: "This PC मध्ये काय दिसते?", en: "What is shown in This PC?" },
    options: { mr: ["Drives आणि folders", "फक्त internet", "फक्त games", "फक्त recycle bin"], en: ["Drives and folders", "Only internet", "Only games", "Only recycle bin"] },
    answer: { mr: "Drives आणि folders", en: "Drives and folders" },
  },
  {
    question: { mr: "This PC मधून आपण काय पाहू शकतो?", en: "What can we see from This PC?" },
    options: { mr: ["Hard disk drives", "Connected devices", "Folders", "All of these"], en: ["Hard disk drives", "Connected devices", "Folders", "All of these"] },
    answer: { mr: "All of these", en: "All of these" },
  },
  {
    question: { mr: "C: Drive साधारणपणे कशासाठी वापरला जातो?", en: "What is C: Drive usually used for?" },
    options: { mr: ["Windows system आणि programs साठी", "फक्त movies साठी", "फक्त pen drive साठी", "फक्त printer साठी"], en: ["For Windows system and programs", "Only for movies", "Only for pen drive", "Only for printer"] },
    answer: { mr: "Windows system आणि programs साठी", en: "For Windows system and programs" },
  },
  {
    question: { mr: "Pen drive connect केल्यावर ती कुठे दिसू शकते?", en: "Where can a pen drive appear after connecting?" },
    options: { mr: ["This PC मध्ये", "Paint मध्ये", "Calculator मध्ये", "Notepad मध्ये"], en: ["In This PC", "In Paint", "In Calculator", "In Notepad"] },
    answer: { mr: "This PC मध्ये", en: "In This PC" },
  },
  {
    question: { mr: "File extension म्हणजे काय?", en: "What is a file extension?" },
    options: { mr: ["File चा प्रकार दाखवणारा शेवटचा भाग", "Folder चा रंग", "Monitor size", "Mouse speed"], en: ["Last part that shows file type", "Folder color", "Monitor size", "Mouse speed"] },
    answer: { mr: "File चा प्रकार दाखवणारा शेवटचा भाग", en: "Last part that shows file type" },
  },
  {
    question: { mr: "Text file चे extension कोणते असते?", en: "What is the extension of a text file?" },
    options: { mr: [".txt", ".jpg", ".mp3", ".exe"], en: [".txt", ".jpg", ".mp3", ".exe"] },
    answer: { mr: ".txt", en: ".txt" },
  },
  {
    question: { mr: "Image file चे common extension कोणते आहे?", en: "Which is a common extension of an image file?" },
    options: { mr: [".jpg", ".docx", ".xlsx", ".pptx"], en: [".jpg", ".docx", ".xlsx", ".pptx"] },
    answer: { mr: ".jpg", en: ".jpg" },
  },
  {
    question: { mr: "Folder icon कशासाठी वापरले जाते?", en: "What is a folder icon used for?" },
    options: { mr: ["Folder ओळखण्यासाठी", "File delete करण्यासाठी", "Internet चालू करण्यासाठी", "Print काढण्यासाठी"], en: ["To identify a folder", "To delete a file", "To start internet", "To print"] },
    answer: { mr: "Folder ओळखण्यासाठी", en: "To identify a folder" },
  },
  {
    question: { mr: "Icon म्हणजे काय?", en: "What is an icon?" },
    options: { mr: ["Program, file किंवा folder दाखवणारे छोटे चित्र", "Keyboard ची key", "Monitor ची wire", "Printer चा भाग"], en: ["Small picture that represents program, file or folder", "A keyboard key", "Monitor wire", "Part of printer"] },
    answer: { mr: "Program, file किंवा folder दाखवणारे छोटे चित्र", en: "Small picture that represents program, file or folder" },
  },
  {
    question: { mr: "Desktop icons कुठे दिसतात?", en: "Where are desktop icons shown?" },
    options: { mr: ["Desktop वर", "CPU मध्ये", "Printer मध्ये", "Pen drive मध्ये"], en: ["On Desktop", "In CPU", "In Printer", "In pen drive"] },
    answer: { mr: "Desktop वर", en: "On Desktop" },
  },
  {
    question: { mr: "Program open करण्यासाठी icon वर काय करतात?", en: "What do we do on an icon to open a program?" },
    options: { mr: ["Double click", "Right click only", "Delete", "Rename"], en: ["Double click", "Right click only", "Delete", "Rename"] },
    answer: { mr: "Double click", en: "Double click" },
  },
  {
    question: { mr: "Right click केल्यावर काय दिसते?", en: "What appears after right click?" },
    options: { mr: ["Context menu", "Taskbar only", "Monitor setting only", "Nothing"], en: ["Context menu", "Taskbar only", "Monitor setting only", "Nothing"] },
    answer: { mr: "Context menu", en: "Context menu" },
  },
  {
    question: { mr: "File/Folder ची properties पाहण्यासाठी कोणता option वापरतात?", en: "Which option is used to view properties of a file/folder?" },
    options: { mr: ["Properties", "Paste", "Rename", "Copy"], en: ["Properties", "Paste", "Rename", "Copy"] },
    answer: { mr: "Properties", en: "Properties" },
  },
  {
    question: { mr: "Change Attribute साठी कोणता option वापरतात?", en: "Which option is used for Change Attribute?" },
    options: { mr: ["Properties", "Copy", "Delete", "Open"], en: ["Properties", "Copy", "Delete", "Open"] },
    answer: { mr: "Properties", en: "Properties" },
  },
  {
    question: { mr: "Read-only attribute चा अर्थ काय?", en: "What does Read-only attribute mean?" },
    options: { mr: ["File फक्त वाचता येते, सहज edit करता येत नाही", "File delete होते", "File copy होत नाही", "File print होत नाही"], en: ["File can be read only and cannot be easily edited", "File is deleted", "File is not copied", "File is not printed"] },
    answer: { mr: "File फक्त वाचता येते, सहज edit करता येत नाही", en: "File can be read only and cannot be easily edited" },
  },
  {
    question: { mr: "Hidden attribute चा उपयोग कशासाठी होतो?", en: "What is Hidden attribute used for?" },
    options: { mr: ["File/Folder hide करण्यासाठी", "File मोठी करण्यासाठी", "Folder rename करण्यासाठी", "Icon delete करण्यासाठी"], en: ["To hide a file/folder", "To enlarge a file", "To rename a folder", "To delete an icon"] },
    answer: { mr: "File/Folder hide करण्यासाठी", en: "To hide a file/folder" },
  },
  {
    question: { mr: "Hidden file दिसण्यासाठी कोणता option enable करावा लागतो?", en: "Which option should be enabled to see hidden files?" },
    options: { mr: ["Show hidden files", "Delete files", "Rename files", "Cut files"], en: ["Show hidden files", "Delete files", "Rename files", "Cut files"] },
    answer: { mr: "Show hidden files", en: "Show hidden files" },
  },
  {
    question: { mr: "Folder icon बदलण्यासाठी कोणत्या option मध्ये जातात?", en: "Which option is used to change folder icon?" },
    options: { mr: ["Properties > Customize > Change Icon", "Copy > Paste", "Delete > Rename", "View > Zoom"], en: ["Properties > Customize > Change Icon", "Copy > Paste", "Delete > Rename", "View > Zoom"] },
    answer: { mr: "Properties > Customize > Change Icon", en: "Properties > Customize > Change Icon" },
  },
  {
    question: { mr: "Change Icon option कशासाठी वापरतात?", en: "What is Change Icon used for?" },
    options: { mr: ["Folder किंवा shortcut चा icon बदलण्यासाठी", "File print करण्यासाठी", "File type बदलण्यासाठी", "Computer shutdown करण्यासाठी"], en: ["To change folder or shortcut icon", "To print file", "To change file type", "To shut down computer"] },
    answer: { mr: "Folder किंवा shortcut चा icon बदलण्यासाठी", en: "To change folder or shortcut icon" },
  },
  {
    question: { mr: "Shortcut icon कसा ओळखता येतो?", en: "How can a shortcut icon be identified?" },
    options: { mr: ["Icon वर छोटा arrow असतो", "Icon लाल असतो", "Icon दिसत नाही", "Icon नेहमी मोठा असतो"], en: ["It has a small arrow on the icon", "Icon is red", "Icon is invisible", "Icon is always large"] },
    answer: { mr: "Icon वर छोटा arrow असतो", en: "It has a small arrow on the icon" },
  },
  {
    question: { mr: "Shortcut म्हणजे काय?", en: "What is a shortcut?" },
    options: { mr: ["Program/File ला पटकन open करण्याचा link", "Original file delete करणारा option", "Hard disk", "Folder name"], en: ["A link to quickly open a program/file", "Option that deletes original file", "Hard disk", "Folder name"] },
    answer: { mr: "Program/File ला पटकन open करण्याचा link", en: "A link to quickly open a program/file" },
  },
  {
    question: { mr: "File search करण्यासाठी कोणता box वापरतात?", en: "Which box is used to search a file?" },
    options: { mr: ["Search box", "Formula bar", "Slide pane", "Chart area"], en: ["Search box", "Formula bar", "Slide pane", "Chart area"] },
    answer: { mr: "Search box", en: "Search box" },
  },
  {
    question: { mr: "File Explorer कशासाठी वापरतात?", en: "What is File Explorer used for?" },
    options: { mr: ["Files आणि folders manage करण्यासाठी", "फक्त painting करण्यासाठी", "फक्त music play करण्यासाठी", "फक्त calculation करण्यासाठी"], en: ["To manage files and folders", "Only for painting", "Only for playing music", "Only for calculation"] },
    answer: { mr: "Files आणि folders manage करण्यासाठी", en: "To manage files and folders" },
  },
  {
    question: { mr: "File Explorer open करण्यासाठी shortcut key कोणती आहे?", en: "Which shortcut key is used to open File Explorer?" },
    options: { mr: ["Windows + E", "Windows + R", "Ctrl + E", "Alt + E"], en: ["Windows + E", "Windows + R", "Ctrl + E", "Alt + E"] },
    answer: { mr: "Windows + E", en: "Windows + E" },
  },
  {
    question: { mr: "Desktop refresh करण्यासाठी कोणती key वापरतात?", en: "Which key is used to refresh desktop?" },
    options: { mr: ["F5", "F2", "F1", "F12"], en: ["F5", "F2", "F1", "F12"] },
    answer: { mr: "F5", en: "F5" },
  },
  {
    question: { mr: "Windows मध्ये file/folder arrange करण्यासाठी कोणता option वापरतात?", en: "Which option is used to arrange files/folders in Windows?" },
    options: { mr: ["Sort by", "Paint", "Calculator", "WordArt"], en: ["Sort by", "Paint", "Calculator", "WordArt"] },
    answer: { mr: "Sort by", en: "Sort by" },
  },
  {
    question: { mr: "File size पाहण्यासाठी कोणता option उपयोगी आहे?", en: "Which option is useful to see file size?" },
    options: { mr: ["Properties", "Paste", "Cut", "Rename"], en: ["Properties", "Paste", "Cut", "Rename"] },
    answer: { mr: "Properties", en: "Properties" },
  },
  {
    question: { mr: "File copy केल्यानंतर ती ठेवण्यासाठी कोणता option वापरतात?", en: "Which option is used to place a file after copying?" },
    options: { mr: ["Paste", "Rename", "Delete", "Sort"], en: ["Paste", "Rename", "Delete", "Sort"] },
    answer: { mr: "Paste", en: "Paste" },
  },
  {
    question: { mr: "Folder delete केल्यास त्यातील files चे काय होते?", en: "What happens to files inside a folder if the folder is deleted?" },
    options: { mr: ["त्या files सुद्धा delete होतात", "त्या files open होतात", "त्या files print होतात", "त्या files rename होतात"], en: ["Those files are also deleted", "Those files open", "Those files print", "Those files are renamed"] },
    answer: { mr: "त्या files सुद्धा delete होतात", en: "Those files are also deleted" },
  },
  {
    question: { mr: "Empty Recycle Bin केल्यावर काय होते?", en: "What happens after Empty Recycle Bin?" },
    options: { mr: ["Recycle Bin मधील files कायमच्या delete होतात", "Files copy होतात", "Files rename होतात", "Desktop change होतो"], en: ["Files in Recycle Bin are permanently deleted", "Files are copied", "Files are renamed", "Desktop changes"] },
    answer: { mr: "Recycle Bin मधील files कायमच्या delete होतात", en: "Files in Recycle Bin are permanently deleted" },
  },
  {
    question: { mr: "File चे नाव आणि extension वेगळे करण्यासाठी कोणते चिन्ह असते?", en: "Which symbol separates file name and extension?" },
    options: { mr: ["Dot (.)", "Comma (,)", "Slash (/)", "Plus (+)"], en: ["Dot (.)", "Comma (,)", "Slash (/)", "Plus (+)"] },
    answer: { mr: "Dot (.)", en: "Dot (.)" },
  },
  {
    question: { mr: "Windows मध्ये folder open करण्यासाठी काय करतात?", en: "What do we do to open a folder in Windows?" },
    options: { mr: ["Double click", "Shift + Delete", "Rename", "Format"], en: ["Double click", "Shift + Delete", "Rename", "Format"] },
    answer: { mr: "Double click", en: "Double click" },
  }
];

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

export default function WindowsTestPage() {
  const [studentName, setStudentName] = useState("Student");
  const [language, setLanguage] = useState<Lang>("mr");
  const [batchTime, setBatchTime] = useState("");
  const [examStarted, setExamStarted] = useState(false);
  const [examQuestions, setExamQuestions] = useState<Question[]>(() => createFinalTestQuestions());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isFinished, setIsFinished] = useState(false);
  const [warning, setWarning] = useState("");
  const [showCertificate, setShowCertificate] = useState(false);

  const certificateRef = useRef<HTMLDivElement | null>(null);
  const currentQuestion = examQuestions[currentIndex];
  const studentInitial = studentName?.trim()?.charAt(0)?.toUpperCase() || "S";
  const certificateDate = new Date().toLocaleDateString("en-GB").replaceAll("/", ".");

  const [questionStatuses, setQuestionStatuses] = useState<QuestionStatus[]>(
    examQuestions.map((_, i) => (i === 0 ? "current" : "pending"))
  );

  const [submittedAnswers, setSubmittedAnswers] = useState<SubmittedAnswer[]>(
    examQuestions.map(() => null)
  );

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

    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, isFinished, examStarted]);

  const t = {
    title: "Windows Test",
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
      if (!document.fullscreenElement && element.requestFullscreen) await element.requestFullscreen();
    } catch {}
  };

  const closeBrowserFullScreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
    } catch {}
  };

  const startExam = async () => {
    if (batchTime.trim() === "") {
      setWarning(language === "mr" ? "कृपया Batch Time टाका." : "Please enter Batch Time.");
      return;
    }

    const newQuestions = createFinalTestQuestions();

    localStorage.setItem("studentBatchTime", batchTime);
    localStorage.setItem("testLanguage", language);

    setExamQuestions(newQuestions);
    setQuestionStatuses(newQuestions.map((_, i) => (i === 0 ? "current" : "pending")));
    setSubmittedAnswers(newQuestions.map(() => null));
    setCurrentIndex(0);
    setSelectedAnswer("");
    setScore(0);
    setTimeLeft(30);
    setIsFinished(false);
    setShowCertificate(false);
    setWarning("");

    await openBrowserFullScreen();
    setExamStarted(true);
  };

  const handleNext = (timeOver = false) => {
    if (!currentQuestion) return;

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
    const newQuestions = createFinalTestQuestions();
    setExamStarted(false);
    setExamQuestions(newQuestions);
    setQuestionStatuses(newQuestions.map((_, i) => (i === 0 ? "current" : "pending")));
    setSubmittedAnswers(newQuestions.map(() => null));
    setCurrentIndex(0);
    setSelectedAnswer("");
    setScore(0);
    setTimeLeft(30);
    setIsFinished(false);
    setWarning("");
    setShowCertificate(false);
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
            @page { size: A4 landscape; margin: 0; }
            html, body { margin: 0; padding: 0; width: 100%; height: 100%; background: #ffffff; overflow: hidden; font-family: Arial, sans-serif; }
            body { display: flex; align-items: center; justify-content: center; }
            .printWrap { width: 297mm; height: 210mm; position: relative; overflow: hidden; background: #fff; }
            .certificateBg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; }
            .certPresented { position: absolute; top: 39.8%; left: 53.2%; transform: translateX(-50%); width: 78%; text-align: center; font-family: Georgia, "Times New Roman", serif; font-size: 22px; font-style: italic; color: #111827; line-height: 1.2; }
            .certStudentName { position: absolute; top: 45.2%; left: 53.2%; transform: translateX(-50%); width: 82%; text-align: center; font-size: 32px; font-weight: 950; color: #2b74b8; font-family: Arial, sans-serif; line-height: 1.1; }
            .certLineOne { position: absolute; top: 52.8%; left: 53.2%; transform: translateX(-50%); width: 82%; text-align: center; font-family: Georgia, "Times New Roman", serif; font-size: 23px; font-style: italic; color: #111827; line-height: 1.25; }
            .certLineOne b { font-weight: 900; color: #111827; }
            .certLineTwo { position: absolute; top: 58.2%; left: 53.2%; transform: translateX(-50%); width: 82%; text-align: center; font-family: Georgia, "Times New Roman", serif; font-size: 20px; font-style: italic; color: #111827; line-height: 1.2; }
            .certWish { position: absolute; top: 63.4%; left: 53.2%; transform: translateX(-50%); width: 82%; text-align: center; font-family: Georgia, "Times New Roman", serif; font-size: 20px; font-style: italic; color: #111827; line-height: 1.2; }
            .certMeta { position: absolute; top: 69.2%; left: 53.2%; transform: translateX(-50%); width: 72%; display: flex; justify-content: center; gap: 44px; text-align: center; font-family: Georgia, "Times New Roman", serif; font-size: 21px; font-style: italic; color: #111827; line-height: 1.2; }
            .certMeta b { font-weight: 900; }
          </style>
        </head>
        <body>
          <div class="printWrap">
            <img src="${bgUrl}" alt="Certificate" class="certificateBg" />
            <div class="certPresented">This Certificate is presented to</div>
            <div class="certStudentName">${studentName}</div>
            <div class="certLineOne"><span>for participating in </span><b>Windows Test</b></div>
            <div class="certLineTwo">held on ${certificateDate} at Sangadi</div>
            <div class="certWish">Best wishes for all your future endeavours.</div>
            <div class="certMeta">
              <span><b>Batch Time</b> : ${batchTime}</span>
              <span><b>Score</b> : ${score}/${examQuestions.length}</span>
            </div>
          </div>
          <script>
            const img = document.querySelector(".certificateBg");
            function startPrint() { setTimeout(() => { window.focus(); window.print(); }, 600); }
            if (img) {
              if (img.complete) startPrint();
              else { img.onload = startPrint; img.onerror = startPrint; }
            } else startPrint();
            window.onafterprint = () => { window.close(); };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const solvedCount = submittedAnswers.filter((item) => item !== null).length;
  const attemptedCount = submittedAnswers.filter((item) => item && item.status === "answered").length;
  const remainingCount = examQuestions.length - solvedCount;

  if (!examStarted && !isFinished) {
    return (
      <main className="examPage">
        <section className="startCard">
          <div className="startBadge">PRACTICAL TEST</div>
          <h1>{t.title}</h1>
          <p className="studentLine">Student: {studentName}</p>

          <div className="startForm">
            <label>{t.selectLanguage}</label>
            <div className="languageBox">
              <button type="button" className={language === "mr" ? "langBtn activeLang" : "langBtn"} onClick={() => setLanguage("mr")}>मराठी</button>
              <button type="button" className={language === "en" ? "langBtn activeLang" : "langBtn"} onClick={() => setLanguage("en")}>English</button>
            </div>

            <label>{t.batchTime}</label>
            <input value={batchTime} onChange={(e) => setBatchTime(e.target.value)} placeholder={t.typeBatch} />
          </div>

          <div className="rulesGrid">
            <div><b>50</b><span>Question Bank</span></div>
            <div><b>25</b><span>{t.totalQuestions}</span></div>
            <div><b>30s</b><span>{t.eachQuestion}</span></div>
          </div>

          {warning && <div className="warningBox startWarning">{warning}</div>}

          <button onClick={startExam} className="startExamBtn">{t.startExam}</button>
          <Link href="/online-test" className="backLink">Back to Online Test</Link>
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
            <span className="badge">TEST RESULT</span>
            <h1>Windows Test Result</h1>
            <p>Student Name: {studentName}</p>
            <p>Batch Time: {batchTime}</p>
            <p>Language: {language === "mr" ? "Marathi" : "English"}</p>
          </div>

          <div className="resultStats">
            <div className="statBox"><h2>{score}</h2><p>Correct Marks</p></div>
            <div className="statBox"><h2>{examQuestions.length}</h2><p>Total Questions</p></div>
            <div className="statBox"><h2>{attemptedCount}</h2><p>Attempted</p></div>
            <div className="statBox"><h2>{examQuestions.length - score}</h2><p>Wrong / Zero</p></div>
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
            <button onClick={() => setShowCertificate(true)} className="certificateBtn">View Certificate</button>
          </div>

          {showCertificate && (
            <div className="certificateSection">
              <div className="certificateActions">
                <button onClick={handlePrintCertificate}>Print Certificate</button>
                <button onClick={() => setShowCertificate(false)}>Close</button>
              </div>

              <div className="certificatePrintArea" ref={certificateRef}>
                <img src="/certificate-bg.jpg" alt="Certificate" className="certificateBg" />
                <div className="certPresented">This Certificate is presented to</div>
                <div className="certStudentName">{studentName}</div>
                <div className="certLineOne"><span>for participating in</span><b>Windows Test</b></div>
                <div className="certLineTwo">held on {certificateDate} at Sangadi</div>
                <div className="certWish">Best wishes for all your future endeavours.</div>
                <div className="certMeta">
                  <span><b>Batch Time</b> : {batchTime}</span>
                  <span><b>Score</b> : {score}/{examQuestions.length}</span>
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
                  <h4>Q{index + 1}. {item.question}</h4>
                  <p><b>Your Answer:</b> {item.selected}</p>
                  <p className="correctAnswer"><b>Correct Option:</b> {item.correct}</p>
                  <span className={item.marks === 1 ? "markRight" : "markWrong"}>Marks: {item.marks}</span>
                </div>
              );
            })}
          </div>
        </section>

        <style jsx>{styles}</style>
      </main>
    );
  }

  if (!currentQuestion) return null;

  return (
    <main className="examPage">
      <section className="examLayout">
        <section className="mainExam">
          <div className="examTopBar">
            <div className="studentHorizontal">
              <div className="photoMini"><span>{studentInitial}</span></div>
              <div className="studentMiniText">
                <small>Student Name</small>
                <strong>{studentName}</strong>
                <em>{batchTime}</em>
              </div>
            </div>

            <div className="questionCount">Question {currentIndex + 1} / {examQuestions.length}</div>

            <div className={timeLeft <= 10 ? "timerCircle danger" : "timerCircle"}>
              <small>Time</small>
              <strong>{timeLeft}s</strong>
            </div>
          </div>

          <div className="progressWrap">
            <div className="progressBar" style={ width: `${((currentIndex + 1) / examQuestions.length) * 100}%` }></div>
          </div>

          <div className="questionCard">
            <h2>{currentQuestion.question[language]}</h2>
            <div className="optionsWrap">
              {currentQuestion.options[language].map((option, index) => (
                <button key={index} onClick={() => handleOptionSelect(option)} className={selectedAnswer === option ? "option selected" : "option"}>
                  <span className="optionIndex">{String.fromCharCode(65 + index)}</span>
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
              <div><b>{examQuestions.length}</b><span>Total</span></div>
              <div><b>{solvedCount}</b><span>Solved</span></div>
              <div><b>{attemptedCount}</b><span>Attempted</span></div>
              <div><b>{remainingCount}</b><span>Remaining</span></div>
            </div>

            <div className="questionPalette">
              {questionStatuses.map((status, index) => (
                <div key={index} className={`qNumber ${status}`}>{index + 1}</div>
              ))}
            </div>

            <div className="legend">
              <div><span className="dot solvedDot"></span> Solved</div>
              <div><span className="dot currentDot"></span> Current</div>
              <div><span className="dot pendingDot"></span> Pending</div>
              <div><span className="dot timeDot"></span> Time Over</div>
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
    padding: 6px 10px 6px;
    background: linear-gradient(135deg, #eef6ff, #fff7ed);
    font-family: Arial, sans-serif;
    display: flex;
    align-items: stretch;
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
    width: 100%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: minmax(0, 1fr) 270px;
    gap: 10px;
    align-items: stretch;
    min-height: calc(100vh - 12px);
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
    padding: 10px;
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 12px);
  }

  .rightPanel {
    position: sticky;
    top: 6px;
    align-self: start;
  }

  .panelCard {
    min-height: calc(100vh - 12px);
    padding: 14px;
    background: linear-gradient(#ffffff, #ffffff) padding-box, linear-gradient(135deg, #2563eb, #16a34a, #f97316) border-box;
    border: 2px solid transparent;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
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
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
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
    margin-top: auto;
    padding-top: 8px;
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
    .examPage {
      display: block;
      min-height: auto;
    }

    .examLayout {
      grid-template-columns: 1fr;
      min-height: auto;
    }

    .mainExam {
      min-height: auto;
    }

    .rightPanel {
      position: relative;
      top: auto;
    }

    .panelCard {
      min-height: auto;
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
