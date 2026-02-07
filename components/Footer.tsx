export default function Footer() {
  return (
    <footer
      style={{
        background: "#0f172a",
        color: "#ffffff",
        padding: "50px 20px 20px 20px",
        marginTop: "60px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "30px",
        }}
      >
        {/* About */}
        <div>
          <h3 style={{ marginBottom: "15px", color: "#fbbf24" }}>
            Sunrise Computer Education
          </h3>
          <p style={{ lineHeight: "1.6", color: "#cbd5e1" }}>
            Practical व job-oriented computer training देणारी
            विश्वासार्ह संस्था. Sangadi मध्ये 20+ वर्षांचा अनुभव.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ marginBottom: "15px", color: "#fbbf24" }}>
            Quick Links
          </h4>
          <ul style={{ listStyle: "none", padding: 0, lineHeight: "2" }}>
            <li><a href="/" style={linkStyle}>Home</a></li>
            <li><a href="/courses" style={linkStyle}>Courses</a></li>
            <li><a href="/admission" style={linkStyle}>Admission</a></li>
            <li><a href="/gallery" style={linkStyle}>Gallery</a></li>
            <li><a href="/faqs" style={linkStyle}>FAQs</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ marginBottom: "15px", color: "#fbbf24" }}>
            Contact
          </h4>
          <p style={{ lineHeight: "1.8", color: "#cbd5e1" }}>
            📍 Above Gramin Bank, Sangadi <br />
            📞 9673447388 <br />
            ⏰ Morning 8 AM – Evening 7 PM
          </p>
        </div>
      </div>

      {/* Bottom Line */}
      <div
        style={{
          marginTop: "40px",
          borderTop: "1px solid #334155",
          paddingTop: "15px",
          textAlign: "center",
          fontSize: "14px",
          color: "#94a3b8",
        }}
      >
        © {new Date().getFullYear()} Sunrise Computer Education. All Rights Reserved.
      </div>
    </footer>
  );
}

const linkStyle = {
  color: "#cbd5e1",
  textDecoration: "none",
};
