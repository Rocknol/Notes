const url = new URL(document.location);
const searchParams = url.searchParams;
let findId = searchParams.get("id");
const filmsRealisateur = document.getElementById("films-realisateur");
const nombreFilms = document.getElementById("nombre-films");
const boutonAjoutFilm = document.querySelector(".bouton-ajouter-film");
const displayAjout = document.querySelector(".display-ajout");
const noteFilm = document.getElementById("noteFilm");
const value = document.getElementById("value");
let starRating = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let qteFilms = 0;
let sommeNotes = 0;
let moyenne = 0;
let moyenneArrondie;
let moyenneArrondieDecimale;
let idFilm;
let idReal;
let note;

function calculNombre() {
    qteFilms += 1;
    if (qteFilms === 1) {
        nombreFilms.innerHTML = `${qteFilms}` + " film";
    }

    else if (qteFilms > 1) {
        nombreFilms.innerHTML = `${qteFilms}` + " films";
    }
}

displayAjout.addEventListener("click", () => {
    let showForm = document.querySelector(".form-et-bouton-film");
    showForm.setAttribute("class", "form-et-bouton-film-show");
})

noteFilm.addEventListener("input", () => {
    value.textContent = noteFilm.value;
})

fetch(`http://localhost:3000/api/realisateurs/${findId}`)
    .then((response) => { return response.json() })
    .then((data) => {
        const photoRealisateur = document.querySelector(".photo-realisateur");
        photoRealisateur.src = data.imageUrl;

        const nomRealisateur = document.querySelector(".nom-realisateur");
        nomRealisateur.innerText = data.name;

        let ongletTitre = document.getElementById("onglet-titre");
        ongletTitre.innerText = data.name;

        const nationaliteRealisateur = document.querySelector(".nationalite-realisateur");
        nationaliteRealisateur.innerText = data.nationalite;

        const noteRealisateur = document.querySelector(".note-realisateur");
        if (data.note) {
            for (let i = 0; i < starRating.length; i++) {
                const star = document.createElement("span");
                if (data.note >= starRating[i]) {
                    star.innerHTML = `<i class="fa-solid fa-star"></i>`
                }
                else {
                    star.innerHTML = `<i class="fa-regular fa-star"></i>`
                }
                noteRealisateur.appendChild(star)
            }
        }
        const noteDecimale = document.querySelector(".note-decimale");
        if (data.decimale) {
            noteDecimale.innerHTML = data.decimale;
        }



        fetch(`http://localhost:3000/api/films/realisateur/${data.name}`)
            .then((response) => { return response.json() })
            .then((data) => {
                console.log(data);
                if (data.length >= 1) {

                    for (let i = 0; i < data.length; i++) {
                        calculNombre();
                        const blocFilm = document.createElement("a");
                        blocFilm.href = `../films/film.html?id=${data[i]._id}`;
                        blocFilm.setAttribute("class", "bloc-film");
                        filmsRealisateur.appendChild(blocFilm);

                        const imageFilm = document.createElement("img");
                        imageFilm.src = data[i].imageUrl;
                        imageFilm.setAttribute("class", "image-film")
                        blocFilm.appendChild(imageFilm);

                        const texteFilm = document.createElement("div");
                        texteFilm.innerText = "";
                        texteFilm.setAttribute("class", "texte-film")
                        blocFilm.appendChild(texteFilm)

                        const titleFilm = document.createElement("h3");
                        titleFilm.innerText = data[i].title;
                        texteFilm.appendChild(titleFilm);

                        const noteFilm = document.createElement("div");
                        noteFilm.setAttribute("class", "star-container");
                        texteFilm.appendChild(noteFilm);

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

                        const genreFilm = document.createElement("p");
                        genreFilm.innerText = data[i].genres;
                        texteFilm.appendChild(genreFilm);

                        const anneeFilm = document.createElement("p");
                        anneeFilm.innerText = data[i].annee;
                        texteFilm.appendChild(anneeFilm);

                    }
                }
                else {
                    nombreFilms.innerHTML = "0 film"
                }

            })

        boutonAjoutFilm.addEventListener("click", function () {

            let myForm = document.getElementById("form-ajout-film");
            formData = new FormData(myForm);
            formData.append('realisateurId', `${findId}`)
            formData.append('realisateur', `${data.name}`)
            console.log(formData)

            let envoiFilm = {
                method: "POST",
                body: formData,
            };

            console.log(envoiFilm);
            fetch(`http://localhost:3000/api/films`, envoiFilm)
                .then((data) => {
                    console.log(data);
                    const titreInput = document.querySelector("#titre");
                    let title = titreInput.value;
                    window.alert(`${title} a été ajouté.`)

                    fetch(`http://localhost:3000/api/films/realisateurId/${findId}`)
                        .then((response) => { return response.json() })
                        .then((data) => {
                            console.log(data);
                            for (let i = 0; i < data.length; i++) {
                                sommeNotes += Number(data[i].note)
                            }
                            qteFilms = data.length
                            moyenne = sommeNotes / qteFilms;
                            console.log(sommeNotes);
                            console.log(qteFilms);
                            moyenneArrondie = Math.round(moyenne);
                            moyenneArrondieDecimale = Math.round(moyenne * 10) / 10;

                            let majNote = {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ note: moyenneArrondie, decimale: moyenneArrondieDecimale, nombreFilms: qteFilms })
                            }

                            fetch(`http://localhost:3000/api/realisateurs/majNote/${findId}`, majNote)
                                .then((data) => {
                                    location.reload();
                                })

                        })

                });
        });
    })


