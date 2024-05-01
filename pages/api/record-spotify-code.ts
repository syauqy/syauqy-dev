import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function RecordSpotifyCode(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   console.log(process.env.AIRTABLE_URL, process.env.AIRTABLE_TOKEN);
  if (req.query.code) {
    const spotify_code = await axios({
      method: "patch",
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
      },
      url: `${process.env.AIRTABLE_URI}/spotify_code`,
      data: {
        records: [
          {
            id: "recaGiYzytfvX2bFW",
            fields: {
              code: req.query.code,
            },
          },
        ],
      },
    });
    res.status(200).json(spotify_code.data);
  }

  //   console.log(projects);
}
