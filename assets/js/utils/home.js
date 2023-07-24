const accessToken = sessionStorage.getItem("accessToken");
export function homeButton(e) {
  e.preventDefault();
  if (!accessToken) {
    window.location.href = "/index.html";
  } else {
    window.location.href = "/dashboard.html";
  }
  console.log("clicked");
}
