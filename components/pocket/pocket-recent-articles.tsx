/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { PocketArticles } from "~/lib/pocket";

export default function PocketRecentArticles() {
  const [articles, getArticles] = useState<PocketArticles>(
    {} as PocketArticles
  );

  function showArticles() {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/pocket_articles?&sort%5B0%5D%5Bfield%5D=no&sort%5B0%5D%5Bdirection%5D=desc`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
          },
          params: {
            maxRecords: 5,
          },
        }
      )
      .then((res) => {
        getArticles(res.data);
      })
      .catch((error) => console.log(error));
  }
  // console.log(articles);
  useEffect(() => {
    showArticles();
  }, []);
  return (
    <div className="p-5 pb-6 w-full bg-white bg-opacity-50 rounded-md shadow-md">
      <h2 className="text-lg font-semibold pb-4 text-gray-700">
        🗞️ Recent reads
      </h2>
      <div className="flex flex-col space-y-4">
        {articles?.records ? (
          articles?.records.map((article, i) => (
            <div
              key={i}
              className="border-gray-300 rounded-md border hover:shadow-md hover:bg-gray-100"
            >
              <Link href={article.fields.url} passHref>
                <a
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="grid grid-cols-3 gap-1 overflow-hidden"
                >
                  <div className="space-y-2 p-4 col-span-2">
                    <h2 className="text-md text-gray-700 font-medium max-h-12 truncate">
                      {article.fields.title}
                    </h2>
                    <div className="py-2">
                      <p className="text-gray-500 text-sm truncate font-light">
                        {article.fields.author_name !== ("none" || undefined)
                          ? article.fields.author_name
                          : article.fields.url}
                      </p>
                      <p className="text-gray-500 text-sm font-light">
                        {article.fields.read_time !== 0
                          ? article.fields.read_time + " min read"
                          : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <img
                      className="object-cover w-full h-full"
                      src={article.fields.img_url}
                      alt={article.fields.title}
                    />
                  </div>
                </a>
              </Link>
            </div>
          ))
        ) : (
          <div className="flex flex-col space-y-4 animate-pulse">
            <div className="bg-gray-400 h-8"></div>
            <div className="bg-gray-400 h-48"></div>
            <div className="bg-gray-400 h-4 w-1/4"></div>
          </div>
        )}
      </div>
    </div>
  );
}
