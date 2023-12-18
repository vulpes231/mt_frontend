import { liveurl } from "../constants.js";
import { getUserAccounts } from "./get-user-accts.js";

// get transfer form elements

const fromEl = document.getElementById("from");
const toEl = document.getElementById("to");
const amountEl = document.getElementById("amount");
const memoEl = document.getElementById("memo");
const errorEl = document.getElementById("transfer-error");

export async function sendMoney(username, accessToken) {
  const sender = fromEl.value;
  const receiver = toEl.value;
  const amount = amountEl.value;
  const memo = memoEl.value;
  const reqBody = {
    from: sender,
    to: receiver,
    amount: amount,
    memo: memo || null,
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
    const url = `${liveurl}/transfer`;
    const response = await fetch(url, reqOptions);

    if (!response.ok) {
      errorEl.style.display = "flex";
      errorEl.style.color = "red";
      if (response.status === 400) {
        errorEl.textContent = response.message;
      } else if (response.status === 404) {
        errorEl.textContent = response.message;
      } else if (response.status === 500) {
        errorEl.textContent = response.message;
      }
    } else {
      const data = await response.json();
      console.log(data);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}
