// import { liveurl } from "./constants.js";
import { getUserExternalAccounts } from "./utils/get-external-accts.js";
import { getUserAccounts } from "./utils/get-user-accts.js";
import { homeButton } from "./utils/home.js";
import { sendMoney } from "./utils/send-money.js";
// const devurl = `http://localhost:3500`;

document.addEventListener("DOMContentLoaded", async function () {
  const logoEL = document.querySelector(".logo");
  const menuBtn = document.querySelector(".menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  const transferForm = document.getElementById("transfer-money-form");
  const logoutEl = document.getElementById("logout");
  const fromEl = document.getElementById("from");
  const toEl = document.getElementById("to");
  const trfSxEl = document.getElementById("tranfer-success");

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

  const username = sessionStorage.getItem("username");
  //   get user accounts
  const userAccounts = await getUserAccounts(username, accessToken);
  console.log("User Accounts:", userAccounts);

  const externalAccounts = await getUserExternalAccounts(username, accessToken);

  console.log("external Accounts:", externalAccounts);

  // Filter accounts based on the condition (account_type includes checking or savings)
  const filteredAccts = userAccounts.filter(
    (account) =>
      account.account_type.includes("checking") ||
      account.account_type.includes("savings")
  );

  // Create options for the select element
  const selectFromOptions = filteredAccts.map(
    (account) =>
      `
      <option value="">Select Account</option>
      <option value=${account.account_num}>${account.account_type}-${account.account_num}</option>
      `
  );

  let selectToOptions;

  if (externalAccounts.message) {
    toEl.innerHTML = `
      <option value="">Select or Add External Account</option>
    `;
  } else {
    // Ensure externalAccounts is an array
    const accountsArray = Array.isArray(externalAccounts)
      ? externalAccounts
      : [externalAccounts];

    if (accountsArray.length !== 0) {
      // Create options for the select element
      selectToOptions = accountsArray.map(
        (account) =>
          `
      <option value="${account.account_num}">${account.account_type}-${account.account_num}</option>
      `
      );
      toEl.innerHTML = `
      <option value="">Select External Account</option>
      ${selectToOptions.join("")}
    `;
    }
  }

  // Set the innerHTML of your select element
  fromEl.innerHTML = selectFromOptions.join("");

  // transfer
  transferForm.addEventListener("submit", async function handleSubmit(e) {
    e.preventDefault();
    const accessToken = sessionStorage.getItem("accessToken");
    const username = sessionStorage.getItem("username");
    const res = await sendMoney(username, accessToken);
    if (res.message.includes("successfully")) {
      trfSxEl.textContent = res.message;
      trfSxEl.style.color = "green";
      trfSxEl.style.display = "flex";
      setTimeout(() => {
        window.location = "/transfer/";
      }, 3000);
    }
  });
});
