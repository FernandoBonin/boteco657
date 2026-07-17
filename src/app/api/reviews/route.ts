// app/api/reviews/route.ts

export async function GET() {
  const res = await fetch(
    `https://places.googleapis.com/v1/places/${process.env.GOOGLE_PLACE_ID}`,
    {
      headers: {
        "X-Goog-Api-Key": process.env.GOOGLE_API_KEY!,
        "X-Goog-FieldMask": "displayName,rating,userRatingCount,reviews",
      },
      next: {
        revalidate: 60 * 60 * 24, // 24 horas
      },
    },
  );

  return Response.json(await res.json());
}
