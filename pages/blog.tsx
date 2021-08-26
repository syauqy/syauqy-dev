import React from "react";
import Image from "next/image";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { Page } from "~/components/layouts/page";
import { PageContent } from "~/components/layouts/page-content";
import { Container } from "~/components/layouts/container";
import { GetStaticProps } from "next";
import { Footer } from "~/components/footer";
import BlogListCard from "~/components/blog/blog-list-card";
import { ChevronLeftIcon } from "@heroicons/react/outline";

import { getAllPosts } from "~/lib/mdx";
import { PostsProps, Post } from "~/lib/blog";

const meta = {
  title: `Blog - Syauqy Aziz`,
  description: `Product Manager and Spare-time Web Developer.`,
};

export default function Blogs({ posts }: PostsProps) {
  return (
    <Page>
      <NextSeo
        openGraph={{ title: meta.title, description: meta.description }}
        title={`${meta.title} - ${meta.description}`}
        description={meta.description}
      />
      <PageContent>
        <Container className="space-y-2">
          <div className="px-5 text-gray-700">
            <Link href="/">
              <a className="flex">
                <ChevronLeftIcon className="h-5 w-5 my-1" />
                <span className="px-1 text-lg">Home</span>
              </a>
            </Link>
          </div>
          <div className="p-5 pb-6 w-full bg-opacity-50 min-h-screen">
            <div className="space-y-4 text-gray-700">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">Blog</h1>
                <p className="text-gray-600 text-md">
                  Here are some of my thoughts and ranting on product, design,
                  and other stuff.
                </p>
              </div>
              <div className="space-y-16">
                <ul className="space-y-6">
                  {posts.map((post: Post, index: number) => (
                    <BlogListCard key={index} post={post} />
                  ))}
                </ul>
                <div className="grid grid-cols-1 justify-items-center">
                  <p className="text-gray-600 italic">That&apos;s all folks!</p>
                </div>
              </div>
            </div>
          </div>
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
