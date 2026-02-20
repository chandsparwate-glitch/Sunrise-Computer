"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-inner">

        {/* Logo + Brand */}
        <div className="logo">
          <Image src="/logo.png" alt="Logo" width={42} height={42} />
          <div className="brand">
            Sunrise Computer <span className="since">Since 2010</span>
          </div>
        </div>

        {/* Hamburger */}
        <div className="hamburger" onClick={() => setOpen(!open)}>
          ☰
        </div>

        {/* Menu */}
        <div className={`menu ${open ? "show" : ""}`}>
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/about" onClick={() => setOpen(false)}>About Us</Link>
          <Link href="/courses" onClick={() => setOpen(false)}>Courses</Link>
          <Link href="/result" onClick={() => setOpen(false)}>Results</Link>
          <Link href="/gallery" onClick={() => setOpen(false)}>Gallery</Link>
          <Link href="/why" onClick={() => setOpen(false)}>Why Us</Link>
          <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
          <Link href="/faqs" onClick={() => setOpen(false)}>FAQs</Link>

          {/* 🔥 Join Now Original Style */}
          <Link
            href="/admission"
            onClick={() => setOpen(false)}
            style={{
              padding: "6px 16px",
              background: "#f97316",
              color: "#ffffff",
              borderRadius: "20px",
              fontWeight: "600",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Join Now
          </Link>
        </div>

      </div>

      <style jsx>{`
        .navbar {
          background: #f3f4f6;
          border-bottom: 1px solid #e5e7eb;
        }

        .nav-inner {
          max-width: 1200px;
          margin: auto;
          padding: 12px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brand {
          font-size: 22px;
          font-weight: 900;
          color: #f97316;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .since {
          font-size: 14px;
          font-weight: 500;
          color: #6b7280;
        }

        .menu {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .menu :global(a) {
          color: #374151;
          text-decoration: none;
          font-weight: 500;
        }

        .menu :global(a:hover) {
          color: #f97316;
        }

        .hamburger {
          display: none;
          font-size: 26px;
          cursor: pointer;
        }

        /* MOBILE */
        @media (max-width: 900px) {

          .hamburger {
            display: block;
          }

          .menu {
            position: absolute;
            top: 65px;
            left: 0;
            right: 0;
            background: #ffffff;
            flex-direction: column;
            align-items: center;
            gap: 16px;
            padding: 20px 0;
            display: none;
            border-top: 1px solid #e5e7eb;
          }

          .menu.show {
            display: flex;
          }

          .brand {
            font-size: 18px;
          }

          .since {
            font-size: 12px;
          }
        }
      `}</style>
    </nav>
  );
}
