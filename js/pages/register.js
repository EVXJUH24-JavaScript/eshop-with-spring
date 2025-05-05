import { apiRegisterUser } from "../api/user.js";

const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");
const registerButton = document.getElementById("register-user-button");

registerButton.addEventListener("click", (event) => {
  event.preventDefault();

  const username = usernameInput.value;
  const password = passwordInput.value;

  apiRegisterUser(username, password)
    .then(() => (window.location.href = "/"))
    .catch(console.error);
});
