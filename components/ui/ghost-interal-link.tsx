import React from "react";
import Link from "next/link";
import clsx from "clsx";

type GhostAnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  bgColor?: string;
  hoverColor?: string;
  path: string;
};

export const GhostInternalLink = React.forwardRef<
  HTMLAnchorElement,
  GhostAnchorProps
>(
  (
    {
      className,
      children,
      href,
      rel,
      target,
      bgColor,
      hoverColor,
      path,
      ...rest
    },
    ref
  ) => (
    <Link href={path}>
      <a
        className={clsx(
          "rounded hover:px-1 truncate",
          className,
          bgColor,
          hoverColor
        )}
        {...rest}
      >
        {children}
      </a>
    </Link>
  )
);

GhostInternalLink.displayName = "GhostInternalLink";
