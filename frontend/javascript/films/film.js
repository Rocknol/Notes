const url = new URL(document.location);
const searchParams = url.searchParams;
let findId = searchParams.get("id");
console.log(findId);
const boutonSupprimer = document.querySelector(".supprimer-film")
const anneeFilm = document.querySelector(".annee-film");
const genreFilm = document.querySelector(".genre-film");
const genres = ["Drama", "Aventure", "Romance", "Adulte", "Western", "Comedie", "Thriller", "Horreur", "Sci-Fi", "Fantasy", "Documentaire", "Animation"];
const plot = document.querySelector(".plot");
const addGenre = document.querySelector(".add-genre");
const genrePlus = document.querySelector(".genre-plus");
const filmsRelies = document.querySelector(".films-relies");
const displayFanart = document.querySelector(".display-fanart");
const boutonAjoutFanart = document.querySelector(".bouton-ajouter-fanart");
const boutonAjoutLogo = document.querySelector(".bouton-ajouter-logo");
const containerCarousel = document.querySelector(".container-carousel");
let counter = 0;
const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");
const fanartNumber = document.querySelector(".fanart-number");
const logoFilm = document.querySelector(".logo-film");

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

displayFanart.addEventListener("click", () => {
    let showFormFanart = document.querySelector(".form-bouton-fanart");
    showFormFanart.setAttribute("class", "form-bouton-fanart-show");
})

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

        plot.innerText = data.plot;

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

        boutonAjoutFanart.addEventListener("click", () => {
            let myForm = document.getElementById("form-ajout-fanart");
            formData = new FormData(myForm);

            let envoiFanart = {
                method: 'PUT',
                body: formData
            }

            fetch(`http://localhost:3000/api/films/fanart/${findId}`, envoiFanart)
                .then(() => {
                    location.reload();
                })
        })

        boutonAjoutLogo.addEventListener("click", () => {
            let myForm = document.getElementById("form-ajout-logo");
            formData = new FormData(myForm);

            let envoiLogo = {
                method: 'PUT',
                body: formData
            }

            fetch(`http://localhost:3000/api/films/logo/${findId}`, envoiLogo)
                .then(() => {
                    location.reload();
                })
        })

    })










