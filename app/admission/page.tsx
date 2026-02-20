"use client";

import { useState } from "react";
import Image from "next/image";

export default function Admission() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    course: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const message = encodeURIComponent(
      `Admission Enquiry:
Name: ${form.name}
Mobile: ${form.mobile}
Course: ${form.course}`
    );

    window.open(
      `https://wa.me/919673447388?text=${message}`,
      "_blank"
    );
  };

  return (
    <>
      <section
        style={{
          padding: "60px 20px", // 🔥 spacing kami
          background: "linear-gradient(135deg, #e2e8f0, #cbd5e1)",
          textAlign: "center",
          minHeight: "100vh",
        }}
      >
        {/* 🔥 BRAND BADGE */}
        <div className="brandBadge">
          Sunrise Computer, Sangadi
        </div>

        {/* 🔥 HEADING */}
        <h3 className="mainHeading">
          Admission Enquiry
        </h3>

        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: "420px",
            margin: "20px auto",
            background: "#ffffff",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <input
            name="name"
            placeholder="नाव"
            value={form.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            name="mobile"
            placeholder="मोबाईल नंबर"
            value={form.mobile}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <select
            name="course"
            value={form.course}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">कोर्स निवडा</option>
            <option>MS-CIT</option>
            <option>Tally with GST</option>
            <option>Data Entry</option>
            <option>Advance Excel</option>
            <option>Hardware</option>
            <option>Artificial Intelligence</option>
            <option>Typing (CCTP)</option>
            <option>Photo Editing</option>
            <option>MS-CIT Refresh</option>
          </select>

          <button type="submit" className="whatsapp-btn">
            <Image
              src="/whatsapp.png"
              alt="WhatsApp"
              width={28}
              height={28}
            />
            WhatsApp वर पाठवा
          </button>

          {/* 🔥 TIP BOX (button khali) */}
          <div className="tipBox">
            Admission करिता वरील माहिती भरून WhatsApp वर send करा
          </div>
        </form>
      </section>

      <style>
        {`
          .brandBadge {
            display: inline-block;
            background: #f97316;
            color: #fff;
            padding: 6px 16px;
            border-radius: 999px;
            font-weight: 700;
            font-size: 30px;
            margin-bottom: 10px;
          }

          .mainHeading {
            font-size: 28px;
            font-weight: 800;
            margin-bottom: 10px;
            color: #021030;
          }

          .whatsapp-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            padding: 14px;
            background: linear-gradient(135deg, #1e293b, #0f172a);
            color: #ffffff;
            border: none;
            font-size: 16px;
            font-weight: bold;
            border-radius: 10px;
            cursor: pointer;
            transition: 0.3s ease;
            animation: glow 2s infinite alternate;
          }

          .whatsapp-btn:hover {
            transform: scale(1.07);
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
          }

          .tipBox {
            margin-top: 6px;
            background: #fff7ed;
            border: 1px solid #fed7aa;
            color: #9a3412;
            padding: 10px 14px;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 500;
          }

          @keyframes glow {
            from {
              box-shadow: 0 0 10px rgba(0,0,0,0.25);
            }
            to {
              box-shadow: 0 0 20px rgba(0,0,0,0.45);
            }
          }
        `}
      </style>
    </>
  );
}

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "15px",
};