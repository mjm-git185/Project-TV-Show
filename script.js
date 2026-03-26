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
    const { id, name, season, number, summary, image } = episodeList[i];
    const { medium } = image;

    let codeSeason = 0;
    if (season < 9) {
      codeSeason = "0" + season;
    }

    let codeEpisode = 0;
    if (season < 9) codeEpisode = "0" + number;
    //adds individual divs
    const perEpisode = document.createElement("div");
    perEpisode.className = "episodeInfo";

    //apends a div and a srting inside it
    rootElem.appendChild(perEpisode);
    const pic = new Image();
    pic.src = medium;
    perEpisode.appendChild(pic);
    const code = document.createTextNode(
      `id:- S${codeSeason}E${codeEpisode}  `,
    );

    const title = document.createTextNode(
      `title:- ${name}  season:- ${codeSeason} episode:- ${codeEpisode}`,
    );
    const summaryOfEpisode = document.createElement("p");
    summaryOfEpisode.className = "summery";
    summaryOfEpisode.innerHTML = summary;
    perEpisode.appendChild(code);
    perEpisode.appendChild(title);
    perEpisode.appendChild(summaryOfEpisode);
  }
}
window.onload = setup;
