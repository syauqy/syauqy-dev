import axios from "axios";
import querystring from "querystring";

export const USER_TOP_ARTIST_ENDPOINT =
  "https://api.spotify.com/v1/me/top/artists";

export const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI}&scope=user-read-currently-playing%20user-top-read%20user-read-recently-played&response_type=code&state=34fFs29kd09`;

const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
const SPOTIFY_TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const refresh_token = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

export type ArtistProps = {
  readonly records: ArtistRecords[];
};

export type ArtistRecords = {
  readonly createdTime: string;
  readonly id: string;
  readonly fields: {
    readonly img_url: string;
    readonly name: string;
    readonly no: number;
    readonly url: string;
  };
};

export type ArtistFields = {
  readonly img_url: string;
  readonly name: string;
  readonly no: number;
  readonly url: string;
};

//spotify response types
export type spotifyProps = {
  readonly href?: string;
  readonly limit?: number;
  readonly next?: string;
  readonly offset?: number;
  readonly total?: number;
  readonly items?: spotifyItems[];
};

export type spotifyItems = {
  readonly external_urls: {
    readonly spotify: string;
  };
  readonly name: string;
  readonly href: string;
  readonly images: itemsImages[];
};

type itemsImages = {
  readonly url: string;
};

export const getSpotifyParams = (hash: string) => {
  const stringAfterHash = hash.substring(1);

  const urlParams = stringAfterHash.split("&");
  const splittedParams = urlParams.reduce(
    (accumulater: any, currentValue: string) => {
      const [key, value] = currentValue.split("=");
      accumulater[key] = value;
      return accumulater;
    },
    {}
  );
  console.log(stringAfterHash, urlParams, splittedParams);
  return splittedParams;
};

export function recordAccessToken(token: string) {
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

export function recordSpotifyCode(code: string) {
  axios({
    method: "patch",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
      "Content-Type": "application/json",
    },
    url: `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/spotify_code`,
    data: {
      records: [
        {
          id: "recaGiYzytfvX2bFW",
          fields: {
            code: code,
          },
        },
      ],
    },
  });
}

//get spotify token
export const getSpotifyToken = async () => {
  const response = await axios(SPOTIFY_TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token,
    }),
  })
    .then((res) => {
      console.log(res.data);
      return res.data.access_token;
    })
    .catch((error) => console.log(error.response.data));
  return response;
};

//request top artists data from spotify
export const getTopArtists = async () => {
  const access_token = await getSpotifyToken();
  const response = await axios
    .get(USER_TOP_ARTIST_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        time_range: "short_term",
        limit: 10,
      },
    })
    .then((res) => {
      console.log("dapet data artist", res.data);
      return res.data;
    })
    .catch((error) => console.log(error.response.data));

  return response;
};
