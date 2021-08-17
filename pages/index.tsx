import React from "react";
import { NextSeo } from "next-seo";
import { Page } from "~/components/layouts/page";
import { PageContent } from "~/components/layouts/page-content";
import { Container } from "~/components/layouts/container";
import { Footer } from "~/components/footer";
import PocketRecentArticles from "~/components/pocket/pocket-recent-articles";
import SpotifyRecentArtist from "~/components/spotify/spotify-recent-artist";
import HomeHeadSection from "~/components/home/home-head-section";
import HomeProjectsSection from "~/components/home/home-projects-section";

const meta = {
  title: `Syauqy Aziz`,
  description: `Product manager and spare-time web developer.`,
};

export default function Home() {
  return (
    <Page>
      <NextSeo
        openGraph={{ title: meta.title, description: meta.description }}
        title={`${meta.title} - ${meta.description}`}
        description={meta.description}
      />

      <PageContent>
        <Container className="space-y-4">
          <HomeHeadSection />
          <HomeProjectsSection />
          <SpotifyRecentArtist />
          <PocketRecentArticles />
          <Footer />
        </Container>
      </PageContent>
    </Page>
  );
}
