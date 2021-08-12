import React from "react";
import { NextSeo } from "next-seo";
import { Page } from "~/components/layouts/page";
import { PageContent } from "~/components/layouts/page-content";
import { Container } from "~/components/layouts/container";
import PocketRecentArticles from "~/components/pocket/pocket-recent-articles";
import { recordPocketArticles } from "~/lib/pocket";
import axios from "axios";
import router from "next/router";

const meta = {
  title: `Syauqy Aziz`,
  description: `Product manager and web developer living in Yogyakarta, Indonesia. Curently building web and mobile software at Jala`,
};

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
    console.log("pocket articles", pocket.list);
    recordPocketArticles(pocket.list);
    // getArticles(pocket.list);
  }

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
