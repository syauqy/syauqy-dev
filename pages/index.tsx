import React, { useState, useEffect } from "react";
import { NextSeo } from "next-seo";
import { Page } from "~/components/layouts/page";
import { PageContent } from "~/components/layouts/page-content";
import { Container } from "~/components/layouts/container";
import Image from "next/image";
import { AnchorText } from "~/components/ui/anchor-text";
import PocketRecentArticles from "~/components/pocket/pocket-recent-articles";
import SpotifyRecentArtist from "~/components/spotify/spotify-recent-artist";
import profileHead from "~/public/syauqy-head.jpg";

const meta = {
  title: `Syauqy Aziz`,
  description: `Product manager and web developer. Currently living in Yogyakarta, Indonesia. Curently building web and mobile software at Jala`,
};

export default function Home() {
  return (
    <Page>
      <NextSeo
        // description={meta.description}
        openGraph={{ title: meta.title, description: meta.description }}
        title={meta.title}
      />

      <PageContent>
        <Container className="space-y-4">
          <div className="head p-4 pb-6 w-full bg-white bg-opacity-50 rounded-md">
            <div className="space-y-3 text-gray-700">
              <div className="flex flex-row gap-4 items-center">
                <div className="flex-shrink-0">
                  <Image
                    className="object-center rounded-full"
                    src={profileHead}
                    alt="syauqy"
                    width={80}
                    height={80}
                  />
                </div>

                <div className="space-y-2 col-span-2 ">
                  <h1 className="text-2xl font-bold">Hey, I'm Syauqy! 👋</h1>
                  <p>I'm a founder, product manager, and spare-time coder.</p>
                </div>
              </div>
              <div className="space-y-2">
                I'm currently leading the Farm Management Solutions team at
                <AnchorText
                  href="https://jala.tech"
                  className="md:bg-gray-300 text-white md:text-gray-800"
                  bgColor="bg-blue-500"
                  hoverColor="hover:bg-blue-500 hover:text-white"
                  rel=""
                  target="_blank"
                >
                  Jala
                </AnchorText>
                .{" "}
                <div>
                  In the past, I worked as a game developer at
                  <AnchorText
                    href="https://www.facebook.com/amagine.interactive/"
                    className="md:bg-gray-300 text-white md:text-gray-800"
                    bgColor="bg-yellow-500"
                    hoverColor="hover:bg-yellow-500 hover:text-white"
                    rel="nofollow noopener noreferrer"
                    target="_blank"
                  >
                    Amagine Interactive
                  </AnchorText>
                  , an independent game studio focused on mobile games. Before
                  that, I spent my college free time on game development,
                  robotics, and
                  <AnchorText
                    href="https://www.facebook.com/photo/?fbid=10207696324945022&set=a.10201193465777607"
                    className="md:bg-gray-300 text-white md:text-gray-800"
                    bgColor="bg-blue-500"
                    hoverColor="hover:bg-blue-500 hover:text-white"
                    rel="nofollow noopener noreferrer"
                    target="_blank"
                  >
                    CanSat
                  </AnchorText>{" "}
                  projects.
                </div>
                <div>
                  Surprisingly,
                  <AnchorText
                    href="https://youtu.be/oP9kAzBcpr8"
                    className="md:bg-gray-300 text-white md:text-gray-800"
                    bgColor="bg-blue-500"
                    hoverColor="hover:bg-blue-500 hover:text-white"
                    rel="nofollow noopener noreferrer"
                    target="_blank"
                  >
                    one of my hackathon game
                  </AnchorText>{" "}
                  played by a Thailand Youtuber and got 1.5 M views. 😂
                </div>
              </div>
            </div>
          </div>
          <SpotifyRecentArtist />
          <PocketRecentArticles />
        </Container>
      </PageContent>
    </Page>
  );
}
