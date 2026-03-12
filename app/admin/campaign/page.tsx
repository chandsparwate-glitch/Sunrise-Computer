"use client";

import { useState } from "react";

export default function CampaignPage() {

  const [numbers, setNumbers] = useState("");
  const [template, setTemplate] = useState("course_information");

  const sendCampaign = async () => {

    const res = await fetch("/api/send-campaign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        numbers,
        template
      }),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px" }}>

      <h1>WhatsApp Campaign Panel</h1>

      <label>Select Template</label>

      <select
        style={{ width: "100%", padding: "10px", marginTop: "5px" }}
        onChange={(e) => setTemplate(e.target.value)}
      >
        <option value="course_information">Course Information</option>
        <option value="admission_open">Admission Open</option>
        <option value="festival_wishes">Festival Wishes</option>
      </select>

      <br /><br />

      <label>Mobile Numbers (comma separated)</label>

      <textarea
        rows={6}
        style={{ width: "100%", padding: "10px" }}
        placeholder="919876543210,919876543211"
        onChange={(e) => setNumbers(e.target.value)}
      />

      <br /><br />

      <button
        onClick={sendCampaign}
        style={{
          background: "green",
          color: "white",
          padding: "12px 20px",
          border: "none",
          cursor: "pointer",
          width: "100%"
        }}
      >
        Send Campaign
      </button>

    </div>
  );
}