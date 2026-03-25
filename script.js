//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  //getting acsess to the dom eement i need
  const rootElem = document.getElementById("root");

  // loop for extracting the data and placeing it on the page
  for (let i = 0; i < episodeList.length; i++) {
    const { id, name, season, number, summary, image } = episodeList[i];
    const { medium } = image;
    //apends a div and a srting inside it
    const perEpisode = document.createElement("div");
     rootElem.appendChild(perEpisode);
    const pic = new Image();
    pic.src = medium;
    rootElem.appendChild(pic);
    const infoAboutEpisode = document.createTextNode(
      `id:-${id} title:-${name} season:-${season} episode:-${number} ${summary} `,
    );
    rootElem.appendChild( infoAboutEpisode);
    
  }
}
window.onload = setup;
