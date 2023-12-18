import { liveurl } from "../constants.js";

export async function getUserExternalAccounts(username, accessToken) {
  const url = `${liveurl}/external/${username}`;
  console.log(url);
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
    console.log("External", data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
