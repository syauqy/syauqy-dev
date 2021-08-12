import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { ArtistProps } from "~/lib/spotify";
import Image from "next/image";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

export default function SpotifyRecentArtist() {
  const [artists, setArtists] = useState<ArtistProps | undefined>(undefined);

  async function showTopArtists() {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/spotify_artist?&sort%5B0%5D%5Bfield%5D=no&sort%5B0%5D%5Bdirection%5D=desc`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
          },
          params: {
            maxRecords: 10,
          },
        }
      )
      .then((res) => {
        setArtists(res.data);
      })
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    showTopArtists();
  }, []);

  console.log(artists);

  return (
    <div className="p-4 pb-6 w-full bg-white bg-opacity-50 shadow-md rounded-md">
      <h2 className="text-lg font-semibold p-4 text-gray-700">
        Recently I&apos;m listening to 🎸
      </h2>

      {artists ? (
        <div className="flex flex-wrap justify-center">
          {artists.records.map((artist, i: number) => (
            <div key={i} className="p-2">
              <div className="flex-shrink-0 transform hover:scale-110 hover:rotate-3">
                <Tippy
                  className="rounded-md shadow-lg p-1 bg-gray-800 text-white"
                  content={<span>{artist.fields.name}</span>}
                  delay={100}
                  placement="bottom"
                  arrow={false}
                  offset={[0, 5]}
                >
                  <div>
                    <Link href={artist.fields.url} passHref>
                      <a target="_blank" rel="nofollow noopener noreferrer">
                        <Image
                          className="object-cover shadow-md rounded-full"
                          src={artist.fields.img_url}
                          alt={artist.fields.name}
                          width={80}
                          height={80}
                        />
                      </a>
                    </Link>
                  </div>
                </Tippy>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="animate-pulse flex flex-wrap justify-center">
          <div className="h-20 w-20 bg-gray-400 rounded-full mx-2"></div>
          <div className="h-20 w-20 bg-gray-400 rounded-full mx-2"></div>
          <div className="h-20 w-20 bg-gray-400 rounded-full mx-2"></div>
          <div className="h-20 w-20 bg-gray-400 rounded-full mx-2"></div>
          <div className="h-20 w-20 bg-gray-400 rounded-full mx-2"></div>
        </div>
      )}
    </div>
  );
}
