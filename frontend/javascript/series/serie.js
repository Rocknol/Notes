const url = new URL(document.location);
const searchParams = url.searchParams;
let findId = searchParams.get("id");
const saisons = document.getElementById("saisons");
const boutonAjoutSaison = document.querySelector(".bouton-ajouter-saison");
const boutonAjoutFanart = document.querySelector(".bouton-ajouter-fanart");
const displayAjout = document.querySelector(".display-ajout");
const fanartButton = document.querySelector(".fanart-button");
const logoButton = document.querySelector(".logo-button");
let starRating = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const genres = ["Drama", "Aventure", "Romance", "Adulte", "Western", "Comedie", "Thriller", "Horreur", "Sci-Fi", "Fantasy", "Documentaire", "Animation"];
const addGenre = document.querySelector(".add-genre");
const genrePlus = document.querySelector(".genre-plus");
const nombreSaisonsHeader = document.getElementById("nombre-saisons-header");
const containerCarousel = document.querySelector(".container-carousel");
let counter = 0;
const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");
const fanartNumber = document.querySelector(".fanart-number");
const logoSerie = document.querySelector(".logo-serie");
const boutonFetchTMDB = document.querySelector(".bouton-fetch-tmdb");
const APIDocId = "65f195f9101332610cab8fb6"
const actors = document.getElementById("actors");
const serieContainer = document.querySelector(".serie-container");
const scrollTop = document.querySelector(".scroll-top");
const closeButtonForm = document.getElementById("close-form")
const closeButtonContainer = document.getElementById("close-container")
const fanartsApercu = document.querySelector(".fanarts-apercu");
const updateFanarts = document.querySelector(".update-fanarts");
const changePoster = document.querySelector(".change-poster");
let TMDBId;
let TVDBId;
let numberNextSeason = 0;
let fanartImages = [];
let allFanart = [];
let fanartsToAdd = [];
let fanartsToRemove = [];
let pauseCarousel = true;
let pauseToggle = document.querySelector(".pause-toggle");


displayAjout.addEventListener("click", () => {
    let showForm = document.querySelector(".form-et-bouton-saison");
    showForm.style.display = "flex";
    closeButtonForm.addEventListener("click", () => {
        showForm.style.display = "none";
    })
})

function cleanUp() {
    let fanarts = document.querySelectorAll(".container-carousel-image");
    if (fanarts) {
        fanarts.forEach((element) => element.remove());
    }
}

function calculNombre() {
    let calcul = document.querySelectorAll(".bloc-saison");
    qteSaisons = calcul.length;

    nombreSaisonsHeader.innerText = qteSaisons + " saison(s)";
}

function scrollToTop() {
    serieContainer.addEventListener("scroll", () => {
        if (serieContainer.scrollTop > 500) {
            scrollTop.style.display = "block";
            scrollTop.addEventListener("click", () => {
                serieContainer.scrollTop = 0;
            })
        }
        if (serieContainer.scrollTop < 500) {
            scrollTop.style.display = "none";
        }
    })
}

pauseToggle.addEventListener("click", () => {
    pauseCarousel = !pauseCarousel;
    console.log(pauseCarousel);
    if (pauseCarousel) {
        pauseToggle.innerHTML = `<i class="fa-solid fa-pause"></i>`
    }
    else {
        pauseToggle.innerHTML = `<i class="fa-solid fa-play"></i>`
    }
})


