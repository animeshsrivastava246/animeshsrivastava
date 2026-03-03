import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
      body: JSON.stringify({
        query: `
          query userSessionProgress($username: String!) {
            matchedUser(username: $username) {
              submitStats {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
            }
          }
        `,
        variables: { username: "animesh251001" },
      })
    });

    if (!response.ok) {
      return NextResponse.json({ count: 632 }, { status: response.status });
    }

    const data = await response.json();
    const acSubmissions = data.data?.matchedUser?.submitStats?.acSubmissionNum;

    if (acSubmissions) {
      const totalSolved = acSubmissions.find((s: { difficulty: string; count: number }) => s.difficulty === "All")?.count || 632;
      return NextResponse.json({ count: totalSolved }, { status: 200 });
    } else {
      // Fallback
      return NextResponse.json({ count: 632 }, { status: 200 });
    }
  } catch (error) {
    console.error("LeetCode proxy error:", error);
    return NextResponse.json({ count: 632 }, { status: 500 });
  }
}
