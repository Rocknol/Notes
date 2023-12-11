const url = new URL(document.location);
const searchParams = url.searchParams;
let findId = searchParams.get("id");
const filmsSaga = document.getElementById("films-saga");
const nombreFilms = document.getElementById("nombre-films");
let starRating = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

fetch(`http://localhost:3000/api/sagas/${findId}`)
    .then((response) => { return response.json() })
    .then((data) => {
        console.log(data.films);
        if (data.films.length <= 1) {
            nombreFilms.innerHTML = data.films.length + " film"
        }
        else {
            nombreFilms.innerHTML = data.films.length + " films"
        }
        const posterSaga = document.querySelector(".poster-saga");
        posterSaga.src = data.imageUrl;

        const titleSaga = document.querySelector(".nom-saga");
        titleSaga.innerText = data.title;

        let ongletTitre = document.getElementById("onglet-titre");
        ongletTitre.innerText = data.title;

        const noteSaga = document.querySelector(".note-saga");
        if (data.note) {
            for (let i = 0; i < starRating.length; i++) {
                const star = document.createElement("span");
                if (data.note >= starRating[i]) {
                    star.innerHTML = `<i class="fa-solid fa-star"></i>`
                }
                else {
                    star.innerHTML = `<i class="fa-regular fa-star"></i>`
                }
                noteSaga.appendChild(star)
            }
        }
        const noteDecimale = document.querySelector(".note-decimale");
        if (data.decimale) {
            noteDecimale.innerHTML = [data.decimale];
        }

        fetch(`http://localhost:3000/api/films/saga/${data.title}`)
            .then((response) => { return response.json() })
            .then((data) => {
                for (let i = 0; i < data.length; i++) {
                    const blocFilm = document.createElement("a");
                    blocFilm.href = `../films/film.html?id=${data[i]._id}`;
                    blocFilm.setAttribute("class", "bloc-film");
                    filmsSaga.appendChild(blocFilm);

                    const imageFilm = document.createElement("img");
                    imageFilm.src = data[i].imageUrl;
                    imageFilm.setAttribute("class", "image-film");
                    blocFilm.appendChild(imageFilm);

                    const texteFilm = document.createElement("div");
                    texteFilm.innerText = "";
                    texteFilm.setAttribute("class", "texte-film");
                    blocFilm.appendChild(texteFilm);

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
                    genreFilm.innerText = data[i].genre;
                    texteFilm.appendChild(genreFilm);

                    const anneeFilm = document.createElement("p");
                    anneeFilm.innerText = data[i].annee;
                    texteFilm.appendChild(anneeFilm);
                }
            })
    })