fetch(`http://localhost:3000/api/keys/${APIDocId}`)
    .then((response) => { return response.json() })
    .then((data) => {
        const TMDBAPI = data.TMDB;
        const TVDBToken = data.TVDBToken;

        fetch(`http://localhost:3000/api/series/${findId}`)
            .then((response) => { return response.json() })
            .then((data) => {
                const posterSerie = document.querySelector(".poster-serie");
                posterSerie.src = data.imageUrl;
                changePoster.addEventListener("click", () => {
                    serieContainer.style.display = "flex";
                    updateFanarts.style.display = "none";
                    scrollToTop();

                    fetch(`http://api.themoviedb.org/3/tv/${TMDBId}/images?api_key=${TMDBAPI}`)
                        .then((response) => { return response.json() })
                        .then((data) => {
                            console.log(data);
                            for (let i = 0; i < data.posters.length; i++) {
                                if (data.posters[i].iso_639_1 === "en") {
                                    let posterBox = document.createElement("div");
                                    posterBox.setAttribute("class", "poster-box");
                                    let poster = document.createElement("img");
                                    poster.setAttribute("class", "poster");
                                    poster.src = `https://image.tmdb.org/t/p/original/${data.posters[i].file_path}`
                                    let updatePoster = document.createElement("div");
                                    updatePoster.setAttribute("class", "change-poster");
                                    updatePoster.innerHTML += `<i class="fa-solid fa-image"></i>`
                                    updatePoster.addEventListener("click", () => {
                                        let newPosterPath = `https://image.tmdb.org/t/p/original/${data.posters[i].file_path}`;

                                        let posterChange = {
                                            method: 'PUT',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ newPosterPath })
                                        }
                                        fetch(`http://localhost:3000/api/series/majPoster/${findId}`, posterChange)
                                            .then(() => {
                                                location.reload();
                                            })
                                    })
                                    posterBox.appendChild(poster);
                                    posterBox.appendChild(updatePoster);
                                    serieContainer.appendChild(posterBox);
                                }
                            }
                            closeButtonContainer.addEventListener("click", () => {
                                serieContainer.style.display = "none";
                                let postersToDelete = document.querySelectorAll(".poster-box");
                                postersToDelete.forEach(element => element.remove());
                            })
                        })
                })

                const titreSerie = document.querySelector(".titre-serie");
                titreSerie.innerText = data.title;

                let ongletTitre = document.getElementById("onglet-titre");
                ongletTitre.innerText = data.title;

                const genreSerie = document.querySelector(".genre-serie");
                genreSerie.innerText = data.genres;

                const lienTMDB = document.querySelector(".lien-tmdb");
                lienTMDB.href = `https://www.themoviedb.org/tv/${data.TMDBId}`;

                if (data.plot) {
                    const plot = document.querySelector(".plot");
                    plot.innerText = data.plot;
                }

                if (data.firstAirDate) {
                    const firstAirDate = document.querySelector(".first-air-date");
                    firstAirDate.innerText = "First air date: " + data.firstAirDate;
                }

                if (data.lastAirDate) {
                    const lastAirDate = document.querySelector(".last-air-date");
                    lastAirDate.innerText = "Last air date: " + data.lastAirDate;
                }

                if (data.awards) {
                    const awards = document.querySelector(".awards");
                    awards.innerText = "Récompenses: " + data.awards;
                }

                if (data.TMDBId) {
                    TMDBId = data.TMDBId;
                    console.log(TMDBId);
                }

                if (data.TVDBId) {
                    TVDBId = data.TVDBId;
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

                else {
                    let logoSerieId = document.getElementById("logo-serie");
                    logoSerieId.innerText = "Pas de logo!";
                    logoSerieId.style.fontSize = "x-large"
                }

                fanartImages = data.fanartUrl;

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
                            if (pauseCarousel) {

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
                }

                else {
                    containerCarousel.innerText = "Pas de fanart!";
                    containerCarousel.style.fontSize = "x-large"
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

                fetch(`https://api.themoviedb.org/3/tv/${TMDBId}/credits?api_key=${TMDBAPI}`)
                    .then((response) => { return response.json() })
                    .then((data) => {
                        console.log(data)
                        for (let i = 0; i < data.cast.length; i++) {
                            let actorBloc = document.createElement("div");
                            actorBloc.setAttribute("class", "actor-bloc");
                            actors.appendChild(actorBloc);

                            let actorPhoto = document.createElement("img");
                            actorPhoto.src = `https://image.tmdb.org/t/p/original/${data.cast[i].profile_path}`
                            actorBloc.appendChild(actorPhoto);
                            actorPhoto.addEventListener("click", () => {
                                serieContainer.style.display = "flex";

                                fetch(`https://api.themoviedb.org/3/person/${data.cast[i].id}/images?api_key=${TMDBAPI}`)
                                    .then((response) => { return response.json() })
                                    .then((data) => {
                                        console.log(data);
                                        for (let i = 0; i < data.profiles.length; i++) {
                                            let photo = document.createElement("img");
                                            photo.setAttribute("class", "photo");
                                            photo.src = `https://image.tmdb.org/t/p/original/${data.profiles[i].file_path}`;
                                            serieContainer.appendChild(photo);
                                        }
                                        closeButtonContainer.addEventListener("click", () => {
                                            serieContainer.style.display = "none";
                                            let photosToDelete = document.querySelectorAll(".photo");
                                            photosToDelete.forEach(element => element.remove());
                                        })
                                    })
                            })

                            let actorCredit = document.createElement("span");
                            actorCredit.setAttribute("class", "actor-credit");
                            actorCredit.innerHTML = `${data.cast[i].name} as ${data.cast[i].character}`;
                            actorBloc.appendChild(actorCredit);
                        }
                    })

                boutonAjoutSaison.addEventListener("click", () => {

                    let myForm = document.getElementById("form-ajout-saison");
                    formData = new FormData(myForm);
                    formData.append('serieId', `${findId}`)
                    formData.append('serieTitle', `${data.title}`)
                    formData.append('tmdbid', `${TMDBId}`)

                    let envoiSaison = {
                        method: 'POST',
                        body: formData
                    }

                    console.log(envoiSaison)

                    fetch("http://localhost:3000/api/saisons", envoiSaison)
                        .then(() => {
                            location.reload();
                        })
                })

                logoButton.addEventListener("click", () => {
                    serieContainer.style.display = "flex";
                    updateFanarts.style.display = "none";

                    fetch(`https://api.themoviedb.org/3/tv/${TMDBId}/images?api_key=${TMDBAPI}`)
                        .then((response) => { return response.json() })
                        .then((data) => {
                            console.log(data)
                            for (let i = 0; i < data.logos.length; i++) {
                                if (data.logos[i].iso_639_1 === 'en') {
                                    let logo = document.createElement("img");
                                    logo.src = `https://image.tmdb.org/t/p/original/${data.logos[i].file_path}`;
                                    logo.setAttribute("class", "logo");
                                    serieContainer.appendChild(logo);
                                    logo.addEventListener("click", () => {
                                        let newLogoPath = `https://image.tmdb.org/t/p/original/${data.logos[i].file_path}`;

                                        let logoChange =
                                        {
                                            method: 'PUT',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ newLogoPath })
                                        }

                                        fetch(`http://localhost:3000/api/series/majLogo/${findId}`, logoChange)
                                            .then(() => {
                                                location.reload()
                                            })
                                    })
                                }
                            }
                            closeButtonContainer.addEventListener("click", () => {
                                serieContainer.style.display = "none";
                                let logosToDelete = document.querySelectorAll(".logo");
                                logosToDelete.forEach((element) => element.remove());
                            })
                        })
                })

                fanartButton.addEventListener("click", () => {
                    serieContainer.style.display = "flex";
                    fanartsApercu.style.display = "flex";
                    updateFanarts.style.display = "flex";
                    scrollToTop();
                    for (let i = 0; i < fanartImages.length; i++) {
                        let fanartMini = document.createElement("img");
                        fanartMini.src = fanartImages[i];
                        fanartMini.setAttribute("class", "fanart-mini");
                        fanartsApercu.appendChild(fanartMini);
                    }
                    let fanartMinisArray = [];
                    let fanartMinis = document.querySelectorAll(".fanart-mini");
                    fanartMinis.forEach(element => fanartMinisArray.push(element));
                    console.log(fanartMinisArray);

                    fetch(`https://api.themoviedb.org/3/tv/${TMDBId}/images?api_key=${TMDBAPI}`)
                        .then((response) => { return response.json() })
                        .then((data) => {
                            console.log(data);
                            allFanart.push(data.backdrops);
                            console.log(allFanart);
                            fetch(`https://api4.thetvdb.com/v4/series/${TVDBId}/artworks`, {
                                headers: {
                                    'Authorization': `Bearer ${TVDBToken}`,
                                    'Accept-Language': 'en',
                                }
                            })
                                .then((response) => { return response.json() })
                                .then((data) => {
                                    console.log(data);
                                    allFanart.push(data.data.artworks);
                                    console.log(allFanart);

                                    console.log(allFanart[0]);
                                    for (let i = 0; i < allFanart[0].length; i++) {
                                        let fanartBox = document.createElement("div");
                                        fanartBox.setAttribute("class", "fanart-box");
                                        serieContainer.appendChild(fanartBox);
                                        let fanartSource = document.createElement("div");
                                        fanartSource.innerText = "TMDB";
                                        fanartSource.setAttribute("class", "fanart-source");
                                        fanartBox.appendChild(fanartSource);
                                        let fanart = document.createElement("img");
                                        let targetImageTMDB = `https://image.tmdb.org/t/p/original/${allFanart[0][i].file_path}`;
                                        fanart.src = targetImageTMDB;
                                        fanart.setAttribute("class", "fanart");
                                        fanartBox.appendChild(fanart);
                                        let tickedMarker = document.createElement("div");
                                        tickedMarker.setAttribute("class", "ticked-marker");
                                        let findFanart = fanartImages.find((element) => element === targetImageTMDB)
                                        console.log(findFanart);
                                        if (findFanart) {
                                            tickedMarker.innerHTML = `<i class="fa-solid fa-square-minus"></i>`;
                                            let fanartMiniToRemove = fanartMinisArray.find(element => element.src === targetImageTMDB)
                                            tickedMarker.addEventListener("click", () => {
                                                if (tickedMarker.innerHTML === `<i class="fa-solid fa-square-minus"></i>`) {
                                                    fanartsToRemove.push(targetImageTMDB);
                                                    fanartMiniToRemove.style.display = "none";
                                                    tickedMarker.innerHTML = `<i class="fa-solid fa-square-plus"></i>`
                                                }

                                                else {
                                                    let index = fanartsToRemove.indexOf(targetImageTMDB)
                                                    fanartsToRemove.splice(index, 1);
                                                    fanartMiniToRemove.style.display = "block";
                                                    tickedMarker.innerHTML = `<i class="fa-solid fa-square-minus"></i>`
                                                }
                                                console.log(fanartsToRemove);
                                            })
                                        }
                                        else {
                                            tickedMarker.innerHTML = `<i class="fa-solid fa-square-plus"></i>`;
                                            tickedMarker.addEventListener("click", () => {
                                                if (tickedMarker.innerHTML === `<i class="fa-solid fa-square-plus"></i>`) {
                                                    fanartsToAdd.push(targetImageTMDB);
                                                    let fanartMini = document.createElement("img");
                                                    fanartMini.src = targetImageTMDB;
                                                    fanartMini.setAttribute("class", "fanart-mini");
                                                    fanartsApercu.appendChild(fanartMini);
                                                    fanartMinisArray.push(fanartMini);
                                                    tickedMarker.innerHTML = `<i class="fa-solid fa-square-minus"></i>`
                                                }

                                                else {
                                                    let index = fanartsToAdd.indexOf(targetImageTMDB)
                                                    fanartsToAdd.splice(index, 1);
                                                    let fanartMiniToRemove = fanartMinisArray.find(element => element.src === targetImageTMDB);
                                                    let indexMini = fanartMinisArray.indexOf(fanartMiniToRemove);
                                                    fanartMinisArray.splice(indexMini, 1);
                                                    fanartMiniToRemove.remove();
                                                    tickedMarker.innerHTML = `<i class="fa-solid fa-square-plus"></i>`
                                                }
                                                console.log(fanartsToAdd);
                                            })
                                        }
                                        fanartBox.appendChild(tickedMarker);

                                        //     fanart.addEventListener("click", () => {
                                        //         let fanartToRemove = `https://image.tmdb.org/t/p/original/${allFanart[0][i].file_path}`;
                                        //         let removeFanart = {
                                        //             method: 'PUT',
                                        //             headers: { 'Content-Type': 'application/json' },
                                        //             body: JSON.stringify({ fanartToRemove })
                                        //         }

                                        //         fetch(`http://localhost:3000/api/series/removeFanart/${findId}`, removeFanart)
                                        //             .then(() => {
                                        //                 location.reload();
                                        //             })
                                        //     })
                                        // }

                                        // else {
                                        //     fanart.addEventListener("click", () => {
                                        //         let fanartToAdd = `https://image.tmdb.org/t/p/original/${allFanart[0][i].file_path}`;
                                        //         let addFanart = {
                                        //             method: 'PUT',
                                        //             headers: { 'Content-Type': 'application/json' },
                                        //             body: JSON.stringify({ fanartToAdd })
                                        //         }

                                        //         fetch(`http://localhost:3000/api/series/addFanart/${findId}`, addFanart)
                                        //             .then(() => {
                                        //                 location.reload()
                                        //             })
                                        //     })
                                        // }
                                        let resolution = document.createElement("div");
                                        resolution.setAttribute("class", "resolution");
                                        resolution.innerHTML = `${allFanart[0][i].height} / ${allFanart[0][i].width}`;
                                        fanartBox.appendChild(resolution);
                                    }

                                    for (let j = 0; j < allFanart[1].length; j++) {
                                        if (`${allFanart[1][j].image}`.includes("fanart") || `${allFanart[1][j].image}`.includes("background")) {
                                            let fanartBox = document.createElement("div");
                                            fanartBox.setAttribute("class", "fanart-box");
                                            serieContainer.appendChild(fanartBox);
                                            let fanartSource = document.createElement("div");
                                            fanartSource.innerText = "TVDB";
                                            fanartSource.setAttribute("class", "fanart-source");
                                            fanartBox.appendChild(fanartSource);
                                            let fanart = document.createElement("img");
                                            let targetImageTVDB = `${allFanart[1][j].image}`
                                            fanart.src = targetImageTVDB;
                                            fanart.setAttribute("class", "fanart");
                                            fanartBox.appendChild(fanart);
                                            let tickedMarker = document.createElement("div");
                                            tickedMarker.setAttribute("class", "ticked-marker");
                                            let findFanart = fanartImages.find((element) => element === targetImageTVDB);
                                            if (findFanart) {
                                                tickedMarker.innerHTML = `<i class="fa-solid fa-square-minus"></i>`;
                                                let fanartMiniToRemove = fanartMinisArray.find(element => element.src === targetImageTVDB);
                                                tickedMarker.addEventListener("click", () => {
                                                    if (tickedMarker.innerHTML === `<i class="fa-solid fa-square-minus"></i>`) {
                                                        fanartsToRemove.push(targetImageTVDB);
                                                        fanartMiniToRemove.style.display = "none";
                                                        tickedMarker.innerHTML = `<i class="fa-solid fa-square-plus"></i>`;
                                                    }

                                                    else {
                                                        let index = fanartsToRemove.indexOf(targetImageTVDB);
                                                        fanartsToRemove.splice(index, 1);
                                                        fanartMiniToRemove.style.display = "block";
                                                        tickedMarker.innerHTML = `<i class="fa-solid fa-square-minus"></i>`;
                                                    }
                                                    console.log(fanartsToRemove);
                                                })
                                                //     let removeFanart = {
                                                //         method: 'PUT',
                                                //         headers: { 'Content-Type': 'application/json' },
                                                //         body: JSON.stringify({ fanartToRemove })
                                                //     }

                                                //     fetch(`http://localhost:3000/api/series/removeFanart/${findId}`, removeFanart)
                                                //         .then(() => {
                                                //             location.reload();
                                                //         })
                                                // })
                                            }

                                            // else {
                                            //     fanart.addEventListener("click", () => {
                                            //         let fanartToAdd = `${allFanart[1][j].image}`;
                                            //         let addFanart = {
                                            //             method: 'PUT',
                                            //             headers: { 'Content-Type': 'application/json' },
                                            //             body: JSON.stringify({ fanartToAdd })
                                            //         }

                                            //         fetch(`http://localhost:3000/api/series/addFanart/${findId}`, addFanart)
                                            //             .then(() => {
                                            //                 location.reload()
                                            //             })
                                            //     })
                                            else {
                                                tickedMarker.innerHTML = `<i class="fa-solid fa-square-plus"></i>`;
                                                tickedMarker.addEventListener("click", () => {
                                                    if (tickedMarker.innerHTML === `<i class="fa-solid fa-square-plus"></i>`) {
                                                        fanartsToAdd.push(targetImageTVDB);
                                                        let fanartMini = document.createElement("img");
                                                        fanartMini.src = targetImageTVDB;
                                                        fanartMini.setAttribute("class", "fanart-mini");
                                                        fanartsApercu.appendChild(fanartMini);
                                                        fanartMinisArray.push(fanartMini);
                                                        tickedMarker.innerHTML = `<i class="fa-solid fa-square-minus"></i>`;
                                                    }

                                                    else {
                                                        let index = fanartsToAdd.indexOf(targetImageTVDB);
                                                        fanartsToAdd.splice(index, 1);
                                                        let fanartMiniToRemove = fanartMinisArray.find(element => element.src === targetImageTVDB);
                                                        let indexMini = fanartMinisArray.indexOf(fanartMiniToRemove);
                                                        fanartMinisArray.splice(indexMini, 1);
                                                        fanartMiniToRemove.remove();
                                                        tickedMarker.innerHTML = `<i class="fa-solid fa-square-plus"></i>`
                                                    }
                                                    console.log(fanartsToAdd);
                                                })
                                            }
                                            fanartBox.appendChild(tickedMarker);
                                            let resolution = document.createElement("div");
                                            resolution.setAttribute("class", "resolution");
                                            resolution.innerHTML = `${allFanart[1][j].height} / ${allFanart[1][j].width}`;
                                            fanartBox.appendChild(resolution);

                                        }

                                    }
                                    updateFanarts.addEventListener("click", () => {
                                        console.log(fanartsToRemove);
                                        // if (fanartsToRemove.length > 0) {
                                        for (let i = 0; i < fanartsToRemove.length; i++) {
                                            let fanartToRemove = `${fanartsToRemove[i]}`;
                                            let removeFanart = {
                                                method: 'PUT',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({ fanartToRemove })
                                            }
                                            console.log(removeFanart);
                                            fetch(`http://localhost:3000/api/series/removeFanart/${findId}`, removeFanart)
                                            // .then(() => {
                                            //     // location.reload()
                                            // })

                                        }
                                        // }

                                        // if (fanartsToAdd.length > 0) {
                                        for (let i = 0; i < fanartsToAdd.length; i++) {
                                            let fanartToAdd = `${fanartsToAdd[i]}`;
                                            let addFanart = {
                                                method: 'PUT',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({ fanartToAdd })
                                            }
                                            console.log(addFanart);
                                            fetch(`http://localhost:3000/api/series/addFanart/${findId}`, addFanart)
                                        }
                                        // }
                                        setTimeout(location.reload.bind(location), 1000);
                                        // else if (fanartsToRemove.length > 0) {
                                        //     for (let i = 0; i < fanartsToRemove.length; i++) {
                                        //         let fanartToRemove = `${fanartsToRemove[i]}`;
                                        //         let removeFanart = {
                                        //             method: 'PUT',
                                        //             headers: { 'Content-Type': 'application/json' },
                                        //             body: JSON.stringify({ fanartToRemove })
                                        //         }
                                        //         fetch(`http://localhost:3000/api/series/addFanart/${findId}`, removeFanart)
                                        //             .then(() => {
                                        //                 // location.reload()
                                        //             })
                                        //     }
                                        // }
                                        // location.reload();
                                    })

                                })

                            closeButtonContainer.addEventListener("click", () => {
                                serieContainer.style.display = "none";
                                fanartsApercu.style.display = "none";
                                let fanartsToDelete = document.querySelectorAll(".fanart-box");
                                fanartsToDelete.forEach((element) => element.remove());
                                let fanartsMiniToDelete = document.querySelectorAll(".fanart-mini");
                                fanartsMiniToDelete.forEach((element) => element.remove());
                            })
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

                            const titreSaison = document.createElement("span");
                            titreSaison.setAttribute("class", "titre-saison");
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

                            if (data[i].noteTMDB) {
                                const TMDBRatings = document.createElement("span");
                                TMDBRatings.innerText = "TMDB: " + data[i].noteTMDB;
                                additionalInfo.appendChild(TMDBRatings);
                            }

                            if (data[i].decimale) {
                                const decimaleSaison = document.createElement("span");
                                decimaleSaison.innerText = data[i].decimale;
                                decimaleSaison.setAttribute("class", "decimale-saison");
                                blocSaison.appendChild(decimaleSaison);
                            }
                        }
                        calculNombre();
                        numberNextSeason = qteSaisons + 1;
                    })

                boutonFetchTMDB.addEventListener("click", () => {
                    fetch(`http://api.themoviedb.org/3/tv/${TMDBId}/season/${numberNextSeason}?api_key=${TMDBAPI}`)
                        .then((response) => { return response.json() })
                        .then((data) => {
                            console.log(numberNextSeason);
                            console.log(data);
                            let titreSeason = document.getElementById("titre");
                            titreSeason.value = data.name;

                            let seasonNumber = document.getElementById("seasonnumber");
                            seasonNumber.value = data.season_number;

                            let plotSeason = document.getElementById("plot");
                            plotSeason.value = data.overview;

                            let posterSeason = document.getElementById("poster");
                            posterSeason.value = `https://image.tmdb.org/t/p/original/${data.poster_path}`;
                            let noteTMDB = document.getElementById("noteTMDB");
                            noteTMDB.value = data.vote_average;

                            let airDate = document.getElementById("airdate");
                            airDate.value = data.air_date;
                        })

                })



                // addGenre.addEventListener("click", () => {
                //     let genreFilter = genres.filter(genre => !data.genres.includes(genre));
                //     console.log(genreFilter);
                //     let addGenreField = document.createElement("div");
                //     addGenreField.setAttribute("class", "add-genre-field");
                //     addGenreField.innerHTML = `<select name="genre-select" id="genre-select">
                //         <option value=""></option>
                //         </select>`
                //     genrePlus.appendChild(addGenreField);

                // let addGenreFieldSelect = document.getElementById("genre-select");
                // for (let i = 0; i < genreFilter.length; i++) {
                //     addGenreFieldSelect.innerHTML += `<option value="${genreFilter[i]}">${genreFilter[i]}</option>`
                // }

                // addGenreFieldSelect.addEventListener("input", () => {
                //     let newGenreValue = addGenreFieldSelect.value;

                //     let envoiNewGenre = {
                //         method: 'PUT',
                //         headers: { 'Content-Type': 'application/json' },
                //         body: JSON.stringify({ genre: newGenreValue })
                //     }

                //     fetch(`http://localhost:3000/api/series/majGenre/${findId}`, envoiNewGenre)
                //         .then(() => {
                //             location.reload();
                //         })
                // })
                // })
            })

    })
