"use client";

import { useEffect, useState } from "react";

export default function GoogleReviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.reviews || []);
        setRating(data.rating || 0);
        setTotal(data.user_ratings_total || 0);
      });
  }, []);

  return (
    <section className="reviewSection">
      <div className="container">

        {/* Top Row */}
        <div className="topRow">
          <div className="leftSide">
            <div className="headingPill">
              Customer Reviews
            </div>

            <div className="rating">
              ⭐ {rating} ({total})
            </div>
          </div>

          {/* Button Top Right */}
          <a
            href="https://www.google.com/maps/place/?q=place_id:ChIJ7fCERV16KzoR5_eOPVqIHbs"
            target="_blank"
            rel="noopener noreferrer"
            className="viewBtn"
          >
            View All →
          </a>
        </div>

        {/* Auto Running Slider */}
        <div className="slider">
          <div className="slideTrack">
            {[...reviews, ...reviews].map((review, index) => {
              const isExpanded = expanded === index;
              const shortText =
                review.text.length > 120
                  ? review.text.substring(0, 120) + "..."
                  : review.text;

              return (
                <div className="card" key={index}>
                  <div className="top">
                    <img
                      src={review.profile_photo_url}
                      alt={review.author_name}
                    />
                    <div>
                      <h4>{review.author_name}</h4>
                      <p className="stars">
                        {"⭐".repeat(review.rating)}
                      </p>
                    </div>
                  </div>

                  <p className="text">
                    {isExpanded ? review.text : shortText}
                  </p>

                  {review.text.length > 120 && (
                    <button
                      className="readBtn"
                      onClick={() =>
                        setExpanded(isExpanded ? null : index)
                      }
                    >
                      {isExpanded ? "Read less" : "Read more"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <style jsx>{`
        .reviewSection {
          padding: 30px 20px 15px;
          background: linear-gradient(135deg, #eef2ff, #f8fafc);
          border-top: 3px solid #fbbf24;
          border-bottom: 3px solid #1e293b;
          overflow: hidden;
        }

        .container {
          max-width: 1200px;
          margin: auto;
        }

        .topRow {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .leftSide {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .headingPill {
          padding: 8px 25px;
          border-radius: 50px;
          background: #fbbf24;
          font-weight: 900;
          font-size: 16px;
        }

        .rating {
          font-weight: 700;
          font-size: 16px;
        }

        .viewBtn {
          padding: 8px 18px;
          background: #1e293b;
          color: white;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          transition: 0.3s;
        }

        .viewBtn:hover {
          background: #f97316;
        }

        .slider {
          overflow: hidden;
        }

        .slideTrack {
          display: flex;
          gap: 20px;
          width: max-content;
          animation: scroll 30s linear infinite;
        }

        .slider:hover .slideTrack {
          animation-play-state: paused;
        }

        .card {
          min-width: 280px;
          max-width: 280px;
          background: rgba(255,255,255,0.85);
          padding: 16px;
          border-radius: 16px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
        }

        .top {
          display: flex;
          gap: 10px;
          align-items: center;
          margin-bottom: 8px;
        }

        .top img {
          width: 38px;
          height: 38px;
          border-radius: 50%;
        }

        .card h4 {
          font-size: 14px;
          font-weight: 700;
        }

        .stars {
          font-size: 12px;
          color: #fbbf24;
        }

        .text {
          font-size: 13px;
          color: #475569;
          line-height: 1.6;
          margin-bottom: 6px;
        }

        .readBtn {
          background: none;
          border: none;
          color: #1e293b;
          font-weight: 600;
          font-size: 12px;
          cursor: pointer;
          padding: 0;
        }

        .readBtn:hover {
          color: #f97316;
        }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @media (max-width: 768px) {
          .leftSide {
            flex-direction: column;
            align-items: flex-start;
          }

          .card {
            min-width: 240px;
            max-width: 240px;
          }
        }
      `}</style>
    </section>
  );
}
