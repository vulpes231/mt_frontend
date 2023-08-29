export async function registerUser(reqBody) {
  const reqOptions = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(reqBody),
  };

  try {
    const url = "https://metrometa.org/enroll";
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

export async function loginUser(reqBody) {
  const reqOptions = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(reqBody),
  };

  try {
    const url = "https://server.metrometa.org/auth";
    const res = await fetch(url, reqOptions);
    const message = await res.json();

    const status = res.status;
    console.log(message);

    const data = {
      accessToken: message.accessToken,
      status: status,
      message: message.message,
    };

    return data;
  } catch (err) {
    console.log(err);
  }
}

export function displayError(msg) {
  const errEl = document.getElementById("error");
  errEl.textContent = msg;
  errEl.style.color = "red";
  errEl.style.display = "block";
  setTimeout(() => {
    errEl.style.display = "none";
  }, 2000);
}

export function displaySuccess() {
  const succEl = document.getElementById("success");
  succEl.textContent = "User logged in successfully";
  succEl.style.color = "green";
  succEl.style.display = "block";
}
