import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import {
  USER_TOP_ARTIST_ENDPOINT,
  spotifyProps,
  SPOTIFY_AUTH_URL,
  recordSpotifyCode,
  getSpotifyParams,
  recordAccessToken,
} from "~/lib/spotify";
import querystring from "querystring";

const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
const SPOTIFY_TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const refresh_token = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN;

export default function SpotifyGetArtist() {
  const [token, setToken] = useState("");
  const [code, setCode] = useState("");
  const [data, setData] = useState<spotifyProps>({});
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

  // console.log(token);

  //get spotify token from airtable - implicit grant
  async function getSpotifyAirtableToken() {
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

  //get spotify code
  async function getSpotifyCode() {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/spotify_code/recaGiYzytfvX2bFW`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
          },
        }
      )
      .then((res) => {
        setCode(res.data.fields.code);
      })
      .catch((error) => console.log(error));
  }

  //get spotify token
  const getSpotifyToken = async () => {
    const response = await axios(SPOTIFY_TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: querystring.stringify({
        grant_type: "refresh_token",
        refresh_token,
      }),
    })
      .then((res) => {
        console.log(res.data);
        return res.data.access_token;
      })
      .catch((error) => console.log(error.response.data));
    return response;
  };

  //request top artists data from spotify
  const getTopArtists = async () => {
    const access_token = await getSpotifyToken();
    console.log(access_token);
    axios
      .get(USER_TOP_ARTIST_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${access_token}`,
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
    if (window.location.search) {
      const urlSpotifyResponse = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(urlSpotifyResponse.entries());
      recordSpotifyCode(params.code);
    }
    // getSpotifyToken();
  }, []);
  // console.log(token);

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
