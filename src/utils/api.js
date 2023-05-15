const accessToken = localStorage.getItem("access_token");
export const lyricEndpointURL = "https://spotify-lyric-api.herokuapp.com/?trackid=";

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
  const playlistUrl = 'https://api.spotify.com/v1/me/playlists?limit=50&offset=0'
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


async function getPlaylistTracks(playlistId) {
  const localAccessToken = localStorage.getItem("access_token");
  const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
    headers: {
      Authorization: `Bearer ${localAccessToken}`,
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

async function getUserSpotifyProfile(accessToken) {
  const url = 'https://api.spotify.com/v1/me';  
  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();
  localStorage.removeItem('userID');
  localStorage.setItem('userID', data.id);
  return data;
}


export { getAlbum, getPlaylists, getPlaylistTracks, getSearchResults, getCurrentPlaybackPosition, getUserSpotifyProfile };

