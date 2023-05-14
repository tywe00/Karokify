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
  const localAccessToken = localStorage.getItem("access_token");

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localAccessToken}`,
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
  .then(response => {
    return response.json()
  })
  .then(data => {
    const playlists = data.items.map(item => {
      return {
        name: item.name,
        id: item.id
      };
    });
    return playlists;
    }
  )
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

async function getPlaylistTracks(playlistId) {
  const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(`Failed to fetch playlist tracks: ${errorResponse.error.message}`);
  }

  const data = await response.json();
  if (data.tracks.items != undefined && data.tracks.items != null) {
    const parsedData = Object.values(data.tracks.items)
    parsedData.map(e => e.track);
    return parsedData;
  } else {
    console.log("Playlist tracks undefined")
  }
  return undefined;
}

async function getSearchResults(accessToken, searchTerm) {
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
  return data.tracks.items;
}



export {getAlbum, getPlaylists, getPlaylistTracks, getSearchResults, getCurrentPlaybackPosition};
