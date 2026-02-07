"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const menuItems = [
    { name: "Home", link: "/" },
    { name: "Director", link: "/director" },
    { name: "Courses", link: "/courses" },
    { name: "Gallery", link: "/gallery" },
    { name: "Student Zone", link: "/student-zone" },
    { name: "Admission", link: "/admission" },
    { name: "Social", link: "/social" },
    { name: "Location", link: "/location" },
    { name: "FAQs", link: "/faqs" },
  ];

  return (
    <nav
      style={{
        background: "#111827",
        padding: "14px 25px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            color: "white",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          Sunrise Computer
        </Link>

        {/* Desktop Menu */}
        {!isMobile && (
          <div style={{ display: "flex", gap: "18px" }}>
            {menuItems.map((item, index) => (
              <Link key={index} href={item.link} style={linkStyle}>
                {item.name}
              </Link>
            ))}
          </div>
        )}

        {/* Mobile Hamburger */}
        {isMobile && (
          <div
            onClick={() => setOpen(!open)}
            style={{
              fontSize: "26px",
              color: "white",
              cursor: "pointer",
            }}
          >
            ☰
          </div>
        )}
      </div>

      {/* Mobile Dropdown */}
      {isMobile && open && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "15px",
            gap: "12px",
          }}
        >
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              style={linkStyle}
              onClick={() => setOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "500",
};
