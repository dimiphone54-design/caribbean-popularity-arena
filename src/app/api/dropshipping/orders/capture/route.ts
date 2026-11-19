import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      provider: "polar",
      error: "This legacy capture endpoint is disabled. Payment confirmation requires a verified Polar webhook.",
    },
    { status: 410 }
  );
}
