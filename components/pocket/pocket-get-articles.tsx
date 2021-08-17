import React from "react";
import { recordPocketArticles } from "~/lib/pocket";
import axios from "axios";
import router from "next/router";

const POCKET_REDIRECT_URI = `${process.env.NEXT_PUBLIC_HOST}/pemuda-setempat`;
export default function PocketGetArticles() {
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
        `https://getpocket.com/auth/authorize?request_token=${code}&redirect_uri=${POCKET_REDIRECT_URI}`
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
      `${process.env.NEXT_PUBLIC_HOST}/api/get-pocket-articles?access_token=${process.env.NEXT_PUBLIC_POCKET_ACCESS_TOKEN}`
    );
    const pocket = await response.json();
    console.log("pocket articles", pocket.list);
    // recordPocketArticles(pocket.list);
    // getArticles(pocket.list);
  }
  return (
    <div className="flex flex-col w-full space-y-2 justify-between">
      <button
        onClick={() => getRequestToken()}
        className="rounded-full py-3 px-6 bg-pink-500 text-white"
      >
        Login Pocket
      </button>
      <button
        onClick={() => getAccessToken()}
        className="rounded-full py-3 px-6 bg-pink-400 text-white"
      >
        Get Access Token
      </button>
      <button
        onClick={() => getPocketArticles()}
        className="rounded-full py-3 px-6 bg-pink-300 text-white"
      >
        Get Articles
      </button>
    </div>
  );
}
