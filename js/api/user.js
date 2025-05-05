import { BASE_URL } from "./api.js";

// API funktion för att registrera en användare i vår backend
export async function apiRegisterUser(username, password) {
  const response = await fetch(BASE_URL + "/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Error!");
  }
}

// API funktion för att logga in och få en access token från vår backend
export async function apiLogin(username, password) {
  const response = await fetch(BASE_URL + "/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Error!");
  }

  const accessToken = await response.json();
  return accessToken;
}
