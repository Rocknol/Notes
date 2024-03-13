const emplacementRealisateurs = document.getElementById("realisateurs");
const boutonAjoutRealisateur = document.querySelector(".bouton-ajouter-realisateur");
const displayAjout = document.querySelector(".display-ajout");
const displayFilter = document.querySelector(".display-filter");
const resetFilter = document.querySelector(".reset-filter");
const nombreRealisateurs = document.getElementById("nombre-realisateurs");
const boutonFiltre = document.querySelector(".bouton-filtre");
const fetchTMDB = document.querySelector(".bouton-fetch-tmdb");
const APIDocId = "65f195f9101332610cab8fb6"
let tableauNationalites = [];
let starRating = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let note;
let qteRealisateurs = 0;


function restore() {
    let restoreRealisateurs = document.querySelectorAll(".lien-realisateur-nodisplay");
    if (restoreRealisateurs) {
        restoreRealisateurs.forEach(element => element.setAttribute("class", "lien-realisateur"));
    }
}


function calculNombre() {
    let calcul = document.querySelectorAll(".lien-realisateur");
    let qteRealisateurs = calcul.length;

    nombreRealisateurs.innerHTML = `${qteRealisateurs}` + " réalisateur(s)"
}


function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
}

displayAjout.addEventListener("click", () => {
    let showForm = document.querySelector(".form-et-bouton-real");
    showForm.setAttribute("class", "form-et-bouton-real-show");
})

displayFilter.addEventListener("click", () => {
    let showFormFilter = document.querySelector(".form-filtre");
    showFormFilter.setAttribute("class", "form-filtre-show");
})

resetFilter.addEventListener("click", () => {
    location.reload();
})

fetchTMDB.addEventListener("click", () => {
    let idToFetch = document.getElementById("fetch").value;

    fetch(`http://localhost:3000/api/keys/${APIDocId}`)
        .then((response) => { return response.json() })
        .then((data) => {
            console.log(data)
            fetch(`https://api.themoviedb.org/3/person/${idToFetch}?api_key=${data.TMDB}`)
                .then((response) => { return response.json() })
                .then((data) => {
                    console.log(data);
                    let nameReal = document.getElementById("name");
                    nameReal.value = data.name;

                    let birthplace = document.getElementById("place-of-birth");
                    birthplace.value = data.place_of_birth;

                    let biography = document.getElementById("biography");
                    biography.value = data.biography;

                    let birthday = document.getElementById("birthday");
                    birthday.value = data.birthday;

                    let deathday = document.getElementById("deathday");
                    deathday.value = data.deathday;

                    let photo = document.getElementById("photo");
                    photo.value = `https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${data.profile_path}`
                })
        })
})

boutonAjoutRealisateur.addEventListener("click", function () {

    let myForm = document.getElementById("form-ajout-realisateur")
    formData = new FormData(myForm)

    let envoiRealisateur = {
        method: "POST",
        body: formData,
    };

    fetch("http://localhost:3000/api/realisateurs", envoiRealisateur)
        .then((data) => {
            const nomInput = document.querySelector("#name");
            let nom = nomInput.value;
            window.alert(`${nom} a été ajouté`);
            location.reload();
        })
})



