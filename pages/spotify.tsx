import React, { useEffect } from "react";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { Page } from "~/components/layouts/page";
import { PageContent } from "~/components/layouts/page-content";
import { Container } from "~/components/layouts/container";
import SpotifyGetArtist from "~/components/spotify/spotify-get-artist";

const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}&redirect_uri=http://localhost:3000/spotify&scope=user-top-read%20user-read-recently-played&response_type=token`;

const meta = {
  title: `Syauqy Aziz`,
  description: `Product manager and web developer. Currently living in Yogyakarta, Indonesia. Curently building web and mobile software at Jala`,
};

const getSpotifyParams = (hash) => {
  const stringAfterHash = hash.substring(1);
  const urlParams = stringAfterHash.split("&");
  const splittedParams = urlParams.reduce((accumulater, currentValue) => {
    const [key, value] = currentValue.split("=");
    accumulater[key] = value;
    return accumulater;
  }, {});
  return splittedParams;
};

export default function Spotify() {
  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } = getSpotifyParams(
        window.location.hash
      );
      console.log(access_token);
      localStorage.clear();
      localStorage.setItem("accessToken", access_token);
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
          </div>
        </Container>
      </PageContent>
    </Page>
  );
}
