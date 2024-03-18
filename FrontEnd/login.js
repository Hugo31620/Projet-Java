const form = document.querySelector("form");
const email = document.getElementById("email");
const password = document.getElementById("password");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const login = {
    email: email.value,
    password: password.value,
  };

  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login),
    });

    if (!response.ok) {
      const errorLogin = document.querySelector("p");
      errorLogin.textContent = "Erreur dans l'identifiant ou le mot de passe";
      throw new Error("Erreur dans l'identifiant ou le mot de passe");
    }

    const data = await response.json();
    const { userId, token } = data;
    window.sessionStorage.setItem("token", token);
    window.sessionStorage.setItem("userId", userId);
    window.location.href = "index.html";
  } catch (error) {
    console.error("Une erreur est survenue : ", error);
  }
});