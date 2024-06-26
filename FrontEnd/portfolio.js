
const projet = document.querySelector(".gallery")
const filtres = document.querySelector(".filtres")

// Récupère projet au format Json
async function getWorks() {
  const response = await fetch ('http://localhost:5678/api/works');
  return await response.json();

}

getWorks();

//Reset Projet //

function resetProjet() {
  projet.innerHTML = "";
}

//Affichage Works//

async function affichageWorks() {
  const arrayWorks = await getWorks();
  arrayWorks.forEach(element => {   
    creationWorks(element);
  })

}

affichageWorks();

//Création de la galerie
function creationWorks(element) {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const figcaption = document.createElement("figcaption");

  img.src = element.imageUrl;
  figcaption.textContent = element.title;  // textContent et innerHTMl ? 

  figure.appendChild(img);
  figure.appendChild(figcaption);
  projet.appendChild(figure);
}

// Récupère les catégories //

async function getCategory() {
  const response = await fetch ('http://localhost:5678/api/categories');
  return await response.json();
  
}

// Affiche les boutons //

async function affichageCategory() {
  const categories = await getCategory();
  console.log(categories);
  categories.forEach(element => {
    const btn = document.createElement("button")
    btn.textContent = element.name;
    btn.id = element.id
    filtres.appendChild(btn)

  })
}

affichageCategory();

// Filtre au click //

async function filterCategory() {
  const allProjet = await getWorks();
  const buttons = document.querySelectorAll(".filtres button");
  buttons.forEach(button => {
    button.addEventListener("click", async (event) => { // Utilisation de 'async' ici
      const btnId = event.target.id;

      buttons.forEach(btn => {
        btn.classList.remove("active");
      });
      
      // Ajouter la classe "active" au bouton de filtre sélectionné
      event.target.classList.add("active");

      resetProjet(); // Efface tous les projets affichés
      let triCategory;
      if (btnId !== "0") { //Tri les photos 
        triCategory = allProjet.filter((element) => {
          return element.categoryId == btnId;
        });
      } else {
        triCategory = allProjet;
      }
      triCategory.forEach((element) => {
        creationWorks(element);
      });
    });
  });
}

filterCategory()

// Quand on est connecté


function loginAdmin() {
  document.addEventListener("DOMContentLoaded", () => {
    const token = window.sessionStorage.getItem("token");
    const userId = window.sessionStorage.getItem("userId");
    const buttonModal = document.querySelector("#portfolio .button_modal")
  
    if (token && userId) {

      logout();

      modeEdition();

      buttonModal.style.display = "flex"

      // Gestion dans la console pour la connexion 
      console.log("Connecté");
  
    }
  });
}

loginAdmin()

// Apparition de Logout quand on est connecté et disparition quand on click dessus
function logout() {  
  const logout = document.querySelector(".js-alredy-logged")
  logout.textContent = "Logout"

  logout.addEventListener("click", async () => {
    window.sessionStorage.removeItem("token");
  })
}

function modeEdition() {
  const modeAdmin = document.querySelector(".mode-admin");
  modeAdmin.removeAttribute("style")
}