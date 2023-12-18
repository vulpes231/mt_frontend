import { liveurl } from "../constants";

export async function getUserAccounts(username, accessToken) {
  const url = `${liveurl}/accounts/${username}`;
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
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
