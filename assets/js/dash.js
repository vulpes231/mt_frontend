// import { getUser } from "./utils/post.js";
import { homeButton } from "./utils/home.js";

document.addEventListener("DOMContentLoaded", async function () {
  const logoEL = document.querySelector(".logo");

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

  const clickedAcct = document.querySelector(".account-type");
  clickedAcct.addEventListener("click", function () {
    const acctName = clickedAcct.textContent;
    sessionStorage.setItem("acct", acctName);
    window.location.href = "/transactions.html";
  });
  // console.log(clickedAcct);

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
      const url = `http://localhost:3500/account/${user}`;
      const res = await fetch(url, reqOptions);
      const data = await res.json();

      console.log(data); // Check the received data in the console

      // Check if the response is an array (multiple objects) or a single object
      const arrayLength = Array.isArray(data) ? data.length : 1;

      // Update the count element based on the number of items received
      const countEl = document.getElementById("counter");
      countEl.textContent = `(${arrayLength})`;

      // Check if the data received is not empty
      if (res.status === 200 && arrayLength > 0) {
        // Access the first object from the array (if it's an array)
        const accountData = Array.isArray(data) ? data[0] : data;

        // Access and display the properties from the object
        const account_typeEl = document.getElementById("account-type");
        const account_noEl = document.getElementById("account-no");
        const availableEl = document.getElementById("available-bal");
        const currentEl = document.getElementById("current-bal");

        account_typeEl.textContent = accountData.account_type;
        account_noEl.textContent = accountData.account_num;

        const formattedCr = parseFloat(accountData.current_bal).toLocaleString(
          "en-US",
          {
            style: "currency",
            currency: "USD",
          }
        );

        const formattedAv = parseFloat(
          accountData.available_bal
        ).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });

        console.log(formattedAv);
        console.log(formattedCr);

        // Convert available_bal and current_bal to numbers and display with fixed decimals
        availableEl.textContent = formattedAv;
        currentEl.textContent = formattedCr;
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
