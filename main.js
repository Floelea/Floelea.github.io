const username = document.querySelector("#username");
const password = document.querySelector("#password");
const submit = document.querySelector("#submit");
const content = document.querySelector(".content");

submit.addEventListener("click", () => {
  //console.log(password.value);
  auth(username.value, password.value);
});

function auth(user, pass) {
  let url = "https://safe-temple-16010.herokuapp.com/api/login_check";

  let corpsDeRequete = {
    username: user,
    password: pass,
  };
  let requete = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(corpsDeRequete),
  };

  fetch(url, requete)
    .then((reponse) => reponse.json())
    .then((data) => {
      getPizza(data.token);
    });
}

function getPizza(token) {
  let url = "https://safe-temple-16010.herokuapp.com/api";

  let requete = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  fetch(url, requete)
    .then((reponse) => reponse.json())
    .then((data) => {
      data.forEach((pizza, i) => {
        content.innerHTML += `<p>Numero ${i + 1} : La ${pizza.name}</p>`;
      });
    });
}
