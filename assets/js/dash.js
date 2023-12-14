// import { getUser } from "./utils/post.js";
import { homeButton } from "./utils/home.js";

const devurl = `http://localhost:3500`;

document.addEventListener("DOMContentLoaded", async function () {
  const logoEL = document.querySelector(".logo");
  const lastLogin = document.getElementById("last-login");
  const menuBtn = document.querySelector(".menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");

  menuBtn.addEventListener("click", function () {
    mobileMenu.classList.toggle("active");
  });

  const currentDateTime = new Date();

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDateTime = currentDateTime.toLocaleString("en-US", options);

  lastLogin.textContent = formattedDateTime;

  logoEL.addEventListener("click", homeButton);
  const accessToken = sessionStorage.getItem("accessToken");

  if (!accessToken) {
    sessionStorage.clear();
    window.location.href = "/login/";
  }

  const logoutEl = document.getElementById("logout");

  logoutEl.addEventListener("click", function () {
    sessionStorage.clear();
    window.location.href = "/login/";
  });

  const user = sessionStorage.getItem("username");

  const userEl = document.getElementById("user");
  userEl.style.textTransform = "uppercase";
  userEl.textContent = user;

  async function getUser() {
    // const accessToken = sessionStorage.getItem("accessToken");
    const reqOptions = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      credentials: "include",
    };

    try {
      //   const user = sessionStorage.getItem("username");
      const url = `${devurl}/account/${user}`;
      const res = await fetch(url, reqOptions);
      const data = await res.json();

      // Check if the response is an array (multiple objects) or a single object
      const arrayLength = Array.isArray(data) ? data.length : 1;

      // Update the count element based on the number of items received
      const countEl = document.getElementById("counter");
      countEl.textContent = `(${arrayLength})`;

      // Check if the data received is not empty
      if (res.status === 200 && arrayLength > 0) {
        // Check if data is an array
        if (Array.isArray(data)) {
          // Clear existing account elements
          const accountContainer = document.querySelector(".accounts");
          accountContainer.innerHTML = ""; // Clear the container

          console.log(data);
          // Loop through each account in the array
          for (let i = 0; i < data.length; i++) {
            const accountData = data[i];

            // Create new elements for each account
            const accountDiv = document.createElement("div");
            accountDiv.classList.add("account-entry");

            // const accountTitle = document.createElement("div");
            // accountDiv.classList.add("account-type");

            const accountTitle = document.createElement("div");
            accountTitle.classList.add("account-type");

            const account_typeEl = document.createElement("span");
            const account_noEl = document.createElement("span");
            const availableEl = document.createElement("p");
            const currentEl = document.createElement("p");

            let partialAcct;

            if (accountData.account_num.length > 4) {
              partialAcct =
                "X".repeat(accountData.account_num.length - 4) +
                accountData.account_num.slice(-4);
            } else {
              partialAcct = accountData.account_num;
            }

            account_typeEl.textContent = accountData.account_type;
            account_noEl.textContent = partialAcct;

            const formattedCr = parseFloat(
              accountData.current_bal
            ).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            });

            const formattedAv = parseFloat(
              accountData.available_bal
            ).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            });

            // Convert available_bal and current_bal to numbers and display with fixed decimals
            availableEl.textContent = `Available Balance: ${formattedAv}`;
            currentEl.textContent = `Current Balance: ${formattedCr}`;

            // Append elements to the account entry
            accountTitle.appendChild(account_typeEl);
            accountTitle.appendChild(account_noEl);
            accountDiv.appendChild(accountTitle);
            accountDiv.appendChild(availableEl);
            accountDiv.appendChild(currentEl);

            // Append the account entry to the container
            accountContainer.appendChild(accountDiv);

            // Add event listener to the account-type element
            account_typeEl.addEventListener("click", function () {
              console.log("clicked");
              const acctName = this.textContent;
              sessionStorage.setItem("acct", acctName);
              console.log(acctName);
              window.location.href = "/transactions/";
            });
          }

          // Update the counter
          const counterEl = document.getElementById("counter");
          counterEl.textContent = `(${data.length})`;
        } else {
          // Handle the case when data is not an array
          console.log("Data is not an array.");
        }
      } else {
        // Handle the case when the data is empty or response status is not 200
        console.log("Data not available or response status is not 200.");
      }

      // Handle authentication errors
      if (res.status === 401 || res.status === 403) {
        sessionStorage.clear();
        window.location.href = "/login/";
      }
    } catch (err) {
      // Log any errors that occur during the fetch or data processing
      console.log("Error fetching data:", err);
    }
  }

  getUser();
});
