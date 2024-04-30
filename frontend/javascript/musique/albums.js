const emplacementAlbums = document.getElementById("albums");
const nombreAlbums = document.getElementById("nombre-albums");
const resetFilter = document.querySelector(".reset-filter");
const boutonFiltre = document.querySelector(".bouton-filtre");
const displayFilter = document.querySelector(".display-filter");
const displayAjout = document.querySelector(".display-ajout");
const boutonAjout = document.querySelector(".bouton-ajout-album");
const noteRange = document.getElementById("albumNote");
const value = document.getElementById("value");
let qteAlbums = 0;
let starRating = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let zonesNotes = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
let note;

noteRange.addEventListener("change", () => {
    value.textContent = noteRange.value;
})

function restore() {
    let restoreAlbums = document.querySelectorAll(".case-album");
    restoreAlbums.forEach((element) => element.style.display = "");
}

function restoreDivsNotes() {
    let restoreDivs = document.querySelectorAll(".division-note");
    restoreDivs.forEach((element) => element.style.display = "");
}

function calculNombre() {
    let calcul = document.querySelectorAll(".case-album");
    qteAlbums = calcul.length;
    nombreAlbums.innerHTML = `${qteAlbums}` + " album(s)"
}

displayAjout.addEventListener("click", () => {
    let showFormAjout = document.querySelector(".form-ajout-album");
    showFormAjout.setAttribute("class", "form-ajout-album-show");
})

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
    let zoneAlbums = document.createElement("div");
    zoneAlbums.setAttribute("class", `zoneAlbum${zonesNotes[i]}`);
    zoneAlbums.setAttribute("id", "zone-albums")
    divisionNote.appendChild(zoneAlbums);
    emplacementAlbums.appendChild(divisionNote);
}


fetch("http://localhost:3000/api/albums")
    .then((response) => { return response.json() })
    .then((data) => {
        for (let i = 0; i < data.length; i++) {
            const caseAlbum = document.createElement("a");
            caseAlbum.href = `./album.html?id=${data[i]._id}`
            caseAlbum.setAttribute("class", "case-album");
            let scoreDeLalbum = data[i].note;
            let rightSpot = document.querySelector(`.zoneAlbum${scoreDeLalbum}`);
            rightSpot.appendChild(caseAlbum);

            const imageAlbum = document.createElement("img");
            imageAlbum.src = data[i].imageUrl;
            imageAlbum.setAttribute("class", "image-album");
            caseAlbum.appendChild(imageAlbum);

            const texteAlbum = document.createElement("div");
            texteAlbum.innerText = "";
            texteAlbum.setAttribute("class", "texte-album");
            caseAlbum.appendChild(texteAlbum);

            const titleAlbum = document.createElement("span");
            titleAlbum.innerText = data[i].title;
            titleAlbum.setAttribute("class", "titre-album");
            texteAlbum.appendChild(titleAlbum);

            const additionalInfo = document.createElement("div");
            additionalInfo.setAttribute("class", "ad-info");
            texteAlbum.appendChild(additionalInfo);

            if (data[i].artiste) {
                const artisteAlbum = document.createElement("span");
                artisteAlbum.innerText = data[i].artiste;
                artisteAlbum.setAttribute("class", "artiste-album");
                additionalInfo.appendChild(artisteAlbum);
            }

            const noteAlbum = document.createElement("div");
            noteAlbum.setAttribute("class", "star-container");
            additionalInfo.appendChild(noteAlbum);
            let note = data[i].note;
            for (let i = 0; i < starRating.length; i++) {
                const star = document.createElement("span");
                if (note >= starRating[i]) {
                    star.innerHTML = `<i class="fa-solid fa-star"></i>`
                }
                else {
                    star.innerHTML = `<i class="fa-regular fa-star"></i>`
                }
                noteAlbum.appendChild(star)
            }

            const scoreAlbum = document.createElement("span");
            scoreAlbum.innerText = data[i].note;
            scoreAlbum.setAttribute("class", "score-album");
            caseAlbum.appendChild(scoreAlbum);

            const genreAlbum = document.createElement("span");
            genreAlbum.innerText = data[i].genre;
            genreAlbum.setAttribute("class", "genre-album");
            additionalInfo.appendChild(genreAlbum);

            const anneeAlbum = document.createElement("span");
            anneeAlbum.innerText = data[i].annee;
            anneeAlbum.setAttribute("class", "annee-album");
            additionalInfo.appendChild(anneeAlbum);

            const formatAlbum = document.createElement("span");
            formatAlbum.innerText = data[i].format;
            formatAlbum.setAttribute("class", "format-album");
            caseAlbum.appendChild(formatAlbum);

            if (data[i].type) {
                const typeAlbum = document.createElement("span");
                typeAlbum.innerText = data[i].type;
                typeAlbum.setAttribute("class", "type-album");
                additionalInfo.appendChild(typeAlbum);
            }
        }
        calculNombre();

        let zonesAlbum = document.querySelectorAll("#zone-albums")
        for (let i = 0; i < zonesAlbum.length; i++) {
            if (zonesAlbum[i].innerText === "") {
                zonesAlbum[i].closest(".division-note").style.display = "none";
            }
        }
    })

