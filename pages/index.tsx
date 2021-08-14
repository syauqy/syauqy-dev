import React from "react";
import { NextSeo } from "next-seo";
import { Page } from "~/components/layouts/page";
import { PageContent } from "~/components/layouts/page-content";
import { Container } from "~/components/layouts/container";
import PocketRecentArticles from "~/components/pocket/pocket-recent-articles";
import SpotifyRecentArtist from "~/components/spotify/spotify-recent-artist";
import HomeHeadSection from "~/components/home/home-head-section";

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
          <HomeHeadSection />
          <div className="head p-5 pb-6 w-full bg-white bg-opacity-50 rounded-md shadow-md">
            <h2 className="text-lg font-semibold pb-4 text-gray-700">
              💻 Recent projects and contributions
            </h2>
            <div className="space-y-3 text-gray-700"></div>
          </div>
          <SpotifyRecentArtist />
          <PocketRecentArticles />
        </Container>
      </PageContent>
    </Page>
  );
}
