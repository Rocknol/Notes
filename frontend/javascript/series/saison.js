const url = new URL(document.location);
const searchParams = url.searchParams;
let findId = searchParams.get("id");
const episodes = document.getElementById("episodes");
const boutonAjoutEpisode = document.querySelector(".bouton-ajouter-episode");
const displayAjout = document.querySelector(".display-ajout");
const retourSerie = document.querySelector(".retour-serie");
let starRating = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let sommeNotes = 0;
let qteEpisodes = 0;
let moyenne = 0;
let moyenneArrondie;
let moyenneArrondieDecimale;
let sommeNotesSaisons = 0;
let qteSaisons = 0;
let moyenneSerie = 0;
let moyenneArrondieSerie;
let moyenneArrondieDecimaleSerie;
let sommeEpisodes = 0;
let color1 = "#fc0303";
let color2 = "#fc3d03";
let color3 = "#fc7703";
let color4 = "#fcad03";
let color5 = "#fcd703";
let color6 = "#f8fc03";
let color7 = "#dffc03";
let color8 = "#c2fc03";
let color9 = "#9dfc03";
let color10 = "#4afc03";
const boutonFetch = document.querySelector(".bouton-fetch");
const APIDocId = "65f195f9101332610cab8fb6"
let TMDBId;
let numeroSaison = 0;
let numberNextEpisode = 0;
const nombreDeEpisodes = document.getElementById("nombre-episodes");

function calculNombre() {
    let calcul = document.querySelectorAll(".bloc-episode");
    qteEpisodes = calcul.length;

    nombreDeEpisodes.innerText = qteEpisodes + " épisodes(s)"
}

displayAjout.addEventListener("click", () => {
    let showForm = document.querySelector(".form-et-bouton-episode");
    showForm.setAttribute("class", "form-et-bouton-episode-show");
})




boutonFetch.addEventListener("click", () => {
    let idIMDBToFetch = document.getElementById("fetchIMDB").value;

    fetch(`http://localhost:3000/api/keys/${APIDocId}`)
        .then((response) => { return response.json() })
        .then((data) => {
            let TMDBAPI = data.TMDB;
            let IMDBAPI = data.IMDB;
            fetch(`https://api.themoviedb.org/3/tv/${TMDBId}/season/${numeroSaison}/episode/${numberNextEpisode}?api_key=${TMDBAPI}`)
                .then((response) => { return response.json() })
                .then((data) => {
                    console.log(numeroSaison);
                    console.log(data);

                    let numberEpisode = document.getElementById("numero");
                    numberEpisode.value = data.episode_number;

                    let nameEpisode = document.getElementById("titre");
                    nameEpisode.value = data.name;

                    let episodePlot = document.getElementById("plot");
                    episodePlot.value = data.overview;

                    let thumbnailEpisode = document.getElementById("thumbnail");
                    thumbnailEpisode.value = `https://image.tmdb.org/t/p/original/${data.still_path}`
                    let airDate = document.getElementById("airdate");
                    airDate.value = data.air_date;

                    let runtime = document.getElementById("runtime");
                    runtime.value = data.runtime;

                    let noteTMDB = document.getElementById("noteTMDB");
                    noteTMDB.value = Math.round(data.vote_average * 10) / 10;

                    let nombreVotesTMDB = document.getElementById("nombrevotesTMDB");
                    nombreVotesTMDB.value = data.vote_count;

                    fetch(`http://www.omdbapi.com/?apikey=${IMDBAPI}&i=${idIMDBToFetch}`)
                        .then((response) => { return response.json() })
                        .then((data) => {
                            console.log(data)

                            let director = document.getElementById("director");
                            director.value = data.Director;

                            let noteIMDB = document.getElementById("noteIMDB");
                            noteIMDB.value = data.imdbRating;

                            let nombreVotesIMDB = document.getElementById("nombrevotesIMDB");
                            nombreVotesIMDB.value = data.imdbVotes;
                        })
                })
        })
})


