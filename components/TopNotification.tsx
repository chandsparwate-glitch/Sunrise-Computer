"use client";

export default function TopNotification() {
  return (
    <div style={bar}>
      <div className="scroll-container">
        <div className="scroll-text">
          <span className="blink">NEW</span> 1. Summer Batch करिता Advance Booking सुरू आहे &nbsp;&nbsp;&nbsp;
          <span className="blink">NEW</span> 2. MS-CIT Admission Open &nbsp;&nbsp;&nbsp;
          <span className="blink">NEW</span> 3. Tally + GST Special Batch Admission Open &nbsp;&nbsp;&nbsp;
          <span className="blink">NEW</span> 4. कमी फिस घेणाऱ्या, फसव्या व बनावट केंद्रांपासून सावध राहा. &nbsp;&nbsp;&nbsp;
          <span className="blink">NEW</span> 5. संगणक केंद्र अधिकृत (Authorised) आहे की नाही याची खात्री करूनच प्रवेश घ्यावा.
        </div>
      </div>

      <style jsx>{`
        .scroll-container {
          overflow: hidden;
          white-space: nowrap;
        }

        .scroll-text {
          display: inline-block;
          padding-left: 100%;
          animation: scroll 35s linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .blink {
          background: red;
          color: white;
          padding: 2px 8px;
          margin-right: 5px;
          border-radius: 4px;
          animation: blinkAnim 1s infinite;
        }

        @keyframes blinkAnim {
          0% { opacity: 1; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

const bar = {
  background: "#fbbf24",
  color: "#000",
  padding: "8px 0",
  fontWeight: "600",
};
