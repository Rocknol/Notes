const url = new URL(document.location);
const searchParams = url.searchParams;
let findId = searchParams.get("id");
console.log(findId);
const boutonSupprimer = document.querySelector(".supprimer-film")
const anneeFilm = document.querySelector(".annee-film");
const genreFilm = document.querySelector(".genre-film");
const awardsFilm = document.querySelector(".awards");
const noteTMDBFilm = document.querySelector(".note-tmdb");
const noteIMDBFilm = document.querySelector(".note-imdb");
const metascore = document.querySelector(".metascore");
const genres = ["Drama", "Aventure", "Romance", "Adulte", "Western", "Comedie", "Thriller", "Horreur", "Sci-Fi", "Fantasy", "Documentaire", "Animation"];
const plot = document.querySelector(".plot");
const addGenre = document.querySelector(".add-genre");
const genrePlus = document.querySelector(".genre-plus");
const filmsRelies = document.querySelector(".films-relies");
const containerCarousel = document.querySelector(".container-carousel");
let counter = 0;
const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");
const fanartNumber = document.querySelector(".fanart-number");
const logoFilm = document.querySelector(".logo-film");
const APIDocId = "65f195f9101332610cab8fb6"
const posterFilm = document.querySelector(".poster-film");
const fanartButton = document.querySelector(".fanart-button");
const logoButton = document.querySelector(".logo-button");
const actors = document.getElementById("actors");
const filmChoices = document.getElementById("film-choices");
const filmArea = document.querySelector(".film-area");
const filmNumber = document.querySelector(".film-number");
const closeButton = document.querySelector(".close-button");
let fanartImages = [];


function reset() {
    let resetFilms = document.querySelectorAll(".lien-film")
    resetFilms.forEach(element => element.remove())
}

function cleanUp() {
    let fanarts = document.querySelectorAll(".container-carousel-image");
    if (fanarts) {
        fanarts.forEach((element) => element.remove());
    }
}

let starRating = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let note;
let starPosition;
let sommeNotes = 0;
let qteFilms = 0;
let id;
let sagaId;
let moyenneSaga;
let moyenneArrondie;
let moyenneArrondieSaga;
let decimaleSaga;
let sommeNotesSaga = 0;
let qteFilmsSaga = 0;

let realisateurId;

