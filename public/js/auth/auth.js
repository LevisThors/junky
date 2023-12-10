document.getElementById("registerBtn").addEventListener("click", (e) => {
    e.preventDefault();

    const email = document.getElementById("registerEmail").value;
    const name = document.getElementById("registerName").value;
    const lastname = document.getElementById("registerLastname").value;
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById(
        "registerConfirmPassword"
    ).value;

    if (password.length < 5) {
        document.getElementById("registrationError").textContent =
            "Password should be at least 5 characters long.";
        return;
    }

    if (password !== confirmPassword) {
        document.getElementById("registrationError").textContent =
            "Passwords do not match.";
        return;
    }

    const user = {
        email: email,
        name: name,
        lastname: lastname,
        password: password,
    };

    fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
        .then((response) => response.json())
        .then((registeredUser) => {
            login(registeredUser.email, registeredUser.password);
        })
        .catch((error) => {
            console.error("Error registering user:", error);
        });
});

document.getElementById("loginBtn").addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    fetch(`http://localhost:3000/users?email=${email}&password=${password}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.length > 0) {
                console.log("User logged in successfully:", data[0]);
                login(email, password);
            } else {
                document.getElementById("loginError").textContent =
                    "Invalid E-mail or Password.";
            }
        })
        .catch((error) => {
            console.error("Error logging in:", error);
        });
});

function login(email, password) {
    fetch("http://localhost:3000/users")
        .then((response) => response.json())
        .then((users) => {
            const user = users.find(
                (u) => u.email === email && u.password === password
            );

            if (user) {
                user.signed_in = 1;

                fetch(`http://localhost:3000/users/${user.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(user),
                })
                    .then((response) => response.json())
                    .then((updatedUser) => {
                        localStorage.setItem("userId", updatedUser.id);
                        window.location.href = "/index.html";
                    })
                    .catch((error) => {
                        console.error("Error updating user data:", error);
                    });
            } else {
                console.log("Invalid credentials");
            }
        })
        .catch((error) => {
            console.error("Error retrieving user data:", error);
        });
}
