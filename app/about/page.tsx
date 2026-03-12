"use client";

import Image from "next/image";

export default function About() {
  return (
<section
  style={{
    padding: "40px 20px",
    background: "#c1c9db",   // ✅ Dark course theme solid color
  }}
>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* ================= DIRECTOR ================= */}
        <div style={card}>
          <div style={{ textAlign: "center", minWidth: "220px" }}>
            <Image
              src="/director.jpg"
              alt="Director"
              width={190}
              height={190}
              style={profileImg}
            />
            <h3 style={{ marginTop: "12px", color: "#1e3a8a" }}>
              Mr. Chandrashekhar Parwate
            </h3>
            <p>🎓 BA Graduate</p>
            <p>💼 20+ Years Experience</p>
          </div>

          <div style={{ flex: 1 }}>
            <h2
              style={{
                color: "#1e3a8a",
                marginBottom: "12px",
                fontWeight: 800
              }}
            >
              Director’s Message
            </h2>

            <p
              style={{
                fontSize: "19px",
                fontWeight: "600",
                lineHeight: "1.9",
                color: "#1e293b",
              }}
            >
              Sunrise Computer Education ही संस्था ग्रामीण व शहरी भागातील
              विद्यार्थ्यांना परवडणारे, practical आणि job-oriented computer
              education देण्यासाठी कटिबद्ध आहे.
              <br /><br />
              20+ वर्षांच्या अनुभवाच्या आधारे विद्यार्थ्यांना confidence,
              skill आणि रोजगाराच्या संधी मिळवून देणे हेच आमचे ध्येय आहे.
            </p>

            <p style={{ marginTop: "12px", fontWeight: "bold", color: "#1e3a8a" }}>
              — Director, Sunrise Computer Education
            </p>
          </div>
        </div>

        {/* ================= CO DIRECTOR ================= */}
        <div style={{ ...card, marginTop: "40px" }}>
          <div style={{ textAlign: "center", minWidth: "220px" }}>
            <Image
              src="/codirector.jpg"
              alt="Co Director"
              width={190}
              height={190}
              style={{
                borderRadius: "50%",
                objectFit: "cover",
                border: "5px solid #2563eb",
              }}
            />

            <h3 style={{ marginTop: "12px", color: "#1e3a8a" }}>
              Mrs. Rajeshri Parwate
            </h3>
            <p>🎓 M.A.</p>
            <p>💼 7 Years Experience</p>
          </div>

          <div style={{ flex: 1 }}>
            <h2
              style={{
                color: "#1e3a8a",
                marginBottom: "12px",
                fontWeight: 800
              }}
            >
              Co-Director’s Message
            </h2>

            <p
              style={{
                fontSize: "18px",
                fontWeight: "600",
                lineHeight: "1.9",
                color: "#1e293b",
              }}
            >
              विद्यार्थ्यांना योग्य मार्गदर्शन, शिस्तबद्ध प्रशिक्षण व आधुनिक
              तंत्रज्ञानाचे ज्ञान देणे हेच आमचे ध्येय आहे.
              <br /><br />
              प्रत्येक विद्यार्थ्याने आत्मविश्वासाने व कौशल्यपूर्ण पद्धतीने
              भविष्य घडवावे यासाठी आम्ही सतत प्रयत्नशील आहोत.
            </p>

            <p style={{ marginTop: "12px", fontWeight: "bold", color: "#1e3a8a" }}>
              — Co-Director, Sunrise Computer Education
            </p>
          </div>
        </div>

        {/* ================= STAFF ================= */}
        <div style={{ textAlign: "center", marginTop: "45px" }}>
          <div
            style={{
              display: "inline-block",
              background: "#fbbf24",
              color: "#1e293b",
              padding: "10px 30px",
              borderRadius: "40px",
              fontSize: "26px",
              fontWeight: 800,
              marginBottom: "25px",
            }}
          >
            Our Staff Members
          </div>

          <div style={staffWrapper}>
            <StaffCard
              image="/shital.jpg"
              name="Miss Shital Gobade"
              edu="M.Com"
              exp="3 Years Experience"
            />
            <StaffCard
              image="/akshay.jpg"
              name="Mr. Akshay Gotefode"
              edu="B.Com"
              exp="2 Years Experience"
            />
            <StaffCard
              image="/damini.jpg"
              name="Miss Damini Giri"
              edu="B.A."
              exp="2 Years Experience"
            />
          </div>
        </div>

      </div>
    </section>
  );
}

/* ---------- STYLES ---------- */

const card = {
  display: "flex",
  gap: "30px",
  flexWrap: "wrap" as const,
  alignItems: "center",
  background: "#ffffff",
  padding: "28px",
  borderRadius: "18px",
  boxShadow: "0 12px 30px rgba(0,0,0,0.2)",
};

const profileImg = {
  borderRadius: "50%",
  objectFit: "cover" as const,
  border: "5px solid #fbbf24",
};

const staffWrapper = {
  display: "flex",
  justifyContent: "center",
  gap: "25px",
  flexWrap: "wrap" as const,
};

const staffCard = {
  background: "#ffffff",
  padding: "22px",
  borderRadius: "16px",
  width: "230px",
  textAlign: "center" as const,
  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
};

const staffImg = {
  display: "block",
  margin: "0 auto 10px auto",
  borderRadius: "50%",
  objectFit: "cover" as const,
  border: "4px solid #fbbf24",
};

function StaffCard({ image, name, edu, exp }: any) {
  return (
    <div style={staffCard}>
      <Image src={image} alt={name} width={130} height={130} style={staffImg} />
      <h4 style={{ marginTop: "10px", color: "#1e3a8a" }}>{name}</h4>
      <p>🎓 {edu}</p>
      <p>💼 {exp}</p>
    </div>
  );
}
