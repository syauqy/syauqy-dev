import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const POCKET_API_GET_URL = `https://getpocket.com/v3/get`;

export default async function PocketGetArticles(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const articles = await axios({
    method: "post",
    baseURL: POCKET_API_GET_URL,
    headers: {
      "Content-Type": "application/json",
      "X-Accept": "application/json",
    },
    data: {
      consumer_key: process.env.NEXT_PUBLIC_POCKET_CONSUMER_KEY,
      access_token: req.query.access_token,
      count: 5,
      detailType: "complete",
      sort: "newest",
    },
  });
  // console.log(request_token);
  res.status(200).json(articles.data);
}
