import React, { useState, useEffect } from "react";
import { PatentsProps } from "@/lib/patents";
import axios from "axios";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import HomeProjectSkeleton from "./home-project-skeleton";
import { GhostAnchorText } from "@/components/ui/ghost-anchor-text";

export default function HomePatentsSection() {
  const [patents, setPatents] = useState<PatentsProps>({} as PatentsProps);

  function showPatents() {
    axios
      .get(`/api/base/get-patents-list`)
      .then((res) => {
        setPatents(res.data);
      })
      .catch((error) => console.log(error.data));
  }

  useEffect(() => {
    showPatents();
  }, []);

  return (
    <div className="head p-5 pb-6 w-full bg-white bg-opacity-50 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold pb-4 text-gray-700">💡 Patents</h2>
      <div className="flex flex-col space-y-4">
        {patents?.records ? (
          patents?.records.map((patent, i: number) => (
            <div
              key={i}
              className="border-gray-300 rounded-2xl border hover:shadow-md"
            >
              <div className="space-y-3 p-4">
                <div className="space-y-1 overflow-hidden">
                  <GhostAnchorText
                    className="text-md text-gray-700 font-semibold line-clamp-2 break-words"
                    href={patent.fields.patent_url}
                    hoverColor="hover:bg-blue-500 hover:text-white"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                  >
                    {patent.fields.title}
                  </GhostAnchorText>
                  {patent.fields.patent_number && (
                    <p className="text-gray-500 text-xs font-light">
                      Patent #: {patent.fields.patent_number}
                    </p>
                  )}
                  <p className="text-gray-600 text-sm">
                    {patent.fields.description}
                  </p>
                  {patent.fields.inventors &&
                    patent.fields.inventors.length > 0 && (
                      <p className="text-gray-500 text-xs font-light">
                        {patent.fields.inventors}
                      </p>
                    )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <>
            <HomeProjectSkeleton />
            <HomeProjectSkeleton />
          </>
        )}
      </div>
    </div>
  );
}
