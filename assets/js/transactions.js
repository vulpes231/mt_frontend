import { homeButton } from "./utils/home.js";

document.addEventListener("DOMContentLoaded", function () {
  const logoEL = document.querySelector(".logo");

  logoEL.addEventListener("click", homeButton);
  const accessToken = sessionStorage.getItem("accessToken");
  const username = sessionStorage.getItem("username");
  const acct = sessionStorage.getItem("acct");
  const acctEl = document.getElementById("acct-name");
  console.log(acct);

  acctEl.textContent = acct;

  if (!accessToken) {
    sessionStorage.clear();
    window.location.href = "/login.html";
  }

  const logoutEl = document.getElementById("logout");

  logoutEl.addEventListener("click", function () {
    sessionStorage.clear();
    window.location.href = "/login.html";
  });

  const getUserBal = async (req, res) => {
    const url = `http://localhost:3500/account/${username}`;
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
      //   console.log(data);

      if (resp.status === 401 || resp.status === 403) {
        sessionStorage.clear();
        window.location.href = "/login.html";
      } else if (resp.status === 200) {
        const currEl = document.getElementById("curr");
        const avEl = document.getElementById("av");

        data.forEach((usr) => {
          currEl.textContent = `$ ${usr.current_bal}`;
          avEl.textContent = `$ ${usr.available_bal}`;
        });

        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  getUserBal();

  const getUserTransactions = async () => {
    const url = `http://localhost:3500/transactions/${username}`;

    const reqOptions = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      credentials: "include",
    };

    try {
      const res = await fetch(url, reqOptions);
      const data = await res.json();
      //   console.log(data);

      if (res.status === 401 || res.status === 403) {
        sessionStorage.clear();
        window.location.href = "/login.html";
      } else if (res.status === 200) {
        const tbody = document.getElementById("trans-body");
        tbody.innerHTML = "";

        // Sort the data array by the date in descending order (newest first)
        const sortedData = data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        sortedData.forEach((tran) => {
          const newRow = document.createElement("div");
          newRow.classList.add("trans");
          newRow.innerHTML = `
            <span class="date" id="date">${tran.date}</span>
            <div class="details" >
              <span >${tran.description}</span>
              <div class="balance">
                <span class="amount" data-trans-type="${tran.trans_type}">$${tran.amount}</span>
                <span>$${tran.available_bal}</span>
              </div>
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
