import { NextResponse } from "next/server";
import { listPublicTeachers, createTeacher } from "@/lib/marketplace/store";

export async function GET() {
  try {
    const teachers = await listPublicTeachers();
    return NextResponse.json(teachers);
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to load teachers" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  let body: {
    display_name?: string;
    country?: string;
    payment_url?: string;
    university?: string;
    subject?: string;
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
    await createTeacher({
      display_name: displayName,
      country: body.country?.trim() || undefined,
      payment_url: body.payment_url?.trim() || undefined,
      university: body.university?.trim() || undefined,
      subject: body.subject?.trim() || undefined,
    });
    return NextResponse.json({ ok: true, status: "live" });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to create teacher" }, { status: 500 });
  }
}