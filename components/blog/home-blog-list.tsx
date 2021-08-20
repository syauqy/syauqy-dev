import React from "react";
import Link from "next/link";
import { PostsProps, Post } from "~/lib/blog";
import { GhostInternalLink } from "~/components/ui/ghost-interal-link";
import { GhostAnchorText } from "~/components/ui/ghost-anchor-text";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(LocalizedFormat);

export default function HomeBlogList({ posts }: PostsProps) {
  //   console.log("blog", posts);
  return (
    <div className="head p-5 pb-6 w-full bg-white bg-opacity-50 rounded-md shadow-md">
      <h2 className="text-lg font-semibold pb-4 text-gray-700">
        ✍️ Recent blog
      </h2>
      <ul className="space-y-4">
        {posts.slice(0, 1).map((post: Post, i: number) => (
          <li key={i} className="space-y-2">
            <GhostInternalLink
              className="text-lg text-gray-700 font-semibold truncate"
              path={`/blog/${post.slug}`}
              hoverColor="hover:bg-blue-500 hover:text-white"
            >
              {post.frontmatter.title}
            </GhostInternalLink>
            <p className="text-md text-gray-600">{post.frontmatter.summary}</p>
            <p className="text-sm text-gray-600 font-light">
              {dayjs(post.frontmatter.publishedAt).format("LL")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
