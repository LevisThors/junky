const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

fetch(`http://localhost:3000/products/${productId}`)
    .then((response) => response.json())
    .then((product) => {
        document.getElementById("productImage").src = product.image;
        document.getElementById("productTitle").textContent = product.title;
        document.getElementById("productDescription").textContent =
            product.description;
        document.getElementById(
            "productStatus"
        ).textContent = `Status: ${product.status}`;
        product.status === "In Stock"
            ? document.getElementById("productStatus").classList.add("in-stock")
            : document
                  .getElementById("productStatus")
                  .classList.add("out-of-stock");
        document.getElementById(
            "productPrice"
        ).textContent = `Price: $${product.price}`;
    })
    .catch((error) => {
        console.error("Error retrieving product details:", error);
    });
