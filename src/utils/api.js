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

export {getAlbum};
