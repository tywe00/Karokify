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
const playlistUrl = 'https://api.spotify.com/v1/me/playlists?limit=50&offset=0'

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


function getPlaylists(accessToken) {
  return fetch(
    playlistUrl, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  .then(response => response.json())
  .then(data => data)
}

/* async function getPlaylists() {
  const response = await fetch(playlistUrl, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
  const data = await response.json();
  const playlists = data.items.map(item => {
    return {
      name: item.name,
      id: item.tracks.href.split('playlists/')[1]
    };
  });
  return playlists;
} */

async function getPlaylistTracks(playlistId, accessToken) {
  const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch playlist tracks');
  }

  const data = await response.json();

  return data.items;
}

/* async function getSearchResults(accessToken, searchTerm) {
  console.log(searchTerm)
  const response = await fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch search results');
  }

  const data = await response.json();

  //console.log(data.tracks.items)

  return data.tracks.items;
} */

function getSearchResults(accessToken, searchTerm) {
  const url = `https://api.spotify.com/v1/search?q=${searchTerm}&type=track`;
  return fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    return data.tracks.items;
  })
}



export {getAlbum, getPlaylists, getPlaylistTracks, getSearchResults, getCurrentPlaybackPosition};
