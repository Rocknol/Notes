const emplacementSeries = document.getElementById("series");
const displayAjout = document.querySelector(".display-ajout");
const nombreSeries = document.getElementById("nombre-series");
const boutonAjouterSerie = document.querySelector(".bouton-ajouter-serie");
const boutonFiltre = document.querySelector(".bouton-filtre");
const resetFilter = document.querySelector(".reset-filter");
const displayFilter = document.querySelector(".display-filter");
let starRating = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let qteSeries = 0;


function restore() {
    let restoreSeries = document.querySelectorAll(".lien-serie-nodisplay")
    if (restoreSeries) {
        restoreSeries.forEach(element => element.setAttribute("class", "lien-serie"))
    }
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
            emplacementSeries.appendChild(caseSerie);

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
            genreSerie.innerText = data[i].genres.join(", ");
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

            const classementSerie = document.createElement("span");
            classementSerie.setAttribute("class", "classement");
            classementSerie.innerHTML = `#${i + 1}`;
            caseSerie.appendChild(classementSerie);

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

    })


boutonFiltre.addEventListener("click", () => {
    restore();
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
})


boutonAjouterSerie.addEventListener("click", () => {
    let myForm = document.getElementById("form-ajout-serie");
    formData = new FormData(myForm);

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