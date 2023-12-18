import { liveurl } from "./constants.js";
import { addNewExternalAcct } from "./utils/add-ext-acct.js";
import { homeButton } from "./utils/home.js";

document.addEventListener("DOMContentLoaded", async function addExternalAcct() {
  const logoEL = document.querySelector(".logo");

  const menuBtn = document.querySelector(".menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  const externalAcctForm = document.getElementById("ext-acct-form");
  const successEl = document.getElementById("add-success");

  const accessToken = sessionStorage.getItem("accessToken");
  const username = sessionStorage.getItem("username");

  menuBtn.addEventListener("click", function () {
    mobileMenu.classList.toggle("active");
  });

  logoEL.addEventListener("click", homeButton);

  if (!accessToken) {
    sessionStorage.clear();
    window.location.href = "/login/";
  }

  const logoutEl = document.getElementById("logout");

  logoutEl.addEventListener("click", function () {
    sessionStorage.clear();
    window.location.href = "/login/";
  });

  externalAcctForm.addEventListener("submit", async function handleSubmit(e) {
    e.preventDefault();
    const res = await addNewExternalAcct(accessToken);

    console.log(res);

    if (res.message.includes("External account added!")) {
      successEl.textContent = res.message;
      successEl.style.color = "green";
      successEl.style.display = "flex";

      setTimeout(() => {
        window.location = "/transfer/";
      }, 3000);
    }
  });
});
