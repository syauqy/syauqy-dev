import * as React from "react";
import Link from "next/link";
import Image from "next/image";

import { AnchorText } from "~/components/ui/anchor-text";

const CustomLink = (props) => {
  //   console.log(props);
  const href = props.href;
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

  if (isInternalLink) {
    return (
      <Link href={href} passHref>
        <AnchorText {...props} hoverColor="hover:bg-blue-500 hover:text-white">
          {props.children}
        </AnchorText>
      </Link>
    );
  }

  return (
    <AnchorText
      target="_blank"
      rel="noopener noreferrer"
      hoverColor="hover:bg-blue-500 hover:text-white"
      {...props}
    />
  );
};

const ImageMDX = (props) => {
  const src = props.src;
  const alt = props.alt;
  const height = props.height;
  const width = props.width;
  const priority = props.priority;
  // console.log(props);
  return (
    <div className="grid grid-cols-1 justify-items-center space-y-1">
      <Image
        src={src}
        height={height}
        width={width}
        alt={alt}
        priority={priority}
        className="rounded-md"
        {...props}
      />
      <p className="text-sm text-gray-400 italic">{props.caption}</p>
    </div>
  );
};

const MDXComponents = {
  ImageMDX,
  a: CustomLink,
};

export default MDXComponents;
