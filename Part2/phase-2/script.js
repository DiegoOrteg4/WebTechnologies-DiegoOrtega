/* ARTICLE 3 API FORM*/
const radios = document.querySelectorAll('input[name="api"]');
const input = document.getElementById("user_input");

radios.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (radio.value === "quote" && radio.checked) {
      input.style.display = "none";
    }

    if (radio.value === "password" && radio.checked) {
      input.style.display = "block";
      input.style.alignContent = "center";
    }
  });
});

// APIS FUNCTIONALITY --------------------------------------------------

async function fetchData() {
  const selectedAPI = document.querySelector('input[name="api"]:checked');

  const userInput = document.getElementById("user_input");

  const output = document.getElementById("output");

  output.innerHTML = "";

  if (!selectedAPI) {
    output.innerHTML = "Select an API";
    return;
  }

  let apiURL = "";

  if (selectedAPI.value === "quote") {
    apiURL = "https://api.api-ninjas.com/v2/quoteoftheday";
  } else if (selectedAPI.value === "password") {
    const length = parseInt(userInput.value);

    if (!userInput.value || isNaN(length)) {
      output.innerHTML = "Please enter a password length";
      return;
    }

    if (length < 4 || length > 64) {
      output.innerHTML = "Password length must be between 4 and 64";
      return;
    }

    apiURL = `https://api.api-ninjas.com/v1/passwordgenerator?length=${length}`;
  }

  try {
    output.innerHTML = "Loading...";

    const response = await fetch(apiURL, {
      method: "GET",
      headers: {
        "X-Api-Key": "pE8lojGptWagkzKQbYKxGbtDpkOuyj61UpERGAsX",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    console.log(data);

    if (selectedAPI.value === "quote") {
      output.innerHTML = `
                <div class="quote-box">
                    <h3>Quote of the Day</h3>
                    <p>
                        <strong>
                            ${data[0].quote}
                        </strong>
                    </p>
                    <p>- ${data[0].author}</p>
                </div>
            `;
    } else if (selectedAPI.value === "password") {
      output.innerHTML = `
                <div class="password-box">
                    <h3>Random Password</h3>
                    <p>
                        <strong>
                            ${data.random_password}
                        </strong>
                    </p>
                </div>
            `;
    }
  } catch (error) {
    output.innerHTML = `
            <p style="color:red;">
                Error: ${error.message}
            </p>
        `;
  }
}

// commit create and connect check boxes to the API
