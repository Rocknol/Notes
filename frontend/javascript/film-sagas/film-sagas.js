const emplacementSagas = document.getElementById("sagas");
const boutonAjoutSaga = document.querySelector(".bouton-ajouter-saga");
const displayAjout = document.querySelector(".display-ajout");
const nombreSagas = document.getElementById("nombre-sagas");

let starRating = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let qteSagas = 0;

function calculNombre() {
    qteSagas += 1
    if (qteSagas === 1) {
        nombreSagas.innerHTML = `${qteSagas}` + " saga";
    }

    else if (qteSagas > 1) {
        nombreSagas.innerHTML = `${qteSagas}` + " sagas";
    }
}

displayAjout.addEventListener("click", () => {
    let showForm = document.querySelector(".form-et-bouton-saga");
    showForm.setAttribute("class", "form-et-bouton-saga-show")
})

fetch("http://localhost:3000/api/sagas")
    .then((response) => { return response.json() })
    .then((data) => {
        if (data.length > 1) {
            for (let i = 0; i < data.length; i++) {
                calculNombre();
                const caseSaga = document.createElement("a");
                caseSaga.setAttribute("class", "case-saga");
                caseSaga.href = `./film-saga.html?id=${data[i]._id}`;
                emplacementSagas.appendChild(caseSaga);

                const imageSaga = document.createElement("img");
                imageSaga.setAttribute("class", "image-saga");
                imageSaga.src = data[i].imageUrl;
                caseSaga.appendChild(imageSaga);

                const texteSaga = document.createElement("div");
                texteSaga.setAttribute("class", "texte-saga");
                caseSaga.appendChild(texteSaga);

                const nomSaga = document.createElement("h3");
                nomSaga.innerHTML = `${data[i].title}`;
                texteSaga.appendChild(nomSaga);

                if (data[i].note) {
                    const noteSaga = document.createElement("div");
                    noteSaga.setAttribute("class", "star-container");
                    texteSaga.appendChild(noteSaga);
                    note = data[i].note;
                    for (let i = 0; i < starRating.length; i++) {
                        const star = document.createElement("span");
                        if (note >= starRating[i]) {
                            star.innerHTML = `<i class="fa-solid fa-star"></i>`
                        }
                        else {
                            star.innerHTML = `<i class="fa-regular fa-star"></i>`
                        }
                        noteSaga.appendChild(star)
                    }
                }

                if (data[i].decimale) {
                    const noteDecimale = document.createElement("span");
                    noteDecimale.setAttribute("class", "decimale");
                    noteDecimale.innerHTML = data[i].decimale;
                    texteSaga.appendChild(noteDecimale);
                }
            }
        }
        else {
            nombreSagas.innerHTML = "0 saga"
        }
    })



boutonAjoutSaga.addEventListener("click", () => {
    let myForm = document.getElementById("form-ajout-saga");
    formData = new FormData(myForm);

    let envoiSaga = {
        method: 'POST',
        body: formData
    }

    fetch("http://localhost:3000/api/sagas", envoiSaga)
        .then((data) => {
            const nomInput = document.querySelector("#name");
            let nom = nomInput.value;
            window.alert(`${nom} a été ajouté`);
            location.reload();
        })
})