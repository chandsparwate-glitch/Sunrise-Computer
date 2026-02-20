import { NextResponse } from "next/server";

export async function GET() {
  const placeId = "ChIJ7fCERV16KzoR5_eOPVqIHbs";
  const apiKey = process.env.GOOGLE_API_KEY;

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&key=${apiKey}`;

  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();

  if (data.status !== "OK") {
    return NextResponse.json(
      { rating: 0, reviews: [], user_ratings_total: 0 },
      { status: 200 }
    );
  }

  return NextResponse.json({
    rating: data.result.rating,
    reviews: data.result.reviews,
    user_ratings_total: data.result.user_ratings_total,
  });
}
