import { NextResponse } from "next/server";

const PRIMARY = "https://www.sbuwebdev.com/";
// TODO: swap for the club's LinkedIn page once it exists.
const FALLBACK = "https://www.instagram.com/sbuwebdev/";

// Re-check the club site at most once a minute.
export const revalidate = 60;

export async function GET() {
  try {
    const res = await fetch(PRIMARY, {
      method: "HEAD",
      redirect: "follow",
      signal: AbortSignal.timeout(2500),
    });
    if (res.ok) return NextResponse.redirect(PRIMARY, 307);
  } catch {
    // Site unreachable or timed out; fall through.
  }
  return NextResponse.redirect(FALLBACK, 307);
}
