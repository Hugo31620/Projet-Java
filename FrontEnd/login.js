
const email = document.querySelector("form #email");
const password = document.querySelector("form #password");
const form = document.querySelector("form");
const messageErreur = document.querySelector(".login p");

// fonction qui recupere les users

async function getUsers() {
  const response = await fetch("http://localhost:5678/api/users/login");
  return await response.json();
}

// fonction de connexion

async function login() {
  const users = await getUsers();
  console.log(users);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userEmail = email.value;
    const userPwd = password.value;
    console.log(userEmail, userPwd);
    users.forEach((user) => {
      // verifications
      if (
        user.email == userEmail &&
        user.password == userPwd &&
        user.admin == true
      ) {
        // si les conditions sont remplies on fait ça
        window.sessionStorage.loged = true;
        window.location.href = "../index.html";
        // console.log("je suis conecté");
      } else {
        //message d'erreur
        email.classList.add("inputErrorLogin");
        password.classList.add("inputErrorLogin");
        messageErreur.textContent =
          "Votre email ou votre mot de passe est incorrect";
      }
    });
  });
}
login();
