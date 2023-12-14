import { homeButton } from "./utils/home.js";
// const devurl = `http://localhost:3500`;
const liveurl = `https://metro-m9ur.onrender.com`;

document.addEventListener("DOMContentLoaded", function () {
  const logoEL = document.querySelector(".logo");
  const dateEl = document.getElementById("date");

  const menuBtn = document.querySelector(".menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");

  menuBtn.addEventListener("click", function () {
    mobileMenu.classList.toggle("active");
  });

  function getLastUpdatedDate() {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const date = new Date();
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const ampm = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const minutesWithLeadingZero = String(minutes).padStart(2, "0");

    return `Last updated ${month} ${day}, ${year} ${formattedHours}:${minutesWithLeadingZero}${ampm}`;
  }

  const newDate = getLastUpdatedDate();
  dateEl.textContent = newDate;

  logoEL.addEventListener("click", homeButton);
  const accessToken = sessionStorage.getItem("accessToken");
  const username = sessionStorage.getItem("username");
  const acct = sessionStorage.getItem("acct");
  const acctEl = document.getElementById("acct-name");
  console.log(acct);

  acctEl.textContent = acct;

  if (!accessToken) {
    sessionStorage.clear();
    window.location.href = "/login/";
  }

  const logoutEl = document.getElementById("logout");

  logoutEl.addEventListener("click", function () {
    sessionStorage.clear();
    window.location.href = "/login/";
  });

  const getUserBal = async (req, res) => {
    let acctType = sessionStorage.getItem("acct");
    acctType.toLowerCase();
    acctType = encodeURIComponent(acctType); // Encode special characters

    console.log(acctType);
    const url = `${liveurl}/account/${username}/${acctType}`;

    const reqOptions = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      credentials: "include",
    };

    try {
      const resp = await fetch(url, reqOptions);
      const data = await resp.json();
      console.log(data);

      if (resp.status === 401 || resp.status === 403) {
        sessionStorage.clear();
        window.location.href = "/login/";
      } else if (resp.status === 200) {
        const currEl = document.getElementById("curr");
        const avEl = document.getElementById("av");

        data.forEach((usr) => {
          const formattedAv = parseFloat(usr.available_bal).toLocaleString(
            "en-US",
            {
              style: "currency",
              currency: "USD",
            }
          );
          const formattedCr = parseFloat(usr.current_bal).toLocaleString(
            "en-US",
            {
              style: "currency",
              currency: "USD",
            }
          );
          currEl.textContent = ` ${formattedCr}`;
          avEl.textContent = ` ${formattedAv}`;
        });

        // console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  getUserBal();

  const getUserTransactions = async () => {
    let acctName = sessionStorage.getItem("acct");
    acctName.toLowerCase();
    acctName = encodeURIComponent(acctName); // Encode special characters

    console.log(acctName);
    const url = `${liveurl}/transactions/${username}/${acctName}`;

    const reqOptions = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      credentials: "include",
    };

    // ... Existing code ...

    try {
      const res = await fetch(url, reqOptions);
      const data = await res.json();

      if (res.status === 401 || res.status === 403) {
        sessionStorage.clear();
        window.location.href = "/login/";
      } else if (res.status === 200) {
        const tbody = document.getElementById("trans-body");
        tbody.innerHTML = "";

        // Sort the data array by the date in descending order (newest first)
        const sortedData = data.sort(
          (a, b) => new Date(a.date) - new Date(b.date) // Corrected the sorting order here
        );

        sortedData.forEach((tran) => {
          // Format the amount to display like "$10,000.00"
          const formattedAmount = parseFloat(tran.amount).toLocaleString(
            "en-US",
            {
              style: "currency",
              currency: "USD",
            }
          );
          const formattedBal = parseFloat(tran.available_bal).toLocaleString(
            "en-US",
            {
              style: "currency",
              currency: "USD",
            }
          );

          const newRow = document.createElement("div");
          newRow.classList.add("trans");
          newRow.innerHTML = `
            <span class="date" id="date">${tran.date}</span>
            <span>${tran.description}</span>
            <div class="balance">
              <span class="amount" data-trans-type="${tran.trans_type}">${formattedAmount}</span>
              <small>${formattedBal}</small>
            </div>
           
          `;

          // Prepend the new row to the container (tbody)
          tbody.prepend(newRow);

          const amountEl = document.querySelectorAll(".amount");
          amountEl.forEach((el) => {
            // Get the parent element with the class "details" to access the data attribute
            const transactionTypeElement =
              el.parentElement.parentElement.querySelector(".amount");

            // Check if transactionTypeElement is not null before accessing its dataset
            if (transactionTypeElement) {
              const transactionType = transactionTypeElement.dataset.transType;

              if (transactionType === "credit") {
                el.style.color = "green";
              } else if (transactionType === "debit") {
                el.style.color = "red";
              }
            }
          });
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  getUserTransactions();
});
