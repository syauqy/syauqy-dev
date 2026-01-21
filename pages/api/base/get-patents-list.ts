import type { NextApiRequest, NextApiResponse } from "next";
import { PATENTS } from "@/data/patents/patents-list";

export default async function GetPatentsList(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // Return local patents data stored in the repo
    res.status(200).json(PATENTS);
  } catch (error: any) {
    console.error("get-patents-list error:", error?.message || error);
    res
      .status(500)
      .json({ error: { message: error?.message || "Unknown error" } });
  }
}
