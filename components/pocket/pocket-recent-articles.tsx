import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function PocketRecentArticles() {
  const [articles, getArticles] = useState({});

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
  console.log(articles);
  useEffect(() => {
    showArticles();
  }, []);
  return (
    <div className="p-4 pb-6 w-full bg-white bg-opacity-50 shadow-md rounded-md">
      <h2 className="text-center p-2 text-gray-700">Recent reads 🗞️</h2>
      <div className="flex flex-col space-y-4">
        {articles?.records ? (
          articles?.records.map((article, i) => (
            <div className="space-y-2 p-2" key={i}>
              <h2 className="text-xl font-semibold">
                <Link href={article.fields.url} passHref>
                  <a target="_blank" rel="nofollow noopener noreferrer">
                    {article.fields.title}
                  </a>
                </Link>
              </h2>
              <div className="flex-shrink-0">
                <Link href={article.fields.url} passHref>
                  <a target="_blank" rel="nofollow noopener noreferrer">
                    <img
                      className="object-cover w-full h-48"
                      src={article.fields.img_url}
                      alt={article.fields.title}
                    />
                  </a>
                </Link>
              </div>
              <div>
                <p className="text-gray-500 text-sm">
                  <Link href={article.fields.author_url} passHref>
                    <a target="_blank" rel="nofollow noopener noreferrer">
                      {article.fields.author_name === "email"
                        ? ""
                        : article.fields.author_name + " - "}
                    </a>
                  </Link>
                  <span>{article.fields.read_time} min</span>
                </p>
              </div>
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
