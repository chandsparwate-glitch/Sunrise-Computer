"use client";

import Link from "next/link";

export default function Home() {
  return (
    <>
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          background: "linear-gradient(135deg, #1e3a8a, #0f172a)",
          color: "white",
          padding: "20px",
        }}
      >
        <h3
          style={{
            fontSize: "24px",
            letterSpacing: "3px",
            marginBottom: "10px",
            color: "#e2e8f0",
            animation: "fadeIn 2s ease-in-out",
          }}
        >
          WELCOME TO
        </h3>

        <h1
          style={{
            fontSize: "58px",
            fontWeight: "900",
            margin: "0",
            animation: "floatText 4s ease-in-out infinite",
          }}
        >
          <span style={{ color: "#fbbf24" }}>Sunrise</span>{" "}
          <span>Computer Education</span>
        </h1>

        <p
          style={{
            fontSize: "20px",
            marginTop: "15px",
            color: "#fbbf24",
            fontWeight: "600",
            animation: "fadeIn 3s ease-in-out",
          }}
        >
          🚀 MKCL Authorised Center – Code 44210101
        </p>

        <p
          style={{
            fontSize: "22px",
            marginTop: "12px",
            maxWidth: "700px",
            color: "#e2e8f0",
            animation: "fadeIn 4s ease-in-out",
          }}
        >
          Empowering Students with Practical & Job-Oriented Computer Education
        </p>

        <div
          style={{
            marginTop: "35px",
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            animation: "fadeIn 5s ease-in-out",
          }}
        >
          <Link
            href="/courses"
            className="btn-primary"
          >
            View Courses
          </Link>

          <Link
            href="/admission"
            className="btn-secondary"
          >
            Take Admission
          </Link>
        </div>
      </section>

      {/* CSS Animation */}
      <style>
        {`
          @keyframes floatText {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
            100% { transform: translateY(0px); }
          }

          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          .btn-primary {
            padding: 14px 32px;
            background: #fbbf24;
            color: #0f172a;
            font-weight: bold;
            border-radius: 8px;
            text-decoration: none;
            transition: 0.3s;
          }

          .btn-primary:hover {
            transform: scale(1.08);
            box-shadow: 0 10px 25px rgba(0,0,0,0.4);
          }

          .btn-secondary {
            padding: 14px 32px;
            background: white;
            color: #1e3a8a;
            font-weight: bold;
            border-radius: 8px;
            text-decoration: none;
            transition: 0.3s;
          }

          .btn-secondary:hover {
            transform: scale(1.08);
            box-shadow: 0 10px 25px rgba(0,0,0,0.4);
          }
        `}
      </style>
    </>
  );
}
