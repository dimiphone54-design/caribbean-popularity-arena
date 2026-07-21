import { NextResponse } from "next/server";
import { listPublicCreators, createCreator } from "@/lib/marketplace/store";

export async function GET() {
  try {
    const creators = await listPublicCreators();
    return NextResponse.json(creators);
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to load creators" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  let body: {
    display_name?: string;
    country?: string;
    payment_url?: string;
    lane?: string;
    project_description?: string;
  } = {};

  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const displayName = body.display_name?.trim() ?? "";
  if (!displayName) {
    return NextResponse.json({ ok: false, error: "display_name is required" }, { status: 400 });
  }

  if (body.payment_url && !body.payment_url.startsWith("https://")) {
    return NextResponse.json({ ok: false, error: "payment_url must start with https://" }, { status: 400 });
  }

  try {
    await createCreator({
      display_name: displayName,
      country: body.country?.trim() || undefined,
      payment_url: body.payment_url?.trim() || undefined,
      lane: body.lane?.trim() || undefined,
      project_description: body.project_description?.trim() || undefined,
    });
    return NextResponse.json({ ok: true, status: "live" });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to create creator" }, { status: 500 });
  }
}