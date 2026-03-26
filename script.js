//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  //getting acsess to the dom eement i need
  const rootElem = document.getElementById("root");

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
    const code = document.createTextNode(
      `S${codeSeason}E${codeEpisode}  `,
    );

    const title = document.createTextNode(name);
    
    const summaryOfEpisode = document.createElement("p");
    summaryOfEpisode.className = "summary";
    summaryOfEpisode.innerHTML = summary;
    perEpisode.appendChild(code);
    perEpisode.appendChild(title);
    perEpisode.appendChild(summaryOfEpisode);
  }
}
window.onload = setup;
