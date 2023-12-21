const url = new URL(document.location);
const searchParams = url.searchParams;
let findId = searchParams.get("id");
const albumsArtiste = document.getElementById("albums-artiste");
const nombreAlbums = document.getElementById("nombre-albums");
const boutonAjoutAlbum = document.querySelector(".bouton-ajouter-album");
const displayAjout = document.querySelector(".display-ajout");
const noteAlbum = document.getElementById("albumNote");
const value = document.getElementById("value");
let starRating = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let qteAlbums = 0;
let sommeNotes = 0;
let moyenne = 0;
let moyenneArrondie;
let moyenneArrondieDecimale;
let idAlbum;
let idArtiste;
let note;

function calculNombre() {
    let calcul = document.querySelectorAll(".bloc-album");
    let qteAlbums = calcul.length;
    nombreAlbums.innerHTML = `${qteAlbums}` + " album(s)"

}

displayAjout.addEventListener("click", () => {
    let showForm = document.querySelector(".form-et-bouton-album");
    showForm.setAttribute("class", "form-et-bouton-album-show");
})

noteAlbum.addEventListener("input", () => {
    value.textContent = noteAlbum.value;
})

fetch(`http://localhost:3000/api/artistes/${findId}`)
    .then((response) => { return response.json() })
    .then((data) => {
        const photoArtiste = document.querySelector(".photo-artiste");
        photoArtiste.src = data.imageUrl;

        const nomArtiste = document.querySelector(".nom-artiste");
        nomArtiste.innerText = data.name;

        let ongletTitre = document.getElementById("onglet-titre");
        ongletTitre.innerText = data.name;

        const nationaliteArtiste = document.querySelector(".nationalite-artiste");
        nationaliteArtiste.innerText = data.nationalite;

        const noteArtiste = document.querySelector(".note-artiste");
        if (data.note) {
            for (let i = 0; i < starRating.length; i++) {
                const star = document.createElement("span");
                if (data.note >= starRating[i]) {
                    star.innerHTML = `<i class="fa-solid fa-star"></i>`
                }
                else {
                    star.innerHTML = `<i class="fa-regular fa-star"></i>`
                }
                noteArtiste.appendChild(star);
            }
        }

        const noteDecimale = document.querySelector(".note-decimale");
        if (data.decimale) {
            noteDecimale.innerHTML = data.decimale;
        }

        fetch(`http://localhost:3000/api/albums/artiste/${data.name}`)
            .then((response) => { return response.json() })
            .then((data) => {
                for (let i = 0; i < data.length; i++) {
                    const blocAlbum = document.createElement("a");
                    blocAlbum.href = `./album.html?id=${data[i]._id}`
                    blocAlbum.setAttribute("class", "bloc-album");
                    albumsArtiste.appendChild(blocAlbum);

                    const imageAlbum = document.createElement("img");
                    imageAlbum.src = data[i].imageUrl;
                    imageAlbum.setAttribute("class", "image-album");
                    blocAlbum.appendChild(imageAlbum);

                    const texteAlbum = document.createElement("div");
                    texteAlbum.innerText = "";
                    texteAlbum.setAttribute("class", "texte-album");
                    blocAlbum.appendChild(texteAlbum);

                    const titleAlbum = document.createElement("span");
                    titleAlbum.innerText = data[i].title;
                    titleAlbum.setAttribute("class", "titre-album");
                    texteAlbum.appendChild(titleAlbum);

                    const additionalInfo = document.createElement("div");
                    additionalInfo.setAttribute("class", "ad-info");
                    texteAlbum.appendChild(additionalInfo);

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
                        noteAlbum.appendChild(star);
                    }

                    const noteAlbumSticker = document.createElement("span");
                    noteAlbumSticker.setAttribute("class", "sticker");
                    noteAlbumSticker.innerHTML = data[i].note;
                    blocAlbum.appendChild(noteAlbumSticker);

                    const genreAlbum = document.createElement("span");
                    genreAlbum.innerText = data[i].genre;
                    additionalInfo.appendChild(genreAlbum);

                    const anneeAlbum = document.createElement("span");
                    anneeAlbum.innerText = data[i].annee;
                    additionalInfo.appendChild(anneeAlbum);

                    if (data[i].type) {
                        const typeAlbum = document.createElement("span");
                        typeAlbum.innerText = data[i].type;
                        additionalInfo.appendChild(typeAlbum);
                    }
                }

                calculNombre();
            })

        boutonAjoutAlbum.addEventListener("click", () => {

            let value = document.getElementById("LP").value;
            console.log(value);

            let myForm = document.getElementById("form-ajout-album");
            formData = new FormData(myForm);
            formData.append('artisteId', `${findId}`);
            formData.append('artiste', `${data.name}`);
            formData.append('format', 'Album');

            let envoiAlbum = {

                method: 'POST',
                body: formData
            }

            console.log(envoiAlbum);

            fetch("http://localhost:3000/api/albums", envoiAlbum)
                .then((data) => {
                    const titreInput = document.querySelector("#titre");
                    let title = titreInput.value;
                    window.alert(`${title} a été ajouté.`)

                    fetch(`http://localhost:3000/api/albums/artisteId/${findId}`)
                        .then((response) => { return response.json() })
                        .then((data) => {
                            for (let i = 0; i < data.length; i++) {
                                sommeNotes += Number(data[i].note)
                            }
                            qteAlbums = data.length;
                            moyenne = sommeNotes / qteAlbums;
                            moyenneArrondie = Math.round(moyenne);
                            moyenneArrondieDecimale = Math.round(moyenne * 10) / 10;

                            let majNote = {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ note: moyenneArrondie, decimale: moyenneArrondieDecimale, nombreAlbums: qteAlbums })
                            }

                            fetch(`http://localhost:3000/api/artistes/majNote/${findId}`, majNote)
                                .then((data) => {
                                    location.reload();
                                })
                        })
                })
        })
    })