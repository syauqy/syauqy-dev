import React, { useState, useEffect } from "react";
import { NextSeo } from "next-seo";
import { Page } from "~/components/layouts/page";
import { PageContent } from "~/components/layouts/page-content";
import { Container } from "~/components/layouts/container";
import PocketRecentArticles from "~/components/pocket/pocket-recent-articles";
import SpotifyRecentArtist from "~/components/spotify/spotify-recent-artist";

const meta = {
  title: `Syauqy Aziz`,
  description: `Product manager and web developer. Currently living in Yogyakarta, Indonesia. Curently building web and mobile software at Jala`,
};

export default function Home() {
  return (
    <Page>
      <NextSeo
        // description={meta.description}
        openGraph={{ title: meta.title, description: meta.description }}
        title={meta.title}
      />

      <PageContent>
        <Container className="space-y-4">
          <SpotifyRecentArtist />
          <PocketRecentArticles />
        </Container>
      </PageContent>
    </Page>
  );
}
