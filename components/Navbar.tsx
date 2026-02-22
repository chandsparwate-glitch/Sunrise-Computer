"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import "./navbar.css";

export default function Navbar() {

  const [open,setOpen] = useState(false);
  const menuClass = open ? "menu show" : "menu";

  return (

    <nav className="navbar">

      <div className="nav-inner">

        <div className="logo">
          <Image src="/logo.png" alt="Logo" width={42} height={42}/>
          <div className="brand">
            Sunrise Computer <span className="since">Since 2010</span>
          </div>
        </div>

        <div
          className="hamburger"
          onClick={()=>setOpen(!open)}
        >
          ☰
        </div>

        <div className={menuClass}>

          <Link href="/" onClick={()=>setOpen(false)}>Home</Link>
          <Link href="/about" onClick={()=>setOpen(false)}>About Us</Link>
          <Link href="/courses" onClick={()=>setOpen(false)}>Courses</Link>
          <Link href="/result" onClick={()=>setOpen(false)}>Results</Link>
          <Link href="/gallery" onClick={()=>setOpen(false)}>Gallery</Link>
          <Link href="/why" onClick={()=>setOpen(false)}>Why Us</Link>
          <Link href="/contact" onClick={()=>setOpen(false)}>Contact</Link>
          <Link href="/faqs" onClick={()=>setOpen(false)}>FAQs</Link>

          <Link
            href="/admission"
            onClick={()=>setOpen(false)}
            className="join-btn"
          >
            Join Now
          </Link>

        </div>

      </div>

    </nav>

  );
}
