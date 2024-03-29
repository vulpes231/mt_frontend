const liveurl = `https://metro-m9ur.onrender.com`;

// const devurl = `http://localhost:3500`;

export async function registerUser(reqBody) {
  const reqOptions = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(reqBody),
  };

  try {
    const url = `${liveurl}/enroll`;
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
    const url = `${liveurl}/auth`;
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
