"use client";

import Image from "next/image";

export default function Location() {
  return (
    <section className="location-section">
      <div className="content-wrapper">
        <div className="building-area">

          {/* 🔥 ADDRESS BOX */}
          <div className="address-box">

            <h4 className="address-title">📍 आमचा पत्ता</h4>

            <p className="inst-name">
              सनराईज कंप्यूटर
            </p>

            <p className="full-address">
              ग्रामिण बँकेच्या वर, सानगडी <br />
              ता. साकोली, जि. भंडारा – 441802
            </p>

            <p className="contact-line">
              📞 Mo. No. : 9673447388
            </p>

            <p className="contact-line">
              📧 Email : chandsparwate@gmail.com
            </p>

            <div className="btn-row">
              <a href="tel:9673447388" className="call-btn">
                📞 Call Now
              </a>

              <a
                href="https://maps.google.com/?q=Sunrise+Computer+Sangadi"
                target="_blank"
                className="direction-btn"
              >
                📍 Get Directions
              </a>
            </div>
          </div>

          {/* 🔥 SOCIAL ICONS */}
          <div className="social-wrapper">
            <div className="social-row">
              <a href="https://facebook.com" target="_blank">
                <Image src="/icons/facebook.png" alt="Facebook" width={28} height={28} />
              </a>

              <a href="https://instagram.com" target="_blank">
                <Image src="/icons/instagram.png" alt="Instagram" width={28} height={28} />
              </a>

              <a href="https://youtube.com" target="_blank">
                <Image src="/icons/youtube.png" alt="YouTube" width={28} height={28} />
              </a>

              <a href="https://wa.me/919673447388" target="_blank">
                <Image src="/icons/whatsapp.png" alt="WhatsApp" width={28} height={28} />
              </a>
            </div>
          </div>

          {/* 🚴 Cycling Boy */}
          <div className="cycle-boy">
            <img src="/cycle.gif" alt="Cycling Boy" />
          </div>

        </div>
      </div>

      <style jsx>{`
        .location-section {
          padding: 90px 20px;
          background-image: url('/location-bg.png');
          background-size: 100% 100%;
          background-position: center bottom;
          background-repeat: no-repeat;
          animation: bgZoom 10s ease-in-out infinite alternate;
        }

        @keyframes bgZoom {
          0% {
            background-size: 100% 100%;
          }
          100% {
            background-size: 110% 110%;
          }
        }

        .content-wrapper {
          max-width: 1200px;
          margin: auto;
        }

        .building-area {
          position: relative;
          min-height: 560px;
        }

        .address-box {
          position: absolute;
          top: -20px;
          left: 20px;
          background: rgba(255,255,255,0.96);
          padding: 24px 30px;
          border-radius: 18px;
          box-shadow: 0 12px 35px rgba(0,0,0,0.25);
          max-width: 430px;
        }

        .btn-row {
          margin-top: 12px;
          display: flex;
          gap: 12px;
        }

        .call-btn,
        .direction-btn {
          padding: 10px 18px;
          border-radius: 25px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 700;
          color: white;
          transition: 0.3s;
          animation: pulseBtn 1.5s infinite;
        }

        .call-btn { background: #16a34a; }
        .direction-btn { background: #f97316; }

        @keyframes pulseBtn {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        .social-wrapper {
          position: absolute;
          top: 295px;
          left: 35px;
          width: 430px;
        }

        .social-row {
          display: flex;
          gap: 18px;
        }

        .social-row a {
          width: 44px;
          height: 44px;
          background: rgb(247, 238, 238);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          animation: bouncePulse 2s infinite ease-in-out;
        }

        @keyframes bouncePulse {
          0% { transform: translateY(0) scale(1); }
          25% { transform: translateY(-6px) scale(1.05); }
          50% { transform: translateY(0) scale(1); }
          75% { transform: translateY(-3px) scale(1.03); }
          100% { transform: translateY(0) scale(1); }
        }

        .cycle-boy {
          position: absolute;
          bottom: 25px;
          left: -150px;
          animation: moveBike 12s linear infinite;
        }

        .cycle-boy img {
          width: 140px;
        }

        @keyframes moveBike {
          0% { left: -150px; }
          100% { left: 110%; }
        }

        @media (max-width: 768px) {
          .address-box {
            position: static;
            margin-bottom: 10px;
          }

          .social-wrapper {
            position: static;
            width: 100%;
            margin-bottom: 20px;
          }
        }
      `}</style>
    </section>
  );
}
