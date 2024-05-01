import axios from "axios";
import querystring from "querystring";

export const USER_TOP_ARTIST_ENDPOINT =
  "https://api.spotify.com/v1/me/top/artists";
const SPOTIFY_REDIRECT_URI = `${process.env.NEXT_PUBLIC_HOST}/pemuda-setempat`;
export const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}&redirect_uri=${SPOTIFY_REDIRECT_URI}&scope=user-read-currently-playing%20user-top-read%20user-read-recently-played&response_type=code&state=34fFs29kd09`;

// const client_id = process.env.SPOTIFY_CLIENT_ID;
// const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

// console.log(process.env.SPOTIFY_CLIENT_ID, process.env.SPOTIFY_CLIENT_SECRET);
// const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;
// const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

export type SpotifyProps = {
  readonly items: SpotifyArtist[];
};

type ArtistImages = {
  readonly height: number;
  readonly url: string;
};

type SpotifyArtist = {
  readonly href: string;
  readonly name: string;
  readonly id: string;
  readonly images: ArtistImages[];
  readonly external_urls: {
    readonly spotify: string;
  };
};

export function recordSpotifyCode(code: string) {
  console.log(code);
  axios.get(`/api/record-spotify-code?code=${code}`);

  // axios({
  //   method: "patch",
  //   headers: {
  //     Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
  //     "Content-Type": "application/json",
  //   },
  //   url: `${process.env.AIRTABLE_URI}/spotify_code`,
  //   data: {
  //     records: [
  //       {
  //         id: "recaGiYzytfvX2bFW",
  //         fields: {
  //           code: code,
  //         },
  //       },
  //     ],
  //   },
  // });
}

//get spotify token
export const getSpotifyToken = async () => {
  const basic = await axios.get("/api/get-spotify-basic");
  // console.log(basic);
  const refresh_token = basic.data.refresh_token;
  // console.log(basic.data.refresh_token);
  const response = await axios(SPOTIFY_TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic.data.basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token,
    }),
  })
    .then((res) => {
      // console.log(res.data);
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
      // console.log("dapet data artist", res.data);
      return res.data;
    })
    .catch((error) => console.log(error.response.data));

  return response;
};
