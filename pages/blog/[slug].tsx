import React, { useMemo } from "react";
import Link from "next/link";

import { NextSeo } from "next-seo";
import { Page } from "@/components/layouts/page";
import { PageContent } from "@/components/layouts/page-content";
import { Container } from "@/components/layouts/container";
import { GetStaticProps } from "next";
import { Footer } from "@/components/footer";
import { getMDXComponent } from "mdx-bundler/client";
import { getAllPosts, getSinglePost } from "@/lib/mdx";
import { BlogProps } from "@/lib/blog";
import mdxcomponents from "@/components/blog/mdx-components";

import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { ChevronLeftIcon } from "@heroicons/react/outline";

dayjs.extend(LocalizedFormat);

const Blog = (props: BlogProps) => {
  const Component = useMemo(() => getMDXComponent(props.code), [props.code]);

  const meta = {
    author: "Syauqy Aziz",
    title: `${props.frontmatter.title} - Syauqy Aziz`,
    description: props.frontmatter.summary,
    ogImage: props.frontmatter.image,
    publishedAt: dayjs(props.frontmatter.publishedAt).format("LL"),
  };
  return (
    <Page>
      <NextSeo
        openGraph={{
          type: "article",
          title: meta.title,
          description: meta.description,
          images: [
            {
              url: meta.ogImage,
              alt: meta.title,
            },
          ],
        }}
        twitter={{
          handle: "@syauqy",
          site: "@syauqy",
          cardType: "summary_large_image",
        }}
        title={meta.title}
        description={meta.description}
      />
      <PageContent>
        <Container className="space-y-2">
          <div className="px-5 text-gray-700">
            <Link href="/blog">
              <a className="flex">
                <ChevronLeftIcon className="h-5 w-5 my-1" />
                <span className="px-1 text-lg">Blog</span>
              </a>
            </Link>
          </div>
          <div className="p-5 pb-6 w-full bg-opacity-50 min-h-screen">
            <div className="space-y-3 text-gray-700">
              <div className="space-y-1">
                <h1 className="text-3xl font-bold">
                  {props.frontmatter.title}
                </h1>
                <p className="text-gray-600 text-sm">{meta.publishedAt}</p>
              </div>
              <div className="prose w-full max-w-none">
                <Component components={{ ...mdxcomponents }} />
              </div>
            </div>
          </div>
          <Footer />
        </Container>
      </PageContent>
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // console.log(params);
  const slug: string = params ? (params.slug as string) : "";
  const post = await getSinglePost(slug);
  return {
    props: { ...post },
  };
};

export const getStaticPaths = async () => {
  const paths = getAllPosts().map(({ slug }) => ({ params: { slug } }));
  return {
    paths,
    fallback: false,
  };
};

export default Blog;
