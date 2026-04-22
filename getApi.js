let state = {};
let cache = {};
let allShows = [];
let allEpisodes = [];

async function getAllShows() {
  try {
    const response = await fetch("https://api.tvmaze.com/shows");
    const data = await response.json();

    for (const show of data) {
      allShows.push(show);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  allShows.sort((a, b) => {
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
  });
}

async function getAllEpisodes() {
  try {
    const response = await fetch("https://api.tvmaze.com/shows/82/episodes");

    const data = await response.json();

    for (const episode of data) {
      allEpisodes.push(episode);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
