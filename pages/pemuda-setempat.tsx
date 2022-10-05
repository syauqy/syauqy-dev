import React from "react";
import { NextSeo } from "next-seo";
import { Page } from "@/components/layouts/page";
import { PageContent } from "@/components/layouts/page-content";
import { Container } from "@/components/layouts/container";
import SpotifyGetArtist from "@/components/spotify/spotify-get-artist";
import SpotifyRecentArtist from "@/components/spotify/spotify-recent-artist";
import PocketGetArticles from "@/components/pocket/pocket-get-articles";
import PocketRecentArticles from "@/components/pocket/pocket-recent-articles";

const meta = {
  title: `Pemuda Setempat`,
  description: `Private Zone`,
};

export default function PemudaSetempat() {
  return (
    <Page>
      <NextSeo
        openGraph={{ title: meta.title, description: meta.description }}
        title={meta.title}
      />
      <PageContent>
        <Container className="space-y-4 px-4">
          <SpotifyGetArtist />
          <SpotifyRecentArtist />
          <PocketGetArticles />
          <PocketRecentArticles />
        </Container>
      </PageContent>
    </Page>
  );
}
