import { liveurl } from "./constants.js";
import { homeButton } from "./utils/home.js";
import { sendMoney } from "./utils/send-money.js";
// const devurl = `http://localhost:3500`;

document.addEventListener("DOMContentLoaded", function () {
  const logoEL = document.querySelector(".logo");
  const menuBtn = document.querySelector(".menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  const transferForm = document.getElementById("transfer-money-form");
  const logoutEl = document.getElementById("logout");

  menuBtn.addEventListener("click", function () {
    mobileMenu.classList.toggle("active");
  });

  logoEL.addEventListener("click", homeButton);

  // check access
  const accessToken = sessionStorage.getItem("accessToken");
  if (!accessToken) {
    sessionStorage.clear();
    window.location.href = "/login/";
  }

  // logout
  logoutEl.addEventListener("click", function () {
    sessionStorage.clear();
    window.location.href = "/login/";
  });

  // transfer
  transferForm.addEventListener("submit", async function handleSubmit(e) {
    e.preventDefault();
    const accessToken = sessionStorage.getItem("accessToken");
    const username = sessionStorage.getItem("username");
    const res = await sendMoney(username, accessToken);
  });
});
