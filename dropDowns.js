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
