const accessToken = sessionStorage.getItem("accessToken");
export function homeButton(e) {
  e.preventDefault();
  if (!accessToken) {
    window.location.href = "/";
  } else {
    window.location.href = "/dashboard/";
  }
  console.log("clicked");
}
