import React, { useEffect, useState } from "react";
import Link from "next/link";
import { SpotifyProps, getTopArtists } from "~/lib/spotify";
import ExternalImageLoader from "../ui/external-image-loader";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import spotifyLogo from "~/public/spotify-logo.png";
import Image from "next/image";

export default function SpotifyRecentArtist() {
  const [artists, setArtists] = useState<SpotifyProps>({} as SpotifyProps);

  async function showTopArtists() {
    const response = await getTopArtists();
    setArtists(response);
  }

  useEffect(() => {
    showTopArtists();
  }, []);
  console.log(artists);

  return (
    <div className="p-5 pb-6 w-full bg-white bg-opacity-50 rounded-lg shadow-md">
      <div className="space-y-2 pb-4">
        <h2 className="text-lg font-semibold text-gray-700">
          🎸 Recently I&apos;m listening to
        </h2>
        <p className="text-gray-700 text-sm">
          Here&apos;s my top artists on Spotify, updated daily.
        </p>
      </div>
      {artists?.items ? (
        <div className="grid grid-cols-5 gap-4">
          {artists.items.map((artist, i: number) => (
            <div key={i}>
              <div className="flex-shrink-0 transform hover:scale-110 hover:rotate-3 ">
                <Tippy
                  className="rounded-md shadow-lg p-1 bg-gray-800 text-white"
                  content={<span>{artist.name}</span>}
                  delay={100}
                  placement="bottom"
                  arrow={false}
                  offset={[0, 5]}
                  theme="syauqy"
                >
                  <div>
                    <Link href={artist.external_urls.spotify} passHref>
                      <a target="_blank" rel="nofollow noopener noreferrer">
                        {artist.images.length ? (
                          <ExternalImageLoader
                          className="object-cover shadow-md bg-gray-400 rounded-full"
                          src={artist.images[1].url}
                          alt={artist.name}
                          width={100}
                          height={100}
                        />
                        ) : (
                          <Image
                          className="object-cover shadow-md bg-gray-200 rounded-full"
                          src={spotifyLogo}
                          alt={artist.name}
                          width={100}
                          height={100}
                        />
                        ) 
                      }
                        
                      </a>
                    </Link>
                  </div>
                </Tippy>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="animate-pulse grid grid-cols-5 gap-4 justify-center">
          <div className="md:h-20 md:w-20 h-16 w-16 bg-gray-400 rounded-full"></div>
          <div className="md:h-20 md:w-20 h-16 w-16 bg-gray-400 rounded-full"></div>
          <div className="md:h-20 md:w-20 h-16 w-16 bg-gray-400 rounded-full"></div>
          <div className="md:h-20 md:w-20 h-16 w-16 bg-gray-400 rounded-full"></div>
          <div className="md:h-20 md:w-20 h-16 w-16 bg-gray-400 rounded-full"></div>
        </div>
      )}
    </div>
  );
}
