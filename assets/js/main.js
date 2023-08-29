import { homeButton } from "./utils/home.js";

document.addEventListener("DOMContentLoaded", function () {
  const logoEL = document.querySelector(".logo");
  logoEL.addEventListener("click", homeButton);

  const menuBtn = document.querySelector(".menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");

  menuBtn.addEventListener("click", function () {
    mobileMenu.classList.toggle("active");
  });
});
