import * as React from "react";
import Link from "next/link";
import Image, { ImageProps } from "next/image";

import { AnchorText } from "~/components/ui/anchor-text";
import { ReactNode } from "react";

export type LinkProps = {
  href?: string;
  children?: ReactNode;
};

export type ImageMDXProps = {
  children?: ReactNode;
  src: StaticImport;
  width?: number;
  height?: number;
  priority?: boolean;
  alt?: string;
};

interface StaticImageData {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
}

interface StaticRequire {
  default: StaticImageData;
}
declare type StaticImport = StaticRequire | StaticImageData;

const CustomLink: React.FC = (props: LinkProps) => {
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

const ImageMDX: React.FC<ImageMDXProps> = (props) => {
  console.log(props);
  return (
    <Image
      src={props.src}
      height={props.height}
      width={props.width}
      alt={props.alt}
      priority={props.priority}
      //   {...props}
    />
  );
};

const MDXComponents = {
  //   ImageMDX,
  a: CustomLink,
};

export default MDXComponents;