fetch(`http://localhost:3000/api/keys/${APIDocId}`)
    .then((response) => { return response.json() })
    .then((data) => {
        let TMDBAPI = data.TMDB;

        fetch(`http://localhost:3000/api/saisons/${findId}`)
            .then((response) => { return response.json() })
            .then((data) => {
                const serieId = data.serieId;
                const seasonId = data._id;
                const posterSaison = document.querySelector(".poster-saison");
                posterSaison.src = data.imageUrl;
                posterSaison.addEventListener("click", () => {
                    let seasonPosterChoices = document.getElementById("season-poster-choices");
                    seasonPosterChoices.style.display = "block";
                    let seasonPosterContainer = document.querySelector(".season-poster-container");
                    let closeButtonPosters = document.querySelector(".close-button-posters");

                    fetch(`http://api.themoviedb.org/3/tv/${TMDBId}/season/${numeroSaison}/images?api_key=${TMDBAPI}`)
                        .then((response) => { return response.json() })
                        .then((data) => {
                            console.log(data);
                            for (let i = 0; i < data.posters.length; i++) {
                                let poster = document.createElement("img");
                                poster.setAttribute("class", "poster");
                                poster.src = `https://image.tmdb.org/t/p/original/${data.posters[i].file_path}`
                                poster.addEventListener("click", () => {
                                    let newPosterPath = `https://image.tmdb.org/t/p/original/${data.posters[i].file_path}`;

                                    let posterChange = {
                                        method: 'PUT',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ newPosterPath })
                                    }

                                    fetch(`http://localhost:3000/api/saisons/majPoster/${seasonId}`, posterChange)
                                        .then(() => {
                                            location.reload();
                                        })
                                })
                                seasonPosterContainer.appendChild(poster);
                            }
                            closeButtonPosters.addEventListener("click", () => {
                                seasonPosterChoices.style.display = "none";
                                let postersToDelete = document.querySelectorAll(".poster");
                                postersToDelete.forEach(element => element.remove());
                            })
                        })
                })

                const titreSaison = document.querySelector(".titre-saison");
                titreSaison.innerText = data.title;

                const titreSerie = document.querySelector(".titre-serie");
                titreSerie.innerText = data.serieTitle;

                let ongletTitre = document.getElementById("onglet-titre");
                ongletTitre.innerText = data.serieTitle;

                retourSerie.innerHTML = `${data.serieTitle}`
                retourSerie.href = `./serie.html?id=${data.serieId}`;

                if (data.plot) {
                    const plotSeason = document.querySelector(".plot");
                    plotSeason.innerText = data.plot;
                }

                if (data.airDate) {
                    const airDate = document.querySelector(".air-date");
                    airDate.innerText = "Air date: " + data.airDate;
                }

                if (data.note) {
                    const noteSaison = document.querySelector(".note-saison");
                    for (let i = 0; i < starRating.length; i++) {
                        const star = document.createElement("span");
                        if (data.note >= starRating[i]) {
                            star.innerHTML = `<i class="fa-solid fa-star"></i>`
                        }
                        else {
                            star.innerHTML = `<i class="fa-regular fa-star"></i>`
                        }
                        noteSaison.appendChild(star)
                    }
                }

                if (data.TMDBId) {
                    TMDBId = data.TMDBId;
                }

                if (data.seasonNumber) {
                    numeroSaison = data.seasonNumber;
                }

                if (data.decimale) {
                    const noteDecimale = document.querySelector(".decimale-saison");
                    noteDecimale.innerText = data.decimale;
                }

                boutonAjoutEpisode.addEventListener("click", () => {
                    let note = document.getElementById("note");
                    if (!note.value) {
                        window.alert("Choisir une note")
                    }
                    else {
                        let myForm = document.getElementById("form-ajout-episode");
                        formData = new FormData(myForm);
                        formData.append('saisonId', `${findId}`)
                        formData.append('serieId', `${serieId}`)

                        let envoiEpisode = {
                            method: 'POST',
                            body: formData
                        }

                        fetch("http://localhost:3000/api/episodes", envoiEpisode)
                            .then(() => {
                                fetch(`http://localhost:3000/api/episodes/saisonId/${findId}`)
                                    .then((response) => { return response.json() })
                                    .then((data) => {
                                        for (let i = 0; i < data.length; i++) {
                                            sommeNotes += Number(data[i].note);
                                            qteEpisodes = data.length
                                        }

                                        moyenne = sommeNotes / qteEpisodes;
                                        moyenneArrondie = Math.round(moyenne);
                                        moyenneArrondieDecimale = Math.round(moyenne * 10) / 10;

                                        let majNoteSaison = {
                                            method: 'PUT',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ note: moyenneArrondie, decimale: moyenneArrondieDecimale })
                                        }

                                        fetch(`http://localhost:3000/api/saisons/majNote/${findId}`, majNoteSaison)
                                            .then(() => {
                                                fetch(`http://localhost:3000/api/saisons/serieId/${serieId}`)
                                                    .then((response) => { return response.json() })
                                                    .then((data) => {
                                                        console.log(data);
                                                        for (let i = 0; i < data.length; i++) {
                                                            sommeNotesSaisons += Number(data[i].decimale);
                                                            qteSaisons = data.length;
                                                        }

                                                        moyenneSerie = sommeNotesSaisons / qteSaisons;
                                                        console.log(moyenneSerie);
                                                        moyenneArrondieSerie = Math.round(moyenneSerie);
                                                        console.log(moyenneArrondieSerie);
                                                        moyenneArrondieDecimaleSerie = Math.round(moyenneSerie * 10) / 10;
                                                        console.log(moyenneArrondieDecimaleSerie);

                                                        let majNoteSerie = {
                                                            method: 'PUT',
                                                            headers: { 'Content-Type': 'application/json' },
                                                            body: JSON.stringify({ note: moyenneArrondieSerie, decimale: moyenneArrondieDecimaleSerie })
                                                        }
                                                        fetch(`http://localhost:3000/api/series/majNote/${serieId}`, majNoteSerie)
                                                            .then(() => {
                                                                location.reload();
                                                            })
                                                    })
                                            })
                                    })
                            })
                    }
                })
            })

        fetch(`http://localhost:3000/api/episodes/saisonId/${findId}`)
            .then((response) => { return response.json() })
            .then((data) => {
                console.log(data)
                for (let i = 0; i < data.length; i++) {
                    let episodeNumber = data[i].numero;
                    let episodeID = data[i]._id;
                    let serieId = data[i].serieId;

                    const blocEpisode = document.createElement("div");
                    blocEpisode.setAttribute("class", "bloc-episode");
                    episodes.appendChild(blocEpisode);

                    const imageEpisode = document.createElement("img");
                    imageEpisode.src = data[i].imageUrl;
                    imageEpisode.setAttribute("class", "thumbnail");
                    blocEpisode.appendChild(imageEpisode);
                    imageEpisode.addEventListener("click", () => {
                        let stillChoices = document.getElementById("still-choices");
                        stillChoices.style.display = "block";
                        let stillChoicesContainer = document.querySelector(".still-choices-container");
                        let closeButtonStills = document.querySelector(".close-button-stills");

                        fetch(`http://api.themoviedb.org/3/tv/${TMDBId}/season/${numeroSaison}/episode/${episodeNumber}/images?api_key=${TMDBAPI}`)
                            .then((response) => { return response.json() })
                            .then((data) => {
                                console.log(data);
                                for (let i = 0; i < data.stills.length; i++) {
                                    let still = document.createElement("img");
                                    still.setAttribute("class", "still");
                                    still.src = `https://image.tmdb.org/t/p/original/${data.stills[i].file_path}`
                                    still.addEventListener("click", () => {
                                        let newStillPath = `https://image.tmdb.org/t/p/original/${data.stills[i].file_path}`;

                                        let stillChange = {
                                            method: 'PUT',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ newStillPath })
                                        }
                                        console.log(stillChange);
                                        fetch(`http://localhost:3000/api/episodes/majStill/${episodeID}`, stillChange)
                                            .then(() => {
                                                location.reload();
                                            })
                                    })
                                    stillChoicesContainer.appendChild(still);
                                }
                                closeButtonStills.addEventListener("click", () => {
                                    let stillChoices = document.getElementById("still-choices");
                                    stillChoices.style.display = "none";
                                    let stillsToDelete = document.querySelectorAll(".still");
                                    stillsToDelete.forEach(element => element.remove());
                                })
                            })
                    })
                    const texteEpisode = document.createElement("div");
                    texteEpisode.setAttribute("class", "texte-episode");
                    blocEpisode.appendChild(texteEpisode);

                    const numeroEpisode = document.createElement("span");
                    numeroEpisode.innerText = "Episode " + data[i].numero;
                    texteEpisode.appendChild(numeroEpisode);

                    const titleEpisode = document.createElement("span");
                    titleEpisode.innerText = data[i].title;
                    titleEpisode.setAttribute("class", "title-episode");
                    texteEpisode.appendChild(titleEpisode);
                    texteEpisode.addEventListener("click", () => {
                        let infosEpisodes = document.querySelector(".infos-episodes");
                        infosEpisodes.setAttribute("class", "infos-episodes-active");
                        let closeButton = document.querySelector(".close-button-infos");
                        closeButton.addEventListener("click", () => {
                            infosEpisodes.setAttribute("class", "infos-episodes")
                        })
                        let plotEpisode = document.querySelector(".plot-episode");
                        plotEpisode.innerText = data[i].plot;

                        let airDate = document.querySelector(".air-date-episode");
                        airDate.innerText = "Air date: " + data[i].airDate;

                        let runtime = document.querySelector(".runtime");
                        runtime.innerText = "Runtime: " + data[i].runtime + " minutes";

                        let noteTMDB = document.querySelector(".noteTMDB");
                        noteTMDB.innerText = "Note TMDB: " + data[i].noteTMDB + `(${data[i].nombreVotesTMDB} votes)`;

                        let noteIMDB = document.querySelector(".noteIMDB");
                        noteIMDB.innerText = "Note IMDB: " + data[i].noteIMDB + `(${data[i].nombreVotesIMDB} votes)`;

                        let realisateur = document.querySelector(".realisateur");
                        realisateur.innerText = "Réalisateur: " + data[i].director;
                    })
                    const noteBasic = document.createElement("span");
                    noteBasic.setAttribute("class", "note-basic");
                    // if (data[i].note < 5) {
                    //     noteBasic.style.backgroundColor = color1;
                    // }
                    // else if (data[i].note >= 5 && data[i].note < 8) {
                    //     noteBasic.style.backgroundColor = color2
                    // }

                    // else if (data[i].note >= 8) {
                    //     noteBasic.style.backgroundColor = color3;
                    // }
                    console.log(eval("color" + data[i].note));
                    noteBasic.style.backgroundColor = eval("color" + data[i].note);
                    noteBasic.innerText = data[i].note;
                    blocEpisode.appendChild(noteBasic);

                    const noteEpisode = document.createElement("div");
                    noteEpisode.setAttribute("class", "star-container");
                    texteEpisode.appendChild(noteEpisode);

                    let note = data[i].note;
                    let episodeId = data[i]._id;

                    for (let i = 0; i < starRating.length; i++) {
                        const star = document.createElement("span");
                        if (note >= starRating[i]) {
                            star.innerHTML = `<i class="fa-solid fa-star"></i>`
                        }
                        else {
                            star.innerHTML = `<i class="fa-regular fa-star"></i>`
                        }
                        noteEpisode.appendChild(star)

                        star.addEventListener("click", () => {
                            if (note != starRating[i]) {
                                let majNote = {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ note: starRating[i] })
                                }
                                console.log(majNote);
                                fetch(`http://localhost:3000/api/episodes/majNote/${episodeId}`, majNote)
                                    .then(() => {

                                        fetch(`http://localhost:3000/api/episodes/saisonId/${findId}`)
                                            .then((response) => { return response.json() })
                                            .then((data) => {
                                                for (let i = 0; i < data.length; i++) {
                                                    sommeNotes += Number(data[i].note);
                                                    qteEpisodes = data.length
                                                }

                                                moyenne = sommeNotes / qteEpisodes;
                                                moyenneArrondie = Math.round(moyenne);
                                                moyenneArrondieDecimale = Math.round(moyenne * 10) / 10;

                                                let majNoteSaison = {
                                                    method: 'PUT',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({ note: moyenneArrondie, decimale: moyenneArrondieDecimale })
                                                }

                                                fetch(`http://localhost:3000/api/saisons/majNote/${findId}`, majNoteSaison)
                                                    .then(() => {
                                                        console.log(serieId);
                                                        fetch(`http://localhost:3000/api/saisons/serieId/${serieId}`)
                                                            .then((response) => { return response.json() })
                                                            .then((data) => {
                                                                console.log(data);
                                                                for (let i = 0; i < data.length; i++) {
                                                                    sommeNotesSaisons += Number(data[i].decimale);
                                                                    qteSaisons = data.length;
                                                                }

                                                                moyenneSerie = sommeNotesSaisons / qteSaisons;
                                                                console.log(moyenneSerie);
                                                                moyenneArrondieSerie = Math.round(moyenneSerie);
                                                                console.log(moyenneArrondieSerie);
                                                                moyenneArrondieDecimaleSerie = Math.round(moyenneSerie * 10) / 10;
                                                                console.log(moyenneArrondieDecimaleSerie);

                                                                let majNoteSerie = {
                                                                    method: 'PUT',
                                                                    headers: { 'Content-Type': 'application/json' },
                                                                    body: JSON.stringify({ note: moyenneArrondieSerie, decimale: moyenneArrondieDecimaleSerie })
                                                                }
                                                                fetch(`http://localhost:3000/api/series/majNote/${serieId}`, majNoteSerie)
                                                                    .then(() => {
                                                                        location.reload();
                                                                    })
                                                            })
                                                    })
                                            })
                                    })
                            }
                        })
                    }

                }
                calculNombre();
                numberNextEpisode = qteEpisodes + 1;
            })

    })




