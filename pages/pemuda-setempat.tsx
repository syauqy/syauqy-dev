import React, { useEffect, useState } from "react";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { Page } from "~/components/layouts/page";
import { PageContent } from "~/components/layouts/page-content";
import { Container } from "~/components/layouts/container";
import axios from "axios";
import router, { useRouter } from "next/router";
import _ from "lodash";
// import getPocket from "pocket-api";

const meta = {
  title: `Syauqy Aziz`,
  description: `Product manager and web developer living in Yogyakarta, Indonesia. Curently building web and mobile software at Jala`,
};

function getPocketToken() {
  axios.get(
    `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/pocket_token/recFdgl3BgXQEzUFX`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
      },
    }
  );
  //   .then((res) => {
  //     setArtists(res.data);
  //   })
  //   .catch((error) => console.log(error));
}

function recordPocketArticles(token: string) {
  axios({
    method: "patch",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
      "Content-Type": "application/json",
    },
    url: `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/spotify_token`,
    data: {
      records: [
        {
          id: "recxh8d64XoW8kWTm",
          fields: {
            access_token: token,
          },
        },
      ],
    },
  });
}

export default function PemudaSetempat() {
  const [articles, getArticles] = useState({});

  async function getRequestToken() {
    const response = await fetch(
      "http://localhost:3000/api/get-pocket-request"
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
      `http://localhost:3000/api/get-pocket-token?code=${localStorage.getItem(
        "pocketRequestToken"
      )}`
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
      `http://localhost:3000/api/get-pocket-articles?access_token=${localStorage.getItem(
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
              read_time: articles[article].time_to_read,
              author_name: Object.keys(articles[article].authors).map(
                (author) => articles[article].authors[author].name
              )[0],
              author_url: Object.keys(articles[article].authors).map(
                (author) => articles[article].authors[author].url
              )[0],
            },
          }))
        : {},
    };
    console.log(records);
    return records;
  };

  function showArticles() {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/pocket_articles?&sort%5B0%5D%5Bfield%5D=no&sort%5B0%5D%5Bdirection%5D=desc`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
          },
          params: {
            maxRecords: 5,
          },
        }
      )
      .then((res) => {
        getArticles(res.data);
      })
      .catch((error) => console.log(error));
  }

  //   const getAuthorData = ()

  console.log(articles);
  useEffect(() => {
    showArticles();
  }, []);
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
            <div className="p-4 pb-6 w-full bg-white bg-opacity-50 shadow-md rounded-md">
              <h2 className="text-center p-2 text-gray-700">Recent reads 🗞️</h2>
              <div className="flex flex-col space-y-4">
                {articles?.records ? (
                  articles?.records.map((article, i) => (
                    <div className="space-y-2 p-2" key={i}>
                      <h2 className="text-xl font-semibold">
                        <Link href={article.fields.url} passHref>
                          <a target="_blank" rel="nofollow noopener noreferrer">
                            {article.fields.title}
                          </a>
                        </Link>
                      </h2>
                      <div className="flex-shrink-0">
                        <Link href={article.fields.url} passHref>
                          <a target="_blank" rel="nofollow noopener noreferrer">
                            <img
                              className="object-cover w-full h-48"
                              src={article.fields.img_url}
                              alt={article.fields.title}
                            />
                          </a>
                        </Link>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">
                          <Link href={article.fields.author_url} passHref>
                            <a
                              target="_blank"
                              rel="nofollow noopener noreferrer"
                            >
                              {article.fields.author_name === "email"
                                ? ""
                                : article.fields.author_name + " - "}
                            </a>
                          </Link>
                          <span>{article.fields.read_time} min</span>
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col space-y-4 animate-pulse">
                    <div className="bg-gray-400 h-8"></div>
                    <div className="bg-gray-400 h-48"></div>
                    <div className="bg-gray-400 h-4 w-1/4"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </PageContent>
    </Page>
  );
}

// export async function getStaticProps() {
//   const response = await fetch("http://localhost:3000/api/pocket");
//   const token = await response.json();
//   return {
//     props: {
//       token,
//     }, // will be passed to the page component as props
//   };
// }
