import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const resolvedParams = await params;
    const subpath = (resolvedParams.path || []).join("/");
    const targetUrl = `http://127.0.0.1:8080/api/auth/${subpath}`;

    const body = await request.json().catch(() => ({}));

    const rustRes = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await rustRes.json().catch(() => ({}));
    return NextResponse.json(data, { status: rustRes.status });
  } catch (err: unknown) {
    console.error("Auth proxy error:", err);
    return NextResponse.json(
      { error: "Rust Auth & MongoDB Engine unavailable on port 8080." },
      { status: 503 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const resolvedParams = await params;
    const subpath = (resolvedParams.path || []).join("/");
    const url = new URL(request.url);
    const targetUrl = `http://127.0.0.1:8080/api/auth/${subpath}${url.search}`;

    const rustRes = await fetch(targetUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const data = await rustRes.json().catch(() => ({}));
    return NextResponse.json(data, { status: rustRes.status });
  } catch (err: unknown) {
    console.error("Auth proxy error:", err);
    return NextResponse.json(
      { error: "Rust Auth & MongoDB Engine unavailable on port 8080." },
      { status: 503 }
    );
  }
}
