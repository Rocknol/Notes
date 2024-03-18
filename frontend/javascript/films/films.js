const emplacementFilms = document.getElementById("films");
const nombreFilms = document.getElementById("nombre-films");
const resetFilter = document.querySelector(".reset-filter");
const boutonFiltre = document.querySelector(".bouton-filtre");
const displayFilter = document.querySelector(".display-filter");
let qteFilms = 0;
let starRating = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let zonesNotes = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
let note;

function restore() {
    let restoreFilms = document.querySelectorAll(".case-film-nodisplay");
    if (restoreFilms) {
        restoreFilms.forEach(element => element.setAttribute("class", "case-film"));
    }
}

function restoreDivsNotes() {
    let restoreDivs = document.querySelectorAll(".division-note");
    restoreDivs.forEach((element) => element.style.display = "");
}

function calculNombre() {
    let calcul = document.querySelectorAll(".case-film");
    qteFilms = calcul.length;

    nombreFilms.innerHTML = `${qteFilms}` + " film(s)"
}


displayFilter.addEventListener("click", () => {
    let showFormFilter = document.querySelector(".filtre");
    showFormFilter.setAttribute("class", "filtre-show");
})

for (let i = 0; i < zonesNotes.length; i++) {
    let divisionNote = document.createElement("div");
    divisionNote.setAttribute("class", "division-note");
    let numeroNote = document.createElement("span");
    numeroNote.setAttribute("class", "numero-note");
    numeroNote.innerText = zonesNotes[i];
    divisionNote.appendChild(numeroNote);
    let zoneFilms = document.createElement("div");
    zoneFilms.setAttribute("class", `zoneFilm${zonesNotes[i]}`);
    zoneFilms.setAttribute("id", "zone-films")
    divisionNote.appendChild(zoneFilms);
    emplacementFilms.appendChild(divisionNote);
}


fetch("http://localhost:3000/api/films")
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        for (let i = 0; i < data.length; i++) {
            const caseFilm = document.createElement("a");
            caseFilm.href = `../films/film.html?id=${data[i]._id}`;
            caseFilm.setAttribute("class", "case-film");
            let scoreDuFilm = data[i].note;
            let rightSpot = document.querySelector(`.zoneFilm${scoreDuFilm}`);
            rightSpot.appendChild(caseFilm);

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
            realisateurFilm.setAttribute("class", "realisateur-film");
            additionalInfo.appendChild(realisateurFilm);

            const noteFilm = document.createElement("div");
            noteFilm.setAttribute("class", "star-container");
            additionalInfo.appendChild(noteFilm);
            let note = data[i].note;
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

            const scoreFilm = document.createElement("span");
            scoreFilm.innerText = data[i].note;
            scoreFilm.setAttribute("class", "score-film");
            caseFilm.appendChild(scoreFilm);

            const genreFilm = document.createElement("span");
            genreFilm.innerText = data[i].genres
            genreFilm.setAttribute("class", "genre-film");
            additionalInfo.appendChild(genreFilm);

            const releaseDateFilm = document.createElement("span");
            releaseDateFilm.innerText = data[i].releaseDate;
            releaseDateFilm.setAttribute("class", "annee-film")
            additionalInfo.appendChild(releaseDateFilm);

            const runtimeFilm = document.createElement("span");
            runtimeFilm.innerText = data[i].runtime + " min(s)";
            additionalInfo.appendChild(runtimeFilm);

        }

        calculNombre();

        let zonesFilm = document.querySelectorAll("#zone-films")
        console.log(zonesFilm)
        for (let i = 0; i < zonesFilm.length; i++) {
            if (zonesFilm[i].innerText === "") {
                zonesFilm[i].closest(".division-note").style.display = "none";
            }
        }
    })

boutonFiltre.addEventListener("click", () => {
    restore();
    restoreDivsNotes();
    let titreInput = document.querySelector("#film").value;
    let noteInput = document.querySelector("#note").value;
    let genreInput = document.querySelector("#genre").value;
    let realisateurInput = document.querySelector("#realisateur").value;
    let anneeInput = document.querySelector("#annee").value;

    let titres = document.querySelectorAll(".titre-film");
    let notes = document.querySelectorAll(".score-film");
    let genres = document.querySelectorAll(".genre-film");
    let realisateurs = document.querySelectorAll(".realisateur-film");
    let annees = document.querySelectorAll(".annee-film");

    if (anneeInput) {
        for (let i = 0; i < annees.length; i++) {
            if (annees[i].innerText.includes(anneeInput)) {
                console.log(annees[i])
            }
            else {
                annees[i].closest("a").setAttribute("class", "case-film-nodisplay");
            }
        }
    }

    if (titreInput) {
        for (let i = 0; i < titres.length; i++) {
            if (titres[i].innerText.toLowerCase().includes(titreInput.toLowerCase())) {
                console.log(titres[i]);
            }
            else {
                titres[i].closest("a").setAttribute("class", "case-film-nodisplay");
            }
        }
    }

    if (noteInput) {
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].innerText === noteInput) {
                console.log(notes[i])
            }
            else {
                notes[i].closest("a").setAttribute("class", "case-film-nodisplay");
            }
        }
    }

    if (genreInput) {
        for (let i = 0; i < genres.length; i++) {
            if (genres[i].innerText.includes(genreInput)) {
                console.log(genres[i]);
            }
            else {
                genres[i].closest("a").setAttribute("class", "case-film-nodisplay");
            }
        }
    }

    if (realisateurInput) {
        for (let i = 0; i < realisateurs.length; i++) {
            if (realisateurs[i].innerText.toLowerCase().includes(realisateurInput.toLowerCase())) {
                console.log(realisateurs[i]);
            }
            else {
                realisateurs[i].closest("a").setAttribute("class", "case-film-nodisplay");
            }
        }
    }
    calculNombre();

    let zonesFilm = document.querySelectorAll("#zone-films");
    console.log(zonesFilm)
    for (let i = 0; i < zonesFilm.length; i++) {
        if (zonesFilm[i].innerText === "") {
            zonesFilm[i].closest(".division-note").style.display = "none";
        }
    }
})



resetFilter.addEventListener("click", () => {
    location.reload();
})

