const url = new URL(document.location);
const searchParams = url.searchParams;
let findId = searchParams.get("id");
const saisons = document.getElementById("saisons");
const boutonAjoutSaison = document.querySelector(".bouton-ajouter-saison");
const boutonAjoutFanart = document.querySelector(".bouton-ajouter-fanart");
const displayAjout = document.querySelector(".display-ajout");
const displayFanart = document.querySelector(".display-fanart");
let starRating = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const genres = ["Drama", "Aventure", "Romance", "Adulte", "Western", "Comedie", "Thriller", "Horreur", "Sci-Fi", "Fantasy", "Documentaire", "Animation"];
const addGenre = document.querySelector(".add-genre");
const genrePlus = document.querySelector(".genre-plus");
const nombreSaisonsHeader = document.getElementById("nombre-saisons-header");
const containerCarousel = document.querySelector(".container-carousel");
// const containerCarouselImage = document.querySelector(".container-carousel-image");
let counter = 0;
const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");
const fanartNumber = document.querySelector(".fanart-number");
const boutonAjoutLogo = document.querySelector(".bouton-ajouter-logo");
const logoSerie = document.querySelector(".logo-serie");

displayAjout.addEventListener("click", () => {
    let showForm = document.querySelector(".form-et-bouton-saison");
    showForm.setAttribute("class", "form-et-bouton-saison-show");
})

displayFanart.addEventListener("click", () => {
    let showFormFanart = document.querySelector(".form-bouton-fanart");
    showFormFanart.setAttribute("class", "form-bouton-fanart-show");
})

function cleanUp() {
    let fanarts = document.querySelectorAll(".container-carousel-image");
    if (fanarts) {
        fanarts.forEach((element) => element.remove());
    }
}

