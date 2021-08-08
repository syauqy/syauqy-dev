import React, { useState, useEffect } from "react";
import axios from "axios";

const USER_TOP_ARTIST_ENDPOINT = "https://api.spotify.com/v1/me/top/artists";

export default function SpotifyGetArtist() {
  const [token, setToken] = useState("");
  const [data, setData] = useState({});

  const getTopArtists = () => {
    axios
      .get(USER_TOP_ARTIST_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          time_range: "short_term",
          limit: 10,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"));
    }
    getTopArtists();
    console.log(data);
  }, []);

  return (
    <div>
      {data.items.map((artist, i: number) => (
        <div key={i}>
          <img
            src={artist.images[artist.images.length - 2].url}
            alt={artist.name}
          />
          <div>{artist.name}</div>
          <div>{artist.external_urls.spotify}</div>
        </div>
      ))}
    </div>
  );
}
