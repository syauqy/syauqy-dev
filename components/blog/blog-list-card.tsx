import React from "react";
import Image from "next/image";
import { PostProps } from "~/lib/blog";
import ImagePlaceholder from "~/lib/image-placeholder";
import { GhostInternalLink } from "~/components/ui/ghost-interal-link";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(LocalizedFormat);

export default function BlogListCard({ post }: PostProps) {
  //   console.log("bloglist", post);
  return (
    <li className="space-y-2 p-5 w-full bg-white bg-opacity-50 rounded-lg shadow-md">
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
  );
}
