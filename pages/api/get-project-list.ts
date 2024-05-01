import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function GetProjectList(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   console.log(process.env.AIRTABLE_URL, process.env.AIRTABLE_TOKEN);
  const projects = await axios({
    method: "get",
    baseURL: `${process.env.AIRTABLE_URL}/recent_projects?sort%5B0%5D%5Bfield%5D=last_update&sort%5B0%5D%5Bdirection%5D=desc`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ` + process.env.AIRTABLE_TOKEN,
    },
  });
  //   console.log(projects);
  res.status(200).json(projects.data);
}
