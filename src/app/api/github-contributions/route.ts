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

    // Parse cells: <td ... class="ContributionCalendar-day" ...>
    const cells: { date: string; level: number; count: number }[] = [];
    const cellMatches = htmlText.matchAll(/<td[^>]*class="ContributionCalendar-day"[^>]*>/g);
    
    for (const match of cellMatches) {
      const tdTag = match[0];
      const idMatch = tdTag.match(/id="([^"]+)"/);
      const dateMatch = tdTag.match(/data-date="([^"]+)"/);
      const levelMatch = tdTag.match(/data-level="([^"]+)"/);
      
      if (idMatch && dateMatch && levelMatch) {
        const id = idMatch[1];
        const date = dateMatch[1];
        const level = parseInt(levelMatch[1], 10);
        const tooltipText = tooltips[id] || "";
        
        // Extract count from tooltip, e.g. "5 contributions on August 3rd."
        const countMatch = tooltipText.match(/^(\d+|No)\s+contribution/i);
        const count = countMatch ? (countMatch[1].toLowerCase() === "no" ? 0 : parseInt(countMatch[1], 10)) : level * 2;
        
        cells.push({ date, level, count });
      }
    }

    // Parse total contributions in the last year
    const totalMatch = htmlText.match(/js-yearly-contributions[\s\S]*?<h2[^>]*>([\s\S]*?)<\/h2>/i);
    let totalContributions = 0;
    if (totalMatch) {
      const cleaned = totalMatch[1].replace(/[\s\r\n]+/g, " ").trim();
      const numMatch = cleaned.match(/^(\d+[,.\d]*)/);
      if (numMatch) {
        totalContributions = parseInt(numMatch[1].replace(/,/g, ""), 10);
      }
    }

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
