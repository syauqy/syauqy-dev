import React, { useEffect, useState } from "react";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { Page } from "~/components/layouts/page";
import { PageContent } from "~/components/layouts/page-content";
import { Container } from "~/components/layouts/container";
import PocketRecentArticles from "~/components/pocket/pocket-recent-articles";
import axios from "axios";
import router from "next/router";
// import getPocket from "pocket-api";

const meta = {
  title: `Syauqy Aziz`,
  description: `Product manager and web developer living in Yogyakarta, Indonesia. Curently building web and mobile software at Jala`,
};

// function getPocketToken() {
//   axios.get(
//     `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/pocket_token/recFdgl3BgXQEzUFX`,
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
//       },
//     }
//   );
//   //   .then((res) => {
//   //     setArtists(res.data);
//   //   })
//   //   .catch((error) => console.log(error));
// }

export default function PemudaSetempat() {
  async function getRequestToken() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/get-pocket-request`
    );
    const { code } = await response.json();
    console.log(code);
    if (code) {
      localStorage.clear();
      localStorage.setItem("pocketRequestToken", code);
      router.push(
        `https://getpocket.com/auth/authorize?request_token=${code}&redirect_uri=${process.env.NEXT_PUBLIC_POCKET_REDIRECT_URI}`
      );
    }
  }

  async function getAccessToken() {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_HOST
      }/api/get-pocket-token?code=${localStorage.getItem("pocketRequestToken")}`
    );
    const { access_token, username } = await response.json();
    recordPocketAccessToken(access_token, username);
    console.log(access_token, username);
    localStorage.setItem("pocketAccessToken", access_token);
  }

  function recordPocketAccessToken(access_token: string, username: string) {
    axios({
      method: "patch",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
      },
      url: `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/pocket_token`,
      data: {
        records: [
          {
            id: "recFdgl3BgXQEzUFX",
            fields: {
              access_token: access_token,
              username: username,
            },
          },
        ],
      },
    });
  }

  async function getPocketArticles() {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_HOST
      }/api/get-pocket-articles?access_token=${localStorage.getItem(
        "pocketAccessToken"
      )}`
    );
    const pocket = await response.json();
    recordPocketArticles(pocket.list);
    // getArticles(pocket.list);
  }

  function recordPocketArticles(pocket) {
    axios({
      method: "post",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
      },
      url: `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/pocket_articles`,
      data: generateRecords(pocket),
    });
  }

  const generateRecords = (articles) => {
    console.log(articles);
    const records = {
      records: articles
        ? Object.keys(articles).map((article) => ({
            fields: {
              title: articles[article].resolved_title,
              img_url: articles[article].top_image_url,
              url: articles[article].resolved_url,
              read_time:
                articles[article].time_to_read !== "0"
                  ? articles[article].time_to_read
                  : "0",
              author_name: articles[article].authors
                ? Object.keys(articles[article].authors).map(
                    (author) => articles[article].authors[author].name
                  )[0]
                : "none",
              author_url: articles[article].authors
                ? Object.keys(articles[article].authors).map(
                    (author) => articles[article].authors[author].url
                  )[0]
                : "none",
            },
          }))
        : {},
    };
    console.log("generate", records);
    return records;
  };

  return (
    <Page>
      <NextSeo
        openGraph={{ title: meta.title, description: meta.description }}
        title={meta.title}
      />

      <PageContent>
        <Container>
          <div className="space-y-4">
            <div className="flex flex-wrap justify-between">
              <button
                onClick={() => getRequestToken()}
                className="rounded-full py-3 px-6 bg-pink-500"
              >
                Login Pocket
              </button>
              <button
                onClick={() => getAccessToken()}
                className="rounded-full py-3 px-6 bg-pink-400"
              >
                Get Access Token
              </button>
              <button
                onClick={() => getPocketArticles()}
                className="rounded-full py-3 px-6 bg-pink-300"
              >
                Get Articles
              </button>
            </div>
            <PocketRecentArticles />
          </div>
        </Container>
      </PageContent>
    </Page>
  );
}
