import axios from "axios";

export type pocketProps = {
  top_image_url?: string;
  time_to_read?: string | number;
  resolve_title?: string;
  authors?: {
    name: string;
    url: string;
  };
};

//extracted articles from airtable
export type PocketArticles = {
  readonly records: PocketRecords[];
};

type PocketRecords = {
  readonly fields: {
    readonly author_name?: string;
    readonly img_url?: string;
    readonly read_time?: number;
    readonly title?: string;
    readonly url: string;
  };
};

export function recordPocketArticles(pocket: pocketProps) {
  axios({
    method: "post",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
      "Content-Type": "application/json",
    },
    url: `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/pocket_articles`,
    data: generateRecords(pocket),
  });
}

const generateRecords = (articles) => {
  const records = {
    records: articles
      ? Object.keys(articles).map((article) => ({
          fields: {
            title: articles[article].resolved_title,
            img_url: articles[article].top_image_url,
            url: articles[article].resolved_url,
            read_time:
              articles[article].time_to_read !== "0" || undefined
                ? articles[article].time_to_read
                : 0,
            author_name: articles[article].authors
              ? Object.keys(articles[article].authors).map(
                  (author) => articles[article].authors[author].name
                )[0]
              : "none",
          },
        }))
      : {},
  };
  //   console.log("generate", records);
  return records;
};
