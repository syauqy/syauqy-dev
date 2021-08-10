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
          limit: 10,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  };

  function saveTopArtists(data) {
    getTopArtists();

    axios({
      method: "post",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
      },
      url: `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/spotify_artist`,
      data: generateRecords(data),
    });
  }

  const generateRecords = (data) => {
    console.log(data);
    const records = {
      records: data?.items
        ? data.items.map((artist) => ({
            fields: {
              name: artist.name,
              url: artist.external_urls.spotify,
              img_url: artist.images[1].url,
            },
          }))
        : {},
    };
    console.log(records);
    return records;
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"));
      getTopArtists();
    }
  }, []);
  console.log(data);
  console.log(generateRecords(data));

  return (
    <div>
      <button
        className="rounded-full py-3 px-6 bg-gray-400"
        onClick={() => saveTopArtists(data)}
      >
        Save Artist
      </button>
      <button
        className="rounded-full py-3 px-6 bg-gray-400"
        onClick={() => getTopArtists}
      >
        Refresh Artist
      </button>
    </div>
  );
}
