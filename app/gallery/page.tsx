"use client";

import { useState } from "react";
import Image from "next/image";
import "./gallery.css";

export default function Gallery() {

  const categories = [
    { title: "Institute", folder: "institute" },
    { title: "Students", folder: "students" },
    { title: "Tour", folder: "tour" },
    { title: "Celebrate", folder: "celebrate" },
  ];

  const images = ["1.jpg","2.jpg","3.jpg","4.jpg"];

  const [openedFolder,setOpenedFolder] = useState<string | null>(null);
  const [selectedIndex,setSelectedIndex] = useState<number | null>(null);

  const nextImage = () => {
    if(selectedIndex===null) return;
    setSelectedIndex(selectedIndex === images.length-1 ? 0 : selectedIndex+1);
  };

  const prevImage = () => {
    if(selectedIndex===null) return;
    setSelectedIndex(selectedIndex === 0 ? images.length-1 : selectedIndex-1);
  };

  return (
    <section className="gallery-section">

      <h2 className="gallery-title">Our Moments</h2>

      {!openedFolder && (
        <div className="folder-row">

          {categories.map((cat)=>(
            <div
              key={cat.folder}
              className="folder-card"
              onClick={()=>setOpenedFolder(cat.folder)}
            >

              <div className="folder-preview-grid">

                {images.map((img,i)=>(
                  <Image
                    key={i}
                    src={"/"+cat.folder+"/"+img}
                    alt="preview"
                    width={150}
                    height={100}
                    loading="eager"
                    unoptimized
                    className="mini-preview"
                  />
                ))}

              </div>

              <div className="folder-name">
                {cat.title}
              </div>

            </div>
          ))}

        </div>
      )}

      {openedFolder && (
        <>
          <button
            className="back-btn"
            onClick={()=>setOpenedFolder(null)}
          >
            ← Back
          </button>

          <div className="thumb-grid">

            {images.map((img,i)=>(
              <Image
                key={i}
                src={"/"+openedFolder+"/"+img}
                alt="thumb"
                width={300}
                height={200}
                loading="eager"
                unoptimized
                className="thumb-image"
                onClick={()=>setSelectedIndex(i)}
              />
            ))}

          </div>
        </>
      )}


      {openedFolder && selectedIndex !== null && (

        <div
          className="popup-overlay"
          onClick={()=>setSelectedIndex(null)}
        >

          <div
            className="popup-content"
            onClick={(e)=>e.stopPropagation()}
          >

            <button className="nav-btn left" onClick={prevImage}>
              ❮
            </button>

            <Image
              src={"/"+openedFolder+"/"+images[selectedIndex]}
              alt="large"
              width={600}
              height={450}
              priority
              unoptimized
              className="popup-image"
            />

            <button className="nav-btn right" onClick={nextImage}>
              ❯
            </button>

            <button
              className="close-btn"
              onClick={()=>setSelectedIndex(null)}
            >
              ✕
            </button>

          </div>

        </div>

      )}

    </section>
  );
}