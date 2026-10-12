import { NextResponse } from "next/server";
import { getGithubActivity } from "@/lib/github";
import { isPlaceholder, profile } from "@/data/profile";

// Public GitHub activity for CURRENT FORM. The username comes from config only,
// never from the request, and the response is cached for an hour.
export const revalidate = 3600;

export async function GET() {
  if (isPlaceholder(profile.githubUsername)) {
    return NextResponse.json({ configured: false });
  }

  try {
    const activity = await getGithubActivity(profile.githubUsername);
    return NextResponse.json(
      { configured: true, ...activity },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "GitHub is unavailable";
    return NextResponse.json({ configured: true, error: message }, { status: 502 });
  }
}
