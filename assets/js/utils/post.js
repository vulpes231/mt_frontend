export async function registerUser(reqBody) {
  const reqOptions = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(reqBody),
  };

  try {
    const url = "http://localhost:3500/register";
    const res = await fetch(url, reqOptions);
    const message = await res.json();
    const status = res.status;

    const data = {
      status: status,
      message: message.message,
    };

    return data;
  } catch (err) {
    console.log(err);
  }
}