fetch(`http://localhost:3000/api/series/${findId}`)
    .then((response) => { return response.json() })
    .then((data) => {
        const posterSerie = document.querySelector(".poster-serie");
        posterSerie.src = data.imageUrl;

        const titreSerie = document.querySelector(".titre-serie");
        titreSerie.innerText = data.title;

        let ongletTitre = document.getElementById("onglet-titre");
        ongletTitre.innerText = data.title;


        const genreSerie = document.querySelector(".genre-serie");
        genreSerie.innerText = data.genres.join(", ");

        if (data.nombreSaisons) {
            const nombreSaisons = document.querySelector(".nombre-saisons");
            nombreSaisons.innerHTML = `${data.nombreSaisons}` + " saison(s)";
            nombreSaisonsHeader.innerHTML = `${data.nombreSaisons}` + " saison(s)";
        }

        if (data.note) {
            const noteSerie = document.querySelector(".note-serie");
            for (let i = 0; i < starRating.length; i++) {
                const star = document.createElement("span");
                if (data.note >= starRating[i]) {
                    star.innerHTML = `<i class="fa-solid fa-star"></i>`
                }
                else {
                    star.innerHTML = `<i class="fa-regular fa-star"></i>`
                }
                noteSerie.appendChild(star)
            }
        }

        if (data.decimale) {
            const decimaleSerie = document.querySelector(".decimale-serie");
            decimaleSerie.innerHTML = data.decimale;
        }

        console.log(data.fanartUrl);

        if (data.logo) {
            logoSerie.src = data.logo;
        }

        if (data.fanartUrl) {
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
        // arrowLeft.addEventListener("click", () => {
        //     if (counter === 0) {
        //         counter = data.fanartUrl.length - 1;
        //     }
        //     else {
        //         counter = counter - 1
        //     }
        //     console.log(counter)
        //     for (let i = 0; i < data.fanartUrl.length; i++) {
        //         if (i === counter) {
        //             cleanUp();
        //             let containerCarouselImage = document.createElement("img");
        //             containerCarouselImage.setAttribute("class", "container-carousel-image");
        //             containerCarouselImage.src = data.fanartUrl[i];
        //             containerCarousel.appendChild(containerCarouselImage);
        //             fanartNumber.innerText = `${i + 1} / ${data.fanartUrl.length}`;
        //         }
        //     }
        // })

        // arrowRight.addEventListener("click", () => {
        //     if (counter === data.fanartUrl.length - 1) {
        //         counter = 0
        //     }
        //     else {
        //         counter = counter + 1
        //     }
        //     console.log(counter)
        //     for (let i = 0; i < data.fanartUrl.length; i++) {
        //         if (i === counter) {
        //             cleanUp();
        //             let containerCarouselImage = document.createElement("img");
        //             containerCarouselImage.setAttribute("class", "container-carousel-image");
        //             containerCarouselImage.src = data.fanartUrl[i];
        //             containerCarousel.appendChild(containerCarouselImage);
        //             fanartNumber.innerText = `${i + 1} / ${data.fanartUrl.length}`;
        //         }
        //     }
        // })


        boutonAjoutSaison.addEventListener("click", () => {

            let myForm = document.getElementById("form-ajout-saison");
            formData = new FormData(myForm);
            formData.append('serieId', `${findId}`)
            formData.append('serieTitle', `${data.title}`)

            let envoiSaison = {
                method: 'POST',
                body: formData
            }

            console.log(envoiSaison)

            fetch("http://localhost:3000/api/saisons", envoiSaison)
                .then((data) => {

                    let envoiNombreSaisons = {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ nombreSaisons: 1 })
                    }
                    console.log(envoiNombreSaisons);
                    fetch(`http://localhost:3000/api/series/${findId}`, envoiNombreSaisons)
                        .then(() => {
                            location.reload();
                        })
                })
        })

        boutonAjoutFanart.addEventListener("click", () => {
            let myForm = document.getElementById("form-ajout-fanart");
            formData = new FormData(myForm);

            let envoiFanart = {
                method: 'PUT',
                body: formData
            }

            fetch(`http://localhost:3000/api/series/fanart/${findId}`, envoiFanart)
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

            fetch(`http://localhost:3000/api/series/logo/${findId}`, envoiLogo)
                .then(() => {
                    location.reload();
                })
        })

        fetch(`http://localhost:3000/api/saisons/serieId/${findId}`)
            .then((response) => { return response.json() })
            .then((data) => {
                for (let i = 0; i < data.length; i++) {
                    const blocSaison = document.createElement("a");
                    blocSaison.href = `./saison.html?id=${data[i]._id}`;
                    blocSaison.setAttribute("class", "bloc-saison");
                    saisons.appendChild(blocSaison);

                    const posterSaison = document.createElement("img");
                    posterSaison.src = data[i].imageUrl;
                    posterSaison.setAttribute("class", "poster-saison");
                    blocSaison.appendChild(posterSaison);

                    const texteSaison = document.createElement("div");
                    texteSaison.innerText = "";
                    texteSaison.setAttribute("class", "texte-saison")
                    blocSaison.appendChild(texteSaison)

                    const titreSaison = document.createElement("h3");
                    titreSaison.innerText = data[i].title;
                    texteSaison.appendChild(titreSaison);

                    const additionalInfo = document.createElement("div");
                    additionalInfo.setAttribute("class", "ad-info");
                    texteSaison.appendChild(additionalInfo);

                    if (data[i].nombreEpisodes) {
                        const nombreEpisodes = document.createElement("span");
                        nombreEpisodes.innerHTML = `${data[i].nombreEpisodes}` + " épisode(s)"
                        additionalInfo.appendChild(nombreEpisodes);
                    }
                    if (data[i].note) {
                        const noteSaison = document.createElement("div");
                        noteSaison.setAttribute("class", "star-container");
                        additionalInfo.appendChild(noteSaison);

                        let note = data[i].note;

                        for (let i = 0; i < starRating.length; i++) {
                            const star = document.createElement("span");
                            if (note >= starRating[i]) {
                                star.innerHTML = `<i class="fa-solid fa-star"></i>`
                            }
                            else {
                                star.innerHTML = `<i class="fa-regular fa-star"></i>`
                            }
                            noteSaison.appendChild(star)

                        }
                    }

                    if (data[i].decimale) {
                        const decimaleSaison = document.createElement("span");
                        decimaleSaison.innerText = data[i].decimale;
                        decimaleSaison.setAttribute("class", "decimale-saison");
                        blocSaison.appendChild(decimaleSaison);
                    }
                }
            })


        addGenre.addEventListener("click", () => {
            let genreFilter = genres.filter(genre => !data.genres.includes(genre));
            console.log(genreFilter);
            let addGenreField = document.createElement("div");
            addGenreField.setAttribute("class", "add-genre-field");
            addGenreField.innerHTML = `<select name="genre-select" id="genre-select">
                <option value=""></option>
                </select>`
            genrePlus.appendChild(addGenreField);

            let addGenreFieldSelect = document.getElementById("genre-select");
            for (let i = 0; i < genreFilter.length; i++) {
                addGenreFieldSelect.innerHTML += `<option value="${genreFilter[i]}">${genreFilter[i]}</option>`
            }

            addGenreFieldSelect.addEventListener("input", () => {
                let newGenreValue = addGenreFieldSelect.value;

                let envoiNewGenre = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ genre: newGenreValue })
                }

                fetch(`http://localhost:3000/api/series/majGenre/${findId}`, envoiNewGenre)
                    .then(() => {
                        location.reload();
                    })
            })
        })
    })