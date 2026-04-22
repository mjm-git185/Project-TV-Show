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
    const { id, name, image, summary, genres, status, runtime, rating } =
      showList[i];
    const { medium } = image;

    const perShow = document.createElement("div");
    perShow.className = "showInfo";
    perShow.id = id;

    rootElem.appendChild(perShow);
    const pic = new Image();
    pic.src = medium;
    perShow.appendChild(pic);
    pic.addEventListener("click", async () => {
      if (cache[id]) {
        state = { allEpisodes: cache[id], searchTerm: "" };
      } else {
        const response = await fetch(
          `https://api.tvmaze.com/shows/${id}/episodes`,
        );
        const data = await response.json();
        cache[id] = data;
        state = { allEpisodes: data, searchTerm: "" };
      }

      makePageForEpisodes(state.allEpisodes);
      createDropSelector(state.allEpisodes);
    });

    const title = document.createTextNode(name);

    const summaryOfShow = document.createElement("p");
    summaryOfShow.className = "summary";
    summaryOfShow.innerHTML = summary;
    perShow.appendChild(title);
    perShow.appendChild(summaryOfShow);

    const genreOfShow = document.createElement("p");
    genreOfShow.className = "genre";
    genreOfShow.innerHTML = `Genre: ${genres}`;
    perShow.appendChild(genreOfShow);

    const statusOfShow = document.createElement("p");
    statusOfShow.className = "status";
    statusOfShow.innerHTML = `Status: ${status}`;
    perShow.appendChild(statusOfShow);

    const runtimeOfShow = document.createElement("p");
    runtimeOfShow.className = "runtime";
    runtimeOfShow.innerHTML = `Runtime: ${runtime} minutes`;
    perShow.appendChild(runtimeOfShow);

    const ratingOfShow = document.createElement("p");
    ratingOfShow.className = "rating";
    ratingOfShow.innerHTML = `Rating: ${rating.average}`;
    perShow.appendChild(ratingOfShow);
  }

  return showList;
}

function makePageForShows(allShows) {
  rootElem.innerHTML = "";
  createShowCard(allShows);

  return allShows;
}

// // STEP 5: render - clear page, filter episodes, show the results
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

// create a drop down selector for all episodes
