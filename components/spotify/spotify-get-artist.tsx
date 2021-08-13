import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import {
  USER_TOP_ARTIST_ENDPOINT,
  spotifyProps,
  SPOTIFY_AUTH_URL,
  getSpotifyParams,
  recordAccessToken,
} from "~/lib/spotify";

export default function SpotifyGetArtist() {
  const [token, setToken] = useState("");
  const [data, setData] = useState<spotifyProps>({});
  console.log(token);

  //get spotify token from airtable
  async function getSpotifyToken() {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/spotify_token/recxh8d64XoW8kWTm`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
          },
        }
      )
      .then((res) => {
        setToken(res.data.fields.access_token);
      })
      .catch((error) => console.log(error));
  }

  //request top artists data from spotify
  const getTopArtists = () => {
    getSpotifyToken();
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
        console.log("dapet data artist", res.data);
        setData(res.data);
      })
      .catch((error) => console.log(error.response.data));
  };

  //save new top artists list to airtable -> for main components update
  function saveTopArtists(data: spotifyProps) {
    getTopArtists();
    console.log("data spotify", data);
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

  //generate artist data records for airtable post
  const generateRecords = (data: spotifyProps) => {
    // console.log('data spotify',data);
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
    console.log("generate", records);
    return records;
  };

  useEffect(() => {
    if (window.location.hash) {
      const { access_token } = getSpotifyParams(window.location.hash);
      // console.log(access_token);
      recordAccessToken(access_token);
    }
    getSpotifyToken();
  }, []);
  console.log(data);

  return (
    <div className="flex flex-col space-y-2">
      <Link href={SPOTIFY_AUTH_URL} passHref>
        <a className="rounded-full w-full py-3 px-6 bg-green-600 text-center text-white">
          Login Spotify
        </a>
      </Link>
      <button
        className="rounded-full py-3 px-6 bg-green-500 text-white "
        onClick={() => getTopArtists()}
      >
        Request Artist List
      </button>
      <button
        className="rounded-full py-3 px-6 bg-green-400 text-white"
        onClick={() => saveTopArtists(data)}
      >
        Save Artist to Database
      </button>
    </div>
  );
}
