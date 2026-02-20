"use client";

import Image from "next/image";

export default function FloatingButtons() {
  return (
    <>
      <a
        href="https://wa.me/919673447388"
        target="_blank"
        className="contact-float"
      >
        <span>Contact</span>

        <Image
          src="/whatsapp.png"
          alt="WhatsApp"
          width={26}   // 🔥 Smaller logo
          height={26}
          className="blink-logo"
        />
      </a>

      <style>
        {`
          .contact-float {
            position: fixed;
            right: 18px;
            bottom: 18px;
            display: flex;
            align-items: center;
            gap: 8px;
            background: white;
            color: #111;
            padding: 8px 14px;   /* 🔥 Reduced */
            font-size: 14px;     /* 🔥 Smaller text */
            font-weight: 600;
            text-decoration: none;
            border-radius: 6px;  /* 🔥 Slightly tighter */
            box-shadow: 0 6px 16px rgba(0,0,0,0.18);
            z-index: 999;
            transition: 0.3s ease;
          }

          .contact-float:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 22px rgba(0,0,0,0.25);
          }

          .blink-logo {
            animation: blink 1.5s infinite;
          }

          @keyframes blink {
            0% { transform: scale(1); }
            50% { transform: scale(1.15); }
            100% { transform: scale(1); }
          }

          @media (max-width: 600px) {
            .contact-float {
              padding: 7px 12px;
              font-size: 13px;
            }
          }
        `}
      </style>
    </>
  );
}
