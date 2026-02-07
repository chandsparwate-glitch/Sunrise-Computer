"use client";

import Image from "next/image";

export default function Courses() {
  return (
    <>
      <section
        style={{
          padding: "80px 20px",
          background: "linear-gradient(135deg, #f8fafc, #e2e8f0)",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            display: "inline-block",
            padding: "12px 30px",
            marginBottom: "40px",
            background: "#fbbf24",
            color: "#000",
            borderRadius: "30px",
            fontSize: "36px",
            fontWeight: "800",
          }}
        >
          Our Courses
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "25px",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {courseData.map((course) => (
            <details key={course.title} style={courseCard}>
              <summary style={courseThumb}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={iconCircle}>
                    <Image
                      src={`/${course.image}`}
                      alt={course.title}
                      width={52}
                      height={52}
                    />
                  </div>
                  <div>
                    <h3 style={courseTitle}>{course.title}</h3>
                    <p>{course.subtitle}</p>
                  </div>
                </div>
              </summary>

              <div style={courseInfo}>
                <ul>
                  {course.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>

                <p>
                  <b>Fees:</b> {course.fees} | <b>Duration:</b> {course.duration}
                </p>

                <p>
                  <b>Documents:</b> {course.documents}
                </p>

                <a href="/admission" className="admission-btn">
                  Take Admission
                </a>
              </div>
            </details>
          ))}
        </div>
      </section>

      <style>
        {`
          .admission-btn {
            display: inline-block;
            margin-top: 12px;
            padding: 10px 22px;
            background: #1e3a8a;
            color: white;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
            transition: 0.3s ease;
          }

          .admission-btn:hover {
            background: #fbbf24;
            color: #000;
            transform: scale(1.08);
            box-shadow: 0 8px 20px rgba(0,0,0,0.3);
          }
        `}
      </style>
    </>
  );
}

/* ---------- STYLES ---------- */

const courseCard = {
  background: "#ffffff",
  borderRadius: "15px",
  boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
  overflow: "hidden",
  textAlign: "left" as const,
};

const courseThumb = {
  padding: "20px",
  cursor: "pointer",
};

const courseTitle = {
  margin: 0,
  fontSize: "20px",
  fontWeight: "700",
};

const iconCircle = {
  width: "72px",
  height: "72px",
  borderRadius: "50%",
  background: "#fff3e0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const courseInfo = {
  padding: "20px",
  borderTop: "1px solid #eee",
  fontSize: "15px",
  lineHeight: "1.6",
};

/* ---------- COURSE DATA ---------- */

const courseData = [
  { title: "MS-CIT", subtitle: "Basic Computer Course", image: "mscit.png",
    points: ["Computer Basics", "MS Word, Excel, PowerPoint", "Internet & Email"],
    fees: "₹5,000", duration: "3 Months", documents: "Aadhar Card & Photo" },

  { title: "Tally with GST", subtitle: "Accounting & Taxation", image: "tally.png",
    points: ["Tally ERP", "GST Basics", "Billing"],
    fees: "₹6,000", duration: "2 Months", documents: "Aadhar Card & Photo" },

  { title: "Data Entry", subtitle: "Office Work Skills", image: "data-entry.png",
    points: ["Excel Work", "Online Forms", "Office Practice"],
    fees: "₹5,000", duration: "2 Months", documents: "Aadhar Card & Photo" },

  { title: "Hardware", subtitle: "Computer Hardware & Networking", image: "hardware.png",
    points: ["Computer Parts", "Assembling", "Basic Networking"],
    fees: "₹6,000", duration: "3 Months", documents: "Aadhar Card & Photo" },

  { title: "Artificial Intelligence", subtitle: "AI Basics & Applications", image: "ai.png",
    points: ["AI Introduction", "ChatGPT & AI Tools", "Future Technology"],
    fees: "₹4,000", duration: "2 Months", documents: "Aadhar Card" },

  { title: "Typing (CCTP)", subtitle: "English & Marathi Typing", image: "typing.png",
    points: ["English Typing", "Marathi Typing", "Speed Practice"],
    fees: "₹5,000", duration: "3 Months", documents: "Aadhar Card & Photo" },

  { title: "Advance Excel", subtitle: "Professional Excel Skills", image: "excel.png",
    points: ["Advanced Formulas", "Reports & Charts", "Office Automation"],
    fees: "₹6,000", duration: "2 Months", documents: "Aadhar Card & Photo" },

  { title: "Photo Editing", subtitle: "Photoshop & Design", image: "photo-editing.png",
    points: ["Photoshop Basics", "Banner & Album Design"],
    fees: "₹6,000", duration: "2 Months", documents: "Aadhar Card & Photo" },

  { title: "MS-CIT Refresh", subtitle: "Certificate Renewal", image: "mscit-refresh.png",
    points: ["Syllabus Revision", "Online Practice"],
    fees: "₹4,000", duration: "2 Months", documents: "Old MS-CIT Certificate" },
];
