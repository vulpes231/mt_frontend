import { liveurl } from "../constants.js";

// const devurl = `http://localhost:3500`;

const rouEl = document.getElementById("routing");
const acctEl = document.getElementById("acct");
const nickEl = document.getElementById("nick");
const typeEl = document.getElementById("type");

export async function addNewExternalAcct(accessToken) {
  const account_no = acctEl.value;
  const routing_no = rouEl.value;
  const nickname = nickEl.value;
  const acct_type = typeEl.value;

  const reqBody = {
    account_num: account_no,
    routing_num: routing_no,
    nickname: nickname || null,
    account_type: acct_type,
  };

  console.log(reqBody);

  const reqOptions = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    credentials: "include",
    body: JSON.stringify(reqBody),
  };

  try {
    const url = `${liveurl}/external`;
    const response = await fetch(url, reqOptions);
    const data = await response.json();
    // console.log(data);

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
