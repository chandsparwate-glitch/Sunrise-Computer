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
    question: { mr: "MS Excel म्हणजे काय?", en: "What is MS Excel?" },
    options: { mr: ["Operating System", "Spreadsheet Software", "Browser", "Paint Program"], en: ["Operating System", "Spreadsheet Software", "Browser", "Paint Program"] },
    answer: { mr: "Spreadsheet Software", en: "Spreadsheet Software" },
  },
  {
    question: { mr: "Excel file ला काय म्हणतात?", en: "What is an Excel file called?" },
    options: { mr: ["Document", "Worksheet", "Workbook", "Slide"], en: ["Document", "Worksheet", "Workbook", "Slide"] },
    answer: { mr: "Workbook", en: "Workbook" },
  },
  {
    question: { mr: "Excel मध्ये Smallest to Largest याचा अर्थ काय?", en: "What does Smallest to Largest mean in Excel?" },
    options: { mr: ["मोठ्या पासून लहान", "लहान पासून मोठा", "Random order", "Z ते A"], en: ["Largest to smallest", "Smallest to largest", "Random order", "Z to A"] },
    answer: { mr: "लहान पासून मोठा", en: "Smallest to largest" },
  },
  {
    question: { mr: "Excel मध्ये column ला कसे ओळखले जाते?", en: "How are columns identified in Excel?" },
    options: { mr: ["Numbers ने", "Letters ने", "Dates ने", "Shapes ने"], en: ["By numbers", "By letters", "By dates", "By shapes"] },
    answer: { mr: "Letters ने", en: "By letters" },
  },
  {
    question: { mr: "एका cell चा address कसा लिहिला जातो?", en: "How is a cell address written?" },
    options: { mr: ["1A", "A1", "AA", "11"], en: ["1A", "A1", "AA", "11"] },
    answer: { mr: "A1", en: "A1" },
  },
  {
    question: { mr: "Formula नेहमी कोणत्या चिन्हाने सुरू होते?", en: "A formula always starts with which sign?" },
    options: { mr: ["#", "@", "=", "%"], en: ["#", "@", "=", "%"] },
    answer: { mr: "=", en: "=" },
  },
  {
    question: { mr: "दोन संख्यांची बेरीज करण्यासाठी कोणते formula वापरले जाते?", en: "Which formula is used to add two numbers?" },
    options: { mr: ["=ADD(A1:A2)", "=SUM(A1:A2)", "=TOTAL(A1:A2)", "=PLUS(A1:A2)"], en: ["=ADD(A1:A2)", "=SUM(A1:A2)", "=TOTAL(A1:A2)", "=PLUS(A1:A2)"] },
    answer: { mr: "=SUM(A1:A2)", en: "=SUM(A1:A2)" },
  },
  {
    question: { mr: "सर्वात मोठी value शोधण्यासाठी कोणते function वापरतात?", en: "Which function is used to find the largest value?" },
    options: { mr: ["MAX", "HIGH", "TOP", "LARGEST"], en: ["MAX", "HIGH", "TOP", "LARGEST"] },
    answer: { mr: "MAX", en: "MAX" },
  },
  {
    question: { mr: "Legend ची position बदलण्यासाठी कोणत्या tab मधून option मिळतो?", en: "Which tab is used to change Legend position?" },
    options: { mr: ["Home", "Insert", "Chart Design", "Data"], en: ["Home", "Insert", "Chart Design", "Data"] },
    answer: { mr: "Chart Design", en: "Chart Design" },
  },
  {
    question: { mr: "Excel मध्ये Wrap Text चा उपयोग कशासाठी होतो?", en: "What is Wrap Text used for in Excel?" },
    options: { mr: ["Cell delete करण्यासाठी", "मजकूर एकाच cell मध्ये अनेक ओळींमध्ये दाखवण्यासाठी", "Formula लावण्यासाठी", "Sheet save करण्यासाठी"], en: ["To delete a cell", "To show text in multiple lines in the same cell", "To apply formula", "To save sheet"] },
    answer: { mr: "मजकूर एकाच cell मध्ये अनेक ओळींमध्ये दाखवण्यासाठी", en: "To show text in multiple lines in the same cell" },
  },
  {
    question: { mr: "Excel मध्ये chart कशासाठी वापरतात?", en: "What is a chart used for in Excel?" },
    options: { mr: ["Typing साठी", "Drawing साठी", "Data graphical दाखवण्यासाठी", "Printing बंद करण्यासाठी"], en: ["For typing", "For drawing", "To show data graphically", "To stop printing"] },
    answer: { mr: "Data graphical दाखवण्यासाठी", en: "To show data graphically" },
  },
  {
    question: { mr: "खालीलपैकी function कोणते आहे?", en: "Which of the following is a function?" },
    options: { mr: ["SUM", "SAVE", "TYPE", "PRINT"], en: ["SUM", "SAVE", "TYPE", "PRINT"] },
    answer: { mr: "SUM", en: "SUM" },
  },
  {
    question: { mr: "जर A1 मध्ये 10 आणि A2 मध्ये 20 असेल, तर =A1+A2 चे उत्तर काय येईल?", en: "If A1 has 10 and A2 has 20, what is the result of =A1+A2?" },
    options: { mr: ["10", "20", "30", "40"], en: ["10", "20", "30", "40"] },
    answer: { mr: "30", en: "30" },
  },
  {
    question: { mr: "Formula Bar कुठे उपयोगी पडते?", en: "What is the Formula Bar used for?" },
    options: { mr: ["चित्र काढण्यासाठी", "Formula किंवा data पाहण्यासाठी", "Page color बदलण्यासाठी", "Print देण्यासाठी"], en: ["To draw pictures", "To view formula or data", "To change page color", "To print"] },
    answer: { mr: "Formula किंवा data पाहण्यासाठी", en: "To view formula or data" },
  },
  {
    question: { mr: "Tab Colour कुठे लागू केला जातो?", en: "Where is Tab Colour applied?" },
    options: { mr: ["Cell वर", "Row वर", "Sheet tab वर", "Formula bar वर"], en: ["On cell", "On row", "On sheet tab", "On formula bar"] },
    answer: { mr: "Sheet tab वर", en: "On sheet tab" },
  },
  {
    question: { mr: "Excel मध्ये page print करण्यापूर्वी page layout view कुठे पाहता येतो?", en: "Where can Page Layout View be seen before printing in Excel?" },
    options: { mr: ["Insert", "Data", "Print", "View"], en: ["Insert", "Data", "Print", "View"] },
    answer: { mr: "View", en: "View" },
  },
  {
    question: { mr: "Excel मध्ये sheet चे नाव बदलण्यासाठी काय करतात?", en: "How do you rename a sheet in Excel?" },
    options: { mr: ["Right click on sheet tab", "Delete row", "Formula bar वापरतात", "Scroll करतात"], en: ["Right click on sheet tab", "Delete row", "Use formula bar", "Scroll"] },
    answer: { mr: "Right click on sheet tab", en: "Right click on sheet tab" },
  },
  {
    question: { mr: "खालीलपैकी chart चा प्रकार कोणता?", en: "Which of the following is a chart type?" },
    options: { mr: ["Bar Chart", "Mail Chart", "Text Chart", "Save Chart"], en: ["Bar Chart", "Mail Chart", "Text Chart", "Save Chart"] },
    answer: { mr: "Bar Chart", en: "Bar Chart" },
  },
  {
    question: { mr: "AutoFill चा उपयोग कशासाठी होतो?", en: "What is AutoFill used for?" },
    options: { mr: ["Cell delete करण्यासाठी", "Series किंवा repeated data भरायला", "Workbook बंद करायला", "Page print करायला"], en: ["To delete cell", "To fill series or repeated data", "To close workbook", "To print page"] },
    answer: { mr: "Series किंवा repeated data भरायला", en: "To fill series or repeated data" },
  },
  {
    question: { mr: "MS Excel file चे extension कोणते असते?", en: "What is the extension of MS Excel file?" },
    options: { mr: [".docx", ".xlsx", ".pptx", ".txt"], en: [".docx", ".xlsx", ".pptx", ".txt"] },
    answer: { mr: ".xlsx", en: ".xlsx" },
  },
  {
    question: { mr: "Excel मध्ये खालीलपैकी margin type कोणता आहे?", en: "Which of the following is a margin type in Excel?" },
    options: { mr: ["Top Margin", "Bottom Margin", "Left Margin", "All of these"], en: ["Top Margin", "Bottom Margin", "Left Margin", "All of these"] },
    answer: { mr: "All of these", en: "All of these" },
  },
  {
    question: { mr: "Landscape orientation म्हणजे काय?", en: "What is Landscape orientation?" },
    options: { mr: ["Page उभा दिसतो", "Page lock होतो", "Page आडवा दिसतो", "Page save होतो"], en: ["Page appears vertical", "Page gets locked", "Page appears horizontal", "Page is saved"] },
    answer: { mr: "Page आडवा दिसतो", en: "Page appears horizontal" },
  },
  {
    question: { mr: "Margin बदलण्यासाठी Excel मध्ये कोणता tab वापरतात?", en: "Which tab is used to change margin in Excel?" },
    options: { mr: ["Insert", "Formulas", "Page Layout", "View"], en: ["Insert", "Formulas", "Page Layout", "View"] },
    answer: { mr: "Page Layout", en: "Page Layout" },
  },
  {
    question: { mr: "जर “Sunrise” हा शब्द “Computer” ने बदलायचा असेल, तर कोणता option वापराल?", en: "Which option is used to replace “Sunrise” with “Computer”?" },
    options: { mr: ["Find", "Replace", "Save As", "Sort"], en: ["Find", "Replace", "Save As", "Sort"] },
    answer: { mr: "Replace", en: "Replace" },
  },
  {
    question: { mr: "Gridlines show/hide करण्यासाठी कोणता tab वापरतात?", en: "Which tab is used to show/hide Gridlines?" },
    options: { mr: ["Review", "View", "Formulas", "Insert"], en: ["Review", "View", "Formulas", "Insert"] },
    answer: { mr: "View", en: "View" },
  },
  {
    question: { mr: "Format Painter चा उपयोग कशासाठी होतो?", en: "What is Format Painter used for?" },
    options: { mr: ["एका cell/text चे formatting दुसऱ्यावर copy करण्यासाठी", "Formula delete करण्यासाठी", "Sheet print करण्यासाठी", "Chart move करण्यासाठी"], en: ["To copy formatting from one cell/text to another", "To delete formula", "To print sheet", "To move chart"] },
    answer: { mr: "एका cell/text चे formatting दुसऱ्यावर copy करण्यासाठी", en: "To copy formatting from one cell/text to another" },
  },
  {
    question: { mr: "Format Painter option कोणत्या tab मध्ये असतो?", en: "In which tab is Format Painter available?" },
    options: { mr: ["Home", "Insert", "Data", "View"], en: ["Home", "Insert", "Data", "View"] },
    answer: { mr: "Home", en: "Home" },
  },
  {
    question: { mr: "Freeze Panes चा उपयोग कशासाठी होतो?", en: "What is Freeze Panes used for?" },
    options: { mr: ["Formula delete करण्यासाठी", "Row/Column स्थिर ठेवण्यासाठी", "Sheet delete करण्यासाठी", "Chart insert करण्यासाठी"], en: ["To delete formula", "To keep row/column fixed", "To delete sheet", "To insert chart"] },
    answer: { mr: "Row/Column स्थिर ठेवण्यासाठी", en: "To keep row/column fixed" },
  },
  {
    question: { mr: "Freeze Panes option कोणत्या tab मध्ये असतो?", en: "In which tab is Freeze Panes available?" },
    options: { mr: ["Home", "Insert", "View", "Data"], en: ["Home", "Insert", "View", "Data"] },
    answer: { mr: "View", en: "View" },
  },
  {
    question: { mr: "Zoom option चा उपयोग कशासाठी होतो?", en: "What is Zoom option used for?" },
    options: { mr: ["Data sort करण्यासाठी", "Sheet मोठी किंवा लहान करून पाहण्यासाठी", "Cell merge करण्यासाठी", "Formula copy करण्यासाठी"], en: ["To sort data", "To view sheet larger or smaller", "To merge cells", "To copy formula"] },
    answer: { mr: "Sheet मोठी किंवा लहान करून पाहण्यासाठी", en: "To view sheet larger or smaller" },
  },
  {
    question: { mr: "Excel मध्ये Formula tab चा उपयोग कशासाठी होतो?", en: "What is the Formula tab used for in Excel?" },
    options: { mr: ["Formula आणि functions वापरण्यासाठी", "Sheet color बदलण्यासाठी", "Chart move करण्यासाठी", "Page print करण्यासाठी"], en: ["To use formulas and functions", "To change sheet color", "To move chart", "To print page"] },
    answer: { mr: "Formula आणि functions वापरण्यासाठी", en: "To use formulas and functions" },
  },
  {
    question: { mr: "Filter चा उपयोग कशासाठी होतो?", en: "What is Filter used for?" },
    options: { mr: ["सर्व data delete करण्यासाठी", "आवश्यक data निवडून दाखवण्यासाठी", "Workbook close करण्यासाठी", "Chart hide करण्यासाठी"], en: ["To delete all data", "To show selected/required data", "To close workbook", "To hide chart"] },
    answer: { mr: "आवश्यक data निवडून दाखवण्यासाठी", en: "To show selected/required data" },
  },
  {
    question: { mr: "Sorting चा उपयोग कशासाठी होतो?", en: "What is Sorting used for?" },
    options: { mr: ["Data क्रमाने लावण्यासाठी", "Cell color बदलण्यासाठी", "Formula hide करण्यासाठी", "Sheet print करण्यासाठी"], en: ["To arrange data in order", "To change cell color", "To hide formula", "To print sheet"] },
    answer: { mr: "Data क्रमाने लावण्यासाठी", en: "To arrange data in order" },
  },
  {
    question: { mr: "Largest to Smallest sorting म्हणजे काय?", en: "What is Largest to Smallest sorting?" },
    options: { mr: ["लहान पासून मोठा", "मोठ्या पासून लहान", "Random order", "A ते Z"], en: ["Smallest to largest", "Largest to smallest", "Random order", "A to Z"] },
    answer: { mr: "मोठ्या पासून लहान", en: "Largest to smallest" },
  },
  {
    question: { mr: "A to Z sorting कोणत्या प्रकारची sorting आहे?", en: "A to Z sorting is which type of sorting?" },
    options: { mr: ["Descending", "Ascending", "Random", "Manual"], en: ["Descending", "Ascending", "Random", "Manual"] },
    answer: { mr: "Ascending", en: "Ascending" },
  },
  {
    question: { mr: "Sheet tab ची position कुठे दिसते?", en: "Where is the sheet tab position visible?" },
    options: { mr: ["Excel window च्या खाली", "Formula bar मध्ये", "Ribbon च्या वर", "Chart मध्ये"], en: ["At the bottom of Excel window", "In formula bar", "Above ribbon", "In chart"] },
    answer: { mr: "Excel window च्या खाली", en: "At the bottom of Excel window" },
  },
  {
    question: { mr: "Sheet tab rename करण्यासाठी कोणता option वापरतात?", en: "Which option is used to rename a sheet tab?" },
    options: { mr: ["Rename", "Save", "Print", "Zoom"], en: ["Rename", "Save", "Print", "Zoom"] },
    answer: { mr: "Rename", en: "Rename" },
  },
  {
    question: { mr: "Sheet tab colour बदलण्यासाठी कोणता option वापरतात?", en: "Which option is used to change sheet tab colour?" },
    options: { mr: ["Tab Color", "Font Color", "Fill Color", "Page Color"], en: ["Tab Color", "Font Color", "Fill Color", "Page Color"] },
    answer: { mr: "Tab Color", en: "Tab Color" },
  },
  {
    question: { mr: "Merge & Center चा उपयोग कशासाठी होतो?", en: "What is Merge & Center used for?" },
    options: { mr: ["Multiple cells एकत्र करून text center करण्यासाठी", "Formula delete करण्यासाठी", "Sheet rename करण्यासाठी", "Chart move करण्यासाठी"], en: ["To merge multiple cells and center text", "To delete formula", "To rename sheet", "To move chart"] },
    answer: { mr: "Multiple cells एकत्र करून text center करण्यासाठी", en: "To merge multiple cells and center text" },
  },
  {
    question: { mr: "Merge & Center option कोणत्या tab मध्ये असतो?", en: "In which tab is Merge & Center available?" },
    options: { mr: ["Home", "Insert", "View", "Data"], en: ["Home", "Insert", "View", "Data"] },
    answer: { mr: "Home", en: "Home" },
  },
  {
    question: { mr: "Indent option चा उपयोग कशासाठी होतो?", en: "What is Indent option used for?" },
    options: { mr: ["Text थोडे आत किंवा बाहेर हलवण्यासाठी", "Sheet delete करण्यासाठी", "Formula calculate करण्यासाठी", "Chart insert करण्यासाठी"], en: ["To move text slightly inside or outside", "To delete sheet", "To calculate formula", "To insert chart"] },
    answer: { mr: "Text थोडे आत किंवा बाहेर हलवण्यासाठी", en: "To move text slightly inside or outside" },
  },
  {
    question: { mr: "Increase Indent म्हणजे काय?", en: "What is Increase Indent?" },
    options: { mr: ["Text डावीकडे आणणे", "Text उजवीकडे आत नेणे", "Text delete करणे", "Text bold करणे"], en: ["Move text left", "Move text to the right/inside", "Delete text", "Make text bold"] },
    answer: { mr: "Text उजवीकडे आत नेणे", en: "Move text to the right/inside" },
  },
  {
    question: { mr: "Chart Style चा उपयोग कशासाठी होतो?", en: "What is Chart Style used for?" },
    options: { mr: ["Chart चा look बदलण्यासाठी", "Data delete करण्यासाठी", "Sheet hide करण्यासाठी", "Formula लावण्यासाठी"], en: ["To change chart look", "To delete data", "To hide sheet", "To apply formula"] },
    answer: { mr: "Chart चा look बदलण्यासाठी", en: "To change chart look" },
  },
  {
    question: { mr: "Move Chart option चा उपयोग कशासाठी होतो?", en: "What is Move Chart used for?" },
    options: { mr: ["Chart दुसऱ्या sheet मध्ये किंवा नवीन sheet मध्ये हलवण्यासाठी", "Chart delete करण्यासाठी", "Cell merge करण्यासाठी", "Data filter करण्यासाठी"], en: ["To move chart to another sheet or new sheet", "To delete chart", "To merge cells", "To filter data"] },
    answer: { mr: "Chart दुसऱ्या sheet मध्ये किंवा नवीन sheet मध्ये हलवण्यासाठी", en: "To move chart to another sheet or new sheet" },
  },
  {
    question: { mr: "Column Chart कशासाठी वापरतात?", en: "What is a Column Chart used for?" },
    options: { mr: ["Data columns मध्ये graphical दाखवण्यासाठी", "Text type करण्यासाठी", "Formula लिहिण्यासाठी", "Sheet rename करण्यासाठी"], en: ["To show data graphically in columns", "To type text", "To write formula", "To rename sheet"] },
    answer: { mr: "Data columns मध्ये graphical दाखवण्यासाठी", en: "To show data graphically in columns" },
  },
  {
    question: { mr: "Pie Chart कशासाठी वापरतात?", en: "What is a Pie Chart used for?" },
    options: { mr: ["भागांमध्ये data दाखवण्यासाठी", "Row hide करण्यासाठी", "Page setup करण्यासाठी", "Formula bar दाखवण्यासाठी"], en: ["To show data in parts", "To hide row", "To set page", "To show formula bar"] },
    answer: { mr: "भागांमध्ये data दाखवण्यासाठी", en: "To show data in parts" },
  },
  {
    question: { mr: "Legend chart मध्ये काय दाखवते?", en: "What does Legend show in a chart?" },
    options: { mr: ["Data series चे नाव/ओळख", "Sheet name", "Formula result", "Page margin"], en: ["Name/identity of data series", "Sheet name", "Formula result", "Page margin"] },
    answer: { mr: "Data series चे नाव/ओळख", en: "Name/identity of data series" },
  },
  {
    question: { mr: "Chart insert करण्यासाठी कोणता tab वापरतात?", en: "Which tab is used to insert a chart?" },
    options: { mr: ["Insert", "View", "Review", "File"], en: ["Insert", "View", "Review", "File"] },
    answer: { mr: "Insert", en: "Insert" },
  },
  {
    question: { mr: "View tab मध्ये खालीलपैकी कोणता option असतो?", en: "Which option is available in View tab?" },
    options: { mr: ["Zoom", "Freeze Panes", "Gridlines", "All of these"], en: ["Zoom", "Freeze Panes", "Gridlines", "All of these"] },
    answer: { mr: "All of these", en: "All of these" },
  },
  {
    question: { mr: "Excel मध्ये formula copy केल्यावर cell reference बदलू शकतो, त्याला काय म्हणतात?", en: "When a formula is copied in Excel and cell reference changes, what is it called?" },
    options: { mr: ["Relative Reference", "Absolute Print", "Manual Save", "Page Break"], en: ["Relative Reference", "Absolute Print", "Manual Save", "Page Break"] },
    answer: { mr: "Relative Reference", en: "Relative Reference" },
  },
  {
    question: { mr: "Excel मध्ये selected data वर filter लावण्यासाठी कोणता tab वापरू शकतो?", en: "Which tab can be used to apply filter on selected data in Excel?" },
    options: { mr: ["Data", "Insert", "Review", "File"], en: ["Data", "Insert", "Review", "File"] },
    answer: { mr: "Data", en: "Data" },
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

export default function ExcelTestPage() {
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
    title: "MS Excel Test",
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
            <div class="certLineOne"><span>for participating in </span><b>MS Excel Test</b></div>
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
            <h1>MS Excel Test Result</h1>
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
                <div className="certLineOne"><span>for participating in</span><b>MS Excel Test</b></div>
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
            <div className="progressBar" style={{ width: `${((currentIndex + 1) / examQuestions.length) * 100}%` }}></div>
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
