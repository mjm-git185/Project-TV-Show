// STEP 1: create state - store all episodes and current search term
const state = { allEpisodes: getAllEpisodes(), searchTerm: "" };


// STEP 2: when the page loads, show all episodes
function setup() {
  makePageForEpisodes(state.allEpisodes);
}

// STEP 3: getting acsess to the dom eement i need (to put the episode cards)
const rootElem = document.getElementById("root");


// STEP 4: create and append episode cards to the page
function createEpisodeCard(episodeList) {
  // loop for extracting the data and making any ajustments
  for (let i = 0; i < episodeList.length; i++) {
    const { name, season, number, summary, image } = episodeList[i];
    const { medium } = image;

    let codeSeason = season.toString().padStart(2, "0");
    let codeEpisode = number.toString().padStart(2, "0");

    //adds individual divs
    const perEpisode = document.createElement("div");
    perEpisode.className = "episodeInfo";

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


// STEP 5: render - clear page, filter episodes, show the results
function makePageForEpisodes(episodeList) { 
  rootElem.innerHTML = ""; // clear previous results
  const filteredEpisodes = episodeList.filter((episode) => {
    return (
      episode.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      episode.summary.toLowerCase().includes(state.searchTerm.toLowerCase())
    );
  });

  createEpisodeCard(filteredEpisodes);
}

// STEP 6: show all episodes for the first time before user does anything
makePageForEpisodes(state.allEpisodes);

// STEP 7: react if user type in search box
const SearchBox = document.getElementById("search");
SearchBox.addEventListener("input", handleSearchInput);


// STEP 8: when user types, save the search term and update the page (re-render)
function handleSearchInput(event) {
  const searchTerm = event.target.value; // event is automatically passed by the browser when user types; event.target is the input element, .value is the text inside it
  state.searchTerm = searchTerm; //save it to state
  makePageForEpisodes(state.allEpisodes); //re-render with new search term
}

// STEP 9: setup when page load
window.onload = setup;
