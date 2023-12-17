import { homeButton } from "./utils/home.js";
// const devurl = `http://localhost:3500`;
const liveurl = `https://metro-m9ur.onrender.com`;

document.addEventListener("DOMContentLoaded", function () {
  const logoEL = document.querySelector(".logo");

  const menuBtn = document.querySelector(".menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");

  menuBtn.addEventListener("click", function () {
    mobileMenu.classList.toggle("active");
  });

  logoEL.addEventListener("click", homeButton);
  const accessToken = sessionStorage.getItem("accessToken");
  const username = sessionStorage.getItem("username");

  if (!accessToken) {
    sessionStorage.clear();
    window.location.href = "/login/";
  }

  const logoutEl = document.getElementById("logout");

  logoutEl.addEventListener("click", function () {
    sessionStorage.clear();
    window.location.href = "/login/";
  });
});
