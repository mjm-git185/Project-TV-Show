// sets up and initializes the page
async function setup() {
  rootElem.innerHTML = "";

  await getAllEpisodes();
  await getAllShows();
  state = { allEpisodes: allEpisodes, searchTerm: "" };
  makePageForShows(allShows);
  createDropSelector(state.allEpisodes);
  state["allShows"] = allShows;
  createShowDropSelector(state.allShows);
}
// STEP 3: getting acsess to the dom element
const rootElem = document.getElementById("root");

const back = document.getElementById("back");
back.addEventListener("click", () => {
  setup();
});
window.onload = setup;
