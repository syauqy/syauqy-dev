import axios from "axios";

export const USER_TOP_ARTIST_ENDPOINT =
  "https://api.spotify.com/v1/me/top/artists";

export const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI}&scope=user-top-read%20user-read-recently-played&response_type=token`;

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
