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

const accessToken = localStorage.getItem('access_token');
const url = 'https://api.spotify.com/v1/albums/2noRn2Aes5aoNVsU6iWThc';
const playlistUrl = 'https://api.spotify.com/v1/me/playlists?limit=50&offset=0'


function getAlbum() {
    return fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      .then(response => response.json())
      //.then(data => console.log(data))
      .catch(error => console.error(error));
}

async function getPlaylists() {
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
}

async function getPlaylistTracks(playlistId) {
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



export {getAlbum, getPlaylists, getPlaylistTracks};
