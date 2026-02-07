"use client";

import { useState } from "react";
import Image from "next/image";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const categories = [
    { title: "Institute Photo", folder: "institute" },
    { title: "Student Photo", folder: "students" },
    { title: "Tour", folder: "tour" },
    { title: "Celebrate", folder: "celebrate" },
  ];

  const images = ["1.jpg", "2.jpg", "3.jpg"]; 
  // प्रत्येक folder मध्ये हीच image नावं असावीत

  return (
    <>
      <section
        style={{
          padding: "70px 20px",
          background: "linear-gradient(135deg, #f8fafc, #e2e8f0)",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "34px", marginBottom: "40px" }}>
          Gallery
        </h2>

        {categories.map((cat) => (
          <div key={cat.folder} style={{ marginBottom: "50px" }}>
            <h3
              style={{
                fontSize: "22px",
                marginBottom: "18px",
                color: "#1e293b",
              }}
            >
              {cat.title}
            </h3>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "12px",
              }}
            >
              {images.map((img, i) => (
                <div
                  key={i}
                  style={{
                    width: "120px",      // 🔥 Small thumbnail
                    height: "90px",
                    cursor: "pointer",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                  }}
                  onClick={() =>
                    setSelectedImage(`/${cat.folder}/${img}`)
                  }
                >
                  <Image
                    src={`/${cat.folder}/${img}`}
                    alt="gallery"
                    width={200}
                    height={150}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* 🔥 Big Image Popup */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <Image
            src={selectedImage}
            alt="large"
            width={900}
            height={600}
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "12px",
            }}
          />
        </div>
      )}
    </>
  );
}
