/* const accessToken = localStorage.getItem("access_token");

async function getAlbum() {
  const url = "https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();
  return data;
}

export { getAlbum }; */

const accessToken = localStorage.getItem("access_token");

function getAlbum() {
  const url = "https://api.spotify.com/v1/albums/4xdRjOhY9NHmMpI7U3e2c3";
  return (
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      //.then(data => console.log(data))
      .catch((error) => console.error(error))
  );
}

async function getCurrentPlaybackPosition() {
  const url = "https://api.spotify.com/v1/me/player";

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();
  return data;
}

export { getAlbum, getCurrentPlaybackPosition };
