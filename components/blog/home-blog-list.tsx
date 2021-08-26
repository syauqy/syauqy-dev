import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PostsProps, Post } from "~/lib/blog";
import ImagePlaceholder from "~/lib/image-placeholder";
import ExternalImageLoader from "../ui/external-image-loader";
import { GhostInternalLink } from "~/components/ui/ghost-interal-link";
import { GhostAnchorText } from "~/components/ui/ghost-anchor-text";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { ArrowRightIcon } from "@heroicons/react/solid";

dayjs.extend(LocalizedFormat);

export default function HomeBlogList({ posts }: PostsProps) {
  //   console.log("blog", posts);
  return (
    <div className="head p-5 pb-6 w-full bg-white bg-opacity-50 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold pb-4 text-gray-700">
        ✍️ Recent blog
      </h2>
      <ul className="space-y-6">
        {posts.slice(0, 1).map((post: Post, i: number) => (
          <li key={i} className="space-y-2">
            {post.frontmatter.image ? (
              <Image
                className="object-cover w-full h-full rounded-lg"
                src={post.frontmatter.image}
                width={600}
                height={300}
                alt={post.frontmatter.title}
                placeholder="blur"
                blurDataURL={ImagePlaceholder}
              />
            ) : (
              ""
            )}
            <GhostInternalLink
              className="text-lg text-gray-700 font-semibold truncate mt-10"
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
        <div className="text-blue-600 text-light flex">
          <GhostInternalLink
            className="flex"
            hoverColor="hover:bg-blue-500 hover:text-white"
            path="/blogs"
          >
            Read all <b className="mx-1">posts</b>
            <ArrowRightIcon className="h-4 w-4 my-1" />
          </GhostInternalLink>
        </div>
      </ul>
    </div>
  );
}