fetch("http://localhost:3000/api/realisateurs")
    .then((response) => { return response.json() })
    .then((data) => {
        for (let i = 0; i < data.length; i++) {
            const caseRealisateur = document.createElement("a");
            caseRealisateur.href = `./realisateur.html?id=${data[i]._id}`;
            caseRealisateur.setAttribute("class", "lien-realisateur");
            emplacementRealisateurs.appendChild(caseRealisateur);

            const imageRealisateur = document.createElement("img");
            imageRealisateur.src = data[i].imageUrl;
            imageRealisateur.setAttribute("class", "image-realisateur");
            caseRealisateur.appendChild(imageRealisateur);

            const texteRealisateur = document.createElement("div");
            texteRealisateur.innerText = "";
            texteRealisateur.setAttribute("class", "texte-realisateur");
            caseRealisateur.appendChild(texteRealisateur);

            const nomRealisateur = document.createElement("span");
            nomRealisateur.innerText = data[i].name;
            nomRealisateur.setAttribute("class", "nom-realisateur");
            texteRealisateur.appendChild(nomRealisateur);

            const additionalInfo = document.createElement("div");
            additionalInfo.setAttribute("class", "ad-info");
            texteRealisateur.appendChild(additionalInfo);

            const nationaliteRealisateur = document.createElement("span");
            nationaliteRealisateur.innerText = data[i].nationalite;
            nationaliteRealisateur.setAttribute("class", "nationalite-realisateur");
            additionalInfo.appendChild(nationaliteRealisateur);

            if (data[i].note) {
                const noteRealisateur = document.createElement("div");
                noteRealisateur.setAttribute("class", "star-container");
                additionalInfo.appendChild(noteRealisateur);
                note = data[i].note;
                for (let i = 0; i < starRating.length; i++) {
                    const star = document.createElement("span");
                    if (note >= starRating[i]) {
                        star.innerHTML = `<i class="fa-solid fa-star"></i>`
                    }
                    else {
                        star.innerHTML = `<i class="fa-regular fa-star"></i>`
                    }
                    noteRealisateur.appendChild(star)
                }

                const noteRealText = document.createElement("span");
                noteRealText.setAttribute("class", "note-real");
                noteRealText.innerText = data[i].note;
                additionalInfo.appendChild(noteRealText);
            }

            if (data[i].decimale) {
                const noteDecimale = document.createElement("span");
                noteDecimale.setAttribute("class", "decimale");
                noteDecimale.innerHTML = data[i].decimale;
                caseRealisateur.appendChild(noteDecimale);
            }

            if (data[i].nombreFilms) {
                const nombreDeFilms = document.createElement("span");
                additionalInfo.appendChild(nombreDeFilms);
                nombreDeFilms.innerText = data[i].nombreFilms + " film(s)";
            }

            tableauNationalites.push(data[i].nationalite);
            console.log(tableauNationalites);

        }

        let unique = tableauNationalites.filter(onlyUnique);
        console.log(unique);
        const filtreNationalite = document.getElementById("nationalite");
        for (let i = 0; i < unique.length; i++) {
            filtreNationalite.innerHTML += `< option value = "${unique[i]}" > ${unique[i]}</option value > `;
        }

        calculNombre();

        boutonFiltre.addEventListener("click", () => {
            restore();
            let realisateurInput = document.getElementById("realisateur").value;
            let nationaliteInput = document.getElementById("nationalite").value;
            let noteInput = document.getElementById("note").value;

            let realisateurs = document.querySelectorAll(".nom-realisateur");
            let nationalites = document.querySelectorAll(".nationalite-realisateur");
            let notes = document.querySelectorAll(".note-real");

            if (realisateurInput) {
                for (let i = 0; i < realisateurs.length; i++) {
                    if (realisateurs[i].innerText.toLowerCase().includes(realisateurInput.toLowerCase())) {
                        console.log(realisateurs[i])
                    }
                    else {
                        realisateurs[i].closest("a").setAttribute("class", "lien-realisateur-nodisplay");
                    }
                }
            }

            if (nationaliteInput) {
                for (let i = 0; i < nationalites.length; i++) {
                    if (nationalites[i].innerText === nationaliteInput) {
                        console.log(nationalites[i])
                    }
                    else {
                        nationalites[i].closest("a").setAttribute("class", "lien-realisateur-nodisplay");
                    }
                }
            }

            if (noteInput) {
                for (let i = 0; i < notes.length; i++) {
                    if (notes[i].innerText === noteInput) {
                        console.log(notes[i])
                    }
                    else {
                        notes[i].closest("a").setAttribute("class", "lien-realisateur-nodisplay");
                    }
                }
            }
            calculNombre();
        })

    })

