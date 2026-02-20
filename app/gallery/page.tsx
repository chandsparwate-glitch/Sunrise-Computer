"use client";

import { useState } from "react";
import Image from "next/image";

export default function Gallery() {
  const categories = [
    { title: "Institute", folder: "institute" },
    { title: "Students", folder: "students" },
    { title: "Tour", folder: "tour" },
    { title: "Celebrate", folder: "celebrate" },
  ];

  const images = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];

  const [openedFolder, setOpenedFolder] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const nextImage = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(
      selectedIndex === images.length - 1 ? 0 : selectedIndex + 1
    );
  };

  const prevImage = () => {
    if (selectedIndex === null) return;
    setSelectedIndex(
      selectedIndex === 0 ? images.length - 1 : selectedIndex - 1
    );
  };

  return (
    <>
      <section className="gallery-section">
        <h2 className="gallery-title">Our Moments</h2>

        {!openedFolder && (
          <div className="folder-row">
            {categories.map((cat) => (
              <div
                key={cat.folder}
                className="folder-card"
                onClick={() => setOpenedFolder(cat.folder)}
              >
                <div className="folder-preview-grid">
                  {images.slice(0, 4).map((img, i) => (
                    <Image
                      key={i}
                      src={`/${cat.folder}/${img}`}
                      alt="preview"
                      width={150}
                      height={100}
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
              onClick={() => setOpenedFolder(null)}
            >
              ← Back
            </button>

            <div className="thumb-grid">
              {images.map((img, i) => (
                <Image
                  key={i}
                  src={`/${openedFolder}/${img}`}
                  alt="thumb"
                  width={300}
                  height={200}
                  className="thumb-image"
                  onClick={() => setSelectedIndex(i)}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {openedFolder && selectedIndex !== null && (
        <div
          className="popup-overlay"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="popup-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="nav-btn left" onClick={prevImage}>
              ❮
            </button>

            <Image
              src={`/${openedFolder}/${images[selectedIndex]}`}
              alt="large"
              width={600}
              height={450}
              className="popup-image"
            />

            <button className="nav-btn right" onClick={nextImage}>
              ❯
            </button>

            <button
              className="close-btn"
              onClick={() => setSelectedIndex(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        /* 🔥 Reduced Top Space */
        .gallery-section {
          padding: 60px 20px 80px 20px; /* top space reduced */
          background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
          color: #0f172a;
          text-align: center;
        }

        /* 🔥 Bold Title + Clean Animation */
        .gallery-title {
          font-size: 42px;
          font-weight: 900;   /* extra bold */
          margin-bottom: 40px; /* reduced gap below */
          letter-spacing: 1px;
          animation: fadeUp 0.8s ease forwards;
          opacity: 0;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(-15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .folder-row {
          display: flex;
          justify-content: center;
          gap: 30px;
          flex-wrap: wrap;
        }

        .folder-card {
          width: 220px;
          height: 210px;
          background: white;
          padding: 14px;
          border-radius: 16px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
          cursor: pointer;
          transition: 0.3s;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .folder-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
        }

        .folder-preview-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
        }

        .mini-preview {
          width: 100%;
          height: 60px;
          object-fit: cover;
          border-radius: 6px;
        }

        .folder-name {
          text-align: center;
          padding: 6px;
          background: #2563eb;
          color: white;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
        }

        .thumb-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 15px;
          max-width: 800px;
          margin: auto;
        }

        .thumb-image {
          width: 100%;
          height: 100px;
          object-fit: cover;
          border-radius: 10px;
          cursor: pointer;
        }

        .back-btn {
          margin-bottom: 30px;
          padding: 8px 18px;
          border: none;
          background: #2563eb;
          color: white;
          border-radius: 6px;
          cursor: pointer;
        }

        .popup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .popup-content {
          position: relative;
        }

        .popup-image {
          width: 550px;
          max-width: 75vw;
          max-height: 70vh;
          border-radius: 14px;
        }

        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font-size: 20px;
          background: white;
          border: none;
          border-radius: 50%;
          padding: 6px 10px;
          cursor: pointer;
        }

        .left { left: -50px; }
        .right { right: -50px; }

        .close-btn {
          position: absolute;
          top: -30px;
          right: 0;
          background: white;
          border: none;
          border-radius: 50%;
          padding: 4px 8px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
