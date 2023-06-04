import React from "react";
import { NextSeo } from "next-seo";
import { Page } from "@/components/layouts/page";
import { PageContent } from "@/components/layouts/page-content";
import { Container } from "@/components/layouts/container";
import { Footer } from "@/components/footer";

import PocketRecentArticles from "@/components/pocket/pocket-recent-articles";
import SpotifyRecentArtist from "@/components/spotify/spotify-recent-artist";
import HomeHeadSection from "@/components/home/home-head-section";
import HomeProjectsSection from "@/components/home/home-projects-section";
import HomeBlogList from "@/components/blog/home-blog-list";

import { getAllPosts } from "@/lib/mdx";
import { PostsProps } from "@/lib/blog";

const meta = {
  title: `Syauqy Aziz`,
  description: `Product Manager and Spare-time Web Developer.`,
};

export default function Home({ posts }: PostsProps) {
  return (
    <Page>
      <NextSeo
        openGraph={{ title: meta.title, description: meta.description }}
        title={`${meta.title} - ${meta.description}`}
        description={meta.description}
      />

      <PageContent>
        <Container className="px-4 space-y-5">
          <HomeHeadSection />
          <HomeBlogList posts={posts} />
          <HomeProjectsSection />
          <SpotifyRecentArtist />
          <PocketRecentArticles />
          <Footer />
        </Container>
      </PageContent>
    </Page>
  );
}

export const getStaticProps = async () => {
  const posts = getAllPosts();

  return {
    props: { posts },
  };
};
