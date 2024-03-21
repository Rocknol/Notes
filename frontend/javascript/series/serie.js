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
let TMDBId;
let numberNextSeason = 0;
let fanartImages = [];


displayAjout.addEventListener("click", () => {
    let showForm = document.querySelector(".form-et-bouton-saison");
    showForm.setAttribute("class", "form-et-bouton-saison-show");
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


fetch(`http://localhost:3000/api/keys/${APIDocId}`)
    .then((response) => { return response.json() })
    .then((data) => {
        const TMDBAPI = data.TMDB;

        fetch(`http://localhost:3000/api/series/${findId}`)
            .then((response) => { return response.json() })
            .then((data) => {
                const posterSerie = document.querySelector(".poster-serie");
                posterSerie.src = data.imageUrl;
                posterSerie.addEventListener("click", () => {
                    let seriePosterChoices = document.getElementById("serie-poster-choices");
                    seriePosterChoices.style.display = "block";
                    let seriePosterContainer = document.querySelector(".serie-poster-container");
                    let closeButtonPosters = document.querySelector(".close-button-posters");

                    fetch(`http://api.themoviedb.org/3/tv/${TMDBId}/images?api_key=${TMDBAPI}`)
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
                                    fetch(`http://localhost:3000/api/series/majPoster/${findId}`, posterChange)
                                        .then(() => {
                                            location.reload();
                                        })
                                })

                                seriePosterContainer.appendChild(poster);
                            }
                            closeButtonPosters.addEventListener("click", () => {
                                seriePosterChoices.style.display = "none";
                                let postersToDelete = document.querySelectorAll(".poster");
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
                                let actorPhotoChoices = document.getElementById("actor-photo-choices");
                                actorPhotoChoices.style.display = "block";
                                let actorPhotosContainer = document.querySelector(".actor-photos-container");
                                let closeButtonPhotos = document.querySelector(".close-button-photos");

                                fetch(`https://api.themoviedb.org/3/person/${data.cast[i].id}/images?api_key=${TMDBAPI}`)
                                    .then((response) => { return response.json() })
                                    .then((data) => {
                                        console.log(data);
                                        for (let i = 0; i < data.profiles.length; i++) {
                                            let photo = document.createElement("img");
                                            photo.setAttribute("class", "photo");
                                            photo.src = `https://image.tmdb.org/t/p/original/${data.profiles[i].file_path}`;

                                            actorPhotosContainer.appendChild(photo);
                                        }
                                        closeButtonPhotos.addEventListener("click", () => {
                                            actorPhotoChoices.style.display = "none";
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
                    formData.append('serieId', `${findId} `)
                    formData.append('serieTitle', `${data.title} `)
                    formData.append('tmdbid', `${TMDBId} `)

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

                    let serieLogoChoices = document.getElementById("serie-logo-choices");
                    serieLogoChoices.style.display = "block";
                    let serieLogoContainer = document.querySelector(".serie-logo-container");
                    let closeButtonLogos = document.querySelector(".close-button-logos");
                    fetch(`https://api.themoviedb.org/3/tv/${TMDBId}/images?api_key=${TMDBAPI}`)
                        .then((response) => { return response.json() })
                        .then((data) => {
                            console.log(data)
                            for (let i = 0; i < data.logos.length; i++) {
                                if (data.logos[i].iso_639_1 === 'en') {
                                    let logo = document.createElement("img");
                                    logo.src = `https://image.tmdb.org/t/p/original/${data.logos[i].file_path}`;
                                    logo.setAttribute("class", "logo");
                                    serieLogoContainer.appendChild(logo);
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
                            closeButtonLogos.addEventListener("click", () => {
                                serieLogoChoices.style.display = "none";
                                let logosToDelete = document.querySelectorAll(".logo");
                                logosToDelete.forEach((element) => element.remove());
                            })
                        })
                })

                fanartButton.addEventListener("click", () => {
                    let serieFanartChoices = document.getElementById("serie-fanart-choices");
                    serieFanartChoices.style.display = "block";
                    let serieFanartContainer = document.querySelector(".serie-fanart-container");
                    let closeButtonFanarts = document.querySelector(".close-button-fanarts");
                    fetch(`https://api.themoviedb.org/3/tv/${TMDBId}/images?api_key=${TMDBAPI}`)
                        .then((response) => { return response.json() })
                        .then((data) => {
                            console.log(data);
                            for (let i = 0; i < data.backdrops.length; i++) {
                                let fanartBox = document.createElement("div");
                                fanartBox.setAttribute("class", "fanart-box");
                                serieFanartContainer.appendChild(fanartBox);
                                let fanart = document.createElement("img");
                                fanart.src = `https://image.tmdb.org/t/p/original/${data.backdrops[i].file_path}`;
                                fanart.setAttribute("class", "fanart");
                                fanartBox.appendChild(fanart);
                                let findFanart = fanartImages.find((element) => element === `https://image.tmdb.org/t/p/original/${data.backdrops[i].file_path}`)
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

                                        fetch(`http://localhost:3000/api/series/removeFanart/${findId}`, removeFanart)
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

                                        fetch(`http://localhost:3000/api/series/addFanart/${findId}`, addFanart)
                                            .then(() => {
                                                location.reload()
                                            })
                                    })
                                }
                            }
                            closeButtonFanarts.addEventListener("click", () => {
                                serieFanartChoices.style.display = "none";
                                let fanartsToDelete = document.querySelectorAll(".fanart-box");
                                fanartsToDelete.forEach((element) => element.remove());
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
