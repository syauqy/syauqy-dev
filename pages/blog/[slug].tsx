import React, { useMemo } from "react";
import Link from "next/link";
import { getMDXComponent } from "mdx-bundler/client";
import { getAllPosts, getSinglePost } from "~/lib/mdx";

const Blog = (props) => {
  console.log(props);
  const Component = useMemo(() => getMDXComponent(props.code), [props.code]);
  return (
    <div className="wrapper">
      <h1>{props.frontmatter.title}</h1>
      <Component />
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  console.log(params);
  const post = await getSinglePost(params.slug);
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
