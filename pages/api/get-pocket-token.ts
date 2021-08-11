import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
  berhasil: string;
  consumer_key?: string;
  redirect_uri?: string;
};

const POCKET_API_TOKEN_URL = `https://getpocket.com/v3/oauth/authorize`;

export default async function PocketAccessToken(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.code) {
    const access_token = await axios({
      method: "post",
      baseURL: POCKET_API_TOKEN_URL,
      headers: {
        "Content-Type": "application/json",
        "X-Accept": "application/json",
      },
      data: {
        consumer_key: process.env.NEXT_PUBLIC_POCKET_CONSUMER_KEY,
        code: req.query.code,
      },
    });
    // console.log(access_token);
    res.status(200).json(access_token.data);
  }
  //   res.status(200).json(req.query);
}
