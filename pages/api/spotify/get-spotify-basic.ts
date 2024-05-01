import type { NextApiRequest, NextApiResponse } from "next";
// import axios from "axios";

export default async function GetSpotifyBasic(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
  //   console.log(process.env.AIRTABLE_URL, process.env.AIRTABLE_TOKEN);
  if (basic) {
    res.status(200).json({ basic, refresh_token });
  }

  //   console.log(projects);
}
