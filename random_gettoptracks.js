// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQAiZhViYgAt32_VZ_HRzhB_fWPQcnzvCiKIbmDuooXstcUeH2uJzstlB8aWT6QzjsGVz8wRAyEWcbX6Q7tS3aNLbAqOcvyJeN7LeuHXNAZeo5Lf7fEfAte0RfnnozFLwUgyjKJND_hOqkN0Izjurx3_7iVhgE-X-jBfzdyjDk7XTvfsdLP87eUEcs5Iq-FnP8TqF6G5oATQyILE50GfwEWkYLG0icMXfpL2o9enMZN3krRc-OhNMzn-Ok2XcWmAZDmYYxGiRd1ecttJB5FPJl3jF9SRG1xIbZJ_1cAk3Y3-yPE';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

async function getTopTracks(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(
    'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
  )).items;
}

const topTracks = await getTopTracks();
console.log(
  topTracks?.map(
    ({name, artists}) =>
      `${name} by ${artists.map(artist => artist.name).join(', ')}`
  )
);