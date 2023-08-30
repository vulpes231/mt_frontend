import { homeButton } from "./utils/home.js";

document.addEventListener("DOMContentLoaded", function () {
  const profileEl = document.getElementById("profile");
  const logoEL = document.querySelector(".logo");

  const menuBtn = document.querySelector(".menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");

  menuBtn.addEventListener("click", function () {
    mobileMenu.classList.toggle("active");
  });

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
      const url = `https://server.metrometa.org/users/${user}`;

      const res = await fetch(url, reqOptions);
      const data = await res.json();

      let statusCode = res.status;
      if (statusCode === 200) {
        // console.log(data);
        profileEl.innerHTML = "";
        profileEl.classList.add("profile-el");
        profileEl.innerHTML = `
            <h3>${data.firstname} ${data.lastname}</h3>
            <p> <i class='bx bx-current-location'> </i> ${data.address}</p>
            <p><i class='bx bxs-envelope' ></i> ${data.email}</p>
            <p><i class='bx bxs-phone'></i> ${data.phone}</p>
        `;
      }

      // Handle authentication errors
      if (statusCode === 401 || statusCode === 403) {
        sessionStorage.clear();
        window.location.href = "/login/";
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

    const url = `https://server.metrometa.org/users`;

    try {
      const res = await fetch(url, reqOptions);
      const data = await res.json();

      let statusCode = res.status;

      if (statusCode === 200) {
        successEl.textContent = data.message;
        successEl.style.display = "block";
        console.log(data);
        setTimeout(() => {
          window.location.href = "/profile/";
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
        window.location.href = "/login/";
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

    const url = `https://server.metrometa.org/change-password`;
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
        window.location.href = "/login/";
      }
    } catch (err) {
      console.log(err);
    }

    console.log(password, new_pass, confirm, username);
  });
});
