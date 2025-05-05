import { apiLogin } from "../api/user.js";

const usernameInput = document.getElementById("username-input");
const passwordInput = document.getElementById("password-input");
const loginButton = document.getElementById("login-user-button");

loginButton.addEventListener("click", (event) => {
  event.preventDefault();

  const username = usernameInput.value;
  const password = passwordInput.value;

  apiLogin(username, password)
    .then((accessToken) => {
      window.location.href = "/";

      localStorage.setItem("accessToken", accessToken.accessToken);
    })
    .catch(console.error);
});
