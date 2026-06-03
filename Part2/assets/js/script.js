/* ARTICLE 3 API FORM */

// CHECKBOXES
const checkboxes = document.querySelectorAll('input[name="api"]');
const input = document.getElementById("user_input");
const output = document.getElementById("output");
const fetchButton = document.getElementById("fetchButton");

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {


        checkboxes.forEach((cb) => {
            if (cb !== checkbox) {
                cb.checked = false;
            }
        });

        if (checkbox.checked) {

            if (checkbox.value === "quote") {
                input.style.display = "none";
            }

            if (checkbox.value === "password") {
                input.style.display = "block";
            }

        } else {
            input.style.display = "none";
        }
    });
});

// Button Event Listener
fetchButton.addEventListener("click", fetchData);

// API FUNCTIONALITY --------------------------------------------------

async function fetchData() {

    const selectedAPI = document.querySelector(
        'input[name="api"]:checked'
    );

    output.innerHTML = "";

    if (!selectedAPI) {
        output.innerHTML = "Select an API";
        return;
    }

    let apiURL = "";

    if (selectedAPI.value === "quote") {

        apiURL = "https://api.api-ninjas.com/v2/quoteoftheday";

    } else if (selectedAPI.value === "password") {

        const length = parseInt(input.value);

        if (!input.value || isNaN(length)) {
            output.innerHTML = "Please enter a password length";
            return;
        }

        if (length < 4 || length > 64) {
            output.innerHTML =
                "Password length must be between 4 and 64";
            return;
        }

        apiURL =
            `https://api.api-ninjas.com/v1/passwordgenerator?length=${length}`;
    }

    try {

        output.innerHTML = "Loading...";

        const response = await fetch(apiURL, {
            method: "GET",
            headers: {
                "X-Api-Key":
                    "pE8lojGptWagkzKQbYKxGbtDpkOuyj61UpERGAsX"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        if (selectedAPI.value === "quote") {

            output.innerHTML = `
                <div class="quote-box">
                    <h3>Quote of the Day</h3>
                    <p>
                        <strong>${data[0].quote}</strong>
                    </p>
                    <p>- ${data[0].author}</p>
                </div>
            `;

        } else if (selectedAPI.value === "password") {

            output.innerHTML = `
                <div class="password-box">
                    <h3>Random Password</h3>
                    <p>
                        <strong>${data.random_password}</strong>
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