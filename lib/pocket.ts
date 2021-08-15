import axios from "axios";
import _ from "lodash";

export type ArticleProps = {
  article: {
    top_image_url?: string;
    time_to_read?: number;
    resolved_title?: string;
    resolved_url?: string;
    excerpt?: string;
    authors?: {
      author: {
        name: string;
        url: string;
      };
    };
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
    readonly excerpt: string;
  };
};

export function recordPocketArticles(pocket: ArticleProps) {
  axios({
    method: "post",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
      "Content-Type": "application/json",
    },
    url: `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/pocket_articles`,
    data: generateRecords(pocket),
  });
  // generateRecords(pocket);
}

const generateRecords = (articles: ArticleProps) => {
  const records = {
    records: articles
      ? _.values(
          _.mapValues(articles, function (article) {
            return {
              fields: {
                title: article.resolved_title,
                img_url: article.top_image_url,
                url: article.resolved_url,
                excerpt: article.excerpt,
                read_time:
                  article.time_to_read !== undefined ? article.time_to_read : 0,
                author_name: article.authors
                  ? _.join(
                      _.values(
                        _.mapValues(article.authors, function (author) {
                          return author.name;
                        })
                      ),
                      ", "
                    )
                  : "none",
              },
            };
          })
        )
      : {},
  };

  console.log("generate", records);
  return records;
};
