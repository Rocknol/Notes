const statsEmplacement = document.getElementById("stats");
let notes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

fetch('http://localhost:3000/api/series')
    .then((response) => { return response.json() })
    .then((data) => {
        for (let i = 0; i < data.length; i++) {

            let graphShow = document.createElement("div");
            graphShow.setAttribute("class", "graph-show");
            statsEmplacement.appendChild(graphShow);

            let titleShow = document.createElement("span");
            titleShow.innerText = data[i].title;
            titleShow.setAttribute("class", "title-show");
            graphShow.appendChild(titleShow);

            let imageShow = document.createElement("img");
            imageShow.src = data[i].imageUrl;
            imageShow.setAttribute("class", "image-show");
            graphShow.appendChild(imageShow);

            if (data[i].fanartUrl.length > 0) {
                let fanartShow1 = document.createElement("img");
                fanartShow1.src = data[i].fanartUrl[0];
                fanartShow1.setAttribute("class", "fanart-show1");
                graphShow.appendChild(fanartShow1);
            }
            if (data[i].fanartUrl.length > 1) {
                let fanartShow2 = document.createElement("img");
                fanartShow2.src = data[i].fanartUrl[1];
                fanartShow2.setAttribute("class", "fanart-show2");
                graphShow.appendChild(fanartShow2);
            }

            let graphContainer = document.createElement("div");
            graphContainer.setAttribute("class", "graph-container");
            graphShow.appendChild(graphContainer);

            fetch(`http://localhost:3000/api/episodes/serieId/${data[i]._id}`)
                .then((response) => { return response.json() })
                .then((data) => {
                    console.log(data)
                    for (let i = 0; i < notes.length; i++) {
                        let episodesByNote = data.filter(element => element.note === notes[i])
                        console.log(episodesByNote);
                        let graphBar = document.createElement("div");
                        graphBar.setAttribute("class", "graph-bar");
                        graphBar.style.height = `${episodesByNote.length * 3}px`;
                        graphContainer.appendChild(graphBar);

                        if (episodesByNote.length > 0) {
                            let graphBarNumberOfEp = document.createElement("span");
                            graphBarNumberOfEp.setAttribute("class", "graph-bar-number");
                            graphBarNumberOfEp.innerText = `${episodesByNote.length}`;
                            graphBar.appendChild(graphBarNumberOfEp);
                        }

                        let graphBarNote = document.createElement("span");
                        graphBarNote.setAttribute("class", "graph-bar-note");
                        graphBarNote.innerText = notes[i];
                        graphBar.appendChild(graphBarNote);
                    }
                })
        }
    })