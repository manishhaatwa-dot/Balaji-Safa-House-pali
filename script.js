/* =====================================================
   BALAJI SAAFA HOUSE
   Dynamic Product Gallery
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------------------------
       Current Year
    ------------------------------------------------ */
    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    /* -----------------------------------------------
       Product Categories
    ------------------------------------------------ */

    const categories = {
        saafa: "saafa-products",
        wedding: "wedding-products",
        formal: "formal-products",
        jutti: "jutti-products"
    };


    /* -----------------------------------------------
       Load Products
    ------------------------------------------------ */

    async function loadProducts() {

        try {

            const response = await fetch("products.json", {
                cache: "no-store"
            });

            if (!response.ok) {
                throw new Error("products.json not found");
            }

            const products = await response.json();

            Object.keys(categories).forEach(category => {

                const container =
                    document.getElementById(categories[category]);

                if (!container) return;

                const categoryProducts =
                    products.filter(product =>
                        product.category === category
                    );

                renderProducts(
                    container,
                    categoryProducts
                );

            });

        } catch (error) {

            console.error("Product loading error:", error);

            Object.values(categories).forEach(id => {

                const container =
                    document.getElementById(id);

                if (!container) return;

                container.innerHTML = `
                    <div class="empty-collection">
                        <i class="fa-regular fa-images"></i>
                        <p>Collection coming soon</p>
                    </div>
                `;

            });

        }

    }


    /* -----------------------------------------------
       Create Product Cards
    ------------------------------------------------ */

    function renderProducts(container, products) {

        container.innerHTML = "";

        if (!products.length) {

            container.innerHTML = `
                <div class="empty-collection">
                    <i class="fa-regular fa-images"></i>
                    <p>Collection coming soon</p>
                </div>
            `;

            return;
        }


        products.forEach(product => {

            const card =
                document.createElement("div");

            card.className = "product-card";


            const imageWrap =
                document.createElement("div");

            imageWrap.className =
                "product-image-wrap";


            const image =
                document.createElement("img");

            image.className =
                "product-image";

            image.src =
                product.image;

            image.alt =
                product.name;

            image.loading =
                "lazy";


            /* -----------------------------------------
               Image Error
            ------------------------------------------ */

            image.onerror = () => {

                imageWrap.innerHTML = `
                    <div style="
                        width:100%;
                        height:100%;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        color:#7b1113;
                        background:#f5ead0;
                        font-size:35px;
                    ">
                        <i class="fa-regular fa-image"></i>
                    </div>
                `;

            };


            imageWrap.appendChild(image);


            /* -----------------------------------------
               Product Name
            ------------------------------------------ */

            const name =
                document.createElement("div");

            name.className =
                "product-name";

            name.textContent =
                product.name;


            card.appendChild(imageWrap);

            card.appendChild(name);

            container.appendChild(card);

        });

    }


    /* -----------------------------------------------
       Start
    ------------------------------------------------ */

    loadProducts();

});