import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
const USER_TOP_ARTIST_ENDPOINT = "https://api.spotify.com/v1/me/top/artists";

export default async function GetSpotifyBasic(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.access_token) {
    const top_artists = await axios.get(USER_TOP_ARTIST_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${req.query.access_token}`,
      },
      params: {
        time_range: "short_term",
        limit: 10,
      },
    });
    //   .catch((error) => console.log(error.response.data));
    //   console.log(process.env.AIRTABLE_URL, process.env.AIRTABLE_TOKEN);
    res.status(200).json(top_artists.data);
  }
}
