"use client";

import Image from "next/image";

export default function FloatingButtons() {
  return (
    <>
      <a
        href="https://wa.me/919673447388?text=%E0%A4%A8%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%95%E0%A4%BE%E0%A4%B0%20Sunrise%20Computer%2C%20%E0%A4%AE%E0%A4%B2%E0%A4%BE%20%E0%A4%A4%E0%A5%81%E0%A4%AE%E0%A4%9A%E0%A5%8D%E0%A4%AF%E0%A4%BE%20computer%20courses%20%E0%A4%AC%E0%A4%A6%E0%A5%8D%E0%A4%A6%E0%A4%B2%20%E0%A4%AE%E0%A4%BE%E0%A4%B9%E0%A4%BF%E0%A4%A4%E0%A5%80%20%E0%A4%B9%E0%A4%B5%E0%A5%80%20%E0%A4%86%E0%A4%B9%E0%A5%87."
        target="_blank"
        className="whatsapp-float"
      >
        <Image
          src="/whatsapp.png"
          alt="WhatsApp"
          width={24}
          height={24}
        />
        <span>WhatsApp करा</span>
      </a>

      <style>
        {`
          .whatsapp-float {
            position: fixed;
            right: 18px;
            bottom: 18px;
            display: flex;
            align-items: center;
            gap: 8px;
            background: #25D366;
            color: white;
            padding: 10px 16px;
            font-size: 14px;
            font-weight: 600;
            text-decoration: none;
            border-radius: 30px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.25);
            z-index: 999;
            animation: pulse 2s infinite;
            transition: transform 0.2s ease;
          }

          .whatsapp-float:hover {
            transform: scale(1.05);
          }

          @keyframes pulse {
            0% {
              box-shadow: 0 0 0 0 rgba(37,211,102,0.7);
            }
            70% {
              box-shadow: 0 0 0 14px rgba(37,211,102,0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(37,211,102,0);
            }
          }

          @media (max-width: 600px) {
            .whatsapp-float {
              padding: 9px 14px;
              font-size: 13px;
            }
          }
        `}
      </style>
    </>
  );
}