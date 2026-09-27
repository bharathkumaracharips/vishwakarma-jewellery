import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city") || "";
    const targetUrl = city
      ? `http://127.0.0.1:8080/api/rates?city=${encodeURIComponent(city)}`
      : "http://127.0.0.1:8080/api/rates";

    const res = await fetch(targetUrl, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json({
        ...data,
        source: "rust-bullion-engine (IBJA Live)",
      });
    }

    return NextResponse.json(
      { error: "Bullion engine returned non-200 response. Real data stream unavailable." },
      { status: 502 }
    );
  } catch {
    return NextResponse.json(
      { error: "Real-time bullion engine offline. Real market feed required on port 8080." },
      { status: 503 }
    );
  }
}
