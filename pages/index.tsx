import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { Page } from "~/components/layouts/page";
import { PageContent } from "~/components/layouts/page-content";
import { Container } from "~/components/layouts/container";
import SpotifyGetArtist from "~/components/spotify/spotify-get-artist";
import SpotifyRecentArtist from "~/components/spotify/spotify-recent-artist";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import useSWR from "swr";

type HomeProps = {
  artists: [];
  access_token: string;
};

const meta = {
  title: `Syauqy Aziz`,
  description: `Product manager and web developer. Currently living in Yogyakarta, Indonesia. Curently building web and mobile software at Jala`,
};

// const code = new URLSearchParams(window.location.search).get("code");

// const fetcher = async (input: RequestInfo,   init: RequestInit, ...args:
// any[]) => {   const res = await fetch(input, init).then(res => res.json())}

export default function Home(props: HomeProps) {
  return (
    <Page>
      <NextSeo
        // description={meta.description}
        openGraph={{ title: meta.title, description: meta.description }}
        title={meta.title}
      />

      <PageContent>
        <Container>
          <SpotifyRecentArtist />
        </Container>
        {/* {artists.map((artist) => {
          <li>{artist}</li>;
        })} */}
      </PageContent>
    </Page>
  );
}

export async function getStaticProps() {
  // const access_token = JSON.parse(res);

  return {
    props: {
      // access_token: res,
      artists: ["eric clapton", "mcr"],
    },
  };
}
