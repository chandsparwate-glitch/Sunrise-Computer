"use client";

import { useState, useEffect } from "react";

type Student = {
  id: number;
  name: string;
  course: string;
  marks: number;
  photo: string;
  year: number;
};

export default function ResultPage() {
  const [count, setCount] = useState(0);

  const students: Student[] = [
    { id: 1, name: "Reena Gaidhane", course: "MS-CIT", marks: 100, photo: "/students/reena.jpg", year: 2016 },
    { id: 2, name: "Himani Parate", course: "MS-CIT", marks: 100, photo: "/students/himani.jpg", year: 2016 },
    { id: 3, name: "Shiwanshi Ranpariya", course: "MS-CIT", marks: 100, photo: "/students/shiwanshi.jpg", year: 2016 },
    { id: 4, name: "Rani Karwade", course: "MS-CIT", marks: 100, photo: "/students/rani.jpg", year: 2016 },
    { id: 5, name: "Hansraj Rokade", course: "MS-CIT", marks: 100, photo: "/students/hansraj.jpg", year: 2016 },
    { id: 6, name: "Snehal Waghade", course: "MS-CIT", marks: 100, photo: "/students/snehal.jpg", year: 2017 },
    { id: 7, name: "Prachi Y. Khedkar", course: "MS-CIT", marks: 100, photo: "/students/prachi.jpg", year: 2023 },
    { id: 8, name: "Kalyani S. Sawarkar", course: "MS-CIT", marks: 100, photo: "/students/kalyani.jpg", year: 2024 },
    { id: 9, name: "Tina L. Gotephode", course: "MS-CIT", marks: 100, photo: "/students/tina.jpg", year: 2024 },
    { id: 10, name: "Tinkal L. Gotefode", course: "MS-CIT", marks: 100, photo: "/students/tinkal.jpg", year: 2024 },
    { id: 11, name: "Tanmay A. Meshram", course: "MS-CIT", marks: 100, photo: "/students/tanmay.jpg", year: 2024 },
    { id: 12, name: "Vinit Borkar", course: "MS-CIT", marks: 100, photo: "/students/vinit.jpg", year: 2025 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev < 100 ? prev + 2 : 100));
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">

      <div className="counterSection">
        <div className="counterBox">
          <h2>{count}%</h2>
          <p>Result</p>
        </div>
        <div className="counterBox">
          <h2>{students.length}</h2>
          <p>Toppers</p>
        </div>
        <div className="counterBox">
          <h2>20+</h2>
          <p>Years</p>
        </div>
      </div>

      <h1 className="title">🏆 100/100 Topper Students</h1>

      <div className="grid">
        {students.map((student) => (
          <div key={student.id} className="card">

            <img
              src={student.photo}
              alt={student.name}
              className="photo"
            />

            <h3 className="name">{student.name}</h3>
            <p className="course">{student.course}</p>
            <p className="year">Year: {student.year}</p>

            <div className="marksBox">
              {student.marks} / 100
            </div>

          </div>
        ))}
      </div>

      <style jsx>{`
        .container {
          padding: 60px 20px;
          max-width: 1200px;
          margin: auto;
        }

        .counterSection {
          display: flex;
          justify-content: center;
          gap: 25px;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }

        .counterBox {
          background: #ffffff;
          padding: 15px 25px;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 6px 18px rgba(0,0,0,0.08);
          min-width: 120px;
        }

        .counterBox h2 {
          font-size: 24px;
          color: #16a34a;
          margin: 0;
        }

        .counterBox p {
          margin-top: 3px;
          font-size: 13px;
          font-weight: 600;
        }

        .title {
          text-align: center;
          margin-bottom: 35px;
          font-size: 32px;
          font-weight: 900;
          color: #1e3a8a;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 28px;
        }

        .card {
          background: #ffffff;
          border-radius: 18px;
          padding: 25px 20px;
          text-align: center;
          box-shadow: 0 12px 25px rgba(0,0,0,0.08);
          transition: 0.3s;
        }

        .card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 35px rgba(0,0,0,0.12);
        }

        /* 🔥 PREMIUM FRAME PHOTO */
.photo {
  width: 90px;
  height: 110px;
  border-radius: 20px;   /* 🔥 Rounded Square */
  object-fit: cover;
  border: 3px solid #fbbf24;
  margin: 0 auto 15px auto;
  display: block;
}

        .name {
          font-size: 17px;
          font-weight: 800;
        }

        .course, .year {
          font-size: 14px;
          margin-top: 4px;
        }

        .marksBox {
          margin-top: 15px;
          background: #16a34a;
          color: white;
          font-weight: 900;
          padding: 8px 14px;
          border-radius: 8px;
          display: inline-block;
        }

        @media (max-width: 600px) {
          .photo {
            width: 85px;
            height: 85px;
          }
        }
      `}</style>

    </div>
  );
}
