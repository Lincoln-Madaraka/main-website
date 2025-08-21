// pages/api/stats.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const [repoRes, contribRes, membersRes] = await Promise.all([
      fetch("https://api.github.com/repos/yfosp/main-website"),
      fetch("https://api.github.com/repos/yfosp/main-website/contributors?per_page=100"),
      fetch("https://api.github.com/orgs/yfosp/members"),
    ]);

    const repo = await repoRes.json();
    const contributors = await contribRes.json();
    const members = await membersRes.json();

    res.status(200).json({
      forks: repo.forks_count || 0,
      stars: repo.stargazers_count || 0,
      contributors: contributors.length || 0,
      members: members.length || 0,
    });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch stats", details: err.message });
  }
}
