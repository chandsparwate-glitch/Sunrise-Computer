"use client";

import { useState } from "react";
import Link from "next/link";

type LoginType = "demo" | "regular";

type TestUnit = {
  id: string;
  title: string;
  subTitle: string;
  href: string;
};

export default function OnlineTestPage() {
  const [loginType, setLoginType] = useState<LoginType>("demo");
  const [fullName, setFullName] = useState("");
  const [passcode, setPasscode] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState("");

  const correctPasscode = "44210101";

  // ✅ इथे जी test active करायची आहे तिचा id add करा
  const activeTestIds = ["mscitexam", "mscit-final-july26", "word", "excel", "powerpoint"];

  const theoryTests: TestUnit[] = [
    {
      id: "mscitexam",
      title: "MS-CIT Final Exam Test",
      subTitle: "Final exam practice: 15 random questions, timer and instant result.",
      href: "/online-test/theory/mscitexam",
    },
    {
  id: "mscit-final-july26",
  title: "MSCIT Final Exam July 26",
  subTitle:
    "Final Exam Practice Test - 15 Questions | 10 Minutes | 1 Mark Each",
  href: "/online-test/theory/mscit-final-july26",
},
    {
      id: "fundamental",
      title: "Fundamental",
      subTitle: "Computer basic, hardware, software and basic IT knowledge.",
      href: "/online-test/theory/fundamental",
    },
    {
      id: "input-output",
      title: "Input Output",
      subTitle: "Input devices, output devices and their uses.",
      href: "/online-test/theory/input-output",
    },
    {
      id: "system-software",
      title: "System Software",
      subTitle: "Operating system, utility software and system programs.",
      href: "/online-test/theory/system-software",
    },
    {
      id: "secondary-storage",
      title: "Secondary Storage",
      subTitle: "Hard disk, pen drive, memory card, CD/DVD and storage devices.",
      href: "/online-test/theory/secondary-storage",
    },
    {
      id: "system-unit",
      title: "System Unit",
      subTitle: "CPU, motherboard, RAM, ports and internal computer parts.",
      href: "/online-test/theory/system-unit",
    },
    {
      id: "internet-web",
      title: "Internet and Web",
      subTitle: "Internet, browser, website, email and online safety.",
      href: "/online-test/theory/internet-web",
    },
  ];

  const practicalTests: TestUnit[] = [
    {
      id: "word",
      title: "MS Word Test",
      subTitle: "Document typing, formatting, table and page setup.",
      href: "/online-test/practical/word",
    },
    {
      id: "excel",
      title: "MS Excel Test",
      subTitle: "Marksheet, formula, sorting, formatting and chart.",
      href: "/online-test/practical/excel",
    },
    {
      id: "powerpoint",
      title: "MS Power Point Test",
      subTitle: "Presentation creation, slide design, animation and transition.",
      href: "/online-test/practical/powerpoint",
    },
    {
      id: "windows-practical",
      title: "Windows Test",
      subTitle: "Desktop, files, folders, control panel and basic settings.",
      href: "/online-test/practical/windows",
    },
    {
      id: "internet-practical",
      title: "Internet Test",
      subTitle: "Browser, search, email, download and online forms.",
      href: "/online-test/practical/internet",
    },
  ];

  const allTests = [...theoryTests, ...practicalTests];

  const activeTestNames = allTests
    .filter((test) => activeTestIds.includes(test.id))
    .map((test) => test.title);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (fullName.trim() === "") {
      setError("Please enter your full name.");
      return;
    }

    if (loginType === "regular") {
      if (passcode.trim() === "") {
        setError("Please enter passcode.");
        return;
      }

      if (passcode !== correctPasscode) {
        setError("Invalid passcode. Please contact Sunrise Computer.");
        return;
      }
    }

    setError("");
    setIsLogin(true);

    if (typeof window !== "undefined") {
      localStorage.setItem("studentFullName", fullName);
      localStorage.setItem("studentLoginType", loginType);
    }
  };

  const logout = () => {
    setIsLogin(false);
    setFullName("");
    setPasscode("");
    setError("");
    setLoginType("demo");

    if (typeof window !== "undefined") {
      localStorage.removeItem("studentFullName");
      localStorage.removeItem("studentLoginType");
    }
  };

  return (
    <main className="onlineTestPage">
      <div className="bgCircle circleOne"></div>
      <div className="bgCircle circleTwo"></div>

      {!isLogin ? (
        <section className="loginSection">
          <div className="leftIntro">
            <div className="brandShape">SUNRISE COMPUTER EDUCATION</div>

            <h1>
              Online Test <br />
              <span>Portal</span>
            </h1>

            <p>
              विद्यार्थ्यांच्या गुणवत्तेसाठी Demo Test आणि Regular Student Unit
              Test साठी online test system.
            </p>

            <div className="featureBox">
              <div>✅ Demo Student Test</div>
              <div>✅ Regular Student Login</div>
              <div>✅ Online Practice Test</div>
              <div>✅ Quality Education</div>
            </div>
          </div>

          <div className="loginCard">
            <div className="loginTitleRow">
  <div className="loginIcon">🎓</div>
  <h2>Student Login</h2>
</div>

            <p className="loginText">
              आधी तुम्ही कोणत्या प्रकारचे student आहात ते select करा.
            </p>

            <div className="loginTypeBox">
              <button
                type="button"
                onClick={() => {
                  setLoginType("demo");
                  setPasscode("");
                  setError("");
                }}
                className={loginType === "demo" ? "typeBtn activeDemo" : "typeBtn"}
              >
                <span>📝</span>
                Demo Student
                <small>No Passcode</small>
              </button>

              <button
                type="button"
                onClick={() => {
                  setLoginType("regular");
                  setError("");
                }}
                className={
                  loginType === "regular" ? "typeBtn activeRegular" : "typeBtn"
                }
              >
                <span>🔐</span>
                Regular Student
                <small>Passcode Required</small>
              </button>
            </div>

            <div
              className={
                loginType === "demo"
                  ? "modeNote demoNote"
                  : "modeNote regularNote"
              }
            >
              {loginType === "demo"
                ? "Demo Student साठी फक्त Full Name टाका. Passcode लागणार नाही."
                : "Regular Student साठी Full Name आणि Passcode आवश्यक आहे."}
            </div>

            <form onSubmit={handleLogin}>
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />

              {loginType === "regular" && (
                <>
                  <label>Passcode</label>
                  <input
                    type="password"
                    placeholder="Enter test passcode"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                  />
                </>
              )}

              {error && <p className="errorMsg">{error}</p>}

              <button type="submit">
                {loginType === "demo"
                  ? "Continue as Demo Student"
                  : "Login as Regular Student"}
              </button>
            </form>

            <p className="helpText">
              {loginType === "demo"
                ? "Demo test सर्वांसाठी open आहे."
                : "Passcode माहित नसेल तर Sunrise Computer office मध्ये संपर्क करा."}
            </p>
          </div>
        </section>
      ) : (
        <section className="testDashboard">
          <div className="topBox">
            <div>
              <span className="dashboardTag">
                {loginType === "demo"
                  ? "DEMO STUDENT MODE"
                  : "REGULAR STUDENT MODE"}
              </span>

              <h1>Welcome, {fullName}</h1>

              <p>
                {loginType === "demo"
                  ? "Demo Test सुरू करण्यासाठी खालील button वर click करा."
                  : "फक्त active असलेल्या test वर click करून test सुरू करा."}
              </p>
            </div>

            <button onClick={logout} className="logoutBtn">
              Logout
            </button>
          </div>

          {loginType === "demo" ? (
            <div className="demoGrid">
              <div className="demoCard">
                <span className="demoBadge">DEMO TEST</span>

                <h3>Demo Test</h3>

                <p>
                  Practice साठी demo test उपलब्ध आहे. Test सुरू करण्यासाठी खालील
                  button वर click करा.
                </p>

                <Link href="/online-test/demo/mscit" className="demoBtn">
                  Start Demo Test
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="activeNotice">
                <b>Active Test:</b>{" "}
                {activeTestNames.length > 0
                  ? activeTestNames.join(", ")
                  : "No active test"}
              </div>

              <div className="testGrid">
                <TestBlock
                  heading="Theory Test"
                  description="Computer theory unit wise online test."
                  tests={theoryTests}
                  color="theory"
                  activeTestIds={activeTestIds}
                />

                <TestBlock
                  heading="Practical Test"
                  description="Practical skill based online test."
                  tests={practicalTests}
                  color="practical"
                  activeTestIds={activeTestIds}
                />
              </div>
            </>
          )}
        </section>
      )}

      <style jsx global>{`
        * { box-sizing: border-box; }

        .onlineTestPage {
          height: 100vh;
          padding: 10px 14px;
          background:
            radial-gradient(circle at 8% 8%, rgba(14, 165, 233, 0.20), transparent 26%),
            radial-gradient(circle at 92% 90%, rgba(245, 158, 11, 0.22), transparent 26%),
            linear-gradient(135deg, #eef7ff 0%, #fff8ed 52%, #f7fee7 100%);
          font-family: Arial, sans-serif;
          position: relative;
          overflow: hidden;
          color: #0f172a;
        }

        .bgCircle {
          position: absolute;
          border-radius: 50%;
          opacity: 0.25;
          z-index: 0;
          pointer-events: none;
        }

        .circleOne {
          width: 170px;
          height: 170px;
          background: #38bdf8;
          top: 45px;
          left: -75px;
        }

        .circleTwo {
          width: 210px;
          height: 210px;
          background: #fb923c;
          bottom: -95px;
          right: -80px;
        }

        .loginSection,
        .testDashboard {
          position: relative;
          z-index: 1;
        }

        .loginSection {
          width: min(1080px, 100%);
          height: calc(100vh - 20px);
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          align-items: center;
          gap: 22px;
        }

        .leftIntro {
          background: linear-gradient(135deg, #0f172a, #1d4ed8 55%, #0f766e);
          color: white;
          padding: 28px;
          border-radius: 24px;
          box-shadow: 0 14px 34px rgba(15, 23, 42, 0.20);
          min-height: 350px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .brandShape {
          width: fit-content;
          margin: 0 auto 16px;
          text-align: center;
          background: linear-gradient(135deg, #fbbf24, #f97316);
          color: #111827;
          padding: 10px 20px;
          border-radius: 18px 18px 18px 4px;
          font-size: 17px;
          font-weight: 950;
          letter-spacing: 0.6px;
          box-shadow: 0 8px 18px rgba(251, 191, 36, 0.25);
        }

        .leftIntro h1 {
          font-size: 42px;
          line-height: 1.06;
          margin: 0;
          text-align: center;
        }

        .leftIntro h1 span { color: #fde68a; }

        .leftIntro p {
          color: #e0f2fe;
          font-size: 15px;
          line-height: 1.55;
          max-width: 560px;
          margin: 14px auto 18px;
          text-align: center;
        }

        .featureBox {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }

        .featureBox div {
          background: rgba(255, 255, 255, 0.13);
          border: 1px solid rgba(255, 255, 255, 0.18);
          padding: 10px 11px;
          border-radius: 13px;
          font-weight: 800;
          font-size: 13px;
        }

        .loginCard {
          width: 100%;
          background: rgba(255, 255, 255, 0.96);
          padding: 24px;
          border-radius: 24px;
          box-shadow: 0 14px 34px rgba(15, 23, 42, 0.14);
          border: 1px solid rgba(255, 255, 255, 0.8);
        }

        .loginTitleRow {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }

        .loginIcon {
          width: 48px;
          height: 48px;
          border-radius: 16px;
          background: linear-gradient(135deg, #2563eb, #f97316);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          flex-shrink: 0;
        }

        .loginCard h2 {
          font-size: 27px;
          color: #0f172a;
          margin: 0;
        }

        .loginText {
          color: #475569;
          font-size: 14px;
          margin: 0 0 13px;
          line-height: 1.45;
        }

        .loginTypeBox {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 10px;
        }

        .typeBtn {
          border: 1px solid #cbd5e1;
          background: #f8fafc;
          color: #0f172a;
          padding: 11px 8px;
          border-radius: 15px;
          cursor: pointer;
          font-weight: 900;
          display: flex;
          flex-direction: column;
          gap: 3px;
          align-items: center;
          transition: 0.18s ease;
        }

        .typeBtn span { font-size: 22px; }

        .typeBtn small {
          color: #64748b;
          font-size: 10px;
          font-weight: 800;
        }

        .typeBtn:hover { transform: translateY(-1px); }

        .activeDemo {
          border-color: #22c55e;
          background: #dcfce7;
          color: #166534;
        }

        .activeRegular {
          border-color: #2563eb;
          background: #dbeafe;
          color: #1e3a8a;
        }

        .modeNote {
          padding: 9px 11px;
          border-radius: 13px;
          font-size: 12.5px;
          font-weight: 800;
          margin-bottom: 10px;
          line-height: 1.4;
        }

        .demoNote {
          background: #f0fdf4;
          color: #166534;
          border: 1px solid #bbf7d0;
        }

        .regularNote {
          background: #eff6ff;
          color: #1e3a8a;
          border: 1px solid #bfdbfe;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        label {
          font-size: 13px;
          font-weight: 850;
          color: #1e293b;
          margin-top: 4px;
        }

        input {
          width: 100%;
          padding: 12px 13px;
          border: 1px solid #cbd5e1;
          border-radius: 13px;
          font-size: 14px;
          outline: none;
          background: #ffffff;
        }

        input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.13);
        }

        form button {
          margin-top: 8px;
          padding: 13px;
          border: none;
          border-radius: 14px;
          background: linear-gradient(135deg, #2563eb, #0f766e);
          color: white;
          font-size: 15px;
          font-weight: 950;
          cursor: pointer;
          box-shadow: 0 9px 18px rgba(37, 99, 235, 0.20);
        }

        .errorMsg {
          background: #fee2e2;
          color: #b91c1c;
          padding: 9px 11px;
          border-radius: 11px;
          font-size: 13px;
          margin: 5px 0 0;
          font-weight: 800;
        }

        .helpText {
          margin: 12px 0 0;
          color: #64748b;
          font-size: 12.5px;
          text-align: center;
          line-height: 1.4;
        }

        .testDashboard {
          width: min(1160px, 100%);
          height: calc(100vh - 20px);
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }

        .topBox {
          background: linear-gradient(135deg, #0f172a, #1d4ed8 62%, #0f766e);
          color: white;
          border-radius: 22px;
          padding: 18px 22px;
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 14px;
          box-shadow: 0 12px 28px rgba(15, 23, 42, 0.18);
          flex-shrink: 0;
        }

        .dashboardTag {
          display: inline-block;
          background: rgba(255, 255, 255, 0.14);
          border: 1px solid rgba(255, 255, 255, 0.24);
          color: #fef3c7;
          padding: 5px 10px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 900;
          margin-bottom: 6px;
        }

        .topBox h1 {
          margin: 0 0 3px;
          font-size: 26px;
          line-height: 1.1;
        }

        .topBox p {
          margin: 0;
          color: #dbeafe;
          line-height: 1.35;
          font-size: 13px;
        }

        .logoutBtn {
          border: 1px solid rgba(255, 255, 255, 0.45);
          background: rgba(255, 255, 255, 0.12);
          color: white;
          padding: 10px 15px;
          border-radius: 13px;
          font-weight: 900;
          cursor: pointer;
          flex-shrink: 0;
        }

        .demoGrid {
          display: grid;
          grid-template-columns: minmax(0, 440px);
          justify-content: center;
          gap: 14px;
          margin-top: 12px;
        }

        .demoCard {
          background: white;
          border-radius: 22px;
          padding: 22px;
          border: 1px solid #fed7aa;
          box-shadow: 0 12px 26px rgba(249, 115, 22, 0.13);
          text-align: center;
        }

        .demoBadge {
          display: inline-block;
          background: #ffedd5;
          color: #c2410c;
          padding: 6px 11px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 950;
          margin-bottom: 8px;
        }

        .demoCard h3 {
          margin: 0 0 8px;
          color: #0f172a;
          font-size: 25px;
          font-weight: 950;
        }

        .demoCard p {
          color: #64748b;
          line-height: 1.45;
          margin: 0 0 15px;
          font-size: 14px;
          font-weight: 700;
        }

        .demoBtn {
          display: inline-block;
          text-decoration: none;
          background: linear-gradient(135deg, #f97316, #dc2626);
          color: #ffffff !important;
          padding: 12px 22px;
          border-radius: 18px 18px 18px 5px;
          font-size: 15px;
          font-weight: 950;
          box-shadow: 0 8px 18px rgba(249, 115, 22, 0.28);
          border: 2px solid rgba(255, 255, 255, 0.85);
        }

        .activeNotice {
          background: rgba(255, 255, 255, 0.82);
          border: 1px solid #bfdbfe;
          color: #1e3a8a;
          padding: 9px 13px;
          border-radius: 14px;
          margin-bottom: 10px;
          font-size: 13px;
          box-shadow: 0 8px 20px rgba(37, 99, 235, 0.08);
          flex-shrink: 0;
        }

        .testGrid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
          min-height: 0;
          flex: 1;
        }

        .block {
          background: rgba(255, 255, 255, 0.92);
          border-radius: 20px;
          padding: 15px;
          box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
          border: 1px solid #e2e8f0;
          min-height: 0;
          display: flex;
          flex-direction: column;
        }

        .blockTitleNew {
          display: flex;
          justify-content: center;
          margin-bottom: 8px;
          flex-shrink: 0;
        }

        .blockTitleNew h2 {
          margin: 0;
          color: white;
          font-size: 20px;
          font-weight: 950;
          text-align: center;
          padding: 9px 22px;
          border-radius: 18px 18px 18px 4px;
          box-shadow: 0 8px 18px rgba(15, 23, 42, 0.14);
        }

        .theory .blockTitleNew h2 {
          background: linear-gradient(135deg, #2563eb, #0f766e);
        }

        .practical .blockTitleNew h2 {
          background: linear-gradient(135deg, #f97316, #db2777);
        }

        .blockDesc {
          margin: 0 0 10px;
          color: #64748b;
          line-height: 1.35;
          font-size: 12.5px;
          text-align: center;
          flex-shrink: 0;
        }

        .unitList {
          display: flex;
          flex-direction: column;
          gap: 9px;
          overflow-y: auto;
          padding-right: 4px;
          min-height: 0;
        }

        .unitList::-webkit-scrollbar { width: 7px; }
        .unitList::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 999px; }
        .unitList::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 999px; }

        .unitCard {
          border: 1px solid #e2e8f0;
          border-radius: 15px;
          padding: 11px 12px;
          background: #f8fafc;
          transition: 0.2s ease;
        }

        .unitCardActive {
          background: linear-gradient(135deg, #ecfdf5, #ffffff);
          border-color: #86efac;
          box-shadow: 0 8px 18px rgba(22, 163, 74, 0.10);
        }

        .unitCardInactive {
          background: #f8fafc;
          border-color: #e2e8f0;
          opacity: 0.86;
        }

        .unitTop {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }

        .unitCard h3 {
          margin: 0;
          color: #111827;
          font-size: 15.5px;
          line-height: 1.25;
        }

        .statusActive {
          background: #16a34a;
          color: white;
          padding: 4px 8px;
          border-radius: 999px;
          font-size: 10px;
          font-weight: 900;
          white-space: nowrap;
        }

        .unitCard p {
          margin: 0;
          color: #64748b;
          font-size: 12.2px;
          line-height: 1.35;
        }

        .startWrap { margin-top: 8px; }

        .startBtn {
          text-decoration: none;
          color: white;
          background: linear-gradient(135deg, #ec4899, #dc2626);
          padding: 8px 14px;
          border-radius: 15px 15px 15px 4px;
          font-size: 12.5px;
          font-weight: 950;
          box-shadow: 0 8px 16px rgba(236, 72, 153, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.85);
          display: inline-block;
        }

        .startBtn:hover,
        .demoBtn:hover,
        .logoutBtn:hover,
        form button:hover {
          transform: translateY(-1px);
          filter: brightness(1.03);
        }

        @media (max-width: 950px) {
          .onlineTestPage {
            height: auto;
            min-height: 100vh;
            overflow-y: auto;
          }

          .loginSection,
          .testDashboard {
            height: auto;
            min-height: calc(100vh - 20px);
          }

          .loginSection,
          .testGrid {
            grid-template-columns: 1fr;
          }

          .leftIntro { min-height: auto; }
          .unitList { max-height: none; overflow: visible; }
        }

        @media (max-width: 600px) {
          .onlineTestPage { padding: 8px 10px; }
          .leftIntro { padding: 22px; border-radius: 20px; }
          .brandShape { font-size: 14px; padding: 9px 15px; }
          .leftIntro h1 { font-size: 32px; }
          .featureBox, .loginTypeBox { grid-template-columns: 1fr; }
          .loginCard { padding: 20px; border-radius: 20px; }
          .topBox { flex-direction: column; align-items: flex-start; padding: 16px; }
          .topBox h1 { font-size: 22px; }
          .demoCard { padding: 20px; }
          .demoBtn, .startBtn { width: 100%; text-align: center; }
        }
      `}</style>
    </main>
  );
}

function TestBlock({
  heading,
  description,
  tests,
  color,
  activeTestIds,
}: {
  heading: string;
  description: string;
  tests: TestUnit[];
  color: "theory" | "practical";
  activeTestIds: string[];
}) {
  return (
    <div className={`block ${color}`}>
      <div className="blockTitleNew">
        <h2>{heading}</h2>
      </div>

      <p className="blockDesc">{description}</p>

      <div className="unitList">
        {tests.map((test) => {
          const isActive = activeTestIds.includes(test.id);

          return (
            <div
              className={
                isActive ? "unitCard unitCardActive" : "unitCard unitCardInactive"
              }
              key={test.id}
            >
              <div className="unitTop">
                <h3>
                  {isActive ? "✅ " : "📘 "}
                  {test.title}
                </h3>

                {isActive && <span className="statusActive">ACTIVE</span>}
              </div>

              <p>{test.subTitle}</p>

              {isActive && (
                <div className="startWrap">
                  <Link href={test.href} className="startBtn">
                    Start Test
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}