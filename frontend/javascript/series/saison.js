const url = new URL(document.location);
const searchParams = url.searchParams;
let findId = searchParams.get("id");
const episodes = document.getElementById("episodes");
const boutonAjoutEpisode = document.querySelector(".bouton-ajouter-episode");
const displayAjout = document.querySelector(".display-ajout");
const retourSerie = document.querySelector(".retour-serie");
let starRating = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let sommeNotes = 0;
let qteEpisodes = 0;
let moyenne = 0;
let moyenneArrondie;
let moyenneArrondieDecimale;
let sommeNotesSaisons = 0;
let qteSaisons = 0;
let moyenneSerie = 0;
let moyenneArrondieSerie;
let moyenneArrondieDecimaleSerie;
let sommeEpisodes = 0;
let color1 = "#fc0303";
let color2 = "#fc3d03";
let color3 = "#fc7703";
let color4 = "#fcad03";
let color5 = "#fcd703";
let color6 = "#f8fc03";
let color7 = "#dffc03";
let color8 = "#c2fc03";
let color9 = "#9dfc03";
let color10 = "#4afc03";
let numberOfEpisodes = 0;


displayAjout.addEventListener("click", () => {
    let showForm = document.querySelector(".form-et-bouton-episode");
    showForm.setAttribute("class", "form-et-bouton-episode-show");
})

