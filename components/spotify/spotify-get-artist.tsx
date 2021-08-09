import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const USER_TOP_ARTIST_ENDPOINT = "https://api.spotify.com/v1/me/top/artists";

export default function SpotifyGetArtist() {
  const [token, setToken] = useState("");
  const [data, setData] = useState({});

  console.log(token);

  const getTopArtists = () => {
    axios
      .get(USER_TOP_ARTIST_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          time_range: "short_term",
          limit: 8,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"));
      getTopArtists();
    }

    console.log(data);
  }, []);

  return (
    <div className="bg-blue-100 rounded-md p-4 flex flex-wrap space-x-4 space-y-4">
      {data?.items
        ? data.items.map((artist, i: number) => (
            <div key={i}>
              <div className="flex-shrink-0">
                <Link href={artist.external_urls.spotify} passHref>
                  <a target="_blank" rel="nofollow noopener noreferrer">
                    <Tippy
                      className="rounded-md shadow-lg p-1 bg-gray-800 text-white"
                      content={<span>{artist.name}</span>}
                      delay={100}
                      placement="bottom"
                      arrow={false}
                      offset={[0, 5]}
                    >
                      <img
                        className={`h-24 w-24
                        } object-cover rounded-full`}
                        src={artist.images[artist.images.length - 2].url}
                        alt={artist.name}
                      />
                    </Tippy>
                  </a>
                </Link>
              </div>
              {/* <div className="rounded shadow-lg p-1 bg-gray-500 text-white -mb-8"></div> */}
            </div>
          ))
        : null}
    </div>
  );
}
