import React, { useEffect } from "react";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { Page } from "~/components/layouts/page";
import { PageContent } from "~/components/layouts/page-content";
import { Container } from "~/components/layouts/container";
import SpotifyGetArtist from "~/components/spotify/spotify-get-artist";
import SpotifyRecentArtist from "~/components/spotify/spotify-recent-artist";
import axios from "axios";

const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI}&scope=user-top-read%20user-read-recently-played&response_type=token`;
const POCKET_API_URL = `https://getpocket.com/v3/oauth/request`;
const POCKET_TOKEN = `8f49acf4-6eb8-7a48-db16-0e6507`;

const meta = {
  title: `Syauqy Aziz`,
  description: `Product manager and web developer living in Yogyakarta, Indonesia. Curently building web and mobile software at Jala`,
};

function getPocketToken() {
  axios
    .post(POCKET_API_URL, {
      headers: {
        "Content-Type": "application/json; charset=UTF8",
      },
      params: {
        consumer_key: process.env.NEXT_PUBLIC_POCKET_CONSUMER_KEY,
        redirect_uri: process.env.NEXT_PUBLIC_POCKET_REDIRECT_URI,
      },
      withCredentials: false,
    })
    .then((res) => console.log(res.data));
}

function getPocketArticles() {
  axios
    .post("https://getpocket.com/v3/get", {
      headers: {
        "Content-Type": "application/json; charset=UTF8",
      },
      params: {
        consumer_key: process.env.NEXT_PUBLIC_POCKET_CONSUMER_KEY,
        access_token: POCKET_TOKEN,
      },
    })
    .then((res) => console.log(res.data));
}

const getSpotifyParams = (hash) => {
  const stringAfterHash = hash.substring(1);
  const urlParams = stringAfterHash.split("&");
  const splittedParams = urlParams.reduce(
    (accumulater: string, currentValue: string) => {
      const [key, value] = currentValue.split("=");
      accumulater[key] = value;
      return accumulater;
    },
    {}
  );
  return splittedParams;
};

function recordAccessToken(token: string) {
  axios({
    method: "patch",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
      "Content-Type": "application/json",
    },
    url: `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/spotify_token`,
    data: {
      records: [
        {
          id: "recxh8d64XoW8kWTm",
          fields: {
            access_token: token,
          },
        },
      ],
    },
  });
}

export default function Spotify() {
  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } = getSpotifyParams(
        window.location.hash
      );
      recordAccessToken(access_token);
    }
  }, []);
  return (
    <Page>
      <NextSeo
        // description={meta.description}
        openGraph={{ title: meta.title, description: meta.description }}
        title={meta.title}
      />

      <PageContent>
        <Container>
          <div className="space-y-3">
            <button
              onClick={() => getPocketToken()}
              className="rounded-full py-3 px-6 bg-pink-500"
            >
              Login Pocket
            </button>
            <button
              onClick={() => getPocketArticles()}
              className="rounded-full py-3 px-6 bg-pink-400"
            >
              Get Articles
            </button>
          </div>
        </Container>
      </PageContent>
    </Page>
  );
}
