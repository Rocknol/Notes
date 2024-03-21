const emplacementSeries = document.getElementById("series");
const displayAjout = document.querySelector(".display-ajout");
const nombreSeries = document.getElementById("nombre-series");
const boutonAjouterSerie = document.querySelector(".bouton-ajouter-serie");
const boutonFiltre = document.querySelector(".bouton-filtre");
const resetFilter = document.querySelector(".reset-filter");
const displayFilter = document.querySelector(".display-filter");
const boutonFetch = document.querySelector(".bouton-fetch");
const filtreAjoutArt = document.querySelector(".filtre-et-ajout");
const APIDocId = "65f195f9101332610cab8fb6"
let starRating = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let qteSeries = 0;
let zonesNotes = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];


for (let i = 0; i < zonesNotes.length; i++) {
    let divisionNote = document.createElement("div");
    divisionNote.setAttribute("class", "division-note");
    let numeroNote = document.createElement("span");
    numeroNote.setAttribute("class", "numero-note");
    numeroNote.innerText = zonesNotes[i];
    divisionNote.appendChild(numeroNote);
    let zoneSeries = document.createElement("div");
    zoneSeries.setAttribute("class", `zoneSeries${zonesNotes[i]}`);
    zoneSeries.setAttribute("id", "zone-series");
    divisionNote.appendChild(zoneSeries);
    emplacementSeries.appendChild(divisionNote);
}


function restore() {
    let restoreSeries = document.querySelectorAll(".lien-serie-nodisplay")
    if (restoreSeries) {
        restoreSeries.forEach(element => element.setAttribute("class", "lien-serie"))
    }
}

function restoreDivsNotes() {
    let restoreDivs = document.querySelectorAll(".division-note");
    restoreDivs.forEach((element) => element.style.display = "");
}


function calculNombre() {
    let calcul = document.querySelectorAll(".lien-serie");
    qteSeries = calcul.length;

    nombreSeries.innerHTML = `${qteSeries}` + " série(s)"
}

displayAjout.addEventListener("click", () => {
    let showFormAdd = document.querySelector(".form-et-bouton-serie");
    showFormAdd.setAttribute("class", "form-et-bouton-serie-show");
})

displayFilter.addEventListener("click", () => {
    let showFormFilter = document.querySelector(".form-filter");
    showFormFilter.setAttribute("class", "form-filter-show");
})

fetch("http://localhost:3000/api/series")
    .then((response) => { return response.json() })
    .then((data) => {

        for (let i = 0; i < data.length; i++) {
            const caseSerie = document.createElement("a");
            caseSerie.href = `./serie.html?id=${data[i]._id}`;
            caseSerie.setAttribute("class", "lien-serie");
            if (data[i].note) {
                let scoreDeLaSerie = data[i].note;
                let rightSpot = document.querySelector(`.zoneSeries${scoreDeLaSerie}`)
                rightSpot.appendChild(caseSerie);
            }
            else {
                emplacementSeries.appendChild(caseSerie);
            }

            const imageSerie = document.createElement("img");
            imageSerie.src = data[i].imageUrl;
            imageSerie.setAttribute("class", "image-serie");
            caseSerie.appendChild(imageSerie);

            const texteSerie = document.createElement("div");
            texteSerie.innerText = "";
            texteSerie.setAttribute("class", "texte-serie");
            caseSerie.appendChild(texteSerie);

            const titreSerie = document.createElement("span");
            titreSerie.innerText = data[i].title;
            titreSerie.setAttribute("class", "titre-serie");
            texteSerie.appendChild(titreSerie);

            const additionalInfo = document.createElement("div");
            additionalInfo.setAttribute("class", "ad-info");
            texteSerie.appendChild(additionalInfo);

            const genreSerie = document.createElement("span");
            genreSerie.innerText = data[i].genres
            genreSerie.setAttribute("class", "genre-serie");
            additionalInfo.appendChild(genreSerie);

            if (data[i].note) {
                const noteSerie = document.createElement("div");
                noteSerie.setAttribute("class", "star-container");
                additionalInfo.appendChild(noteSerie);
                note = data[i].note;
                for (let i = 0; i < starRating.length; i++) {
                    const star = document.createElement("span");
                    if (note >= starRating[i]) {
                        star.innerHTML = `<i class="fa-solid fa-star"></i>`
                    }
                    else {
                        star.innerHTML = `<i class="fa-regular fa-star"></i>`
                    }
                    noteSerie.appendChild(star)
                }
            }

            if (data[i].decimale) {
                const noteDecimale = document.createElement("span");
                noteDecimale.setAttribute("class", "decimale");
                noteDecimale.innerHTML = data[i].decimale;
                caseSerie.appendChild(noteDecimale);
            }

            if (data[i].noteTMDB) {
                const TMDBRatings = document.createElement("span");
                TMDBRatings.setAttribute("class", "tmdbratings");
                TMDBRatings.innerText = "TMDB: " + data[i].noteTMDB + `(${data[i].nombreVotesTMDB} votes)`;
                additionalInfo.appendChild(TMDBRatings);
            }

            if (data[i].noteIMDB) {
                const IMDBRatings = document.createElement("span");
                IMDBRatings.setAttribute("class", "imdbratings");
                IMDBRatings.innerText = "IMDB: " + data[i].noteIMDB + `(${data[i].nombreVotesIMDB} votes)`
                additionalInfo.appendChild(IMDBRatings);
            }

            // const classementSerie = document.createElement("span");
            // classementSerie.setAttribute("class", "classement");
            // classementSerie.innerHTML = `#${i + 1}`;
            // caseSerie.appendChild(classementSerie);

            if (data[i].status) {
                const statutDeLaSerie = document.createElement("span");
                statutDeLaSerie.setAttribute("class", "statutdelaserie");
                statutDeLaSerie.innerText = data[i].status;
                caseSerie.appendChild(statutDeLaSerie);
            }

            if (data[i].note) {
                const noteSerieText = document.createElement("span");
                noteSerieText.setAttribute("class", "note-serie-text");
                noteSerieText.innerHTML = data[i].note;
                additionalInfo.appendChild(noteSerieText);
            }

            if (data[i].nombreSaisons) {
                const nombreSaisons = document.createElement("span");
                nombreSaisons.innerHTML = `${data[i].nombreSaisons}` + " saison(s)";
                additionalInfo.appendChild(nombreSaisons);
            }

            if (data[i].nombreEpisodes) {
                const nombreEpisodes = document.createElement("span");
                nombreEpisodes.innerHTML = `${data[i].nombreEpisodes}` + " épisode(s)";
                additionalInfo.appendChild(nombreEpisodes);
            }
        }
        calculNombre();

        let zonesSeries = document.querySelectorAll("#zone-series");
        for (let i = 0; i < zonesSeries.length; i++) {
            if (zonesSeries[i].innerText === "") {
                zonesSeries[i].closest(".division-note").style.display = "none";
            }
        }

    })


