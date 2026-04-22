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
window.onload = setup;
