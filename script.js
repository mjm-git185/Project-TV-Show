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

// STEP 2: when the page loads, show all episodes
async function setup() {
  await getAllEpisodes();
  state = { allEpisodes: allEpisodes, searchTerm: "" };
  makePageForEpisodes(state.allEpisodes);
  createDropSelector(state.allEpisodes);
  await getAllShows();
  state["allShows"] = allShows;
  createShowDropSelector(state.allShows);
}
// STEP 3: getting acsess to the dom eement i need (to put the episode cards)
const rootElem = document.getElementById("root");

// STEP 4: create and append episode cards to the page
function createEpisodeCard(episodeList) {
  // loop for extracting the data and making any ajustments
  for (let i = 0; i < episodeList.length; i++) {
    const { id, name, season, number, summary, image } = episodeList[i];
    const { medium } = image;

    let codeSeason = season.toString().padStart(2, "0");
    let codeEpisode = number.toString().padStart(2, "0");

    //adds individual divs
    const perEpisode = document.createElement("div");
    perEpisode.className = "episodeInfo";
    perEpisode.id = id;

    //apends a div and a srting inside it
    rootElem.appendChild(perEpisode);
    const pic = new Image();
    pic.src = medium;
    perEpisode.appendChild(pic);
    const code = document.createTextNode(`S${codeSeason}E${codeEpisode}  `);

    const title = document.createTextNode(name);

    const summaryOfEpisode = document.createElement("p");
    summaryOfEpisode.className = "summary";
    summaryOfEpisode.innerHTML = summary;
    perEpisode.appendChild(code);
    perEpisode.appendChild(title);
    perEpisode.appendChild(summaryOfEpisode);
  }
}
function createShowCard(showList) {
  for (let i = 0; i < showList.length; i++) {
    const { id, name, summary, image } = showList[i];
    const { medium } = image;

    const perShow = document.createElement("div");
    perShow.className = "showInfo";
    perShow.id = id;

    rootElem.appendChild(perShow);
    const pic = new Image();
    pic.src = medium;
    perShow.appendChild(pic);
    const title = document.createTextNode(name);

    const summaryOfShow = document.createElement("p");
    summaryOfShow.className = "summary";
    summaryOfShow.innerHTML = summary;
    perShow.appendChild(title);
    perShow.appendChild(summaryOfShow);
  }
}
// STEP 5: render - clear page, filter episodes, show the results
function makePageForEpisodes(episodeList) {
  rootElem.innerHTML = ""; // clear previous results
  const filteredEpisodes = episodeList.filter((episode) => {
    return (
      episode.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      episode.summary.toLowerCase().includes(state.searchTerm.toLowerCase())
    );
  });
  const episodeCount = document.getElementById("episode-count");

  episodeCount.innerHTML = `Displaying episodes: ${filteredEpisodes.length} of ${state.allEpisodes.length}`;

  createEpisodeCard(filteredEpisodes);
  return filteredEpisodes;
}

const SearchBox = document.getElementById("search");
SearchBox.addEventListener("input", handleSearchInput);

function handleSearchInput(event) {
  const searchTerm = event.target.value; // event is automatically passed by the browser when user types; event.target is the input element, .value is the text inside it
  state.searchTerm = searchTerm; //save it to state
  makePageForEpisodes(state.allEpisodes); //re-render with new search term
}

window.onload = setup;

// create a drop down selector for all episodes
function createDropSelector(allEpisodes) {
  const episodeSelector = document.getElementById("episodeSelector");
  episodeSelector.innerHTML =
    '<option value="value1" selected>Select an episode</option>';
  episodeSelector.addEventListener("change", handleDropChange); //when user selects an episode, call handleDropChange which will find the anchor tag with the id and scroll to it
  for (const episode of allEpisodes) {
    const { id, name, season, number } = episode;
    const codeSeason = season.toString().padStart(2, "0");
    const codeEpisode = number.toString().padStart(2, "0");
    const option = document.createElement("option");
    option.value = id;
    option.textContent = `S${codeSeason}E${codeEpisode} ${name}`;
    episodeSelector.append(option);
  }
}
// STEP 11: when user selects an episode from the drop down, update the page to show only that episode
function handleDropChange(event) {
  const dropChange = event.target.value; //event.target is the select element, .value is the value of the selected option, which is the id of the episode
  location.hash = `#${dropChange}`; //location.hash is the part of the URL after the #, setting it to #id will scroll to the element with that id
}

// create a drop down selector for all shows
function createShowDropSelector(allShows) {
  const showSelector = document.getElementById("showSelector");
  showSelector.innerHTML =
    '<option value="value1" selected>Select a show</option>';
  showSelector.addEventListener("change", handleShowDropChange);
  for (const show of allShows) {
    const { id, name } = show;
    const option = document.createElement("option");
    option.value = id;
    option.textContent = name;
    showSelector.append(option);
  }
}

async function handleShowDropChange(event) {
  const showId = event.target.value;
  if (cache[showId]) {
    state = { allEpisodes: cache[showId], searchTerm: "" };
  } else {
    const response = await fetch(
      `https://api.tvmaze.com/shows/${showId}/episodes`,
    );
    const data = await response.json();
    cache[showId] ||= data;
    state = { allEpisodes: data, searchTerm: "" };
  }
  makePageForEpisodes(state.allEpisodes);
  createDropSelector(state.allEpisodes);
}
