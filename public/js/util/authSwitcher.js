const loginSwitch = document.getElementById("loginSwitch");
const registerSwitch = document.getElementById("registerSwitch");
const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");

loginSwitch.addEventListener("click", (e) => {
    e.preventDefault();
    if (loginForm.classList.contains("hidden-mobile")) {
        loginSwitch.classList.add("active-button");
        registerSwitch.classList.remove("active-button");
        loginForm.classList.remove("hidden-mobile");
        registerForm.classList.add("hidden-mobile");
    }
});

registerSwitch.addEventListener("click", (e) => {
    e.preventDefault();
    if (registerForm.classList.contains("hidden-mobile")) {
        loginSwitch.classList.remove("active-button");
        registerSwitch.classList.add("active-button");
        loginForm.classList.add("hidden-mobile");
        registerForm.classList.remove("hidden-mobile");
    }
});
