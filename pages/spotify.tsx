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

const meta = {
  title: `Syauqy Aziz`,
  description: `Product manager and web developer living in Yogyakarta, Indonesia. Curently building web and mobile software at Jala`,
};

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
      console.log(access_token);
      localStorage.clear();
      localStorage.setItem("accessToken", access_token);
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
            <Link href={SPOTIFY_AUTH_URL} passHref>
              <a className="rounded-full py-3 px-6 bg-green-600">
                Login Spotify
              </a>
            </Link>
            <SpotifyGetArtist />
            <SpotifyRecentArtist />
          </div>
        </Container>
      </PageContent>
    </Page>
  );
}
