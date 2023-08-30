import { registerUser } from "./utils/post.js";
import { homeButton } from "./utils/home.js";

document.addEventListener("DOMContentLoaded", function () {
  const logoEL = document.querySelector(".logo");

  logoEL.addEventListener("click", homeButton);
  const signUpForm = document.getElementById("signup-form");
  const loader = document.getElementById("loader");

  signUpForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    // Show the loader
    loader.style.display = "inline-block";

    const usernameEl = document.getElementById("username");
    const errorEl = document.getElementById("error");
    const successEl = document.getElementById("success");
    const passwordEl = document.getElementById("password");
    const firstnameEl = document.getElementById("firstname");
    const lastnameEl = document.getElementById("lastname");
    const emailEl = document.getElementById("email");
    const phoneEl = document.getElementById("phone");
    const account_typeEl = document.getElementById("account_type");
    const addressEl = document.getElementById("address");

    const username = usernameEl.value;
    const password = passwordEl.value;
    const firstname = firstnameEl.value;
    const lastname = lastnameEl.value;
    const email = emailEl.value;
    const phone = phoneEl.value;
    const account_type = account_typeEl.value;
    const address = addressEl.value;

    console.log(
      `${username}\n${password}\n${firstname}\n${lastname}\n${email}\n${phone}\n${account_type}\n${address}`
    );

    const reqBody = {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      email: email,
      phone: phone,
      address: address,
      account_type: account_type,
    };

    const data = await registerUser(reqBody);
    if (data.status === 400) {
      console.log(data.status);
      errorEl.style.color = "red";
      errorEl.textContent = "Fill in all the required fields!";
      errorEl.style.display = "block";
      loader.style.display = "none";
      setTimeout(() => {
        errorEl.style.display = "none";
      }, 2000);
    } else if (data.status === 201) {
      console.log(data.status);
      successEl.style.color = "green";
      successEl.textContent = "User created successfully!";
      successEl.style.display = "block";
      // loader.style.display = "none";
      setTimeout(() => {
        window.location.href = "/login/";
      }, 2000);
    }
  });
});
