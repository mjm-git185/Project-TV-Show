// STEP 2: when the page loads, show all episodes

async function setup() {
  rootElem.innerHTML = "";

  await getAllEpisodes();
  await getAllShows();
  state = { allEpisodes: allEpisodes, searchTerm: "" };
  makePageForShows(allShows);
  //makePageForEpisodes(state.allEpisodes);
  createDropSelector(state.allEpisodes);
  state["allShows"] = allShows;
  createShowDropSelector(state.allShows);
}
// STEP 3: getting acsess to the dom eement i need (to put the episode cards)
const rootElem = document.getElementById("root");

const back = document.getElementById("back");
back.addEventListener("click", () => {
  setup();
});

// STEP 4: create and append episode cards to the page
window.onload = setup;