boutonFiltre.addEventListener("click", () => {
    restore();
    restoreDivsNotes();

    let titreInput = document.getElementById("titrealbum").value;
    let artisteInput = document.getElementById("artiste").value;
    let noteInput = document.getElementById("note").value;
    let genreInput = document.getElementById("genre").value;
    let anneeInput = document.getElementById("annee").value;
    let typeInput = document.querySelector('input[name="type"]:checked').value;
    let formatInput = document.querySelector('input[name="format"]:checked').value;

    let titres = document.querySelectorAll(".titre-album");
    let artistes = document.querySelectorAll(".artiste-album");
    let notes = document.querySelectorAll(".score-album");
    let genres = document.querySelectorAll(".genre-album");
    let annees = document.querySelectorAll(".annee-album");
    let types = document.querySelectorAll(".type-album");
    let formats = document.querySelectorAll(".format-album");

    console.log(titres);

    if (titreInput) {
        for (let i = 0; i < titres.length; i++) {
            if (titres[i].innerText.toLowerCase().includes(titreInput.toLowerCase())) {
                console.log(titres[i])
            }
            else {
                titres[i].closest("a").style.display = "none";
            }
        }
    }

    if (artisteInput) {
        for (let i = 0; i < artistes.length; i++) {
            if (artistes[i].innerText.toLowerCase().includes(artisteInput.toLowerCase())) {
                console.log(artistes[i])
            }
            else {
                artistes[i].closest("a").style.display = "none";
            }
        }
    }

    if (noteInput) {
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].innerText === noteInput) {
                console.log(notes[i])
            }
            else {
                notes[i].closest("a").style.display = "none";
            }
        }
    }

    if (genreInput) {
        for (let i = 0; i < genres.length; i++) {
            if (genres[i].innerText.includes(genreInput)) {
                console.log(genres[i])
            }
            else {
                genres[i].closest("a").style.display = "none";
            }
        }
    }

    if (anneeInput) {
        for (let i = 0; i < annees.length; i++) {
            if (annees[i].innerText === anneeInput) {
                console.log(annees[i])
            }
            else {
                annees[i].closest("a").style.display = "none";
            }
        }
    }

    if (typeInput) {
        for (let i = 0; i < types.length; i++) {
            if (types[i].innerText === typeInput) {
                console.log(types[i])
            }
            else {
                types[i].closest("a").style.display = "none";
            }
        }
    }

    if (formatInput) {
        for (let i = 0; i < formats.length; i++) {
            if (formats[i].innerText === formatInput) {
                console.log(formats[i])
            }
            else {
                formats[i].closest("a").style.display = "none";
            }
        }
    }
    calculNombre();
    let zonesAlbum = document.querySelectorAll("#zone-albums")
    for (let i = 0; i < zonesAlbum.length; i++) {
        if (zonesAlbum[i].innerText === "") {
            zonesAlbum[i].closest(".division-note").style.display = "none";
        }
    }
})


resetFilter.addEventListener("click", () => {
    location.reload();
})

boutonAjout.addEventListener("click", () => {

    let myForm = document.getElementById("ajout-album");
    formData = new FormData(myForm);
    formData.append("format", "Soundtrack");

    let envoiAlbum = {
        method: 'POST',
        body: formData
    }

    fetch("http://localhost:3000/api/albums", envoiAlbum)
        .then((data) => {
            const titreInput = document.getElementById("titre");
            let title = titreInput.value;
            window.alert(`${title} a été ajouté`)
            location.reload();
        })
})