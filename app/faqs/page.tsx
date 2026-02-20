"use client";
import { useState } from "react";

export default function FAQs() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      icon: "📝",
      question: "Admission कशी घ्यायची?",
      answer:
        "Admission साठी institute ला direct visit करा किंवा WhatsApp वर enquiry पाठवा.",
    },
    {
      icon: "📚",
      question: "कोणकोणते courses उपलब्ध आहेत?",
      answer:
        "MS-CIT, Tally with GST, Data Entry, Advance Excel, Hardware, Artificial Intelligence, Typing (CCTP), Photo Editing, MS-CIT Refresh.",
    },
    {
      icon: "⏳",
      question: "Course duration किती असते?",
      answer: "Course नुसार 1 ते 3 महिने duration असते.",
    },
    {
      icon: "💳",
      question: "Fees installment मध्ये भरता येतात का?",
      answer:
        "होय, काही selected courses साठी installment सुविधा उपलब्ध आहे.",
    },
    {
      icon: "🎓",
      question: "Course पूर्ण झाल्यावर certificate मिळते का?",
      answer:
        "होय, course पूर्ण झाल्यावर अधिकृत certificate दिले जाते.",
    },
    {
      icon: "🧑‍🏫",
      question: "Practice आणि guidance दिली जाते का?",
      answer:
        "होय, प्रत्येक course साठी practical training आणि proper guidance दिली जाते.",
    },
    {
      icon: "⏰",
      question: "Class timing काय आहे?",
      answer: "Morning 8:00 AM पासून 7:00 PM.",
    },
    {
      icon: "📄",
      question: "Admission साठी कोणते documents लागतात?",
      answer:
        "Aadhar Card Copy आणि Passport Size Photo आवश्यक आहे.",
    },
  ];

  return (
    <>
      <section
        style={{
          padding: "30px 20px",
          background:
            "linear-gradient(135deg, #e0f2fe, #bfdbfe, #fef3c7)",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "28px",
            marginBottom: "4px",
            fontWeight: 800,
            color: "#1e3a8a",
          }}
        >
          Frequently Asked Questions
        </h2>

        <div
          style={{
            display: "inline-block",
            background: "#fbbf24",
            padding: "6px 18px",
            borderRadius: "20px",
            fontSize: "14px",
            fontWeight: 600,
            color: "#000",
            marginBottom: "20px",
          }}
        >
          विद्यार्थ्यांचे सामान्य प्रश्न
        </div>

        <div className="faq-container">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="faq-item"
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                <span className="icon">{item.icon}</span>
                {item.question}
              </div>

              {activeIndex === index && (
                <div className="faq-answer">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 🔥 WhatsApp CTA (तसाच ठेवला आहे) */}
        <div style={{ marginTop: "25px" }}>
          <p
            style={{
              fontSize: "16px",
              marginBottom: "10px",
              color: "#1e293b",
            }}
          >
            अजून प्रश्न आहेत का?
          </p>

          <a
            href="https://wa.me/919673447388"
            target="_blank"
            className="faq-btn"
          >
            💬 WhatsApp वर विचारा
          </a>
        </div>
      </section>

      <style jsx>{`
        .faq-container {
          max-width: 780px;
          margin: 0 auto;
          text-align: left;
        }

        .faq-item {
          margin-bottom: 12px;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          cursor: pointer;
          transition: 0.3s;
        }

        .faq-item:hover {
          transform: translateY(-3px);
        }

        .faq-question {
          font-weight: 700;
          font-size: 16px;
          color: #1e3a8a;
          padding: 14px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .icon {
          font-size: 18px;
        }

        .faq-answer {
          padding: 0 14px 14px 42px;
          font-size: 15px;
          color: #334155;
          line-height: 1.6;
        }

        .faq-btn {
          display: inline-block;
          padding: 12px 26px;
          background: linear-gradient(135deg, #25D366, #128C7E);
          color: #fff;
          font-size: 16px;
          border-radius: 30px;
          text-decoration: none;
          font-weight: bold;
          transition: 0.3s;
        }

        .faq-btn:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
        }

        @media (max-width: 768px) {
          h2 {
            font-size: 22px;
          }

          .faq-question {
            font-size: 15px;
            padding: 12px;
          }

          .faq-answer {
            font-size: 14px;
            padding-left: 38px;
          }
        }
      `}</style>
    </>
  );
}
