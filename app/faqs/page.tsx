"use client";

export default function FAQs() {
  return (
    <>
      <section
        style={{
          padding: "80px 20px",
          background: "linear-gradient(135deg, #f8fafc, #e2e8f0)",
          textAlign: "center",
          minHeight: "100vh",
        }}
      >
        <h2
          style={{
            fontSize: "36px",
            marginBottom: "10px",
            fontWeight: "800",
            color: "#0f172a",
          }}
        >
          Frequently Asked Questions
        </h2>

        <p
          style={{
            marginBottom: "35px",
            color: "#475569",
            fontSize: "18px",
          }}
        >
          विद्यार्थ्यांचे सामान्य प्रश्न
        </p>

        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <FAQ question="Admission कशी घ्यायची?">
            Admission साठी institute ला direct visit करा किंवा WhatsApp वर enquiry पाठवा.
          </FAQ>

          <FAQ question="कोणकोणते courses उपलब्ध आहेत?">
            MS-CIT, Tally with GST, Data Entry, Advance Excel, Hardware,
            Artificial Intelligence, Typing (CCTP), Photo Editing, MS-CIT Refresh.
          </FAQ>

          <FAQ question="Course duration किती असते?">
            Course नुसार 1 ते 3 महिने duration असते.
          </FAQ>

          <FAQ question="Fees installment मध्ये भरता येतात का?">
            होय, काही selected courses साठी installment सुविधा उपलब्ध आहे.
          </FAQ>

          <FAQ question="Course पूर्ण झाल्यावर certificate मिळते का?">
            होय, course पूर्ण झाल्यावर अधिकृत certificate दिले जाते.
          </FAQ>

          <FAQ question="Practice आणि guidance दिली जाते का?">
            होय, प्रत्येक course साठी practical training आणि proper guidance दिली जाते.
          </FAQ>

          <FAQ question="Class timing काय आहे?">
            Morning 8:00 AM पासून 7:00 PM.
          </FAQ>

          <FAQ question="Admission साठी कोणते documents लागतात?">
            Aadhar Card Copy आणि Passport Size Photo आवश्यक आहे.
          </FAQ>
        </div>

        {/* WhatsApp Help */}
        <div style={{ marginTop: "45px" }}>
          <p style={{ fontSize: "18px", marginBottom: "15px", color: "#1e293b" }}>
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

      <style>
        {`
          .faq-item {
            margin-bottom: 15px;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.08);
            overflow: hidden;
            text-align: left;
          }

          summary {
            font-weight: 700;
            font-size: 18px;
            color: #1e3a8a;
            cursor: pointer;
            padding: 16px;
            transition: 0.3s;
          }

          summary:hover {
            background: #e2e8f0;
          }

          details[open] summary {
            color: #dc2626;
          }

          details p {
            padding: 0 16px 16px 16px;
            font-size: 16px;
            color: #334155;
            line-height: 1.6;
          }

          .faq-btn {
            display: inline-block;
            padding: 14px 30px;
            background: linear-gradient(135deg, #1e293b, #0f172a);
            color: #fff;
            font-size: 18px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            transition: 0.3s;
          }

          .faq-btn:hover {
            transform: scale(1.08);
            box-shadow: 0 10px 25px rgba(0,0,0,0.25);
          }
        `}
      </style>
    </>
  );
}

/* FAQ Component */
function FAQ({ question, children }: any) {
  return (
    <details className="faq-item">
      <summary>{question}</summary>
      <p>{children}</p>
    </details>
  );
}
