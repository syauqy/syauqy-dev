import React from "react";
import { AnchorText } from "~/components/ui/anchor-text";
import { GhostAnchorText } from "~/components/ui/ghost-anchor-text";

export function Footer() {
  return (
    <div className="p-5 pb-6 w-full rounded-md">
      <h2 className="text-lg font-semibold pb-4 text-gray-700">Get in touch</h2>
      <div className="space-y-3">
        <p className="text-gray-700">
          Welcome to my personal website! I&apos;m{" "}
          <AnchorText
            href="https://twitter.com/syauqy"
            hoverColor="hover:bg-blue-500 hover:text-white"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            @syauqy
          </AnchorText>
          , a Product Manager and spare-time coder from Indonesia 🇮🇩
        </p>
        <p className="text-gray-700">
          If you are interested in working with me, drop me an email at
          <AnchorText
            href="mailto:hey@syauqy.dev?subject=Hi%20Syauqy%20%F0%9F%91%8B"
            hoverColor="hover:bg-blue-500 hover:text-white"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            hey@syauqy.dev
          </AnchorText>
        </p>
      </div>
      <div className="flex flex-wrap text-gray-600 font-medium mt-12">
        <GhostAnchorText
          href="https://twitter.com/syauqy"
          hoverColor="hover:bg-brand-twitter hover:text-white mr-4 mb-3"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          Twitter
        </GhostAnchorText>
        <GhostAnchorText
          href="https://github.com/syauqy"
          hoverColor="hover:bg-gray-800 hover:text-white mr-4 mb-3"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          GitHub
        </GhostAnchorText>
        <GhostAnchorText
          href="https://www.linkedin.com/in/syauqyaziz/"
          hoverColor="hover:bg-brand-linkedin hover:text-white mr-4 mb-3"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          LinkedIn
        </GhostAnchorText>
        <GhostAnchorText
          href="https://www.instagram.com/syauqyaziz/"
          hoverColor="bg-gradient-to-r hover:from-yellow-500 hover:to-pink-500 hover:text-white mr-4 mb-3"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          Instagram
        </GhostAnchorText>
      </div>
    </div>
  );
}
