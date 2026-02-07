"use client";

export default function Social() {
  return (
    <section
      style={{
        padding: "80px 20px",
        background: "linear-gradient(135deg, #f1f5f9, #e2e8f0)",
        textAlign: "center",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ fontSize: "34px", marginBottom: "10px" }}>
        Connect With Us
      </h2>

      <p style={{ marginBottom: "30px", fontSize: "18px", color: "#555" }}>
        आमच्याशी Social Media व संपर्कात रहा
      </p>

      {/* SOCIAL BUTTONS */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "18px",
          flexWrap: "wrap",
        }}
      >
        <a
          href="https://www.facebook.com/sunrisecomputer1"
          target="_blank"
          className="social-btn fb"
        >
          📘 Facebook
        </a>

        <a
          href="https://www.instagram.com/sunrisecomputer11"
          target="_blank"
          className="social-btn insta"
        >
          📸 Instagram
        </a>

        <a
          href="https://www.snapchat.com/add/sunrisecomputr"
          target="_blank"
          className="social-btn snap"
        >
          👻 Snapchat
        </a>
      </div>

      {/* ACTION BUTTONS */}
      <div
        style={{
          marginTop: "40px",
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <a
          href="https://wa.me/919673447388"
          target="_blank"
          className="action-btn whatsapp"
        >
          💬 WhatsApp वर Chat करा
        </a>

        <a href="tel:919673447388" className="action-btn call">
          📞 Call Now
        </a>
      </div>

      {/* CSS */}
      <style>
        {`
          .social-btn {
            padding: 12px 26px;
            border-radius: 8px;
            text-decoration: none;
            color: white;
            font-weight: 600;
            transition: 0.3s;
          }

          .fb { background: #1877F2; }
          .insta { background: #E1306C; }
          .snap { background: #FFFC00; color: #000; }

          .social-btn:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.2);
          }

          .action-btn {
            padding: 14px 28px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            color: white;
            transition: 0.3s;
          }

          .whatsapp {
            background: linear-gradient(135deg, #1e293b, #0f172a);
            animation: pulse 2s infinite;
          }

          .call { background: #2563eb; }

          .action-btn:hover {
            transform: scale(1.08);
            box-shadow: 0 10px 25px rgba(0,0,0,0.25);
          }

          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(0,0,0,0.3); }
            70% { box-shadow: 0 0 0 15px rgba(0,0,0,0); }
            100% { box-shadow: 0 0 0 0 rgba(0,0,0,0); }
          }
        `}
      </style>
    </section>
  );
}
