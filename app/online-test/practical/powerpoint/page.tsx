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
    question: { mr: "PowerPoint मध्ये नवीन Presentation तयार करण्यासाठी कोणता पर्याय वापरतात?", en: "PowerPoint मध्ये नवीन Presentation तयार करण्यासाठी कोणता पर्याय वापरतात?" },
    options: { mr: ["Open", "New", "Save", "Print"], en: ["Open", "New", "Save", "Print"] },
    answer: { mr: "New", en: "New" },
  },
  {
    question: { mr: "PowerPoint मध्ये Blank Presentation कशासाठी वापरतात?", en: "PowerPoint मध्ये Blank Presentation कशासाठी वापरतात?" },
    options: { mr: ["नवीन रिकामी presentation तयार करण्यासाठी", "जुनी file delete करण्यासाठी", "slide hide करण्यासाठी", "print काढण्यासाठी"], en: ["नवीन रिकामी presentation तयार करण्यासाठी", "जुनी file delete करण्यासाठी", "slide hide करण्यासाठी", "print काढण्यासाठी"] },
    answer: { mr: "नवीन रिकामी presentation तयार करण्यासाठी", en: "नवीन रिकामी presentation तयार करण्यासाठी" },
  },
  {
    question: { mr: "PowerPoint Presentation Save करण्यासाठी कोणती shortcut key वापरतात?", en: "PowerPoint Presentation Save करण्यासाठी कोणती shortcut key वापरतात?" },
    options: { mr: ["Ctrl + N", "Ctrl + O", "Ctrl + S", "Ctrl + P"], en: ["Ctrl + N", "Ctrl + O", "Ctrl + S", "Ctrl + P"] },
    answer: { mr: "Ctrl + S", en: "Ctrl + S" },
  },
  {
    question: { mr: "आधीची saved presentation open करण्यासाठी shortcut key कोणती?", en: "आधीची saved presentation open करण्यासाठी shortcut key कोणती?" },
    options: { mr: ["Ctrl + O", "Ctrl + S", "Ctrl + N", "Ctrl + H"], en: ["Ctrl + O", "Ctrl + S", "Ctrl + N", "Ctrl + H"] },
    answer: { mr: "Ctrl + O", en: "Ctrl + O" },
  },
  {
    question: { mr: "New Slide टाकण्यासाठी कोणत्या tab मध्ये option असतो?", en: "New Slide टाकण्यासाठी कोणत्या tab मध्ये option असतो?" },
    options: { mr: ["Home", "Design", "View", "Slide Show"], en: ["Home", "Design", "View", "Slide Show"] },
    answer: { mr: "Home", en: "Home" },
  },
  {
    question: { mr: "New Slide option कोणत्या group मध्ये असतो?", en: "New Slide option कोणत्या group मध्ये असतो?" },
    options: { mr: ["Font", "Slides", "Editing", "Arrange"], en: ["Font", "Slides", "Editing", "Arrange"] },
    answer: { mr: "Slides", en: "Slides" },
  },
  {
    question: { mr: "Slide Layout बदलण्यासाठी कोणता option वापरतात?", en: "Slide Layout बदलण्यासाठी कोणता option वापरतात?" },
    options: { mr: ["Layout", "Save", "Animation", "Zoom"], en: ["Layout", "Save", "Animation", "Zoom"] },
    answer: { mr: "Layout", en: "Layout" },
  },
  {
    question: { mr: "Title and Content Layout कशासाठी वापरतात?", en: "Title and Content Layout कशासाठी वापरतात?" },
    options: { mr: ["Title आणि content लिहिण्यासाठी", "file save करण्यासाठी", "slide show बंद करण्यासाठी", "background काढण्यासाठी"], en: ["Title आणि content लिहिण्यासाठी", "file save करण्यासाठी", "slide show बंद करण्यासाठी", "background काढण्यासाठी"] },
    answer: { mr: "Title आणि content लिहिण्यासाठी", en: "Title आणि content लिहिण्यासाठी" },
  },
  {
    question: { mr: "PowerPoint मध्ये Font Group कोणत्या tab मध्ये असतो?", en: "PowerPoint मध्ये Font Group कोणत्या tab मध्ये असतो?" },
    options: { mr: ["Home", "Insert", "Design", "View"], en: ["Home", "Insert", "Design", "View"] },
    answer: { mr: "Home", en: "Home" },
  },
  {
    question: { mr: "Text चा आकार बदलण्यासाठी कोणता option वापरतात?", en: "Text चा आकार बदलण्यासाठी कोणता option वापरतात?" },
    options: { mr: ["Font Size", "Slide Layout", "Transition", "Header"], en: ["Font Size", "Slide Layout", "Transition", "Header"] },
    answer: { mr: "Font Size", en: "Font Size" },
  },
  {
    question: { mr: "Text जाड दिसण्यासाठी कोणता option वापरतात?", en: "Text जाड दिसण्यासाठी कोणता option वापरतात?" },
    options: { mr: ["Italic", "Underline", "Bold", "Shadow"], en: ["Italic", "Underline", "Bold", "Shadow"] },
    answer: { mr: "Bold", en: "Bold" },
  },
  {
    question: { mr: "Text चा रंग बदलण्यासाठी कोणता option वापरतात?", en: "Text चा रंग बदलण्यासाठी कोणता option वापरतात?" },
    options: { mr: ["Font Color", "Shape Fill", "Rotate", "Replace"], en: ["Font Color", "Shape Fill", "Rotate", "Replace"] },
    answer: { mr: "Font Color", en: "Font Color" },
  },
  {
    question: { mr: "Change Case option कोणत्या tab मध्ये असतो?", en: "Change Case option कोणत्या tab मध्ये असतो?" },
    options: { mr: ["Home", "Insert", "Design", "View"], en: ["Home", "Insert", "Design", "View"] },
    answer: { mr: "Home", en: "Home" },
  },
  {
    question: { mr: "Change Case option कोणत्या group मध्ये असतो?", en: "Change Case option कोणत्या group मध्ये असतो?" },
    options: { mr: ["Clipboard", "Font", "Slides", "Editing"], en: ["Clipboard", "Font", "Slides", "Editing"] },
    answer: { mr: "Font", en: "Font" },
  },
  {
    question: { mr: "Change Case option चा उपयोग कशासाठी होतो?", en: "Change Case option चा उपयोग कशासाठी होतो?" },
    options: { mr: ["Text चे capital/small letters बदलण्यासाठी", "Slide delete करण्यासाठी", "Picture add करण्यासाठी", "Presentation print करण्यासाठी"], en: ["Text चे capital/small letters बदलण्यासाठी", "Slide delete करण्यासाठी", "Picture add करण्यासाठी", "Presentation print करण्यासाठी"] },
    answer: { mr: "Text चे capital/small letters बदलण्यासाठी", en: "Text चे capital/small letters बदलण्यासाठी" },
  },
  {
    question: { mr: "सर्व अक्षरे capital करण्यासाठी कोणता option वापरतात?", en: "सर्व अक्षरे capital करण्यासाठी कोणता option वापरतात?" },
    options: { mr: ["lowercase", "UPPERCASE", "Sentence case", "tOGGLE cASE"], en: ["lowercase", "UPPERCASE", "Sentence case", "tOGGLE cASE"] },
    answer: { mr: "UPPERCASE", en: "UPPERCASE" },
  },
  {
    question: { mr: "सर्व अक्षरे small करण्यासाठी कोणता option वापरतात?", en: "सर्व अक्षरे small करण्यासाठी कोणता option वापरतात?" },
    options: { mr: ["UPPERCASE", "lowercase", "Capitalize Each Word", "Sentence case"], en: ["UPPERCASE", "lowercase", "Capitalize Each Word", "Sentence case"] },
    answer: { mr: "lowercase", en: "lowercase" },
  },
  {
    question: { mr: "“sunrise computer education” हे “Sunrise Computer Education” करण्यासाठी कोणता option वापराल?", en: "“sunrise computer education” हे “Sunrise Computer Education” करण्यासाठी कोणता option वापराल?" },
    options: { mr: ["lowercase", "UPPERCASE", "Capitalize Each Word", "Find"], en: ["lowercase", "UPPERCASE", "Capitalize Each Word", "Find"] },
    answer: { mr: "Capitalize Each Word", en: "Capitalize Each Word" },
  },
  {
    question: { mr: "Find option कशासाठी वापरतात?", en: "Find option कशासाठी वापरतात?" },
    options: { mr: ["Slide मधील शब्द शोधण्यासाठी", "Slide background बदलण्यासाठी", "Animation देण्यासाठी", "Theme apply करण्यासाठी"], en: ["Slide मधील शब्द शोधण्यासाठी", "Slide background बदलण्यासाठी", "Animation देण्यासाठी", "Theme apply करण्यासाठी"] },
    answer: { mr: "Slide मधील शब्द शोधण्यासाठी", en: "Slide मधील शब्द शोधण्यासाठी" },
  },
  {
    question: { mr: "Find option ची shortcut key कोणती आहे?", en: "Find option ची shortcut key कोणती आहे?" },
    options: { mr: ["Ctrl + S", "Ctrl + F", "Ctrl + P", "Ctrl + N"], en: ["Ctrl + S", "Ctrl + F", "Ctrl + P", "Ctrl + N"] },
    answer: { mr: "Ctrl + F", en: "Ctrl + F" },
  },
  {
    question: { mr: "Replace option कशासाठी वापरतात?", en: "Replace option कशासाठी वापरतात?" },
    options: { mr: ["शब्द शोधून दुसऱ्या शब्दाने बदलण्यासाठी", "Slide show सुरू करण्यासाठी", "Shape insert करण्यासाठी", "File save करण्यासाठी"], en: ["शब्द शोधून दुसऱ्या शब्दाने बदलण्यासाठी", "Slide show सुरू करण्यासाठी", "Shape insert करण्यासाठी", "File save करण्यासाठी"] },
    answer: { mr: "शब्द शोधून दुसऱ्या शब्दाने बदलण्यासाठी", en: "शब्द शोधून दुसऱ्या शब्दाने बदलण्यासाठी" },
  },
  {
    question: { mr: "Replace option ची shortcut key कोणती आहे?", en: "Replace option ची shortcut key कोणती आहे?" },
    options: { mr: ["Ctrl + H", "Ctrl + F", "Ctrl + C", "Ctrl + V"], en: ["Ctrl + H", "Ctrl + F", "Ctrl + C", "Ctrl + V"] },
    answer: { mr: "Ctrl + H", en: "Ctrl + H" },
  },
  {
    question: { mr: "Find आणि Replace option कोणत्या group मध्ये असतात?", en: "Find आणि Replace option कोणत्या group मध्ये असतात?" },
    options: { mr: ["Font", "Slides", "Editing", "Drawing"], en: ["Font", "Slides", "Editing", "Drawing"] },
    answer: { mr: "Editing", en: "Editing" },
  },
  {
    question: { mr: "“Computer” हा शब्द “Laptop” ने बदलण्यासाठी कोणता option वापराल?", en: "“Computer” हा शब्द “Laptop” ने बदलण्यासाठी कोणता option वापराल?" },
    options: { mr: ["Find", "Replace", "New Slide", "Slide Layout"], en: ["Find", "Replace", "New Slide", "Slide Layout"] },
    answer: { mr: "Replace", en: "Replace" },
  },
  {
    question: { mr: "Slide मध्ये आकार/Shape टाकण्यासाठी कोणता option वापरतात?", en: "Slide मध्ये आकार/Shape टाकण्यासाठी कोणता option वापरतात?" },
    options: { mr: ["Picture", "Shapes", "Chart", "Table"], en: ["Picture", "Shapes", "Chart", "Table"] },
    answer: { mr: "Shapes", en: "Shapes" },
  },
  {
    question: { mr: "Shapes option कोणत्या tab मध्ये असतो?", en: "Shapes option कोणत्या tab मध्ये असतो?" },
    options: { mr: ["Insert", "Review", "View", "Slide Show"], en: ["Insert", "Review", "View", "Slide Show"] },
    answer: { mr: "Insert", en: "Insert" },
  },
  {
    question: { mr: "Shape ला आतून रंग देण्यासाठी कोणता option वापरतात?", en: "Shape ला आतून रंग देण्यासाठी कोणता option वापरतात?" },
    options: { mr: ["Shape Fill", "Shape Outline", "Rotate", "Crop"], en: ["Shape Fill", "Shape Outline", "Rotate", "Crop"] },
    answer: { mr: "Shape Fill", en: "Shape Fill" },
  },
  {
    question: { mr: "Shape च्या border चा रंग बदलण्यासाठी कोणता option वापरतात?", en: "Shape च्या border चा रंग बदलण्यासाठी कोणता option वापरतात?" },
    options: { mr: ["Shape Fill", "Shape Outline", "WordArt", "New Slide"], en: ["Shape Fill", "Shape Outline", "WordArt", "New Slide"] },
    answer: { mr: "Shape Outline", en: "Shape Outline" },
  },
  {
    question: { mr: "Internet वरून चित्र टाकण्यासाठी कोणता option वापरतात?", en: "Internet वरून चित्र टाकण्यासाठी कोणता option वापरतात?" },
    options: { mr: ["Screenshot", "Online Pictures", "SmartArt", "Shapes"], en: ["Screenshot", "Online Pictures", "SmartArt", "Shapes"] },
    answer: { mr: "Online Pictures", en: "Online Pictures" },
  },
  {
    question: { mr: "Online Pictures वापरण्यासाठी काय आवश्यक असते?", en: "Online Pictures वापरण्यासाठी काय आवश्यक असते?" },
    options: { mr: ["Internet connection", "Printer", "Scanner", "Speaker"], en: ["Internet connection", "Printer", "Scanner", "Speaker"] },
    answer: { mr: "Internet connection", en: "Internet connection" },
  },
  {
    question: { mr: "WordArt चा उपयोग कशासाठी होतो?", en: "WordArt चा उपयोग कशासाठी होतो?" },
    options: { mr: ["Attractive text तयार करण्यासाठी", "Slide delete करण्यासाठी", "Slide hide करण्यासाठी", "File save करण्यासाठी"], en: ["Attractive text तयार करण्यासाठी", "Slide delete करण्यासाठी", "Slide hide करण्यासाठी", "File save करण्यासाठी"] },
    answer: { mr: "Attractive text तयार करण्यासाठी", en: "Attractive text तयार करण्यासाठी" },
  },
  {
    question: { mr: "WordArt option कोणत्या tab मध्ये असतो?", en: "WordArt option कोणत्या tab मध्ये असतो?" },
    options: { mr: ["Insert", "Home", "Design", "View"], en: ["Insert", "Home", "Design", "View"] },
    answer: { mr: "Insert", en: "Insert" },
  },
  {
    question: { mr: "Header & Footer option PowerPoint मध्ये कोणत्या tab मध्ये असतो?", en: "Header & Footer option PowerPoint मध्ये कोणत्या tab मध्ये असतो?" },
    options: { mr: ["Insert", "Home", "Animation", "View"], en: ["Insert", "Home", "Animation", "View"] },
    answer: { mr: "Insert", en: "Insert" },
  },
  {
    question: { mr: "Slide मध्ये Date, Slide Number टाकण्यासाठी कोणता option वापरतात?", en: "Slide मध्ये Date, Slide Number टाकण्यासाठी कोणता option वापरतात?" },
    options: { mr: ["Header & Footer", "Layout", "Font", "Transition"], en: ["Header & Footer", "Layout", "Font", "Transition"] },
    answer: { mr: "Header & Footer", en: "Header & Footer" },
  },
  {
    question: { mr: "Slide चा design बदलण्यासाठी कोणता tab वापरतात?", en: "Slide चा design बदलण्यासाठी कोणता tab वापरतात?" },
    options: { mr: ["Design", "View", "Review", "File"], en: ["Design", "View", "Review", "File"] },
    answer: { mr: "Design", en: "Design" },
  },
  {
    question: { mr: "Design Theme चा उपयोग कशासाठी होतो?", en: "Design Theme चा उपयोग कशासाठी होतो?" },
    options: { mr: ["Slide ला सुंदर look देण्यासाठी", "Slide delete करण्यासाठी", "File close करण्यासाठी", "Text copy करण्यासाठी"], en: ["Slide ला सुंदर look देण्यासाठी", "Slide delete करण्यासाठी", "File close करण्यासाठी", "Text copy करण्यासाठी"] },
    answer: { mr: "Slide ला सुंदर look देण्यासाठी", en: "Slide ला सुंदर look देण्यासाठी" },
  },
  {
    question: { mr: "Format Background option कोणत्या tab मध्ये असतो?", en: "Format Background option कोणत्या tab मध्ये असतो?" },
    options: { mr: ["Design", "Home", "Insert", "Slide Show"], en: ["Design", "Home", "Insert", "Slide Show"] },
    answer: { mr: "Design", en: "Design" },
  },
  {
    question: { mr: "Slide चा background color बदलण्यासाठी कोणता option वापरतात?", en: "Slide चा background color बदलण्यासाठी कोणता option वापरतात?" },
    options: { mr: ["Format Background", "Slide Sorter", "Animation Pane", "New Slide"], en: ["Format Background", "Slide Sorter", "Animation Pane", "New Slide"] },
    answer: { mr: "Format Background", en: "Format Background" },
  },
  {
    question: { mr: "एका slide वरून दुसऱ्या slide वर जाताना दिसणाऱ्या effect ला काय म्हणतात?", en: "एका slide वरून दुसऱ्या slide वर जाताना दिसणाऱ्या effect ला काय म्हणतात?" },
    options: { mr: ["Animation", "Transition", "Theme", "Layout"], en: ["Animation", "Transition", "Theme", "Layout"] },
    answer: { mr: "Transition", en: "Transition" },
  },
  {
    question: { mr: "Slide मधील object ला movement effect देण्यासाठी काय वापरतात?", en: "Slide मधील object ला movement effect देण्यासाठी काय वापरतात?" },
    options: { mr: ["Animation", "Transition", "Layout", "Theme"], en: ["Animation", "Transition", "Layout", "Theme"] },
    answer: { mr: "Animation", en: "Animation" },
  },
  {
    question: { mr: "Presentation चालू करण्यासाठी कोणता tab वापरतात?", en: "Presentation चालू करण्यासाठी कोणता tab वापरतात?" },
    options: { mr: ["Slide Show", "Home", "Insert", "Review"], en: ["Slide Show", "Home", "Insert", "Review"] },
    answer: { mr: "Slide Show", en: "Slide Show" },
  },
  {
    question: { mr: "Slide Show सुरू करण्यासाठी कोणती shortcut key वापरतात?", en: "Slide Show सुरू करण्यासाठी कोणती shortcut key वापरतात?" },
    options: { mr: ["F1", "F5", "F7", "F12"], en: ["F1", "F5", "F7", "F12"] },
    answer: { mr: "F5", en: "F5" },
  },
  {
    question: { mr: "Slide Show मध्ये एखादी slide दिसू नये यासाठी कोणता option वापरतात?", en: "Slide Show मध्ये एखादी slide दिसू नये यासाठी कोणता option वापरतात?" },
    options: { mr: ["Hide Slide", "Delete Slide", "New Slide", "Save Slide"], en: ["Hide Slide", "Delete Slide", "New Slide", "Save Slide"] },
    answer: { mr: "Hide Slide", en: "Hide Slide" },
  },
  {
    question: { mr: "Hide Slide option कोणत्या tab मध्ये असतो?", en: "Hide Slide option कोणत्या tab मध्ये असतो?" },
    options: { mr: ["Slide Show", "Design", "Insert", "View"], en: ["Slide Show", "Design", "Insert", "View"] },
    answer: { mr: "Slide Show", en: "Slide Show" },
  },
  {
    question: { mr: "PowerPoint मध्ये slides पाहण्यासाठी View tab मधील कोणता view वापरतात?", en: "PowerPoint मध्ये slides पाहण्यासाठी View tab मधील कोणता view वापरतात?" },
    options: { mr: ["Normal", "Print", "Save", "Close"], en: ["Normal", "Print", "Save", "Close"] },
    answer: { mr: "Normal", en: "Normal" },
  },
  {
    question: { mr: "सर्व slides एकाच ठिकाणी लहान स्वरूपात पाहण्यासाठी कोणता view वापरतात?", en: "सर्व slides एकाच ठिकाणी लहान स्वरूपात पाहण्यासाठी कोणता view वापरतात?" },
    options: { mr: ["Slide Sorter", "Notes Page", "Reading View", "Normal View"], en: ["Slide Sorter", "Notes Page", "Reading View", "Normal View"] },
    answer: { mr: "Slide Sorter", en: "Slide Sorter" },
  },
  {
    question: { mr: "PowerPoint मध्ये object किंवा shape select केल्यावर कोणता tab दिसतो?", en: "PowerPoint मध्ये object किंवा shape select केल्यावर कोणता tab दिसतो?" },
    options: { mr: ["Format", "File", "Review", "Help"], en: ["Format", "File", "Review", "Help"] },
    answer: { mr: "Format", en: "Format" },
  },
  {
    question: { mr: "Text ला stylish effect देण्यासाठी कोणता option वापरतात?", en: "Text ला stylish effect देण्यासाठी कोणता option वापरतात?" },
    options: { mr: ["Text Effects", "Slide Sorter", "Header", "Footer"], en: ["Text Effects", "Slide Sorter", "Header", "Footer"] },
    answer: { mr: "Text Effects", en: "Text Effects" },
  },
  {
    question: { mr: "Shape किंवा picture फिरवण्यासाठी कोणता option वापरतात?", en: "Shape किंवा picture फिरवण्यासाठी कोणता option वापरतात?" },
    options: { mr: ["Rotate", "Save", "Layout", "Hide Slide"], en: ["Rotate", "Save", "Layout", "Hide Slide"] },
    answer: { mr: "Rotate", en: "Rotate" },
  },
  {
    question: { mr: "PowerPoint मध्ये Zoom option कोणत्या tab मध्ये मिळतो?", en: "PowerPoint मध्ये Zoom option कोणत्या tab मध्ये मिळतो?" },
    options: { mr: ["View", "Insert", "File", "Slide Show"], en: ["View", "Insert", "File", "Slide Show"] },
    answer: { mr: "View", en: "View" },
  }
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

export default function PowerPointTestPage() {
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
    title: "MS PowerPoint Test",
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
  <b>PowerPoint Test</b>
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
          <div className="startBadge">PRACTICAL TEST</div>
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
            <h1>MS PowerPoint Test Result</h1>
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
  <b>PowerPoint Test</b>
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