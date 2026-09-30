// ======================================================
// DROIDZONE - MAIN JAVASCRIPT
// HTML + CSS + JAVASCRIPT ONLY
// ======================================================


// ================= CART DATA =================

let cart = JSON.parse(localStorage.getItem("droidCart")) || [];


// ================= FORMAT MONEY =================

function formatMoney(amount) {
    return "₦" + Number(amount).toLocaleString();
}


// ================= SAVE CART =================

function saveCart() {
    localStorage.setItem("droidCart", JSON.stringify(cart));
}


// ================= CART COUNT =================

function updateCartCount() {

    const cartCount = document.getElementById("cartCount");

    if (!cartCount) return;

    let count = 0;

    cart.forEach(function(item) {
        count += item.quantity;
    });

    cartCount.textContent = count;
}


// ================= ADD TO CART =================

document.querySelectorAll(".add-btn").forEach(function(button) {

    button.addEventListener("click", function(event) {

        event.stopPropagation();

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existing = cart.find(function(item) {
            return item.name === name;
        });

        if (existing) {

            existing.quantity++;

        } else {

            cart.push({
                name: name,
                price: price,
                quantity: 1
            });

        }

        saveCart();
        updateCartCount();

        button.textContent = "✓ Added";

        setTimeout(function() {
            button.textContent = "+ Cart";
        }, 1000);

    });

});


// ================= PHONE IMAGE NAMES =================

function getImageName(name) {

    const images = {

        "Samsung Galaxy S25":
            "samsung-s25.jpg",

        "Tecno Camon 30":
            "tecno-camon-30.jpg",

        "Infinix Note 40":
            "infinix-note-40.jpg",

        "Redmi Note 14":
            "redmi-note-14.jpg",

        "Google Pixel 9":
            "google-pixel-9.jpg",

        "Samsung Galaxy A56":
            "samsung-a56.jpg",

        "Samsung Galaxy A36 5G":
            "samsung-a36-5g.jpg",

        "Samsung Galaxy S24 FE":
            "samsung-s24-fe.jpg",

        "Tecno Camon 50":
            "tecno-camon-50.jpg",

        "Tecno Spark 30 Pro":
            "tecno-spark-30-pro.jpg",

        "Infinix Note 50":
            "infinix-note-50.jpg",

        "Infinix Hot 50 Pro+":
            "infinix-hot-50-pro-plus.jpg",

        "Redmi Note 14 Pro":
            "redmi-note-14-pro.jpg",

        "Google Pixel 9a":
            "google-pixel-9a.jpg",

        "OnePlus 13":
            "oneplus-13.jpg",

        "Nothing Phone 3a":
            "nothing-phone-3a.jpg"

    };

    return images[name] || "";

}


// ================= DISPLAY CART =================

function displayCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");

    const cartCount =
        document.getElementById("cartCount");


    // Not on cart page

    if (!cartItems) {
        updateCartCount();
        return;
    }


    cartItems.innerHTML = "";


    // EMPTY CART

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">

                <h2>Your cart is empty 🛒</h2>

                <p>
                    Add some Android phones to your cart.
                </p>

                <a href="index.html">
                    Continue Shopping
                </a>

            </div>
        `;

        if (cartTotal) {
            cartTotal.textContent = "₦0";
        }

        if (cartCount) {
            cartCount.textContent = "0";
        }

        return;
    }


    let total = 0;
    let itemCount = 0;


    // DISPLAY EACH PRODUCT

    cart.forEach(function(item, index) {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;

        itemCount += item.quantity;


        const div =
            document.createElement("div");

        div.className = "cart-item";


        div.innerHTML = `

            <img
                src="images/${getImageName(item.name)}"
                alt="${item.name}"
            >

            <div class="cart-item-info">

                <h3>
                    ${item.name}
                </h3>

                <p class="cart-price">
                    ${formatMoney(item.price)}
                </p>

                <p>
                    Subtotal:
                    <strong>
                        ${formatMoney(itemTotal)}
                    </strong>
                </p>

            </div>


            <div class="quantity-controls">

                <button
                    onclick="decreaseQuantity(${index})">
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="increaseQuantity(${index})">
                    +
                </button>

            </div>


            <button
                class="remove-item"
                onclick="removeFromCart(${index})">

                Remove

            </button>

        `;


        cartItems.appendChild(div);

    });


    // UPDATE TOTAL

    if (cartTotal) {
        cartTotal.textContent =
            formatMoney(total);
    }


    if (cartCount) {
        cartCount.textContent =
            itemCount;
    }

}


// ================= INCREASE QUANTITY =================

function increaseQuantity(index) {

    cart[index].quantity++;

    saveCart();

    displayCart();

    updateCartCount();

}


// ================= DECREASE QUANTITY =================

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    saveCart();

    displayCart();

    updateCartCount();

}


// ================= REMOVE PRODUCT =================

function removeFromCart(index) {

    cart.splice(index, 1);

    saveCart();

    displayCart();

    updateCartCount();

}


// ================= CLEAR CART =================

const clearCartButton =
    document.getElementById("clearCart");


if (clearCartButton) {

    clearCartButton.addEventListener(
        "click",
        function() {

            if (cart.length === 0) {
                return;
            }


            const confirmClear =
                confirm(
                    "Are you sure you want to clear your cart?"
                );


            if (confirmClear) {

                cart = [];

                saveCart();

                displayCart();

                updateCartCount();

            }

        }
    );

}


// ================= WHATSAPP CHECKOUT =================

const checkoutButton =
    document.getElementById("checkoutBtn");

const whatsappCheckout =
    document.getElementById("whatsappCheckout");


function checkoutWhatsApp() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }


    // YOUR WHATSAPP NUMBER

    const whatsappNumber =
        "2349112330855";


    let message =
        "Hello DroidZone 👋\n\n";

    message +=
        "I want to place an order:\n\n";


    let total = 0;


    cart.forEach(function(item) {

        const subtotal =
            item.price * item.quantity;

        total += subtotal;


        message +=
            "📱 " +
            item.name +
            "\n";

        message +=
            "Quantity: " +
            item.quantity +
            "\n";

        message +=
            "Price: " +
            formatMoney(item.price) +
            "\n";

        message +=
            "Subtotal: " +
            formatMoney(subtotal) +
            "\n\n";

    });


    message +=
        "💰 TOTAL: " +
        formatMoney(total) +
        "\n\n";

    message +=
        "Please send me the payment and delivery details.";


    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);


    window.open(
        whatsappURL,
        "_blank"
    );

}


// Homepage checkout button

if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        checkoutWhatsApp
    );

}


// Cart page checkout button

if (whatsappCheckout) {

    whatsappCheckout.addEventListener(
        "click",
        checkoutWhatsApp
    );

}


// ================= CART SIDEBAR =================

const cartBtn =
    document.getElementById("cartBtn");

const cartSidebar =
    document.getElementById("cartSidebar");

const cartOverlay =
    document.getElementById("cartOverlay");

const closeCart =
    document.getElementById("closeCart");


function openCart() {

    if (!cartSidebar || !cartOverlay) return;

    cartSidebar.classList.add("active");

    cartOverlay.classList.add("active");

    displayCart();

}


function closeCartBox() {

    if (!cartSidebar || !cartOverlay) return;

    cartSidebar.classList.remove("active");

    cartOverlay.classList.remove("active");

}


if (cartBtn) {

    cartBtn.addEventListener(
        "click",
        openCart
    );

}


if (closeCart) {

    closeCart.addEventListener(
        "click",
        closeCartBox
    );

}


if (cartOverlay) {

    cartOverlay.addEventListener(
        "click",
        closeCartBox
    );

}


// ================= SEARCH =================

const searchBtn =
    document.getElementById("searchBtn");

const searchBox =
    document.getElementById("searchBox");

const searchInput =
    document.getElementById("searchInput");


if (searchBtn && searchBox && searchInput) {

    searchBtn.addEventListener(
        "click",
        function() {

            searchBox.classList.toggle("active");

            if (
                searchBox.classList.contains("active")
            ) {

                searchInput.focus();

            }

        }
    );


    searchInput.addEventListener(
        "input",
        function() {

            const searchText =
                searchInput.value.toLowerCase();


            document
                .querySelectorAll(".phone-card")
                .forEach(function(card) {

                    const name =
                        card.dataset.name.toLowerCase();

                    const brand =
                        card.dataset.brand.toLowerCase();


                    if (
                        name.includes(searchText) ||
                        brand.includes(searchText)
                    ) {

                        card.style.display = "";

                    } else {

                        card.style.display = "none";

                    }

                });

        }
    );

}


// ================= BRAND FILTER =================

const brandButtons =
    document.querySelectorAll(".brand-btn");


brandButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            const selectedBrand =
                button.dataset.brand;


            brandButtons.forEach(
                function(btn) {

                    btn.classList.remove("active");

                }
            );


            button.classList.add("active");


            document
                .querySelectorAll(".phone-card")
                .forEach(function(card) {

                    if (
                        selectedBrand === "all" ||
                        card.dataset.brand === selectedBrand
                    ) {

                        card.style.display = "";

                    } else {

                        card.style.display = "none";

                    }

                });

        }
    );

});


// ================= SORT PRODUCTS =================

const sortProducts =
    document.getElementById("sortProducts");

const phoneGrid =
    document.getElementById("phoneGrid");


if (sortProducts && phoneGrid) {

    sortProducts.addEventListener(
        "change",
        function() {

            const cards =
                Array.from(
                    phoneGrid.querySelectorAll(
                        ".phone-card"
                    )
                );


            if (
                sortProducts.value === "low"
            ) {

                cards.sort(function(a, b) {

                    return Number(
                        a.dataset.price
                    ) -
                    Number(
                        b.dataset.price
                    );

                });

            }


            if (
                sortProducts.value === "high"
            ) {

                cards.sort(function(a, b) {

                    return Number(
                        b.dataset.price
                    ) -
                    Number(
                        a.dataset.price
                    );

                });

            }


            cards.forEach(function(card) {

                phoneGrid.appendChild(card);

            });

        }
    );

}


// ================= MOBILE MENU =================

const menuBtn =
    document.getElementById("menuBtn");


if (menuBtn) {

    menuBtn.addEventListener(
        "click",
        function() {

            const navLinks =
                document.querySelector(".nav-links");


            if (!navLinks) return;


            if (
                navLinks.style.display === "flex"
            ) {

                navLinks.style.display = "none";

            } else {

                navLinks.style.display = "flex";

                navLinks.style.flexDirection =
                    "column";

                navLinks.style.position =
                    "absolute";

                navLinks.style.top =
                    "65px";

                navLinks.style.left =
                    "0";

                navLinks.style.right =
                    "0";

                navLinks.style.background =
                    "#101010";

                navLinks.style.padding =
                    "20px";

            }

        }
    );

}


// ================= START =================

updateCartCount();

displayCart();