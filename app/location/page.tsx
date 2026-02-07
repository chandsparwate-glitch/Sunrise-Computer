export default function Location() {
  return (
    <>
      <section
        style={{
          padding: "50px 20px",
          background: "linear-gradient(135deg, #f1f5f9, #e2e8f0)",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "34px",
            marginBottom: "8px",
            fontWeight: "800",
            color: "#0f172a",
          }}
        >
          Our Location | आमचे ठिकाण
        </h2>

        <p
          style={{
            marginBottom: "25px",
            fontSize: "17px",
            color: "#475569",
          }}
        >
          Sunrise Computer Education, Sangadi
        </p>

        <div
          style={{
            maxWidth: "950px",
            margin: "0 auto",
            borderRadius: "14px",
            overflow: "hidden",
            boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
            background: "#ffffff",
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3722.7732038999193!2d79.9973278!3d21.0817186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a2b71154dccef69%3A0xcd9a23d3613a4791!2sSunrise%20Computer%20Education!5e0!3m2!1sen!2sin!4v1770195288726!5m2!1sen!2sin"
            width="100%"
            height="320"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>

          <div
            style={{
              padding: "20px",
              fontSize: "17px",
              color: "#1e293b",
              lineHeight: "1.8",
            }}
          >
            <p>
              <b style={{ color: "#dc2626" }}>📍 Address:</b> Above Gramin Bank, Sangadi
            </p>

            <p>
              <b style={{ color: "#2563eb" }}>⏰ Class Timing:</b> Morning 8:00 AM | Evening 7:00 PM
            </p>

            <p>
              <b style={{ color: "#16a34a" }}>📞 Contact:</b> 9673447388
            </p>

            {/* GET DIRECTIONS BUTTON */}
            <a
              href="https://maps.google.com/?q=Sunrise+Computer+Sangadi"
              target="_blank"
              className="direction-btn"
            >
              📍 Get Directions
            </a>
          </div>
        </div>
      </section>

      <style>
        {`
          .direction-btn {
            display: inline-block;
            margin-top: 18px;
            padding: 12px 28px;
            background: linear-gradient(135deg, #dc2626, #991b1b);
            color: white;
            font-weight: bold;
            border-radius: 8px;
            text-decoration: none;
            transition: 0.3s ease;
            animation: pulse 2s infinite;
          }

          .direction-btn:hover {
            transform: scale(1.08);
            box-shadow: 0 10px 25px rgba(0,0,0,0.25);
          }

          @keyframes pulse {
            0% {
              box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.6);
            }
            70% {
              box-shadow: 0 0 0 15px rgba(220, 38, 38, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(220, 38, 38, 0);
            }
          }
        `}
      </style>
    </>
  );
}
