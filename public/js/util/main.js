function getProducts() {
    fetch("http://localhost:3000/products")
        .then((response) => response.json())
        .then((data) => {
            const productCarousel = document.getElementById("productCarousel");
            data.forEach((product) => {
                const card = document.createElement("a");
                card.href = `details.html?id=${product.id}`;
                card.classList.add("carousel-item", "card");
                const image = document.createElement("img");
                image.classList.add("card-image");
                image.src = product.image;
                card.appendChild(image);

                const title = document.createElement("h4");
                title.classList.add("card-title");
                title.textContent = product.title;
                card.appendChild(title);

                const rating = document.createElement("span");
                rating.classList.add("card-rating");
                rating.textContent = product.rating;
                card.appendChild(rating);

                const price = document.createElement("span");
                price.classList.add("card-price");
                price.textContent = "$" + product.price;
                card.appendChild(price);

                if (product.status === "Out of Stock") {
                    const label = document.createElement("span");
                    label.classList.add("label");
                    label.textContent = "Out of Stock";
                    card.appendChild(label);
                }

                productCarousel.appendChild(card);
            });

            // Carousel
            var carouselContainer = document.querySelector(
                ".carousel-container"
            );
            var carousel = document.querySelector(".carousel");
            var carouselItems = document.querySelectorAll(".carousel-item");
            var itemWidth = carouselItems[0].offsetWidth;
            var visibleItems = Math.floor(
                carouselContainer.offsetWidth / itemWidth
            );
            var scrollStep = itemWidth + 30;
            var currentScrollPosition = 0;

            var prevBtn = document.querySelector(".carousel-arrow-left");
            var nextBtn = document.querySelector(".carousel-arrow-right");

            function scrollToPosition(position) {
                currentScrollPosition = position;
                carousel.style.transform = `translateX(-${currentScrollPosition}px)`;
            }

            prevBtn.addEventListener("click", function () {
                if (currentScrollPosition > 0) {
                    scrollToPosition(currentScrollPosition - scrollStep);
                }
            });

            nextBtn.addEventListener("click", function () {
                if (
                    currentScrollPosition <
                    (carouselItems.length - visibleItems) * itemWidth
                ) {
                    scrollToPosition(currentScrollPosition + scrollStep);
                }
            });
        })
        .catch((error) => {
            console.error("Error retrieving product data:", error);
        });
}

getProducts();
