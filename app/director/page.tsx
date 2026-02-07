import Image from "next/image";

export default function Director() {
  return (
    <section
      style={{
        padding: "120px 20px",
        background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          gap: "50px",
          alignItems: "center",
          flexWrap: "wrap",
          background: "#ffffff",
          padding: "45px",
          borderRadius: "18px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
        }}
      >
        {/* PHOTO SECTION */}
        <div style={{ textAlign: "center", minWidth: "260px" }}>
          <Image
            src="/director.jpg"
            alt="Director"
            width={230}
            height={230}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
              border: "6px solid #fbbf24",
              boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
            }}
          />

          <h3
            style={{
              marginTop: "18px",
              marginBottom: "6px",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#1e3a8a",
            }}
          >
            Mr. Chandrashekhar Parwate
          </h3>

          <p
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              color: "#334155",
            }}
          >
            🎓 Education: BA Graduate
          </p>

          <p style={{ fontSize: "15px", color: "#475569" }}>
            💼 Experience: 20+ Years
          </p>
        </div>

        {/* MESSAGE SECTION */}
        <div style={{ flex: 1 }}>
          <h2
            style={{
              fontSize: "36px",
              marginBottom: "20px",
              color: "#0f172a",
              fontWeight: "bold",
            }}
          >
            Director’s Message
          </h2>

          <p
            style={{
              fontSize: "22px",   // 👈 Increased font size
              color: "#334155",
              lineHeight: "2",
            }}
          >
            Sunrise Computer Education ही संस्था ग्रामीण व शहरी भागातील
            विद्यार्थ्यांना परवडणारे, practical आणि job-oriented computer
            education देण्यासाठी कटिबद्ध आहे.
            <br /><br />
            20+ वर्षांच्या अनुभवाच्या आधारे विद्यार्थ्यांना confidence,
            skill आणि रोजगाराच्या संधी मिळवून देणे हेच आमचे ध्येय आहे.
          </p>

          <p
            style={{
              marginTop: "22px",
              fontWeight: "bold",
              color: "#1e3a8a",
              fontSize: "18px",
            }}
          >
            — Director, Sunrise Computer Education
          </p>
        </div>
      </div>
    </section>
  );
}
