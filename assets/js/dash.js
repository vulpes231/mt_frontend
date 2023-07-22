// import { getUser } from "./utils/post.js";

document.addEventListener("DOMContentLoaded", async function () {
  const accessToken = sessionStorage.getItem("accessToken");

  if (!accessToken) {
    sessionStorage.clear();
    window.location.href = "/login.html";
  }

  const logoutEl = document.getElementById("logout");

  logoutEl.addEventListener("click", function () {
    sessionStorage.clear();
    window.location.href = "/login.html";
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
      const url = `http://localhost:3500/account/${user}`;
      const res = await fetch(url, reqOptions);
      const data = await res.json();

      if (Array.isArray(data)) {
        const arrayLength = data.length;
        // console.log(arrayLength);
      } else {
        // If data is not an array, set arrayLength to 1 (single object)
        const arrayLength = 1;
        // console.log(arrayLength);
      }

      if (res.status === 401 || res.status === 403) {
        sessionStorage.clear();
        window.location.href = "/login.html";
      } else if (res.status === 200) {
        const account_typeEl = document.getElementById("account-type");
        const account_noEl = document.getElementById("account-no");
        const availableEl = document.getElementById("available-bal");
        const currentEl = document.getElementById("current-bal");
        const totalEl = document.getElementById("total-account");
        const countEl = document.getElementById("counter");

        account_typeEl.textContent = data.account_type;
        account_noEl.textContent = data.account_num;
        availableEl.textContent = `$ ${parseFloat(data.available_bal).toFixed(
          2
        )}`;
        currentEl.textContent = `$ ${parseFloat(data.current_bal).toFixed(2)}`;

        countEl.textContent = `(${1})`;
      }

      //   console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  getUser();
});