fetch(`http://localhost:3000/api/saisons/${findId}`)
    .then((response) => { return response.json() })
    .then((data) => {
        const serieId = data.serieId;
        const posterSaison = document.querySelector(".poster-saison");
        posterSaison.src = data.imageUrl;

        const titreSaison = document.querySelector(".titre-saison");
        titreSaison.innerText = data.title;

        const titreSerie = document.querySelector(".titre-serie");
        titreSerie.innerText = data.serieTitle;

        let ongletTitre = document.getElementById("onglet-titre");
        ongletTitre.innerText = data.serieTitle;

        retourSerie.innerHTML = `${data.serieTitle}`
        retourSerie.href = `./serie.html?id=${data.serieId}`;

        if (data.nombreEpisodes) {
            const nombreEpisodes = document.querySelector(".nombre-episodes");
            nombreEpisodes.innerHTML = `${data.nombreEpisodes}` + " épisode(s)"
            numberOfEpisodes = data.nombreEpisodes + 1;
        }

        else {
            numberOfEpisodes = 1;
        }

        console.log(numberOfEpisodes);

        if (data.note) {
            const noteSaison = document.querySelector(".note-saison");
            for (let i = 0; i < starRating.length; i++) {
                const star = document.createElement("span");
                if (data.note >= starRating[i]) {
                    star.innerHTML = `<i class="fa-solid fa-star"></i>`
                }
                else {
                    star.innerHTML = `<i class="fa-regular fa-star"></i>`
                }
                noteSaison.appendChild(star)
            }
        }

        if (data.decimale) {
            const noteDecimale = document.querySelector(".decimale-saison");
            noteDecimale.innerText = data.decimale;
        }

        boutonAjoutEpisode.addEventListener("click", () => {
            let myForm = document.getElementById("form-ajout-episode");
            formData = new FormData(myForm);
            formData.append('saisonId', `${findId}`)
            formData.append('serieId', `${serieId}`)
            formData.append('numero', `${numberOfEpisodes}`)
            let envoiEpisode = {
                method: 'POST',
                body: formData
            }

            fetch("http://localhost:3000/api/episodes", envoiEpisode)
                .then((data) => {

                    let envoiNombreEpisodes = {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                    }
                    fetch(`http://localhost:3000/api/saisons/${findId}`, envoiNombreEpisodes)
                        .then(() => {
                            fetch(`http://localhost:3000/api/saisons/serieId/${serieId}`)
                                .then((response) => { return response.json() })
                                .then((data) => {
                                    console.log(data);
                                    for (let i = 0; i < data.length; i++) {
                                        console.log(data[i].nombreEpisodes);
                                        sommeEpisodes += data[i].nombreEpisodes;
                                    }

                                    console.log(sommeEpisodes);
                                    let envoiEpisodesSerie = {
                                        method: 'PUT',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ nombreEpisodes: sommeEpisodes })
                                    }

                                    fetch(`http://localhost:3000/api/series/majEpisodes/${serieId}`, envoiEpisodesSerie)
                                        .then(() => {

                                            fetch(`http://localhost:3000/api/episodes/saisonId/${findId}`)
                                                .then((response) => { return response.json() })
                                                .then((data) => {
                                                    for (let i = 0; i < data.length; i++) {
                                                        sommeNotes += Number(data[i].note);
                                                        qteEpisodes = data.length
                                                    }

                                                    moyenne = sommeNotes / qteEpisodes;
                                                    moyenneArrondie = Math.round(moyenne);
                                                    moyenneArrondieDecimale = Math.round(moyenne * 10) / 10;

                                                    let majNoteSaison = {
                                                        method: 'PUT',
                                                        headers: { 'Content-Type': 'application/json' },
                                                        body: JSON.stringify({ note: moyenneArrondie, decimale: moyenneArrondieDecimale })
                                                    }

                                                    fetch(`http://localhost:3000/api/saisons/majNote/${findId}`, majNoteSaison)
                                                        .then(() => {
                                                            fetch(`http://localhost:3000/api/saisons/serieId/${serieId}`)
                                                                .then((response) => { return response.json() })
                                                                .then((data) => {
                                                                    console.log(data);
                                                                    for (let i = 0; i < data.length; i++) {
                                                                        sommeNotesSaisons += Number(data[i].decimale);
                                                                        qteSaisons = data.length;
                                                                    }

                                                                    moyenneSerie = sommeNotesSaisons / qteSaisons;
                                                                    console.log(moyenneSerie);
                                                                    moyenneArrondieSerie = Math.round(moyenneSerie);
                                                                    console.log(moyenneArrondieSerie);
                                                                    moyenneArrondieDecimaleSerie = Math.round(moyenneSerie * 10) / 10;
                                                                    console.log(moyenneArrondieDecimaleSerie);

                                                                    let majNoteSerie = {
                                                                        method: 'PUT',
                                                                        headers: { 'Content-Type': 'application/json' },
                                                                        body: JSON.stringify({ note: moyenneArrondieSerie, decimale: moyenneArrondieDecimaleSerie })
                                                                    }
                                                                    fetch(`http://localhost:3000/api/series/majNote/${serieId}`, majNoteSerie)
                                                                        .then(() => {
                                                                            location.reload();
                                                                        })
                                                                })
                                                        })
                                                })
                                        })
                                })
                        })
                })
        })

        fetch(`http://localhost:3000/api/episodes/saisonId/${findId}`)
            .then((response) => { return response.json() })
            .then((data) => {
                console.log(data)
                for (let i = 0; i < data.length; i++) {
                    const blocEpisode = document.createElement("div");
                    blocEpisode.setAttribute("class", "bloc-episode");
                    episodes.appendChild(blocEpisode);

                    const imageEpisode = document.createElement("img");
                    imageEpisode.src = data[i].imageUrl;
                    imageEpisode.setAttribute("class", "thumbnail");
                    blocEpisode.appendChild(imageEpisode);

                    const texteEpisode = document.createElement("div");
                    texteEpisode.setAttribute("class", "texte-episode");
                    blocEpisode.appendChild(texteEpisode);

                    const numeroEpisode = document.createElement("span");
                    numeroEpisode.innerText = data[i].numero;
                    texteEpisode.appendChild(numeroEpisode);

                    const titleEpisode = document.createElement("span");
                    titleEpisode.innerText = data[i].title;
                    titleEpisode.setAttribute("class", "title-episode");
                    texteEpisode.appendChild(titleEpisode);

                    if (data[i].plot) {
                        const plotEpisode = document.createElement("span");
                        plotEpisode.innerText = data[i].plot;
                        plotEpisode.setAttribute("class", "plot-episode");
                        texteEpisode.appendChild(plotEpisode);
                    }

                    const noteBasic = document.createElement("span");
                    noteBasic.setAttribute("class", "note-basic");
                    // if (data[i].note < 5) {
                    //     noteBasic.style.backgroundColor = color1;
                    // }
                    // else if (data[i].note >= 5 && data[i].note < 8) {
                    //     noteBasic.style.backgroundColor = color2
                    // }

                    // else if (data[i].note >= 8) {
                    //     noteBasic.style.backgroundColor = color3;
                    // }
                    console.log(eval("color" + data[i].note));
                    noteBasic.style.backgroundColor = eval("color" + data[i].note);
                    noteBasic.innerText = data[i].note;
                    blocEpisode.appendChild(noteBasic);

                    const noteEpisode = document.createElement("div");
                    noteEpisode.setAttribute("class", "star-container");
                    texteEpisode.appendChild(noteEpisode);

                    let note = data[i].note;
                    let episodeId = data[i]._id;

                    for (let i = 0; i < starRating.length; i++) {
                        const star = document.createElement("span");
                        if (note >= starRating[i]) {
                            star.innerHTML = `<i class="fa-solid fa-star"></i>`
                        }
                        else {
                            star.innerHTML = `<i class="fa-regular fa-star"></i>`
                        }
                        noteEpisode.appendChild(star)

                        star.addEventListener("click", () => {
                            if (note != starRating[i]) {
                                let majNote = {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ note: starRating[i] })
                                }
                                fetch(`http://localhost:3000/api/episodes/majNote/${episodeId}`, majNote)
                                    .then(() => {

                                        fetch(`http://localhost:3000/api/episodes/saisonId/${findId}`)
                                            .then((response) => { return response.json() })
                                            .then((data) => {
                                                for (let i = 0; i < data.length; i++) {
                                                    sommeNotes += Number(data[i].note);
                                                    qteEpisodes = data.length
                                                }

                                                moyenne = sommeNotes / qteEpisodes;
                                                moyenneArrondie = Math.round(moyenne);
                                                moyenneArrondieDecimale = Math.round(moyenne * 10) / 10;

                                                let majNoteSaison = {
                                                    method: 'PUT',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({ note: moyenneArrondie, decimale: moyenneArrondieDecimale })
                                                }

                                                fetch(`http://localhost:3000/api/saisons/majNote/${findId}`, majNoteSaison)
                                                    .then(() => {
                                                        fetch(`http://localhost:3000/api/saisons/serieId/${serieId}`)
                                                            .then((response) => { return response.json() })
                                                            .then((data) => {
                                                                console.log(data);
                                                                for (let i = 0; i < data.length; i++) {
                                                                    sommeNotesSaisons += Number(data[i].decimale);
                                                                    qteSaisons = data.length;
                                                                }

                                                                moyenneSerie = sommeNotesSaisons / qteSaisons;
                                                                console.log(moyenneSerie);
                                                                moyenneArrondieSerie = Math.round(moyenneSerie);
                                                                console.log(moyenneArrondieSerie);
                                                                moyenneArrondieDecimaleSerie = Math.round(moyenneSerie * 10) / 10;
                                                                console.log(moyenneArrondieDecimaleSerie);

                                                                let majNoteSerie = {
                                                                    method: 'PUT',
                                                                    headers: { 'Content-Type': 'application/json' },
                                                                    body: JSON.stringify({ note: moyenneArrondieSerie, decimale: moyenneArrondieDecimaleSerie })
                                                                }
                                                                fetch(`http://localhost:3000/api/series/majNote/${serieId}`, majNoteSerie)
                                                                    .then(() => {
                                                                        location.reload();
                                                                    })
                                                            })
                                                    })
                                            })
                                    })
                            }
                        })
                    }

                }
            })

    })


