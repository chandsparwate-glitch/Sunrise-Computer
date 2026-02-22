"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const texts = [
  "MS-CIT",
  "Tally with GSTT",
  "Advance Excell",
  "Artificial Intelligencee",
  "Typing (CCTP))",
];

export default function Home() {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (index === texts.length) {
      setIndex(0);
      return;
    }

    if (!deleting && subIndex === texts[index].length) {
      setTimeout(() => setDeleting(true), 900);
      return;
    }

    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((prev) => prev + 1);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
    }, deleting ? 40 : 70);

    setDisplayText(texts[index].substring(0, subIndex));
    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting]);

  return (
    <section className="hero">
      <div className="hero-content">

        <h3 className="welcome">Step Into Success</h3>

        <h1 className="mainTitle">
          <span style={{ color: "#f97316" }}>Sunrise </span>
          <span style={{ color: "#1e293b" }}>Computer </span>
          <span style={{ color: "#374151" }}>Education</span>
        </h1>

        <p className="typing">
          {displayText}
          <span className="cursor"></span>
        </p>

        <p className="tagline">
          🚀 MKCL Authorised Center: Reg.No. 44210101
        </p>

        <div className="buttonArea">

          <div
            style={{
              marginTop: "22px",
              display: "flex",
              gap: "14px",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/courses"
              style={{
                padding: "9px 22px",
                background: "#1e293b",
                color: "#ffffff",
                fontWeight: "600",
                fontSize: "14px",
                borderRadius: "40px",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              View Courses
            </Link>

            <Link
              href="/admission"
              style={{
                padding: "9px 22px",
                background: "#f97316",
                color: "#ffffff",
                fontWeight: "600",
                fontSize: "14px",
                borderRadius: "40px",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Take Admission
            </Link>
          </div>

          <div className="cartoon">
            <Image
              src="/mascot.png"
              alt="Click Here"
              width={85}
              height={110}
            />
            <span>Click Here</span>
          </div>

        </div>

      </div>

      <style jsx>{`
        .hero {
          min-height: 85vh;
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          padding: 55px 80px 40px;
          background-image: url('/mkcl-style-bg.png');
          background-size: cover;
          background-position: right center;
          background-repeat: no-repeat;
          animation: bgZoom 8s ease-in-out infinite alternate; /* 🔥 Added Animation */
        }

        @keyframes bgZoom {
          0% {
            background-size: 100% 100%;
          }
          100% {
            background-size: 110% 110%;
          }
        }

        .hero-content {
          max-width: 750px;
        }

        .welcome {
          font-size: 16px;
          letter-spacing: 3px;
          color: #6b7280;
          margin-bottom: 4px;
        }

        .mainTitle {
          font-size: clamp(28px, 5vw, 50px);
          font-weight: 900;
          margin: 4px 0;
          white-space: nowrap;
        }

        .typing {
          font-size: 18px;
          font-weight: 700;
          margin-top: 10px;
          color: #1e293b;
          min-height: 26px;
        }

        .cursor {
          border-right: 2px solid #f97316;
          margin-left: 4px;
        }

        .tagline {
          margin-top: 8px;
          font-weight: 600;
          color: #34373d;
        }

        .buttonArea {
          position: relative;
          display: inline-block;
        }

        .cartoon {
          position: absolute;
          right: -110px;
          top: -10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: float 2s ease-in-out infinite;
        }

        .cartoon span {
          font-size: 12px;
          font-weight: 700;
          color: #f97316;
          margin-top: 4px;
        }

        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        @media (max-width: 900px) {
          .hero {
            padding: 50px 20px;
            align-items: center;
            justify-content: center;
            text-align: center;
          }

          .mainTitle {
            white-space: normal;
          }

          .cartoon {
            position: static;
            margin-top: 10px;
          }
        }
      `}</style>
    </section>
  );
}
