import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function GetPatentsList(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const patents = await axios({
    method: "get",
    baseURL: `${process.env.AIRTABLE_URL}/patents`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ` + process.env.AIRTABLE_TOKEN,
    },
  });
  res.status(200).json(patents.data);
}
