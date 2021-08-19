import React from "react";
import { NextSeo } from "next-seo";
import { Page } from "~/components/layouts/page";
import { PageContent } from "~/components/layouts/page-content";
import { Container } from "~/components/layouts/container";
import { Footer } from "~/components/footer";
import Link from "next/link";
import PocketRecentArticles from "~/components/pocket/pocket-recent-articles";
import SpotifyRecentArtist from "~/components/spotify/spotify-recent-artist";
import HomeHeadSection from "~/components/home/home-head-section";
import HomeProjectsSection from "~/components/home/home-projects-section";
import { getAllPosts } from "~/lib/mdx";

const meta = {
  title: `Syauqy Aziz`,
  description: `Product Manager and Spare-time Web Developer.`,
};

export default function Home({ posts }) {
  // console.log(posts);
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
          {/* <div className="head p-5 pb-6 w-full bg-white bg-opacity-50 rounded-md shadow-md">
            <h2 className="text-lg font-semibold pb-4 text-gray-700">
              Recent blog
            </h2>
            <ul>
              {posts.map((post, i: number) => (
                <li key={i}>
                  <a href={`/blog/${post.slug}`}>{post.frontmatter.title}</a>
                  <p>{post.frontmatter.summary}</p>
                  <p>{post.frontmatter.publishedAt}</p>
                </li>
              ))}
            </ul>
          </div> */}
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
