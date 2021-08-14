import React from "react";
import clsx from "clsx";

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  bgColor?: string;
  hoverColor?: string;
};

export const AnchorText = React.forwardRef<HTMLAnchorElement, AnchorProps>(
  (
    { className, children, href, rel, target, bgColor, hoverColor, ...rest },
    ref
  ) => (
    <>
      {" "}
      <a
        className={clsx(
          "px-1 rounded bg-gray-300",
          className,
          bgColor,
          hoverColor
        )}
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

AnchorText.displayName = "AnchorText";
