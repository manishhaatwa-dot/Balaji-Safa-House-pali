document.addEventListener("DOMContentLoaded", () => {

    const yearElement = document.getElementById("current-year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // GitHub Repository Details
    const GITHUB_OWNER = "manishhaatwa-dot";
    const GITHUB_REPO = "Balaji-Safa-House-pali";
    const GITHUB_BRANCH = "main";

    const categories = {
        saafa: "saafa-products",
        wedding: "wedding-products",
        formal: "formal-products",
        jutti: "jutti-products"
    };

    const imageExtensions = [
        ".jpg",
        ".jpeg",
        ".png",
        ".webp",
        ".gif"
    ];

    async function loadProducts() {

        for (const category in categories) {

            const container = document.getElementById(
                categories[category]
            );

            if (!container) continue;

            try {

                const apiUrl =
                    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/assets/products/${category}?ref=${GITHUB_BRANCH}`;

                const response = await fetch(apiUrl);

                if (!response.ok) {
                    throw new Error(
                        `GitHub API error: ${response.status}`
                    );
                }

                const files = await response.json();

                const images = files.filter(file =>
                    file.type === "file" &&
                    imageExtensions.some(ext =>
                        file.name.toLowerCase().endsWith(ext)
                    )
                );

                renderProducts(container, images);

            } catch (error) {

                console.error(
                    `Error loading ${category}:`,
                    error
                );

                container.innerHTML = `
                    <div class="empty-collection">
                        <i class="fa-regular fa-images"></i>
                        <p>Collection coming soon</p>
                    </div>
                `;
            }
        }
    }


    function renderProducts(container, images) {

        container.innerHTML = "";

        if (!images.length) {

            container.innerHTML = `
                <div class="empty-collection">
                    <i class="fa-regular fa-images"></i>
                    <p>Collection coming soon</p>
                </div>
            `;

            return;
        }


        images.forEach(file => {

            const card = document.createElement("div");
            card.className = "product-card";


            const imageWrap = document.createElement("div");
            imageWrap.className = "product-image-wrap";


            const image = document.createElement("img");
            image.className = "product-image";

            image.src =
                `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${file.path}`;

            image.loading = "lazy";


            // Filename se product name
            let productName = file.name
                .replace(/\.[^/.]+$/, "")
                .replace(/[-_]+/g, " ")
                .replace(/\s+/g, " ")
                .trim();


            // First letter capital
            productName = productName
                .replace(/\b\w/g, letter =>
                    letter.toUpperCase()
                );


            image.alt = productName;


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


            const name = document.createElement("div");
            name.className = "product-name";
            name.textContent = productName;


            card.appendChild(imageWrap);
            card.appendChild(name);

            container.appendChild(card);

        });
    }


    loadProducts();

});
