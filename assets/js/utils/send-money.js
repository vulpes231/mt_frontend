import { liveurl } from "../constants";
import { getUserAccounts } from "./get-user-accts";

// get transfer form elements

const fromEl = document.getElementById("from");
const toEl = document.getElementById("to");
const amountEl = document.getElementById("amount");
const memoEl = document.getElementById("memo");

export async function sendMoney(username, accessToken) {
  //   get user accounts
  const userAccounts = await getUserAccounts(username, accessToken);

  console.log(userAccounts);

  //   const sender = fromEl.value;
  //   const receiver = toEl.value;
  //   const amount = amountEl.value;
  //   const memo = memoEl.value;

  //   const reqBody = {
  //     from: sender,
  //     to: receiver,
  //     amount: amount,
  //     memo: memo || null,
  //   };

  //   console.log(reqBody);

  //   const reqOptions = {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //       Authorization: "Bearer " + accessToken,
  //     },
  //     credentials: "include",
  //     body: JSON.stringify(reqBody),
  //   };
  //   try {
  //     url = `${liveurl}/transfer`;
  //     const response = await fetch(url, reqOptions);
  //     const data = await res.json();

  //     console.log(data);
  //   } catch (error) {}
}
