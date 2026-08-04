import { NextResponse } from "next/server";

export async function GET() {
  try {
    const username = "krishnasingh020";
    const res = await fetch(`https://github.com/users/${username}/contributions`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!res.ok) {
      throw new Error("Failed to fetch contributions from GitHub");
    }

    const htmlText = await res.text();
    
    // Parse tooltips: <tool-tip for="contribution-day-component-X-Y">... contributions on Month Day, Year</tool-tip>
    const tooltips: Record<string, string> = {};
    const tooltipMatches = htmlText.matchAll(/<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]+)<\/tool-tip>/g);
    for (const match of tooltipMatches) {
      tooltips[match[1]] = match[2].trim();
    }

    // Parse cells: <td ... id="contribution-day-component-X-Y" data-date="YYYY-MM-DD" data-level="L" ...>
    const cells: { date: string; level: number; count: number }[] = [];
    const cellMatches = htmlText.matchAll(/<td[^>]*id="([^"]+)"[^>]*data-date="([^"]+)"[^>]*data-level="([^"]+)"/g);
    
    for (const match of cellMatches) {
      const id = match[1];
      const date = match[2];
      const level = parseInt(match[3], 10);
      const tooltipText = tooltips[id] || "";
      
      // Extract count from tooltip, e.g. "5 contributions on Monday, Aug 4, 2026"
      const countMatch = tooltipText.match(/^(\d+|No)\s+contribution/i);
      const count = countMatch ? (countMatch[1].toLowerCase() === "no" ? 0 : parseInt(countMatch[1], 10)) : level * 2;
      
      cells.push({ date, level, count });
    }

    // Parse total contributions in the last year
    // Matches e.g. "1,538 contributions in the last year"
    const totalMatch = htmlText.match(/(\d+[,.\d]*)\s+contributions\s+in\s+the\s+last\s+year/i);
    const totalContributions = totalMatch ? parseInt(totalMatch[1].replace(/,/g, ""), 10) : 0;

    return NextResponse.json({
      success: true,
      totalContributions: totalContributions || cells.reduce((sum, c) => sum + c.count, 0),
      days: cells,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch GitHub contributions";
    return NextResponse.json({
      success: false,
      error: errorMessage,
    }, { status: 500 });
  }
}
