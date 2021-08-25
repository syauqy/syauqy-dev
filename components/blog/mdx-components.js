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
      className="font-medium no-underline"
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
    <Image
      src={src}
      height={height}
      width={width}
      alt={alt}
      priority={priority}
      {...props}
    />
  );
};

const MDXComponents = {
  ImageMDX,
  a: CustomLink,
};

export default MDXComponents;
