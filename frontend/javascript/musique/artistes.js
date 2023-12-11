const emplacementArtistes = document.getElementById("artistes");
const boutonAjoutArtiste = document.querySelector(".bouton-ajouter-artiste");
const displayAjout = document.querySelector(".display-ajout");
const displayFilter = document.querySelector(".display-filter");
const resetFilter = document.querySelector(".reset-filter");
const nombreArtistes = document.getElementById("nombre-artistes");
const boutonFiltrerArtiste = document.querySelector(".bouton-filtrer-artiste");
let tableauNationalites = [];
let starRating = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let note;
let qteArtistes = 0;

function restore() {
    let restoreArtists = document.querySelectorAll(".lien-artiste-nodisplay");
    if (restoreArtists) {
        restoreArtists.forEach((element) => element.setAttribute("class", "lien-artiste"));
    }
}

function calculNombre() {
    let calcul = document.querySelectorAll(".lien-artiste");
    let qteArtistes = calcul.length;

    nombreArtistes.innerHTML = `${qteArtistes}` + " artiste(s)"
}

function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
}

displayAjout.addEventListener("click", () => {
    let showForm = document.querySelector(".form-ajout-artiste");
    showForm.setAttribute("class", "form-ajout-artiste-show");
})

displayFilter.addEventListener("click", () => {
    let showFormFilter = document.querySelector(".form-filtre");
    showFormFilter.setAttribute("class", "form-filtre-show");
})

resetFilter.addEventListener("click", () => {
    location.reload();
})

fetch("http://localhost:3000/api/artistes")
    .then((response) => { return response.json() })
    .then((data) => {
        for (let i = 0; i < data.length; i++) {
            const caseArtiste = document.createElement("a");
            caseArtiste.href = `./artiste.html?id=${data[i]._id}`;
            caseArtiste.setAttribute("class", "lien-artiste");
            emplacementArtistes.appendChild(caseArtiste);

            const imageArtiste = document.createElement("img");
            imageArtiste.src = data[i].imageUrl;
            imageArtiste.setAttribute("class", "image-artiste");
            caseArtiste.appendChild(imageArtiste);

            const texteArtiste = document.createElement("div");
            texteArtiste.innerText = "";
            texteArtiste.setAttribute("class", "texte-artiste");
            caseArtiste.appendChild(texteArtiste);

            const nomArtiste = document.createElement("span");
            nomArtiste.innerText = data[i].name;
            nomArtiste.setAttribute("class", "nom-artiste");
            texteArtiste.appendChild(nomArtiste);

            const additionalInfo = document.createElement("div");
            additionalInfo.setAttribute("class", "ad-info");
            texteArtiste.appendChild(additionalInfo);

            const nationaliteArtiste = document.createElement("span");
            nationaliteArtiste.innerText = data[i].nationalite;
            nationaliteArtiste.setAttribute("class", "nationalite-artiste");
            additionalInfo.appendChild(nationaliteArtiste);

            if (data[i].note) {
                const noteArtiste = document.createElement("div");
                noteArtiste.setAttribute("class", "star-container");
                additionalInfo.appendChild(noteArtiste);
                note = data[i].note;
                for (let i = 0; i < starRating.length; i++) {
                    const star = document.createElement("span");
                    if (note > starRating[i]) {
                        star.innerHTML = `<i class="fa-solid fa-star"></i>`
                    }
                    else {
                        star.innerHTML = `<i class="fa-regular fa-star"></i>`
                    }
                    noteArtiste.appendChild(star);
                }

                constArtistText = document.createElement("span");
                constArtistText.setAttribute("class", "note-artiste");
                constArtistText.innerText = data[i].note;
                additionalInfo.appendChild(constArtistText);
            }

            if (data[i].decimale) {
                const noteDecimale = document.createElement("span");
                noteDecimale.setAttribute("class", "decimale");
                noteDecimale.innerHTML = data[i].decimale;
                caseArtiste.appendChild(noteDecimale);
            }

            if (data[i].nombreAlbums) {
                const nombreDalbums = document.createElement("span");
                additionalInfo.appendChild(nombreDalbums);
                nombreDalbums.innerText = data[i].nombreAlbums;
            }

            tableauNationalites.push(data[i].nationalite);
            console.log(tableauNationalites);
        }

        let unique = tableauNationalites.filter(onlyUnique);
        const filtreNationalite = document.getElementById("nationalite");
        for (let i = 0; i < unique.length; i++) {
            filtreNationalite.innerHTML += `<option value="${unique[i]}">${unique[i]}</option value>`;
        }

        calculNombre();

        boutonFiltrerArtiste.addEventListener("click", () => {
            restore();
            let artisteInput = document.getElementById("artist").value;
            let nationaliteInput = document.getElementById("nationalite").value;
            let noteInput = document.getElementById("note").value;

            let artistes = document.querySelectorAll(".nom-artiste");
            let nationalites = document.querySelectorAll(".nationalite-artiste");
            let notes = document.querySelectorAll(".note-artiste");

            if (artisteInput) {
                for (let i = 0; i < artistes.length; i++) {
                    if (artistes[i].innerText.toLowerCase().includes(artisteInput.toLowerCase())) {
                        console.log(artistes[i]);
                    }
                    else {
                        artistes[i].closest("a").setAttribute("class", "lien-artiste-nodisplay");
                    }
                }
            }

            if (nationaliteInput) {
                for (let i = 0; i < nationalites.length; i++) {
                    if (nationalites[i].innerText === nationaliteInput) {
                        console.log(nationalites[i]);
                    }
                    else {
                        nationalites[i].closest("a").setAttribute("class", "lien-artiste-nodisplay");
                    }
                }
            }

            if (noteInput) {
                for (let i = 0; i < notes.length; i++) {
                    if (notes[i].innerText === noteInput) {
                        console.log(notes[i]);
                    }
                    else {
                        notes[i].closest("a").setAttribute("class", "lien-artiste-nodisplay");
                    }
                }
            }
            calculNombre();
        })

    })


boutonAjoutArtiste.addEventListener("click", function () {
    let myForm = document.getElementById("ajout-artiste");
    formData = new FormData(myForm);

    let envoiArtiste = {
        method: 'POST',
        body: formData
    }

    fetch(`http://localhost:3000/api/artistes`, envoiArtiste)
        .then((data) => {
            const nomInput = document.getElementById("name");
            let nom = nomInput.value;
            window.alert(`${nom} a été ajouté`);
            location.reload();
        })
})