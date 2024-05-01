import type { NextApiRequest, NextApiResponse } from "next";
import { getTopArtists } from "@/lib/spotify";
// import axios from "axios";

export default async function Spotify(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await getTopArtists();
  // console.log(response);
  res.status(200).json(response);
}
