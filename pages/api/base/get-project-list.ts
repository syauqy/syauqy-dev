import type { NextApiRequest, NextApiResponse } from "next";
import { PROJECTS } from "@/data/projects/projects-list";

export default async function GetProjectList(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // Return local projects data stored in the repo
    res.status(200).json(PROJECTS);
  } catch (error: any) {
    console.error("get-project-list error:", error?.message || error);
    res
      .status(500)
      .json({ error: { message: error?.message || "Unknown error" } });
  }
}
