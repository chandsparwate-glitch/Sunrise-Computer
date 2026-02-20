"use client";

import { useState } from "react";

export default function Courses() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleCourse = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      style={{
        padding: "60px 20px",
        background: "linear-gradient(135deg, #f8fafc, #dbeafe, #fef3c7)",
        textAlign: "center",
      }}
    >
      <h2 style={headingStyle}>Our Courses</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "25px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {courseData.map((course, index) => (
          <div key={course.title} style={courseCard}>
            
            <div
              style={courseThumb}
              onClick={() => toggleCourse(index)}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                <img
                  src={`/courses/${course.image}`}
                  alt={course.subtitle}
                  width="240"
                  height="240"
                  style={{ objectFit: "contain" }}
                />

                <h3 style={courseTitle}>{course.subtitle}</h3>
              </div>
            </div>

            {openIndex === index && (
              <div style={courseInfo}>
                <ul>
                  {course.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>

                <p>
                  <b>Fees:</b> {course.fees} | <b>Duration:</b>{" "}
                  {course.duration}
                </p>

                <p>
                  <b>Documents:</b> {course.documents}
                </p>

                <div style={{ textAlign: "center" }}>
                  <a href="/admission" className="admission-btn">
                    Take Admission
                  </a>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <style>
        {`
          .admission-btn {
            display: inline-block;
            margin-top: 18px;
            padding: 12px 28px;
            background: #fbbf24;
            color: #000;
            border-radius: 40px;
            text-decoration: none;
            font-weight: 700;
            animation: blinkGlow 1.2s infinite;
            transition: 0.3s ease;
          }

          .admission-btn:hover {
            transform: scale(1.08);
            background: #1e3a8a;
            color: #fff;
          }

          @keyframes blinkGlow {
            0% { opacity: 1; box-shadow: 0 0 5px rgba(251,191,36,0.6); }
            50% { opacity: 0.6; box-shadow: 0 0 20px rgba(251,191,36,1); }
            100% { opacity: 1; box-shadow: 0 0 5px rgba(251,191,36,0.6); }
          }

          @media (max-width: 900px) {
            section div[style*="grid"] {
              grid-template-columns: repeat(1, 1fr) !important;
            }
          }
        `}
      </style>
    </section>
  );
}

/* ---------- STYLES ---------- */

const headingStyle = {
  display: "inline-block",
  padding: "10px 28px",
  marginBottom: "35px",
  background: "#f71774",
  color: "#f2f53e",
  borderRadius: "35px",
  fontSize: "28px",
  fontWeight: "800",
};

const courseCard = {
  background: "#ffffff",
  borderRadius: "20px",
  boxShadow: "0 15px 35px rgba(0,0,0,0.12)",
  overflow: "hidden",
  textAlign: "left" as const,
};

const courseThumb = {
  padding: "25px",
};

const courseTitle = {
  marginTop: "10px",
  fontSize: "16px",
  fontWeight: "600",
  color: "#333",
};

const courseInfo = {
  padding: "25px",
  borderTop: "1px solid #eee",
  fontSize: "16px",
  lineHeight: "1.8",
  textAlign: "left" as const,
};

/* ---------- DATA ---------- */

const courseData = [
  {
    title: "MS-CIT",
    subtitle: "Basic Computer Course",
    image: "mscit.png",
    points: ["Computer Basics", "MS Word, Excel, PowerPoint", "Internet & Email", "AI Tools"],
    fees: "₹5,000",
    duration: "3 Months",
    documents: "Aadhar Card & Photo",
  },
  {
    title: "Tally with GST",
    subtitle: "Accounting & Taxation",
    image: "tally.png",
    points: ["Tally ERP", "GST Basics", "Billing"],
    fees: "₹6,000",
    duration: "2 Months",
    documents: "Aadhar Card & Photo",
  },
  {
    title: "Data Entry",
    subtitle: "Office Work Skills",
    image: "data-entry.png",
    points: ["Excel Work", "Online Forms", "Office Practice"],
    fees: "₹5,000",
    duration: "2 Months",
    documents: "Aadhar Card & Photo",
  },
  {
    title: "Hardware",
    subtitle: "Computer Hardware & Networking",
    image: "hardware.png",
    points: ["Computer Parts", "Assembling", "Basic Networking"],
    fees: "₹6,000",
    duration: "3 Months",
    documents: "Aadhar Card & Photo",
  },
  {
    title: "Artificial Intelligence",
    subtitle: "AI Basics & Applications",
    image: "ai.png",
    points: ["AI Introduction", "ChatGPT & AI Tools", "Future Technology"],
    fees: "₹4,000",
    duration: "2 Months",
    documents: "Aadhar Card",
  },
  {
    title: "Typing (CCTP)",
    subtitle: "English & Marathi Typing",
    image: "typing.png",
    points: ["English Typing", "Marathi Typing", "Speed Practice"],
    fees: "₹5,000",
    duration: "3 Months",
    documents: "Aadhar Card & Photo",
  },
  {
    title: "Advance Excel",
    subtitle: "Professional Excel Skills",
    image: "excel.png",
    points: ["Advanced Formulas", "Reports & Charts", "Office Automation"],
    fees: "₹6,000",
    duration: "2 Months",
    documents: "Aadhar Card & Photo",
  },
  {
    title: "Photo Editing",
    subtitle: "Photoshop & Design",
    image: "photo-editing.png",
    points: ["Photoshop Basics", "Banner & Album Design"],
    fees: "₹6,000",
    duration: "2 Months",
    documents: "Aadhar Card & Photo",
  },
  {
    title: "MS-CIT Refresh",
    subtitle: "Certificate Renewal",
    image: "mscit-refresh.png",
    points: ["Syllabus Revision", "Online Practice"],
    fees: "₹4,000",
    duration: "2 Months",
    documents: "Old MS-CIT Certificate",
  },
];