fetch(`http://localhost:3000/api/films/${findId}`)
    .then((response) => { return response.json() })
    .then((data) => {
        const filmTitle = data.title;
        const sagaCheck = data.saga;
        console.log(sagaCheck);
        console.log(data);
        const posterFilm = document.querySelector(".poster-film");
        posterFilm.src = data.imageUrl;

        const titreFilm = document.querySelector(".titre-film");
        titreFilm.innerText = data.title;

        let ongletTitre = document.getElementById("onglet-titre");
        ongletTitre.innerText = data.title;

        const noteFilm = document.querySelector(".note-film");

        fanartImages = data.fanartUrl;


        if (data.logo) {
            logoFilm.src = data.logo
        }

        else {
            let logoFilmId = document.querySelector("#logo-film");
            logoFilmId.innerText = "Pas de logo!";
            logoFilmId.style.fontSize = "x-large";
        }

        if (data.fanartUrl.length > 0) {
            for (let i = 0; i < data.fanartUrl.length; i++) {
                if (i === counter) {
                    let containerCarouselImage = document.createElement("img");
                    containerCarouselImage.setAttribute("class", "container-carousel-image");
                    containerCarouselImage.src = data.fanartUrl[i];
                    containerCarousel.appendChild(containerCarouselImage);
                    fanartNumber.innerText = `${i + 1} / ${data.fanartUrl.length}`;
                }
            }
            if (data.fanartUrl.length > 1) {
                // arrowLeft.setAttribute("class", "arrow-left-display");
                // arrowRight.setAttribute("class", "arrow-right-display");
                fanartNumber.setAttribute("class", "fanart-number-display");
                setInterval(counterUpdate, 3000);

                function counterUpdate() {
                    if (counter === data.fanartUrl.length - 1) {
                        counter = 0
                    }
                    else {
                        counter = counter + 1;
                    }

                    for (let i = 0; i < data.fanartUrl.length; i++) {
                        if (i === counter) {
                            cleanUp();
                            let containerCarouselImage = document.createElement("img");
                            containerCarouselImage.setAttribute("class", "container-carousel-image");
                            containerCarouselImage.src = data.fanartUrl[i];
                            containerCarousel.appendChild(containerCarouselImage);
                            fanartNumber.innerText = `${i + 1} / ${data.fanartUrl.length}`;
                        }
                    }
                }

            }
        }

        else {
            containerCarousel.innerHTML = "Pas de fanart!";
            containerCarousel.style.fontSize = "x-large";
        }

        for (let i = 0; i < starRating.length; i++) {
            const star = document.createElement("span");
            if (data.note >= starRating[i]) {
                star.innerHTML = `<i class="fa-solid fa-star"></i>`
            }
            else {
                star.innerHTML = `<i class="fa-regular fa-star"></i>`
            }
            noteFilm.appendChild(star)

            star.addEventListener("click", () => {
                if (data.note != starRating[i]) {
                    let majNote = {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ note: starRating[i] })
                    }
                    console.log(majNote)
                    fetch(`http://localhost:3000/api/films/majNote/${findId}`, majNote)
                        .then(() => {

                            fetch(`http://localhost:3000/api/films/realisateurId/${data.realisateurId}`)
                                .then((response) => { return response.json() })
                                .then((data) => {
                                    console.log(data);
                                    for (let i = 0; i < data.length; i++) {
                                        sommeNotes += Number(data[i].note)
                                        id = data[i].realisateurId
                                    }
                                    qteFilms = data.length
                                    moyenne = sommeNotes / qteFilms;
                                    console.log(sommeNotes);
                                    console.log(qteFilms);
                                    console.log(id);
                                    moyenneArrondie = Math.round(moyenne);
                                    moyenneArrondieDecimale = Math.round(moyenne * 10) / 10;

                                    let majNoteReal = {
                                        method: 'PUT',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ note: moyenneArrondie, decimale: moyenneArrondieDecimale })
                                    }

                                    fetch(`http://localhost:3000/api/realisateurs/majNote/${id}`, majNoteReal)
                                        .then(() => {
                                            console.log(sagaId);
                                            if (sagaCheck) {

                                                fetch(`http://localhost:3000/api/films/saga/${sagaCheck}`)
                                                    .then((response) => { return response.json() })
                                                    .then((data) => {
                                                        qteFilmsSaga = data.length;
                                                        for (let i = 0; i < data.length; i++) {
                                                            sommeNotesSaga += Number(data[i].note)
                                                        }
                                                        moyenneSaga = sommeNotesSaga / qteFilmsSaga;
                                                        moyenneArrondieSaga = Math.round(moyenneSaga);
                                                        decimaleSaga = Math.round(moyenneSaga * 10) / 10;

                                                        let majNoteSaga = {
                                                            method: 'PUT',
                                                            headers: { 'Content-Type': 'application/json' },
                                                            body: JSON.stringify({ note: moyenneArrondieSaga, decimale: decimaleSaga })
                                                        }
                                                        fetch(`http://localhost:3000/api/sagas/majNote/${sagaCheck}`, majNoteSaga)
                                                            .then(() => {
                                                                location.reload()
                                                            }
                                                            )
                                                    })


                                            }
                                            else {
                                                location.reload();
                                            }
                                        })

                                })
                        }
                        )

                }
                else {
                    reset();
                    fetch(`http://localhost:3000/api/films/note/${data.note}`)
                        .then((response) => { return response.json() })
                        .then((data) => {
                            for (let i = 0; i < data.length; i++) {
                                if (data[i]._id != findId) {

                                    const caseFilm = document.createElement("a");
                                    caseFilm.href = `./film.html?id=${data[i]._id}`;
                                    caseFilm.setAttribute("class", "lien-film");
                                    filmsRelies.appendChild(caseFilm);

                                    const imageFilm = document.createElement("img");
                                    imageFilm.src = data[i].imageUrl;
                                    imageFilm.setAttribute("class", "image-film")
                                    caseFilm.appendChild(imageFilm);

                                    const texteFilm = document.createElement("div");
                                    texteFilm.innerText = "";
                                    texteFilm.setAttribute("class", "texte-film")
                                    caseFilm.appendChild(texteFilm)

                                    const titleFilm = document.createElement("span");
                                    titleFilm.innerText = data[i].title;
                                    titleFilm.setAttribute("class", "titre-film");
                                    texteFilm.appendChild(titleFilm);

                                    const additionalInfo = document.createElement("div");
                                    additionalInfo.setAttribute("class", "ad-info");
                                    texteFilm.appendChild(additionalInfo);

                                    const realisateurFilm = document.createElement("span");
                                    realisateurFilm.innerText = data[i].realisateur;
                                    additionalInfo.appendChild(realisateurFilm);

                                    const noteFilm = document.createElement("div");
                                    noteFilm.setAttribute("class", "star-container")
                                    additionalInfo.appendChild(noteFilm);
                                    note = data[i].note;
                                    for (let i = 0; i < starRating.length; i++) {
                                        const star = document.createElement("span");
                                        if (note >= starRating[i]) {
                                            star.innerHTML = `<i class="fa-solid fa-star"></i>`
                                        }
                                        else {
                                            star.innerHTML = `<i class="fa-regular fa-star"></i>`
                                        }
                                        noteFilm.appendChild(star)

                                    }

                                    const genreFilm = document.createElement("span");
                                    genreFilm.innerText = data[i].genres.join(", ");
                                    additionalInfo.appendChild(genreFilm);

                                    const anneeFilm = document.createElement("span");
                                    anneeFilm.innerText = data[i].annee;
                                    additionalInfo.appendChild(anneeFilm);
                                }
                            }
                        })
                }
            })
        }

        // for (let i = 0; i < data.genres.length; i++) {
        //     console.log(data.genres[i]);
        //     genreFilm.innerHTML += `<span class="genre-trigger">${data.genres[i]}</span>` + " ";
        // }

        genreFilm.innerHTML = data.genres;

        let genreTriggerAll = document.querySelectorAll(".genre-trigger");
        genreTriggerAll.forEach((element) => element.addEventListener("click", () => {
            reset();
            console.log(element.innerText);
            fetch(`http://localhost:3000/api/films/genre/${element.innerText}`)
                .then((response) => { return response.json() })
                .then((data) => {
                    console.log(data);
                    for (let i = 0; i < data.length; i++) {
                        if (data[i]._id != findId) {

                            const caseFilm = document.createElement("a");
                            caseFilm.href = `./film.html?id=${data[i]._id}`;
                            caseFilm.setAttribute("class", "lien-film");
                            filmsRelies.appendChild(caseFilm);

                            const imageFilm = document.createElement("img");
                            imageFilm.src = data[i].imageUrl;
                            imageFilm.setAttribute("class", "image-film")
                            caseFilm.appendChild(imageFilm);

                            const texteFilm = document.createElement("div");
                            texteFilm.innerText = "";
                            texteFilm.setAttribute("class", "texte-film")
                            caseFilm.appendChild(texteFilm)

                            const titleFilm = document.createElement("span");
                            titleFilm.innerText = data[i].title;
                            titleFilm.setAttribute("class", "titre-film");
                            texteFilm.appendChild(titleFilm);

                            const additionalInfo = document.createElement("div");
                            additionalInfo.setAttribute("class", "ad-info");
                            texteFilm.appendChild(additionalInfo);

                            const realisateurFilm = document.createElement("span");
                            realisateurFilm.innerText = data[i].realisateur;
                            additionalInfo.appendChild(realisateurFilm);

                            const noteFilm = document.createElement("div");
                            noteFilm.setAttribute("class", "star-container")
                            additionalInfo.appendChild(noteFilm);
                            note = data[i].note;
                            for (let i = 0; i < starRating.length; i++) {
                                const star = document.createElement("span");
                                if (note >= starRating[i]) {
                                    star.innerHTML = `<i class="fa-solid fa-star"></i>`
                                }
                                else {
                                    star.innerHTML = `<i class="fa-regular fa-star"></i>`
                                }
                                noteFilm.appendChild(star)

                            }

                            const genreFilm = document.createElement("span");
                            genreFilm.innerText = data[i].genres.join(", ");
                            additionalInfo.appendChild(genreFilm);

                            const anneeFilm = document.createElement("span");
                            anneeFilm.innerText = data[i].annee;
                            additionalInfo.appendChild(anneeFilm);
                        }
                    }
                }
                )
        }))

        anneeFilm.innerText = data.releaseDate;

        if (data.awards) {
            awardsFilm.innerText = data.awards;
        }

        if (data.noteTMDB) {
            noteTMDBFilm.innerText = "TMDB: " + data.noteTMDB + `(${data.nombreVotesTMDB} votes)`;
        }
        if (data.noteIMDB) {
            noteIMDBFilm.innerText = "IMDB: " + data.noteIMDB + `(${data.nombreVotesIMDB} votes)`;
        }
        if (data.metascore) {
            metascore.innerText = "Metascore: " + data.metascore;
        }

        plot.innerText = data.plot;

        let TMDBID = data.TMDBId;

        fetch(`http://localhost:3000/api/keys/${APIDocId}`)
            .then((response) => { return response.json() })
            .then((data) => {
                let TMDBAPI = data.TMDB;

                posterFilm.addEventListener("click", () => {
                    filmChoices.style.display = "block";

                    fetch(`https://api.themoviedb.org/3/movie/${TMDBID}/images?api_key=${TMDBAPI}`)
                        .then((response) => { return response.json() })
                        .then((data) => {
                            console.log(data);
                            filmNumber.innerText = data.posters.length + " poster(s)";
                            for (let i = 0; i < data.posters.length; i++) {
                                let poster = document.createElement("img");
                                poster.setAttribute("class", "poster");
                                poster.src = `https://image.tmdb.org/t/p/original/${data.posters[i].file_path}`;
                                poster.addEventListener("click", () => {
                                    let newPosterPath = `https://image.tmdb.org/t/p/original/${data.posters[i].file_path}`;

                                    let posterChange = {
                                        method: 'PUT',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ newPosterPath })
                                    }

                                    fetch(`http://localhost:3000/api/films/majPoster/${findId}`, posterChange)
                                        .then(() => {
                                            location.reload();
                                        })
                                })
                                filmArea.appendChild(poster);
                            }
                            closeButton.addEventListener("click", () => {
                                filmChoices.style.display = "none";
                                let postersToDelete = document.querySelectorAll(".poster");
                                postersToDelete.forEach((element) => element.remove());
                                filmNumber.innerText = "";
                            })
                        })
                })

                fanartButton.addEventListener("click", () => {
                    filmChoices.style.display = "block";

                    fetch(`http://api.themoviedb.org/3/movie/${TMDBID}/images?api_key=${TMDBAPI}`)
                        .then((response) => { return response.json() })
                        .then((data) => {
                            console.log(data);
                            filmNumber.innerText = data.backdrops.length + " backdrop(s)";
                            for (let i = 0; i < data.backdrops.length; i++) {
                                let fanartBox = document.createElement("div");
                                fanartBox.setAttribute("class", "fanart-box");
                                filmArea.appendChild(fanartBox);
                                let fanart = document.createElement("img");
                                fanart.src = `https://image.tmdb.org/t/p/original/${data.backdrops[i].file_path}`;
                                fanart.setAttribute("class", "fanart");
                                fanartBox.appendChild(fanart);
                                let findFanart = fanartImages.find((element) => element === `https://image.tmdb.org/t/p/original/${data.backdrops[i].file_path}`);
                                if (findFanart) {
                                    let presenceMarker = document.createElement("div");
                                    presenceMarker.setAttribute("class", "presence-marker");
                                    presenceMarker.innerHTML += `<i class="fa-solid fa-circle-check"></i>`
                                    fanartBox.appendChild(presenceMarker);
                                    fanart.addEventListener("click", () => {
                                        let fanartToRemove = `https://image.tmdb.org/t/p/original/${data.backdrops[i].file_path}`;
                                        let removeFanart = {
                                            method: 'PUT',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ fanartToRemove })
                                        }

                                        fetch(`http://localhost:3000/api/films/removeFanart/${findId}`, removeFanart)
                                            .then(() => {
                                                location.reload();
                                            })

                                    })
                                }
                                else {
                                    fanart.addEventListener("click", () => {
                                        let fanartToAdd = `https://image.tmdb.org/t/p/original/${data.backdrops[i].file_path}`;
                                        let addFanart = {
                                            method: 'PUT',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ fanartToAdd })
                                        }

                                        fetch(`http://localhost:3000/api/films/addFanart/${findId}`, addFanart)
                                            .then(() => {
                                                location.reload();
                                            })
                                    })
                                }
                                let resolution = document.createElement("div");
                                resolution.setAttribute("class", "resolution");
                                resolution.innerHTML = `${data.backdrops[i].height} / ${data.backdrops[i].width}`;
                                fanartBox.appendChild(resolution);
                            }
                            closeButton.addEventListener("click", () => {
                                filmChoices.style.display = "none";
                                let fanartsToDelete = document.querySelectorAll(".fanart-box");
                                fanartsToDelete.forEach((element) => element.remove());
                                filmNumber.innerText = "";
                            })
                        })
                })

                logoButton.addEventListener("click", () => {
                    filmChoices.style.display = "block";

                    fetch(`http://api.themoviedb.org/3/movie/${TMDBID}/images?api_key=${TMDBAPI}`)
                        .then((response) => { return response.json() })
                        .then((data) => {
                            console.log(data);
                            filmNumber.innerText = data.logos.length + " logo(s)"
                            for (let i = 0; i < data.logos.length; i++) {
                                if (data.logos[i].iso_639_1 === "en") {
                                    let logo = document.createElement("img");
                                    logo.src = `https://image.tmdb.org/t/p/original/${data.logos[i].file_path}`;
                                    logo.setAttribute("class", "logo");
                                    filmArea.appendChild(logo);
                                    logo.addEventListener("click", () => {
                                        let newLogoPath = `https://image.tmdb.org/t/p/original/${data.logos[i].file_path}`;
                                        let logoChange = {
                                            method: 'PUT',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ newLogoPath })
                                        }

                                        fetch(`http://localhost:3000/api/films/majLogo/${findId}`, logoChange)
                                            .then(() => {
                                                location.reload();
                                            })
                                    })
                                }
                            }
                            closeButton.addEventListener("click", () => {
                                filmChoices.style.display = "none";
                                let logosToDelete = document.querySelectorAll(".logo");
                                logosToDelete.forEach((element) => element.remove());
                                filmNumber.innerText = "";
                            })
                        })
                })

                fetch(`https://api.themoviedb.org/3/movie/${TMDBID}/credits?api_key=${TMDBAPI}`)
                    .then((response) => { return response.json() })
                    .then((data) => {
                        console.log(data);
                        for (let i = 0; i < data.cast.length; i++) {
                            let actorBloc = document.createElement("div");
                            actorBloc.setAttribute("class", "actor-bloc");
                            actors.appendChild(actorBloc);

                            let actorPhoto = document.createElement("img");
                            actorPhoto.src = `http://image.tmdb.org/t/p/original/${data.cast[i].profile_path}`;
                            actorBloc.appendChild(actorPhoto);
                            actorPhoto.addEventListener("click", () => {

                                filmChoices.style.display = "block";

                                fetch(`http://api.themoviedb.org/3/person/${data.cast[i].id}/images?api_key=${TMDBAPI}`)
                                    .then((response) => { return response.json() })
                                    .then((data) => {
                                        console.log(data);
                                        filmNumber.innerText = data.profiles.length + " photo(s)"
                                        for (let i = 0; i < data.profiles.length; i++) {
                                            let photo = document.createElement("img");
                                            photo.setAttribute("class", "photo");
                                            photo.src = `http://image.tmdb.org/t/p/original/${data.profiles[i].file_path}`
                                            filmArea.appendChild(photo);
                                        }
                                        closeButton.addEventListener("click", () => {
                                            filmChoices.style.display = "none";
                                            let photosToDelete = document.querySelectorAll(".photo");
                                            photosToDelete.forEach((element) => element.remove());
                                            filmNumber.innerText = "";
                                        })
                                    })
                            })
                            let actorCredit = document.createElement("span");
                            actorCredit.setAttribute("class", "actor-credit");
                            actorCredit.innerHTML = `${data.cast[i].name} as ${data.cast[i].character}`;
                            actorBloc.appendChild(actorCredit);
                        }
                    })
            })


        anneeFilm.addEventListener("click", () => {
            reset();
            fetch(`http://localhost:3000/api/films/annee/${data.annee}`)
                .then((response) => { return response.json() })
                .then((data) => {
                    console.log(data);
                    for (let i = 0; i < data.length; i++) {
                        if (data[i]._id != findId) {

                            const caseFilm = document.createElement("a");
                            caseFilm.href = `./film.html?id=${data[i]._id}`;
                            caseFilm.setAttribute("class", "lien-film");
                            filmsRelies.appendChild(caseFilm);

                            const imageFilm = document.createElement("img");
                            imageFilm.src = data[i].imageUrl;
                            imageFilm.setAttribute("class", "image-film")
                            caseFilm.appendChild(imageFilm);

                            const texteFilm = document.createElement("div");
                            texteFilm.innerText = "";
                            texteFilm.setAttribute("class", "texte-film")
                            caseFilm.appendChild(texteFilm)

                            const titleFilm = document.createElement("span");
                            titleFilm.innerText = data[i].title;
                            titleFilm.setAttribute("class", "titre-film");
                            texteFilm.appendChild(titleFilm);

                            const additionalInfo = document.createElement("div");
                            additionalInfo.setAttribute("class", "ad-info");
                            texteFilm.appendChild(additionalInfo);

                            const realisateurFilm = document.createElement("span");
                            realisateurFilm.innerText = data[i].realisateur;
                            additionalInfo.appendChild(realisateurFilm);

                            const noteFilm = document.createElement("div");
                            noteFilm.setAttribute("class", "star-container")
                            additionalInfo.appendChild(noteFilm);
                            note = data[i].note;
                            for (let i = 0; i < starRating.length; i++) {
                                const star = document.createElement("span");
                                if (note >= starRating[i]) {
                                    star.innerHTML = `<i class="fa-solid fa-star"></i>`
                                }
                                else {
                                    star.innerHTML = `<i class="fa-regular fa-star"></i>`
                                }
                                noteFilm.appendChild(star)

                            }

                            const genreFilm = document.createElement("span");
                            genreFilm.innerText = data[i].genres.join(", ");
                            additionalInfo.appendChild(genreFilm);

                            const anneeFilm = document.createElement("span");
                            anneeFilm.innerText = data[i].annee;
                            additionalInfo.appendChild(anneeFilm);
                        }
                    }
                }
                )
        })



        boutonSupprimer.addEventListener("click", () => {
            realisateurId = data.realisateurId;
            fetch(`http://localhost:3000/api/films/delete/${findId}`, { method: 'DELETE' })
                .then(() => {

                    fetch(`http://localhost:3000/api/films/realisateurId/${data.realisateurId}`)
                        .then((response) => { return response.json() })
                        .then((data) => {
                            if (data.length === 0) {
                                let unsetNote = {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ note: 0 })
                                }

                                fetch(`http://localhost:3000/api/realisateurs/unsetNote/${realisateurId}`, unsetNote)
                                    .then(() => {
                                        if (sagaCheck) {
                                            console.log(sagaCheck);
                                            fetch(`http://localhost:3000/api/films/saga/${sagaCheck}`)
                                                .then((response) => { return response.json() })
                                                .then((data) => {
                                                    if (data.length === 0) {
                                                        let unsetNote = {
                                                            method: 'PUT',
                                                            headers: { 'Content-Type': 'application/json' },
                                                            body: JSON.stringify({ note: 0 })
                                                        }

                                                        fetch(`http://localhost:3000/api/sagas/unsetNote/${sagaCheck}`, unsetNote)
                                                            .then(() => {
                                                                let deleteFilmFromSaga = {
                                                                    method: 'PUT',
                                                                    headers: { 'Content-Type': 'application/json' },
                                                                    body: JSON.stringify({ filmTitle: filmTitle })
                                                                }
                                                                fetch(`http://localhost:3000/api/sagas/majSagaDelete/${sagaCheck}`, deleteFilmFromSaga)
                                                                    .then(() => {
                                                                        window.location.href = "../../html/films/films.html"
                                                                    })
                                                            })
                                                    }
                                                    else {
                                                        qteFilmsSaga = data.length;
                                                        for (let i = 0; i < data.length; i++) {
                                                            sommeNotesSaga += Number(data[i].note)
                                                        }
                                                        moyenneSaga = sommeNotesSaga / qteFilmsSaga;
                                                        moyenneArrondieSaga = Math.round(moyenneSaga);
                                                        decimaleSaga = Math.round(moyenneSaga * 10) / 10;

                                                        let majNoteSaga = {
                                                            method: 'PUT',
                                                            headers: { 'Content-Type': 'application/json' },
                                                            body: JSON.stringify({ note: moyenneArrondieSaga, decimale: decimaleSaga })
                                                        }
                                                        fetch(`http://localhost:3000/api/sagas/majNote/${sagaCheck}`, majNoteSaga)
                                                            .then(() => {

                                                                let deleteFilmFromSaga = {
                                                                    method: 'PUT',
                                                                    headers: { 'Content-Type': 'application/json' },
                                                                    body: JSON.stringify({ filmTitle: filmTitle })
                                                                }
                                                                fetch(`http://localhost:3000/api/sagas/majSagaDelete/${sagaCheck}`, deleteFilmFromSaga)
                                                                    .then(() => {
                                                                        window.location.href = "../../html/films/films.html"
                                                                    })
                                                            }
                                                            )
                                                    }
                                                })


                                        }
                                    })
                            }
                            else {
                                console.log(data);
                                for (let i = 0; i < data.length; i++) {
                                    sommeNotes += Number(data[i].note)
                                    id = data[i].realisateurId
                                }
                                qteFilms = data.length
                                moyenne = sommeNotes / qteFilms;
                                console.log(sommeNotes);
                                console.log(qteFilms);
                                console.log(id);
                                moyenneArrondie = Math.round(moyenne);
                                moyenneArrondieDecimale = Math.round(moyenne * 10) / 10;

                                let majNote = {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ note: moyenneArrondie, decimale: moyenneArrondieDecimale })
                                }
                                console.log(majNote);

                                fetch(`http://localhost:3000/api/realisateurs/majNote/${id}`, majNote)
                                    .then(() => {

                                        if (sagaCheck) {
                                            console.log(sagaCheck);
                                            fetch(`http://localhost:3000/api/films/saga/${sagaCheck}`)
                                                .then((response) => { return response.json() })
                                                .then((data) => {
                                                    if (data.length === 0) {
                                                        let unsetNote = {
                                                            method: 'PUT',
                                                            headers: { 'Content-Type': 'application/json' },
                                                            body: JSON.stringify({ note: 0 })
                                                        }

                                                        fetch(`http://localhost:3000/api/sagas/unsetNote/${sagaCheck}`, unsetNote)
                                                            .then(() => {
                                                                let deleteFilmFromSaga = {
                                                                    method: 'PUT',
                                                                    headers: { 'Content-Type': 'application/json' },
                                                                    body: JSON.stringify({ filmTitle: filmTitle })
                                                                }
                                                                fetch(`http://localhost:3000/api/sagas/majSagaDelete/${sagaCheck}`, deleteFilmFromSaga)
                                                                    .then(() => {
                                                                        window.location.href = "../../html/films/films.html"
                                                                    })
                                                            })
                                                    }
                                                    else {
                                                        qteFilmsSaga = data.length;
                                                        for (let i = 0; i < data.length; i++) {
                                                            sommeNotesSaga += Number(data[i].note)
                                                        }
                                                        moyenneSaga = sommeNotesSaga / qteFilmsSaga;
                                                        moyenneArrondieSaga = Math.round(moyenneSaga);
                                                        decimaleSaga = Math.round(moyenneSaga * 10) / 10;

                                                        let majNoteSaga = {
                                                            method: 'PUT',
                                                            headers: { 'Content-Type': 'application/json' },
                                                            body: JSON.stringify({ note: moyenneArrondieSaga, decimale: decimaleSaga })
                                                        }
                                                        fetch(`http://localhost:3000/api/sagas/majNote/${sagaCheck}`, majNoteSaga)
                                                            .then(() => {

                                                                let deleteFilmFromSaga = {
                                                                    method: 'PUT',
                                                                    headers: { 'Content-Type': 'application/json' },
                                                                    body: JSON.stringify({ filmTitle: filmTitle })
                                                                }
                                                                fetch(`http://localhost:3000/api/sagas/majSagaDelete/${sagaCheck}`, deleteFilmFromSaga)
                                                                    .then(() => {
                                                                        window.location.href = "../../html/films/films.html"
                                                                    })
                                                            }
                                                            )
                                                    }
                                                })


                                        }
                                        else {
                                            window.location.href = "../../html/films/films.html"
                                        }
                                    })

                            }
                        })

                })
        })


        const realisateurFilm = document.querySelector(".realisateur-film");
        realisateurFilm.innerText = data.realisateur;

        fetch(`http://localhost:3000/api/realisateurs/name/${data.realisateur}`)
            .then((response) => { return response.json() })
            .then((data) => {
                console.log(data);
                realisateurFilm.href = `../realisateurs/realisateur.html?id=${data._id}`;

            })

        const collectionFilm = document.querySelector(".collection");

        if (sagaCheck) {
            fetch(`http://localhost:3000/api/sagas/title/${data.saga}`)
                .then((response) => { return response.json() })
                .then((data) => {
                    const collectionLien = document.createElement("a");
                    collectionLien.href = `../film-sagas/film-saga.html?id=${data._id}`;
                    collectionLien.innerHTML = `${data.title}`;
                    collectionLien.setAttribute("class", "collection-lien")
                    collectionFilm.appendChild(collectionLien);
                })

        }

        else {
            collectionFilm.setAttribute("class", "collection-not-found");
            collectionFilm.innerHTML = `<label for="collection-select">Ajouter à:</label>
                            <select name="collection" id="collection-select">
                            <option value=""></option>
                            </select>`;
            fetch('http://localhost:3000/api/sagas')
                .then((response) => { return response.json() })
                .then((data) => {
                    let collectionList = document.getElementById("collection-select");
                    for (let i = 0; i < data.length; i++) {
                        collectionList.innerHTML += `<option value="${data[i].title}">${data[i].title}</option>`
                    }
                    collectionList.addEventListener("change", () => {
                        let nomSaga = collectionList.value;
                        let envoiFilmToSaga = {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ filmTitle: filmTitle })
                        }
                        console.log(envoiFilmToSaga);

                        fetch(`http://localhost:3000/api/sagas/majSagaAdd/${nomSaga}`, envoiFilmToSaga)
                            .then(() => {
                                let sagaToFilm = {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ saga: nomSaga })
                                }

                                console.log(sagaToFilm);
                                console.log(findId);

                                fetch(`http://localhost:3000/api/films/majfilmsaga/${findId}`, sagaToFilm)
                                    .then(() => {
                                        fetch(`http://localhost:3000/api/films/saga/${nomSaga}`)
                                            .then((response) => { return response.json() })
                                            .then((data) => {
                                                qteFilmsSaga = data.length;
                                                for (let i = 0; i < data.length; i++) {
                                                    sommeNotesSaga += Number(data[i].note)
                                                }
                                                moyenneSaga = sommeNotesSaga / qteFilmsSaga;
                                                moyenneArrondieSaga = Math.round(moyenneSaga);
                                                decimaleSaga = Math.round(moyenneSaga * 10) / 10;
                                                let majNoteSaga = {
                                                    method: 'PUT',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({ note: moyenneArrondieSaga, decimale: decimaleSaga })
                                                }
                                                fetch(`http://localhost:3000/api/sagas/majNote/${nomSaga}`, majNoteSaga)
                                                    .then(() => {
                                                        location.reload()
                                                    }
                                                    )
                                            })
                                    })
                            })


                    })
                })

        }

        // addGenre.addEventListener("click", () => {
        //     let genreFilter = genres.filter(genre => !data.genres.includes(genre));
        //     console.log(genreFilter);
        //     let addGenreField = document.createElement("div");
        //     addGenreField.setAttribute("class", "add-genre-field");
        //     addGenreField.innerHTML = `<select name="genre-select" id="genre-select">
        //     <option value=""></option>
        //     </select>`
        //     genrePlus.appendChild(addGenreField);

        //     let addGenreFieldSelect = document.getElementById("genre-select");
        //     for (let i = 0; i < genreFilter.length; i++) {
        //         addGenreFieldSelect.innerHTML += `<option value="${genreFilter[i]}">${genreFilter[i]}</option>`
        //     }

        //     addGenreFieldSelect.addEventListener("input", () => {
        //         let newGenreValue = addGenreFieldSelect.value;

        //         let envoiNewGenre = {
        //             method: 'PUT',
        //             headers: { 'Content-Type': 'application/json' },
        //             body: JSON.stringify({ genre: newGenreValue })
        //         }

        //         fetch(`http://localhost:3000/api/films/${findId}`, envoiNewGenre)
        //             .then(() => {
        //                 location.reload();
        //             })
        //     })
        // })

    })










