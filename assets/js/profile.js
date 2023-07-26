import { homeButton } from "./utils/home.js";

document.addEventListener("DOMContentLoaded", function () {
  const profileEl = document.getElementById("profile");
  const logoEL = document.querySelector(".logo");

  logoEL.addEventListener("click", homeButton);
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

  async function getUserProfile() {
    const reqOptions = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      credentials: "include",
    };

    const user = sessionStorage.getItem("username");

    try {
      const url = `http://localhost:3500/users/${user}`;

      const res = await fetch(url, reqOptions);
      const data = await res.json();

      let statusCode = res.status;
      if (statusCode === 200) {
        // console.log(data);
        profileEl.innerHTML = "";
        profileEl.innerHTML = `
            <h3>${data.firstname} ${data.lastname}</h3>
            <p>${data.address}</p>
            <p>${data.email}</p>
            <p>${data.phone}</p>
        `;
      }

      // Handle authentication errors
      if (statusCode === 401 || statusCode === 403) {
        sessionStorage.clear();
        window.location.href = "/login.html";
      }
    } catch (err) {
      console.log(err);
    }
  }
  getUserProfile();

  const updateProfileForm = document.getElementById("update-form");

  updateProfileForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const emailEl = document.getElementById("email");
    const phoneEl = document.getElementById("phone");
    const addressEl = document.getElementById("address");
    const errorEl = document.getElementById("error");
    const successEl = document.getElementById("success");

    const email = emailEl.value;
    const phone = phoneEl.value;
    const address = addressEl.value;

    const user = sessionStorage.getItem("username");

    const reqBody = {
      email: email,
      phone: phone,
      address: address,
      username: user,
    };

    console.log(
      `${emailEl.value}\t${phoneEl.value}\t${addressEl.value}\t${user}`
    );

    const reqOptions = {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      credentials: "include",
      body: JSON.stringify(reqBody),
    };

    const url = `http://localhost:3500/users`;

    try {
      const res = await fetch(url, reqOptions);
      const data = await res.json();

      let statusCode = res.status;

      if (statusCode === 200) {
        successEl.textContent = data.message;
        successEl.style.display = "block";
        console.log(data);
        setTimeout(() => {
          window.location.href = "/profile.html";
        }, 4000);
      } else if (statusCode === 400) {
        errorEl.textContent = data.message;
        errorEl.style.display = "block";
        setTimeout(() => {
          errorEl.style.display = "none";
        }, 2000);
      }

      // Handle authentication errors
      if (statusCode === 401 || statusCode === 403) {
        sessionStorage.clear();
        window.location.href = "/login.html";
      }
    } catch (err) {
      console.log(err);
    }
  });

  const changePassForm = document.getElementById("change-pass");

  changePassForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const passEl = document.getElementById("password");
    const newPass = document.getElementById("new_pass");
    const confirmEl = document.getElementById("confirm");
    const errorEl = document.getElementById("error1");
    const successEl = document.getElementById("success1");

    const password = passEl.value;
    const new_pass = newPass.value;
    const confirm = confirmEl.value;
    const username = sessionStorage.getItem("username");

    const reqBody = {
      username: username,
      password: password,
      new_pass: new_pass,
      confirm: confirm,
    };

    const reqOptions = {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      credentials: "include",
      body: JSON.stringify(reqBody),
    };

    const url = `http://localhost:3500/change-password`;
    try {
      const res = await fetch(url, reqOptions);
      const data = await res.json();

      let statusCode = res.status;

      if (statusCode === 200) {
        successEl.textContent = data.message;
        successEl.style.display = "block";
        console.log(data);
        changePassForm.reset();
        setTimeout(() => {
          successEl.style.display = "none";
        }, 2000);
      } else if (statusCode === 400) {
        errorEl.textContent = data.message;
        errorEl.style.display = "block";
        changePassForm.reset();
        setTimeout(() => {
          errorEl.style.display = "none";
        }, 3000);
      }

      // Handle authentication errors
      if (statusCode === 401 || statusCode === 403) {
        sessionStorage.clear();
        window.location.href = "/login.html";
      }
    } catch (err) {
      console.log(err);
    }

    console.log(password, new_pass, confirm, username);
  });
});
