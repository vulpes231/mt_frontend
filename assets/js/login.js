import { displayError, displaySuccess, loginUser } from "./utils/post.js";
import { homeButton } from "./utils/home.js";

document.addEventListener("DOMContentLoaded", function () {
  const logoEL = document.querySelector(".logo");

  logoEL.addEventListener("click", homeButton);
  const loginForm = document.getElementById("login-form");
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const userEl = document.getElementById("username");
    const passEl = document.getElementById("password");

    const username = userEl.value;
    const password = passEl.value;

    const reqBody = {
      username: username,
      password: password,
    };

    const data = await loginUser(reqBody);
    if (data.status === 400) {
      let msg = data.message;
      displayError(msg);
      loginForm.reset();
    } else if (data.status === 401) {
      console.log(data);
      displayError(data.message);
      loginForm.reset();
    } else if (data.status === 200) {
      const accessToken = data.accessToken;
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("accessToken", accessToken);
      displaySuccess();
      loginForm.reset();
      setTimeout(() => {
        window.location.href = "/dashboard/";
      }, 2000);
    }
  });
});
