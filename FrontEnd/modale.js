//Gestion affichage de la modal
const modifier = document.querySelector("#portfolio button")
const modalAll = document.querySelector(".modal")
const fermerModal = document.querySelector(".modal_body p")
const Galerie = document.querySelector(".modal_body .galerie")


modifier.addEventListener("click", () => {
    modalAll.style.display = "flex"
    modifier.style.display = "none"

})

fermerModal.addEventListener("click", () => {
    modalAll.style.display = "none"
    modifier.style.display = "flex"
})

window.addEventListener('click', function(event) {
    if (event.target == modalAll) {
      modalAll.style.display = "none";
      modifier.style.display = "flex"
    }
});


// Affichage de la galerie , filtre dynamique
async function displayGalerie() {
    Galerie.innerHTML ="";
    const travaux= await getWorks();
    travaux.forEach(photo => {
        const figures = document.createElement("figure");
        const img = document.createElement("img");
        const span = document.createElement("span");
        const icones = document.createElement("i")

        icones.classList.add("fas", "fa-trash-can")
        icones.id = photo.id
        img.src = photo.imageUrl

        span.appendChild(icones)
        figures.appendChild(span);
        figures.appendChild(img);
        Galerie.appendChild(figures);
    });
    filterCategory(); //actualise le DOM sans recharger
    Delete()
}

displayGalerie()

//Suppression d'un projet avec rendu dynamique
function Delete() {
    const poubelle = document.querySelectorAll(".fa-trash-can");
    const token = window.sessionStorage.getItem("token");
    poubelle.forEach(poub => {
        poub.addEventListener("click", (e) => {
            const id = poub.id;
            const init = {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            };
            fetch("http://localhost:5678/api/works/" + id, init)
            .then((response) => {
                if (!response.ok) {
                    console.log("La suppression a échoué");
                } else {
                    // Vérification si la réponse est vide
                    const contentType = response.headers.get("content-type");
                    if (contentType && contentType.includes("application/json")) {
                        return response.json();
                    } else {
                        return null;
                    }
                }
            })
            .then((data) => {
                if (data) { //avec donnée 
                    console.log("Suppression réussie", data);
                    poub.parentElement.remove();
                    
                } else { //sans donnée
                    console.log("Suppression réussie");
                }
                projet.innerHTML = "";
                displayGalerie();
                affichageWorks();
                const activeButton = document.querySelector(".filtres button.active");
                if (activeButton) {
                        activeButton.classList.remove("active");
                }
            })
            .catch((error) => {
                console.error("Erreur :", error);
            });
        });
    });
}

Delete();

//affiche la modale une par une

const btnAjoutPhoto = document.querySelector(".modal_body button")
const modalAjoutPhoto = document.querySelector(".modalAjout")
const modalbody = document.querySelector(".modal_body")
const fleche = document.querySelector(".arrow-left")
const croix = document.querySelector(".modalAjout .fa-xmark")

function Ajoutmodal() {
    btnAjoutPhoto.addEventListener("click", () => {
        modalAjoutPhoto.style.display = "flex"
        modalbody.style.display = "none"
    })
    fleche.addEventListener("click", () => {
        modalAjoutPhoto.style.display = "none"
        modalbody.style.display = "flex"
    })
    croix.addEventListener("click", () => {
        modalAll.style.display = "none"
        modifier.style.display = "flex"
    })
}

Ajoutmodal()

// PRE VISUALISATION

const preview = document.querySelector(".containerAddPhoto img")
const inputadd = document.querySelector (".containerAddPhoto input")
const labeladd = document.querySelector (".containerAddPhoto label")
const iadd = document.querySelector (".containerAddPhoto .fa-image")
const padd = document.querySelector (".containerAddPhoto p")

inputadd.addEventListener("change", () => { //change pour selectionner un fichier
    const add = inputadd.files[0]
    if (add) {
        const reader = new FileReader(); // lis le contenu des fichiers
        reader.onload = function (e) {  //appelé quand la fonction est terminé
            preview.src = e.target.result
            preview.style.display = "flex"
            labeladd.style.display = "none"
            iadd.style.display = "none"
            padd.style.display = "none"
        }
        reader.readAsDataURL(add); //declenche la lecture du fichier et appel la fonction onload
    }
})

//Liste CategoryInput

async function listeCategory() {
    const selection = document.querySelector("#formAjout select")
    const categorys = await getCategory()
    categorys.forEach(category => {
        const option = document.createElement("option")
        option.value = category.id
        option.textContent = category.name
        selection.appendChild(option)
    })
}

 listeCategory()


// AJOUT PHOTO -> POST


const form = document.querySelector(".modalAjout form");
const title = document.querySelector(".modalAjout #title");
const category = document.querySelector(".modalAjout #categoryInput");
const token = window.sessionStorage.getItem("token");

async function addNewProject() {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        
        try {
            const response = await fetch('http://localhost:5678/api/works', {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            if (!response.ok) {
                throw new Error("Erreur lors de l'envoi du fichier");
            }
    
            const data = await response.json();
            projet.innerHTML = ""; 
            displayGalerie();
            affichageWorks();
            form.reset();
            preview.style.display = "none"
            labeladd.style.display = "flex"
            iadd.style.display = "flex"
            padd.style.display = "flex"
            modalbody.style.display = "flex";
            modalAjoutPhoto.style.display = "none";
            console.log("Ajout d'un nouveau projet")
        } catch (error) {
            console.error("Erreur d'Ajout de photo :", error);
        }
    });
    await filterCategory();
}

addNewProject()

function boutonValider() {
    const imageInput = document.getElementById('file');
    const titleInput = document.getElementById('title');
    const categoryInput = document.getElementById('categoryInput');
    const submitButton = document.querySelector('#formAjout .button-add-work');


    const imageSelected = imageInput.files.length > 0;
    // trim ne prend pas en compte si il y a que des espaces
    const titleEntered = titleInput.value.trim() !== '';
    const categorySelected = categoryInput.value.trim() !== '';

    if (imageSelected && titleEntered && categorySelected) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}
    
// Ajouter des écouteurs d'événements pour les éléments du formulaire
document.getElementById('file').addEventListener('change', boutonValider);
document.getElementById('title').addEventListener('input', boutonValider);
document.getElementById('categoryInput').addEventListener('change', boutonValider);
