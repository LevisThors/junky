document.addEventListener("DOMContentLoaded", function () {
    const userId = localStorage.getItem("userId");
    if (userId) {
        fetch(`http://localhost:3000/users/${userId}`)
            .then((response) => response.json())
            .then((user) => {
                if (user.signed_in === 1) {
                    const name = `${user.name} ${
                        user.lastname ? user.lastname : ""
                    }`;
                    renderLoggedInUser(name, userId);
                } else {
                    renderLoginRegisterButtons();
                }
            })
            .catch((error) => {
                console.error("Error retrieving user data:", error);
            });
    } else {
        renderLoginRegisterButtons();
    }
});

function renderLoggedInUser(name, userId) {
    const buttonsContainer = document.querySelector(".buttons");
    const mobileButtonsContainer = document.querySelector(
        ".mobile-auth-buttons"
    );

    const userButtonDesktop = document.createElement("a");
    const logoutButtonDesktop = document.createElement("a");

    logoutButtonDesktop.textContent = "Log Out";
    logoutButtonDesktop.style.cursor = "pointer";
    logoutButtonDesktop.id = "logoutButton";

    userButtonDesktop.textContent = name;

    const userButtonMobile = document.createElement("a");
    const logoutButtonMobile = document.createElement("a");

    logoutButtonMobile.textContent = "Log Out";
    logoutButtonMobile.style.cursor = "pointer";
    logoutButtonMobile.id = "logoutButton";

    userButtonMobile.textContent = name;

    buttonsContainer.innerHTML = "";
    mobileButtonsContainer.innerHTML = "";

    buttonsContainer.appendChild(userButtonDesktop);
    buttonsContainer.appendChild(logoutButtonDesktop);
    mobileButtonsContainer.appendChild(userButtonMobile);
    mobileButtonsContainer.appendChild(logoutButtonMobile);

    document.getElementById("logoutButton").addEventListener("click", (e) => {
        e.preventDefault();
        logout(userId);
    });
}

function renderLoginRegisterButtons() {
    const buttonsContainer = document.querySelector(".buttons");
    const mobileButtonsContainer = document.querySelector(
        ".mobile-auth-buttons"
    );

    const loginButtonDesktop = document.createElement("a");
    loginButtonDesktop.href = "/login.html";
    loginButtonDesktop.textContent = "Login";

    const registerButtonDesktop = document.createElement("a");
    registerButtonDesktop.href = "/login.html";
    registerButtonDesktop.textContent = "Register";

    const loginButtonMobile = document.createElement("a");
    loginButtonMobile.href = "/login.html";
    loginButtonMobile.textContent = "Login";

    const registerButtonMobile = document.createElement("a");
    registerButtonMobile.href = "/login.html";
    registerButtonMobile.textContent = "Register";

    buttonsContainer.innerHTML = "";
    mobileButtonsContainer.innerHTML = "";

    buttonsContainer.appendChild(loginButtonDesktop);
    buttonsContainer.appendChild(registerButtonDesktop);
    mobileButtonsContainer.appendChild(loginButtonMobile);
    mobileButtonsContainer.appendChild(registerButtonMobile);
}

function logout(userId) {
    fetch(`http://localhost:3000/users/${userId}`)
        .then((response) => response.json())
        .then((user) => {
            user.signed_in = 0;

            fetch(`http://localhost:3000/users/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            })
                .then((response) => response.json())
                .then((updatedUser) => {
                    window.location.href = "/index.html";

                    console.log("User logged out successfully:", updatedUser);
                })
                .catch((error) => {
                    console.error("Error updating user data:", error);
                });
        })
        .catch((error) => {
            console.error("Error retrieving user data:", error);
        });
}
