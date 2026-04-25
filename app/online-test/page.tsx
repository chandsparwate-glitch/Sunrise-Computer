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
  const activeTestIds = ["fundamental"];

  const theoryTests: TestUnit[] = [
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
      id: "ms-word-practical",
      title: "MS Word Test",
      subTitle: "Document typing, formatting, table and page setup.",
      href: "/online-test/practical/ms-word",
    },
    {
      id: "ms-excel-practical",
      title: "MS Excel Test",
      subTitle: "Marksheet, formula, sorting, formatting and chart.",
      href: "/online-test/practical/ms-excel",
    },
    {
      id: "ms-powerpoint-practical",
      title: "MS Power Point Test",
      subTitle: "Presentation creation, slide design, animation and transition.",
      href: "/online-test/practical/ms-powerpoint",
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
        .onlineTestPage {
  min-height: 100vh;
  padding: 14px 16px 30px;
          background:
            radial-gradient(circle at top left, rgba(37, 99, 235, 0.18), transparent 30%),
            radial-gradient(circle at bottom right, rgba(249, 115, 22, 0.18), transparent 28%),
            linear-gradient(135deg, #f8fbff, #fff7ed);
          font-family: Arial, sans-serif;
          position: relative;
          overflow: hidden;
        }

        .bgCircle {
          position: absolute;
          border-radius: 50%;
          filter: blur(2px);
          opacity: 0.35;
          z-index: 0;
        }

        .circleOne {
          width: 220px;
          height: 220px;
          background: #60a5fa;
          top: 70px;
          left: -90px;
        }

        .circleTwo {
          width: 260px;
          height: 260px;
          background: #fb923c;
          bottom: -100px;
          right: -100px;
        }

        .loginSection,
        .testDashboard {
          position: relative;
          z-index: 1;
        }

        .loginSection {
  max-width: 1150px;
  min-height: calc(100vh - 120px);
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          align-items: center;
          gap: 34px;
        }

        .leftIntro {
          background: linear-gradient(135deg, #0f172a, #1e3a8a);
          color: white;
          padding: 42px;
          border-radius: 30px;
          box-shadow: 0 20px 50px rgba(15, 23, 42, 0.25);
          min-height: 430px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .brandShape {
          width: fit-content;
          margin: 0 auto 24px auto;
          text-align: center;
          background: linear-gradient(135deg, #fbbf24, #f97316);
          color: #111827;
          padding: 14px 28px;
          border-radius: 22px 22px 22px 4px;
          font-size: 20px;
          font-weight: 950;
          letter-spacing: 0.8px;
          box-shadow: 0 10px 24px rgba(251, 191, 36, 0.3);
          border: 2px solid rgba(255, 255, 255, 0.45);
        }

        .leftIntro h1 {
          font-size: 52px;
          line-height: 1.08;
          margin: 0;
          text-align: center;
        }

        .leftIntro h1 span {
          color: #fbbf24;
        }

        .leftIntro p {
          color: #dbeafe;
          font-size: 17px;
          line-height: 1.7;
          max-width: 580px;
          margin: 18px auto 24px;
          text-align: center;
        }

        .featureBox {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }

        .featureBox div {
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.18);
          padding: 13px;
          border-radius: 14px;
          font-weight: 800;
          font-size: 14px;
        }

        .loginCard {
          width: 100%;
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(12px);
          padding: 32px;
          border-radius: 28px;
          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.14);
          border: 1px solid rgba(255, 255, 255, 0.7);
        }

        .loginTitleRow {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 12px;
}

.loginIcon {
  width: 56px;
  height: 56px;
  border-radius: 18px;
  background: linear-gradient(135deg, #2563eb, #f97316);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  flex-shrink: 0;
}

.loginCard h2 {
  font-size: 31px;
  color: #0f172a;
  margin: 0;
}

        .loginText {
          color: #475569;
          font-size: 15px;
          margin-bottom: 18px;
          line-height: 1.6;
        }

        .loginTypeBox {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 14px;
        }

        .typeBtn {
          border: 1px solid #cbd5e1;
          background: #f8fafc;
          color: #0f172a;
          padding: 14px 10px;
          border-radius: 16px;
          cursor: pointer;
          font-weight: 900;
          display: flex;
          flex-direction: column;
          gap: 4px;
          align-items: center;
          transition: 0.2s ease;
        }

        .typeBtn span {
          font-size: 24px;
        }

        .typeBtn small {
          color: #64748b;
          font-size: 11px;
          font-weight: 800;
        }

        .typeBtn:hover {
          transform: translateY(-1px);
        }

        .activeDemo {
          border-color: #16a34a;
          background: #dcfce7;
          color: #166534;
        }

        .activeRegular {
          border-color: #2563eb;
          background: #dbeafe;
          color: #1e3a8a;
        }

        .modeNote {
          padding: 11px 13px;
          border-radius: 14px;
          font-size: 13px;
          font-weight: 800;
          margin-bottom: 14px;
          line-height: 1.5;
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
          gap: 10px;
        }

        label {
          font-size: 14px;
          font-weight: 800;
          color: #1e293b;
          margin-top: 6px;
        }

        input {
          width: 100%;
          padding: 14px 15px;
          border: 1px solid #cbd5e1;
          border-radius: 14px;
          font-size: 15px;
          outline: none;
          background: #ffffff;
        }

        input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.13);
        }

        form button {
          margin-top: 12px;
          padding: 15px;
          border: none;
          border-radius: 15px;
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          color: white;
          font-size: 16px;
          font-weight: 900;
          cursor: pointer;
          box-shadow: 0 10px 20px rgba(37, 99, 235, 0.22);
        }

        .errorMsg {
          background: #fee2e2;
          color: #b91c1c;
          padding: 10px 12px;
          border-radius: 12px;
          font-size: 14px;
          margin: 6px 0 0;
          font-weight: 800;
        }

        .helpText {
          margin-top: 16px;
          color: #64748b;
          font-size: 13px;
          text-align: center;
          line-height: 1.5;
        }

        .testDashboard {
          max-width: 1200px;
          margin: 0 auto;
        }

        .topBox {
          background: linear-gradient(135deg, #0f172a, #1e3a8a);
          color: white;
          border-radius: 28px;
          padding: 30px;
          margin-bottom: 22px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          box-shadow: 0 18px 42px rgba(15, 23, 42, 0.22);
        }

        .dashboardTag {
          display: inline-block;
          background: rgba(255, 255, 255, 0.14);
          border: 1px solid rgba(255, 255, 255, 0.24);
          color: #fef3c7;
          padding: 7px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 900;
          margin-bottom: 10px;
        }

        .topBox h1 {
          margin: 0 0 6px;
          font-size: 34px;
        }

        .topBox p {
          margin: 0;
          color: #dbeafe;
          line-height: 1.6;
        }

        .logoutBtn {
          border: 1px solid rgba(255, 255, 255, 0.45);
          background: rgba(255, 255, 255, 0.12);
          color: white;
          padding: 12px 18px;
          border-radius: 14px;
          font-weight: 900;
          cursor: pointer;
        }

        .demoGrid {
          display: grid;
          grid-template-columns: minmax(0, 520px);
          justify-content: center;
          gap: 18px;
          margin-top: 20px;
        }

        .demoCard {
          background: white;
          border-radius: 24px;
          padding: 30px;
          border: 1px solid #fed7aa;
          box-shadow: 0 16px 35px rgba(249, 115, 22, 0.16);
          text-align: center;
        }

        .demoBadge {
          display: inline-block;
          background: #ffedd5;
          color: #c2410c;
          padding: 7px 13px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 950;
          margin-bottom: 12px;
        }

        .demoCard h3 {
          margin: 0 0 10px;
          color: #0f172a;
          font-size: 30px;
          font-weight: 950;
        }

        .demoCard p {
          color: #64748b;
          line-height: 1.6;
          margin: 0 0 20px;
          font-size: 16px;
          font-weight: 700;
        }

        .demoBtn {
          display: inline-block;
          text-decoration: none;
          background: linear-gradient(135deg, #f97316, #dc2626);
          color: #ffffff !important;
          padding: 14px 26px;
          border-radius: 20px 20px 20px 5px;
          font-size: 17px;
          font-weight: 950;
          box-shadow: 0 10px 22px rgba(249, 115, 22, 0.34);
          border: 2px solid rgba(255, 255, 255, 0.85);
          animation: demoBlink 1s infinite;
        }

        .demoBtn:hover {
          transform: translateY(-2px) scale(1.03);
        }

        @keyframes demoBlink {
          0% {
            opacity: 1;
            transform: scale(1);
            box-shadow: 0 10px 22px rgba(249, 115, 22, 0.34);
          }
          50% {
            opacity: 0.72;
            transform: scale(1.06);
            box-shadow: 0 12px 30px rgba(220, 38, 38, 0.45);
          }
          100% {
            opacity: 1;
            transform: scale(1);
            box-shadow: 0 10px 22px rgba(249, 115, 22, 0.34);
          }
        }

        .activeNotice {
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          color: #1e3a8a;
          padding: 14px 16px;
          border-radius: 16px;
          margin-bottom: 20px;
          font-size: 15px;
        }

        .testGrid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 24px;
        }

        .block {
          background: white;
          border-radius: 24px;
          padding: 24px;
          box-shadow: 0 12px 30px rgba(15, 23, 42, 0.1);
          border: 1px solid #e2e8f0;
        }

        .blockTitleNew {
          display: flex;
          justify-content: center;
          margin-bottom: 16px;
        }

        .blockTitleNew h2 {
          margin: 0;
          color: white;
          font-size: 24px;
          font-weight: 950;
          text-align: center;
          padding: 13px 28px;
          border-radius: 22px 22px 22px 4px;
          box-shadow: 0 10px 24px rgba(15, 23, 42, 0.18);
        }

        .theory .blockTitleNew h2 {
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
        }

        .practical .blockTitleNew h2 {
          background: linear-gradient(135deg, #f97316, #ea580c);
        }

        .blockDesc {
          margin: 0 0 18px;
          color: #64748b;
          line-height: 1.5;
          font-size: 14px;
          text-align: center;
        }

        .unitList {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .unitCard {
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 16px;
          background: #f8fafc;
          transition: 0.2s ease;
        }

        .unitCardActive {
          background: linear-gradient(135deg, #f0fdf4, #ffffff);
          border-color: #86efac;
          box-shadow: 0 10px 24px rgba(22, 163, 74, 0.15);
        }

        .unitCardInactive {
          background: #f8fafc;
          border-color: #e2e8f0;
          opacity: 0.9;
        }

        .unitTop {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 6px;
        }

        .unitCard h3 {
          margin: 0;
          color: #111827;
          font-size: 18px;
        }

        .statusActive {
          background: #16a34a;
          color: white;
          padding: 5px 10px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 900;
          white-space: nowrap;
        }

        .unitCard p {
          margin: 0;
          color: #64748b;
          font-size: 14px;
          line-height: 1.6;
        }

        .startWrap {
          margin-top: 14px;
        }

        .startBtn {
          text-decoration: none;
          color: white;
          background: linear-gradient(135deg, #ec4899, #dc2626);
          padding: 11px 18px;
          border-radius: 18px 18px 18px 4px;
          font-size: 14px;
          font-weight: 950;
          box-shadow: 0 10px 22px rgba(236, 72, 153, 0.34);
          border: 2px solid rgba(255, 255, 255, 0.85);
          animation: startBlink 1s infinite;
          display: inline-block;
        }

        @keyframes startBlink {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.65;
            transform: scale(1.06);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (max-width: 950px) {
          .loginSection,
          .testGrid {
            grid-template-columns: 1fr;
          }

          .leftIntro {
            min-height: auto;
          }
        }

        @media (max-width: 600px) {
          .onlineTestPage {
  padding: 10px 12px 24px;
}

          .leftIntro {
            padding: 26px;
            border-radius: 22px;
          }

          .brandShape {
            font-size: 15px;
            padding: 12px 18px;
          }

          .leftIntro h1 {
            font-size: 36px;
          }

          .featureBox,
          .loginTypeBox {
            grid-template-columns: 1fr;
          }

          .loginCard {
            padding: 24px;
            border-radius: 22px;
          }

          .topBox {
            flex-direction: column;
            align-items: flex-start;
            padding: 22px;
          }

          .topBox h1 {
            font-size: 25px;
          }

          .demoCard {
            padding: 24px;
          }

          .demoCard h3 {
            font-size: 26px;
          }

          .demoBtn {
            width: 100%;
            text-align: center;
          }

          .startBtn {
            width: 100%;
            text-align: center;
          }
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