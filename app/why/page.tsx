"use client";

import Link from "next/link";

export default function Why() {
  return (
    <section className="why-section">

      <h1 className="heading">
        सनराईज कंप्यूटरच का निवडावे?
      </h1>

      <div className="why-grid">

        <div className="card">
          <div className="icon">🎓</div>
          <h3>अनुभवी शिक्षकवर्ग</h3>
          <p>१५+ वर्षांचा अध्यापनाचा अनुभव आणि विद्यार्थ्यांना योग्य मार्गदर्शन.</p>
        </div>

        <div className="card">
          <div className="icon">💻</div>
          <h3>प्रत्येक विद्यार्थ्याला स्वतंत्र संगणक</h3>
          <p>प्रत्येक विद्यार्थ्यासाठी स्वतंत्र संगणकाची सुविधा उपलब्ध.</p>
        </div>

        <div className="card">
          <div className="icon">🏢</div>
          <h3>आधुनिक प्रशस्त संगणक लॅब</h3>
          <p>अद्ययावत व प्रशस्त संगणक प्रयोगशाळा उत्तम सुविधा सह.</p>
        </div>

        <div className="card">
          <div className="icon">🌐</div>
          <h3>२४/७ इंटरनेट सुविधा</h3>
          <p>विद्यार्थ्यांसाठी उच्च गतीचे इंटरनेट नेहमी उपलब्ध.</p>
        </div>

        <div className="card">
          <div className="icon">📊</div>
          <h3>चांगल्या निकालांची यशस्वी परंपरा</h3>
          <p>उत्तम निकाल व विद्यार्थ्यांचा विश्वास हेच आमचे बळ.</p>
        </div>

        <div className="card">
          <div className="icon">🖥️</div>
          <h3>ऑनलाइन परीक्षा केंद्र</h3>
          <p>अधिकृत ऑनलाइन परीक्षा केंद्राची सुविधा उपलब्ध.</p>
        </div>

        <div className="card">
          <div className="icon">😊</div>
          <h3>१०,०००+ आनंदी विद्यार्थी</h3>
          <p>आतापर्यंत १०,००० पेक्षा जास्त विद्यार्थ्यांचा आमच्यावर विश्वास.</p>
        </div>

        <div className="card">
          <div className="icon">👩</div>
          <h3>महिला व मुलींसाठी स्वतंत्र बॅच</h3>
          <p>महिला व मुलींसाठी सुरक्षित व स्वतंत्र बॅचची सोय.</p>
        </div>

        <div className="card">
          <div className="icon">🔋</div>
          <h3>इन्व्हर्टर सुविधा</h3>
          <p>वीज नसतानाही शिक्षणात खंड पडू नये यासाठी इन्व्हर्टर सुविधा.</p>
        </div>

      </div>

      {/* 🔥 MATCHED JOIN BUTTON */}
<div className="cta-box">
  <a href="/admission" className="cta-btn">
    आताच प्रवेश घ्या
  </a>
</div>

      <style jsx>{`
        .why-section {
          padding: 60px 20px;
          background: linear-gradient(135deg, #fff7ed, #fde68a);
          text-align: center;
        }

        .heading {
          font-size: 34px;
          font-weight: 800;
          margin-bottom: 50px;
          color: #000;
        }

        /* ===== GRID RESPONSIVE ===== */

        .why-grid {
          display: grid;
          gap: 25px;
          max-width: 1150px;
          margin: auto;
        }

        /* Desktop */
        @media (min-width: 992px) {
          .why-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* Tablet */
        @media (min-width: 600px) and (max-width: 991px) {
          .why-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Mobile */
        @media (max-width: 599px) {
          .why-grid {
            grid-template-columns: 1fr;
          }

          .heading {
            font-size: 26px;
          }
        }

        /* ===== CARD ===== */

        .card {
          background: #ffffff;
          padding: 25px;
          border-radius: 18px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          transition: 0.25s ease;
        }

        .card:hover {
          transform: translateY(-6px);
        }

        .icon {
          font-size: 38px;
          margin-bottom: 14px;
        }

        h3 {
          margin-bottom: 8px;
          font-size: 17px;
          color: #1f2937;
        }

        p {
          font-size: 14px;
          color: #4b5563;
        }

        /* ===== CTA BUTTON ===== */

        .cta-box {
          margin-top: 60px;
        }

.cta-btn {
  display: inline-block;
  padding: 10px 26px;
  background: #f97316;
  color: #ffffff;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  animation: joinBlink 1.2s infinite;
  transition: 0.3s ease;
}

        .cta-btn:hover {
          background: #ea580c;
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 8px 20px rgba(0,0,0,0.25);
        }

        @keyframes joinBlink {
          0% { box-shadow: 0 0 0 rgba(249,115,22,0); }
          50% { box-shadow: 0 0 18px rgba(249,115,22,0.9); }
          100% { box-shadow: 0 0 0 rgba(249,115,22,0); }
        }
      `}</style>
    </section>
  );
}