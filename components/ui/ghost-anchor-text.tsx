import React from "react";
import clsx from "clsx";

type GhostAnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  bgColor?: string;
  hoverColor?: string;
};

export const GhostAnchorText = React.forwardRef<
  HTMLAnchorElement,
  GhostAnchorProps
>(
  (
    { className, children, href, rel, target, bgColor, hoverColor, ...rest },
    ref
  ) => (
    <>
      <a
        className={clsx("rounded hover:px-1", className, bgColor, hoverColor)}
        ref={ref}
        href={href}
        target={target}
        rel={rel}
        {...rest}
      >
        {children}
      </a>
    </>
  )
);

GhostAnchorText.displayName = "GhostAnchorText";
