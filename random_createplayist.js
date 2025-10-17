// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token =
  "BQAiZhViYgAt32_VZ_HRzhB_fWPQcnzvCiKIbmDuooXstcUeH2uJzstlB8aWT6QzjsGVz8wRAyEWcbX6Q7tS3aNLbAqOcvyJeN7LeuHXNAZeo5Lf7fEfAte0RfnnozFLwUgyjKJND_hOqkN0Izjurx3_7iVhgE-X-jBfzdyjDk7XTvfsdLP87eUEcs5Iq-FnP8TqF6G5oATQyILE50GfwEWkYLG0icMXfpL2o9enMZN3krRc-OhNMzn-Ok2XcWmAZDmYYxGiRd1ecttJB5FPJl3jF9SRG1xIbZJ_1cAk3Y3-yPE";
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: JSON.stringify(body),
  });
  return await res.json();
}

const tracksUri = [
  "spotify:track:1I37Zz2g3hk9eWxaNkj031",
  "spotify:track:1UFioChIbe13o1WLZ3UoeU",
  "spotify:track:21kRhY57kV1gFKC8aTU12U",
  "spotify:track:2Bk58jqK2qmreuVtQmSFM3",
  "spotify:track:2Rde0hd2WC1VP7USmMz52N",
];

async function createPlaylist(tracksUri) {
  const { id: user_id } = await fetchWebApi("v1/me", "GET");

  const playlist = await fetchWebApi(`v1/users/${user_id}/playlists`, "POST", {
    name: "My top tracks playlist",
    description: "Playlist created by the tutorial on developer.spotify.com",
    public: false,
  });

  await fetchWebApi(
    `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(",")}`,
    "POST"
  );

  return playlist;
}

const createdPlaylist = await createPlaylist(tracksUri);
console.log(createdPlaylist.name, createdPlaylist.id);
