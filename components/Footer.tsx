"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="grid">

        <div className="column">
          <h3 className="brand">
            <span className="sunrise">Sunrise</span>{" "}
            <span className="computer">Computer</span>
          </h3>
          <p>
            Practical व job-oriented computer training देणारी विश्वासार्ह संस्था.
            Sangadi मध्ये 20+ वर्षांचा अनुभव.
          </p>
        </div>

        <div className="column">
          <h4>Courses</h4>
          <ul className="tightList">
            <li><a href="/courses">MS-CIT</a></li>
            <li><a href="/courses">Tally with GST</a></li>
            <li><a href="/courses">Advance Excel</a></li>
            <li><a href="/courses">Typing (CCTP)</a></li>
            <li><a href="/courses">Artificial Intelligence</a></li>
          </ul>
        </div>

        <div className="column">
          <h4>Quick Links</h4>
          <ul className="tightList">
            <li><a href="/">Home</a></li>
            <li><a href="/admission">Admission</a></li>
            <li><a href="/gallery">Gallery</a></li>
            <li><a href="/faqs">FAQs</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="column">
          <h4>Contact</h4>
          <p>
            📍 Above Gramin Bank, Sangadi <br />
            Ta. Sakoli, Dist. Bhandara (MS) <br />
            📞 9673447388 <br />
            ⏰ 8 AM – 7 PM
          </p>
        </div>

      </div>

      <div className="bottom">
        <div>👁 Visitors : <strong>000762</strong></div>
        <div>© {new Date().getFullYear()} Sunrise Computer</div>

        <div className="socials">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <Image src="/icons/facebook.png" alt="Facebook" width={20} height={20} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <Image src="/icons/instagram.png" alt="Instagram" width={20} height={20} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            <Image src="/icons/youtube.png" alt="YouTube" width={20} height={20} />
          </a>
          <a href="https://wa.me/919673447388" target="_blank" rel="noreferrer">
            <Image src="/icons/whatsapp.png" alt="WhatsApp" width={20} height={20} />
          </a>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: linear-gradient(135deg, #0f8088, #06666d);
          color: #ffffff;
          padding: 45px 20px 22px;
        }

        .grid {
          max-width: 1200px;
          margin: auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
        }

        .column {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .brand {
          font-size: 22px;
          font-weight: 900;
          margin: 0;
        }

        .sunrise {
          color: #fbbf24;
        }

        .computer {
          color: #ffffff;
        }

        h4 {
          font-size: 17px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        p {
          font-size: 15px;
          line-height: 1.5;
          margin: 0;
        }

        /* 🔥 Reduced list spacing */
        .tightList {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .tightList li {
          margin-bottom: 4px; /* 🔥 Tight spacing */
        }

        a {
          color: #ffffff;
          text-decoration: none;
          font-size: 15px;
          transition: 0.3s;
        }

        a:hover {
          color: #fbbf24;
          padding-left: 3px;
        }

        .bottom {
          margin-top: 30px;
          padding-top: 15px;
          border-top: 1px solid rgba(255,255,255,0.3);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
          font-size: 14px;
        }

        .socials {
          display: flex;
          gap: 14px;
        }

        .socials a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background: rgba(255,255,255,0.15);
          border-radius: 50%;
          transition: 0.3s;
        }

        .socials a:hover {
          background: #fbbf24;
          transform: translateY(-4px);
        }

        @media (max-width: 992px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .bottom {
            justify-content: center;
            text-align: center;
          }
        }

        @media (max-width: 600px) {
          .grid {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .column {
            align-items: center;
          }

          .bottom {
            flex-direction: column;
            gap: 12px;
          }

          .brand {
            font-size: 20px;
          }

          p, a {
            font-size: 14px;
          }
        }
      `}</style>
    </footer>
  );
}
