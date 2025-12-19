import React from "react";
import Image from "next/image";
import { AnchorText } from "../ui/anchor-text";
import profileHead from "@/public/syauqy-head.jpg";

export default function HomeHeadSection() {
  return (
    <div className="head p-5 pb-6 w-full bg-white bg-opacity-50 rounded-xl shadow-md">
      <div className="space-y-3 text-gray-700">
        <div className="flex flex-row gap-4 items-center border-b pb-2">
          <div className="flex-shrink-0">
            <Image
              className="object-center rounded-full"
              src={profileHead}
              alt="syauqy"
              placeholder="blur"
              width={80}
              height={80}
            />
          </div>

          <div className="space-y-2 col-span-2 ">
            <h1 className="text-2xl font-bold">Hey, I&apos;m Syauqy! 👋</h1>
            <p>
              Founder, product builder, and a
              <AnchorText
                href="https://github.com/syauqy"
                hoverColor="hover:bg-blue-500 hover:text-white"
                target="_blank"
              >
                spare-time coder
              </AnchorText>
              .
            </p>
          </div>
        </div>
        <div className="space-y-2">
          I&apos;m leading the product and engineering team at
          <AnchorText
            href="https://jala.tech"
            hoverColor="hover:bg-blue-500 hover:text-white"
            target="_blank"
          >
            Jala
          </AnchorText>
          .{" "}
          <div>
            In the past, I worked as a game developer at
            <AnchorText
              href="https://www.facebook.com/amagine.interactive/"
              hoverColor="hover:bg-yellow-500 hover:text-white"
              rel="nofollow noopener noreferrer"
              target="_blank"
            >
              Amagine Interactive
            </AnchorText>
            , an indie game studio focused on mobile games. Before that, I spent
            my college free time on game development, robotics, and
            <AnchorText
              href="https://www.facebook.com/photo/?fbid=10207696324945022&set=a.10201193465777607"
              hoverColor="hover:bg-blue-500 hover:text-white"
              rel="nofollow noopener noreferrer"
              target="_blank"
            >
              CanSat
            </AnchorText>{" "}
            projects.
          </div>
          <div>
            One fun highlight:
            <AnchorText
              href="https://youtu.be/oP9kAzBcpr8"
              hoverColor="hover:bg-blue-500 hover:text-white"
              rel="nofollow noopener noreferrer"
              target="_blank"
            >
              a hackathon game
            </AnchorText>{" "}
            I built was picked up by a Thai YouTuber and unexpectedly reached
            1.5 M views. 😂
          </div>
        </div>
      </div>
    </div>
  );
}
