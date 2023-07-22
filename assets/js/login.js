import { displayError, displaySuccess, loginUser } from "./utils/post.js";

document.addEventListener("DOMContentLoaded", function () {
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
    } else if (data.status === 401) {
      console.log(data);
      displayError(data.message);
    } else if (data.status === 200) {
      const accessToken = data.accessToken;
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("accessToken", accessToken);
      displaySuccess();
      setTimeout(() => {
        window.location.href = "/dashboard.html";
      }, 2000);
    }
  });
});
