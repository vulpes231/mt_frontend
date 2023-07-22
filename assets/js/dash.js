document.addEventListener("DOMContentLoaded", function () {
  const accessToken = sessionStorage.getItem("accessToken");

  if (!accessToken) {
    sessionStorage.clear();
    window.location.href = "/login.html";
  }

  const user = sessionStorage.getItem("username");

  const userEl = document.getElementById("user");
  userEl.style.textTransform = "uppercase";
  userEl.textContent = user;
});
