/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PocketArticles, PocketList, PocketAuthors } from "@/lib/pocket";
import _ from "lodash";
import ExternalImageLoader from "../ui/external-image-loader";
// import * as dayjs from "dayjs";

export default function PocketRecentArticles() {
  const [pockets, setPocket] = useState<PocketArticles>({} as PocketArticles);

  async function getPocketArticles() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/get-pocket-articles?access_token=${process.env.NEXT_PUBLIC_POCKET_ACCESS_TOKEN}`
    );
    const pocket = await response.json();
    setPocket(pocket.list);
  }
  // console.log(pockets);

  useEffect(() => {
    getPocketArticles();
  }, []);

  return (
    <div className="p-5 pb-6 w-full bg-white bg-opacity-50 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold pb-4 text-gray-700">
        🗞️ Recent reads
      </h2>
      <div className="flex flex-col space-y-4">
        {_.valuesIn(pockets).length ? (
          _.values(
            _.mapValues(_.sortBy(pockets, "sort_id"), (pocket: PocketList) => (
              <div
                key={pocket.item_id}
                className="border-gray-300 rounded-md border hover:shadow-md overflow-hidden"
              >
                <Link href={pocket.resolved_url} passHref>
                  <a
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="grid grid-cols-3 gap-1 overflow-hidden"
                  >
                    <div className="space-y-2 p-4 col-span-2">
                      <div className="space-y-2">
                        <h2 className="text-md text-gray-700 font-medium line-clamp-2 leading-normal">
                          {pocket.resolved_title}
                        </h2>
                        <p className="text-gray-500 text-xs font-light line-clamp-3">
                          {pocket.excerpt ? pocket.excerpt : ""}
                        </p>
                      </div>
                      <div className="text-gray-500 text-sm truncate font-light">
                        {pocket.authors ? (
                          _.values(
                            _.mapValues(
                              pocket.authors,
                              (auth: PocketAuthors) => (
                                <span key={auth.author_id}>
                                  {auth.author_id ===
                                  _.findLastKey(pocket.authors)
                                    ? auth.name
                                    : auth.name + ", "}
                                </span>
                              )
                            )
                          )
                        ) : (
                          <div>
                            <p className="text-gray-500 text-sm truncate font-light">
                              {pocket.resolved_url}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <ExternalImageLoader
                      className="object-cover w-full h-full"
                      src={pocket.top_image_url}
                      alt={pocket.resolved_title}
                      width={180}
                      height={100}
                      quality={90}
                    />
                  </a>
                </Link>
              </div>
            ))
          )
        ) : (
          <div className="border-gray-300 rounded-md border p-4">
            <div className="grid grid-cols-3 animate-pulse">
              <div className="flex flex-col space-y-4 col-span-2 rounded-md">
                <div className="bg-gray-400 h-5 w-4/5 rounded-md"></div>
                <div className="bg-gray-400 h-12 w-4/5 rounded-md"></div>
                <div className="bg-gray-400 h-4 w-1/2 rounded-md"></div>
              </div>
              <div className="bg-gray-400 h-full rounded-md"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