boutonFiltre.addEventListener("click", () => {
    restore();
    restoreDivsNotes();
    let titreInput = document.getElementById("titre").value;
    let noteInput = document.getElementById("note").value;
    let genreInput = document.getElementById("genre").value;

    let titres = document.querySelectorAll(".titre-serie");
    let notes = document.querySelectorAll(".note-serie-text");
    let genres = document.querySelectorAll(".genre-serie");

    if (titreInput) {
        for (let i = 0; i < titres.length; i++) {
            if (titres[i].innerText.toLowerCase().includes(titreInput.toLowerCase())) {
                console.log(titres[i]);
            }
            else {
                titres[i].closest("a").setAttribute("class", "lien-serie-nodisplay");
            }
        }
    }

    if (noteInput) {
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].innerHTML === noteInput) {
                console.log(notes[i]);
            }
            else {
                notes[i].closest("a").setAttribute("class", "lien-serie-nodisplay");
            }
        }
    }

    if (genreInput) {
        for (let i = 0; i < genres.length; i++) {
            if (genres[i].innerText.includes(genreInput)) {
                console.log(genres[i]);
            }
            else {
                genres[i].closest("a").setAttribute("class", "lien-serie-nodisplay");
            }
        }
    }
    calculNombre();

    let zonesSeries = document.querySelectorAll("#zone-series");
    for (let i = 0; i < zonesSeries.length; i++) {
        if (zonesSeries[i].innerText === "") {
            zonesSeries[i].closest(".division-note").style.display = "none";
        }
    }
})


boutonAjouterSerie.addEventListener("click", () => {
    let myForm = document.getElementById("form-ajout-serie");
    let idTMDBToFetch = document.getElementById("fetchTMDB").value;
    formData = new FormData(myForm);
    formData.append('tmdbid', `${idTMDBToFetch}`);


    let envoiSerie = {
        method: 'POST',
        body: formData,
    }

    fetch("http://localhost:3000/api/series", envoiSerie)
    const titreInput = document.getElementById("titreAjout");
    let titre = titreInput.value;
    window.alert(`${titre} a été ajouté`);
    location.reload();
})

resetFilter.addEventListener("click", () => {
    location.reload();
})

