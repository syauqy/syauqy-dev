import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const POCKET_API_REQUEST_URL = `https://getpocket.com/v3/oauth/request`;
const POCKET_REDIRECT_URI = `${process.env.NEXT_PUBLIC_HOST}/pemuda-setempat`;
export default async function PocketRequestToken(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const request_token = await axios({
    method: "post",
    baseURL: POCKET_API_REQUEST_URL,
    headers: {
      "Content-Type": "application/json",
      "X-Accept": "application/json",
    },
    data: {
      consumer_key: process.env.NEXT_PUBLIC_POCKET_CONSUMER_KEY,
      redirect_uri: POCKET_REDIRECT_URI,
    },
  });
  // console.log(request_token);
  res.status(200).json(request_token.data);
}
