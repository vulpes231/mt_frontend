import { liveurl } from "../constants.js";

export async function getUserAccounts(username, accessToken) {
  const url = `${liveurl}/account/${username}`;
  const reqOptions = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    credentials: "include",
  };

  try {
    const response = await fetch(url, reqOptions);
    const data = await response.json();
    // console.log(response.status);

    if (response.status === 403) {
      localStorage.clear();
      sessionStorage.clear();
      window.location = "/login/";
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}