fetch('http://localhost:3000/api/episodes')
    .then((response) => { return response.json() })
    .then((data) => {
        let latestEpisode1 = data.at(-1)
        let latestEpisode2 = data.at(-2)
        let latestEpisode3 = data.at(-3)

        let latestEpisodes = []
        latestEpisodes.push(latestEpisode1, latestEpisode2, latestEpisode3)
        console.log(latestEpisodes);

        let latestEpisodesContainer = document.getElementById("latest-episodes");
        for (let i = 0; i < latestEpisodes.length; i++) {
            let latestEpisode = document.createElement("a");
            latestEpisode.setAttribute("class", "latest-episode");
            latestEpisode.href = `./saison.html?id=${latestEpisodes[i].saisonId}`
            latestEpisodesContainer.appendChild(latestEpisode);

            let latestEpImage = document.createElement("img");
            latestEpImage.src = latestEpisodes[i].imageUrl;
            latestEpisode.appendChild(latestEpImage);

            let latestEpNote = document.createElement("span");
            latestEpNote.innerText = latestEpisodes[i].note;
            latestEpNote.setAttribute("class", "latest-ep-note");
            latestEpisode.appendChild(latestEpNote);

            let latestInfoContainer = document.createElement("div");
            latestInfoContainer.setAttribute("class", "latest-container");
            latestEpisode.appendChild(latestInfoContainer);

            let numeroEpisode = latestEpisodes[i].numero;
            let titleEpisode = latestEpisodes[i].title;

            fetch(`http://localhost:3000/api/saisons/${latestEpisodes[i].saisonId}`)
                .then((response) => { return response.json() })
                .then((data) => {
                    console.log(data)

                    let latestEpShowTitle = document.createElement("span");
                    latestEpShowTitle.innerText = data.serieTitle;
                    latestEpShowTitle.setAttribute("class", "latest-episode-serie-title");
                    latestEpisode.appendChild(latestEpShowTitle);

                    let latestEpSeasonNumber = document.createElement("span");
                    latestEpSeasonNumber.innerText = "S" + data.seasonNumber + " E" + numeroEpisode;
                    latestEpSeasonNumber.setAttribute("class", "latest-ep-season-title");
                    latestInfoContainer.appendChild(latestEpSeasonNumber)

                    let latestEpTitle = document.createElement("span");
                    latestEpTitle.innerText = titleEpisode;
                    latestEpTitle.setAttribute("class", "latest-episode-title");
                    latestInfoContainer.appendChild(latestEpTitle);
                })

        }
    })

boutonFetch.addEventListener("click", () => {
    let idTMDBToFetch = document.getElementById("fetchTMDB").value;
    let idIMDBToFetch = document.getElementById("fetchIMDB").value;

    fetch(`http://localhost:3000/api/keys/${APIDocId}`)
        .then((response) => { return response.json() })
        .then((data) => {
            let TMDBID = data.TMDB;
            let IMDBID = data.IMDB;
            fetch(`https://api.themoviedb.org/3/tv/${idTMDBToFetch}?api_key=${TMDBID}`)
                .then((response) => { return response.json() })
                .then((data) => {
                    console.log(data)
                    let titreSerieTV = document.getElementById("titreAjout");
                    titreSerieTV.value = data.name;

                    let genresSerie = document.getElementById("genreAjout");
                    let genresRegroup = [];
                    for (let i = 0; i < data.genres.length; i++) {
                        genresRegroup.push(data.genres[i].name)
                    }
                    genresSerie.value = genresRegroup.join(", ")

                    let posterSerie = document.getElementById("poster");
                    posterSerie.value = `https://image.tmdb.org/t/p/original/${data.poster_path}`
                    let fanartSerie = document.getElementById("fanart");
                    fanartSerie.value = `https://image.tmdb.org/t/p/original/${data.backdrop_path}`
                    let posterArt = document.querySelector(".poster")
                    posterArt.src = `https://image.tmdb.org/t/p/original/${data.poster_path}`;

                    let fanArt = document.querySelector(".fanart");
                    fanArt.src = `https://image.tmdb.org/t/p/original/${data.backdrop_path}`;

                    let plotSerie = document.getElementById("plot");
                    plotSerie.value = data.overview;

                    let firstAirDate = document.getElementById("first-air-date");
                    firstAirDate.value = data.first_air_date

                    let lastAirDate = document.getElementById("last-air-date");
                    lastAirDate.value = data.last_air_date;

                    let statusSerie = document.getElementById("status");
                    statusSerie.value = data.status;

                    let noteTMDB = document.getElementById("noteTMDB");
                    noteTMDB.value = Math.round(data.vote_average * 10) / 10;

                    let nombreVotesTMDB = document.getElementById("nombrevotesTMDB");
                    nombreVotesTMDB.value = data.vote_count;

                    fetch(`http://www.omdbapi.com/?apikey=${IMDBID}&i=${idIMDBToFetch}`)
                        .then((response) => { return response.json() })
                        .then((data) => {
                            console.log(data)

                            let awards = document.getElementById("awards");
                            awards.value = data.Awards

                            let noteIMDB = document.getElementById("noteIMDB");
                            noteIMDB.value = data.imdbRating;

                            let nombreVotesIMDB = document.getElementById("nombrevotesIMDB");
                            nombreVotesIMDB.value = data.imdbVotes;
                        })
                })
        })
})
