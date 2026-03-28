let arrayShop = [];
let categoriesArray = [];
const BASE_URL = "assets/data/";

$(document).ready(function(){
    function ajaxCallback(fileName, onSuccess) {
        $.ajax({
            url: BASE_URL + fileName,
            method: "GET",
            dataType: "json",
            success: onSuccess,
            error: function(xhr) {
                console.log("Error loading " + url, xhr);
            }
        });
    }
    ajaxCallback("menu.json", function(menuData){
        renderMenu(menuData);
        renderFooter(menuData);
    });
    ajaxCallback("categories.json", function(categoriesData){
        categoriesArray = categoriesData;
        renderDropDown("All Categories", categoriesData, "categories", "id");
        renderCategories(categoriesData);
    });
    ajaxCallback("shop.json", function(shopData){
        arrayShop = shopData;
        renderShop(shopData);
        renderFeatured(shopData);
    });
    ajaxCallback("size.json", function(sizeData){
        renderDropDown("All Sizes", sizeData, "sizes", "name");
    });
    ajaxCallback("brand.json", function(brandData){
        renderDropDown("All Brands", brandData, "brands", "name");
    });
    ajaxCallback("sort.json", function(sortData){
        renderDropDown("Sort Products", sortData, "sort");
    });
});


//     $.ajax({
//         url:"assets/data/menu.json",
//         method:"GET",
//         dataType:"json",
//         success:function(menuData){
//             renderMenu(menuData);
//             renderFooter(menuData);
//         },
//         error:function(xhr){
//             console.log(xhr);
//         }
//     })
// });
// $(document).ready(function(){
//     $.ajax({
//         url:"assets/data/categories.json",
//         method:"GET",
//         dataType:"json",
//         success:function(categoriesData){
//             categoriesArray = categoriesData;
//             renderDropDown("All Categories", categoriesArray, "categories");
//             renderCategories(categoriesData);
//         },
//         error:function(xhr){
//             console.log(xhr);
//         }
//     })
// });
// $(document).ready(function(){
//     $.ajax({
//         url:"assets/data/shop.json",
//         method:"GET",
//         dataType:"json",
//         success:function(shopData){
//             arrayShop = shopData;
//             renderShop(shopData);
//             renderFeatured(shopData);
//         },
//         error:function(xhr){
//             console.log(xhr);
//         }
//     })
// });
// $(document).ready(function(){
//     $.ajax({
//         url:"assets/data/size.json",
//         method:"GET",
//         dataType:"json",
//         success:function(sizeData){
//             renderDropDown("All Sizes", sizeData, "sizes", "name", "id");
            
//         },
//         error:function(xhr){
//             console.log(xhr);
//         }
//     })
// });
// $(document).ready(function(){
//     $.ajax({
//         url:"assets/data/brand.json",
//         method:"GET",
//         dataType:"json",
//         success:function(brandData){
//             renderDropDown("All Brands", brandData, "brands", "name");
//         },
//         error:function(xhr){
//             console.log(xhr);
//         }
//     })
// });
// $(document).ready(function(){
//     $.ajax({
//         url:"assets/data/sort.json",
//         method:"GET",
//         dataType:"json",
//         success:function(sortData){
//             renderDropDown("Sort Products", sortData, "sort");
//         },
//         error:function(xhr){
//             console.log(xhr);
//         }
//     })
// });
function renderMenu(menuData){
    let data="";
    for(let menu of menuData){
        if(menu.name=="Documentation"){
            data+=`<li class="nav-item">
                        <a class="nav-link" href="${menu.href}" target="_blank">${menu.name}</a>
                    </li>`
        }
        else{
        data+=`<li class="nav-item">
                        <a class="nav-link" href="${menu.href}">${menu.name}</a>
                    </li>`
        }
    }
    document.querySelector(".data").innerHTML = data;
}

function renderCategories(categoriesData){
    let data="";
    for(let categories of categoriesData){
        data+=`
        <div class="col-12 col-md-4 p-4 mt-3 text-center">
                    <img src="${categories.img}"  class="category-img rounded-circle img-fluid border" alt="${categories.name}">
                <h3 class="h5 mt-3 mb-3">${categories.name}</h3>
                <p>${categories.description}</p>
                <p><a href="shop.html" class="btn btn-success">View More</a></p>
            </div>`
    }
    document.getElementById("category").innerHTML = data;
}

function renderFooter(menuData){
    let data="";
    for(let footer of menuData){
        data+=`<li><a href="${footer.href}">${footer.name}</a></li>`
    }
    document.querySelector(".footer").innerHTML = data;
}

function getCategoryName(categoryId){
    for(let i = 0; i < categoriesArray.length; i++){
        if(categoriesArray[i].id == categoryId){
            return categoriesArray[i].name;
        }
    }
    return "";
}

function renderProductCard(shop){
    return `<div class="col-md-4">
                <div class="card mb-4 product-wap rounded-0">
                    <div class="card rounded-0 position-relative image-holder">
                        ${renderBadge(shop)}
                        <img class="card-img rounded-0 img-fluid" src="${shop.image}">
                        
                    </div>
                    <div class="card-body">
                        <a href="shop-single.html" class="h3 text-decoration-none">${shop.name}</a>
                        <p class="text-muted mb-1">${shop.details.brand}</p>
                        <ul class="w-100 list-unstyled d-flex justify-content-between mb-0">
                        <li class="product-size">${renderSize(shop.availability)}</li>
                            
                        </ul>
                        ${renderStock(shop.availability)}
                        <p class="mb-0">${renderPrice(shop.price)}</p>
                        <button class="mt-3 btn btn-success w-100" onclick="addToCart(${shop.id})">
                            <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div>
            </div>`;
}

function renderShop(shopData){
    let data = "";
    for(let shop of shopData){
        data += renderProductCard(shop);
    }

    if(document.getElementById("shop")){
        document.getElementById("shop").innerHTML = data;
    }
}

function renderFeatured(arrayShop){
    let data = "";
    for(let shop of arrayShop){
        if(shop.isFeatured){
            data += renderProductCard(shop);
        }
    }

    if(document.getElementById("featuredProducts")){
        document.getElementById("featuredProducts").innerHTML = data;
    }
}

function renderSize(array){
    let data ="";
    for(let a of array){
        data+=a.size;
        if(array.indexOf(a) !== array.length - 1){
            data += " / ";
        }
    }
    return data;
}

function renderPrice(price){
    if(price.discount){
        let oldPrice = price.regular;
        let newPrice = oldPrice - price.discount/100 * oldPrice;

        return `<span style="text-decoration: line-through; color: gray; margin-right:5px;">
                    ${oldPrice.toFixed(2)}${price.currency}
                </span>
                <span style="color:#C88EA7;">
                    ${newPrice.toFixed(2)}${price.currency}
                </span>`;
    }

    return price.regular.toFixed(2) + price.currency;
}

function finalPrice(product){
    if(product.price.discount){
        return product.price.regular - product.price.regular * product.price.discount / 100;
    }
    return product.price.regular;
}

function renderBadge(shop){
    let data = "";

    if(shop.isNew){
        data += `<span class="badge-new">NEW</span>`;
    }

    return data;
}

function renderStock(array){
    let total = 0;

    for(let item of array){
        total += item.stock;
    }

    if(total <= 3){
        return `<p class="text-left" style="color:#C88EA7; font-size:14px; margin:5px 0;">
                    Only a few left!
                </p>`;
    }

    return "";
}

// function renderFeatured(arrayShop){
//     let data="";
//     for(let shop of arrayShop){
//         if(shop.isFeatured){
//             data+=`<div class="col-12 col-md-4 mb-4">
//                     <div class="card h-100">
//                         <a href="shop-single.html">
//                             <img src="${shop.image}" class="card-img-top" alt="${shop.name}">
//                         </a>
//                         <div class="card-body text-center">
//                             <a href="shop-single.html" class="h4 text-decoration-none text-dark d-block mb-2">${shop.name}</a>
//                             <p class="card-text">
//                                 ${shop.isFeatured.description}
//                             </p>
//                             <p class="text-success fw-bold">${renderPrice(shop.price)}</p>
//                         </div>
//                     </div>
//                 </div>`
//         }
//     }
//     if(document.getElementById("featuredProducts")){
//     document.getElementById("featuredProducts").innerHTML = data;
// }
// }

function renderDropDown(firstOptionText, arrayData, id, valueField = "id"){
    let el = document.getElementById(id);
    if(!el) return;

    let data = `<option value="0">${firstOptionText}</option>`;
    for(let item of arrayData){
        data += `<option value="${item[valueField]}">${item.name}</option>`;
    }
    el.innerHTML = data;
}

function filterSort(){
    let coppiedArray = [...arrayShop];

    let category = document.getElementById("categories") 
    if(category.value != "0"){ 
        coppiedArray = coppiedArray.filter(function(element){ 
            return element.category == category.value 
        }); 
    } 
    let size = document.getElementById("sizes");
    if(size.value != "0"){
    coppiedArray = coppiedArray.filter(function(element){
        return element.availability.some(function(item){
            return item.size == size.value;
        });
    });
}
    let brand = document.getElementById("brands");
    if(brand.value != "0"){
        coppiedArray = coppiedArray.filter(function(element){
            return element.details.brand == brand.value;
        });
    }

    let sortValue = document.getElementById("sort").value;
    coppiedArray.sort(function(a,b){
        if(sortValue === "price-asc"){
            return finalPrice(a) - finalPrice(b);
        }
        if(sortValue === "price-desc"){
            return finalPrice(b) - finalPrice(a);
        }
        if(sortValue === "name-asc"){
            return a.name.localeCompare(b.name);
        }
        if(sortValue === "name-desc"){
            return b.name.localeCompare(a.name);
        }
        if(sortValue === "date-asc"){
        return new Date(a.date) - new Date(b.date);
        }
        if(sortValue === "date-desc"){
        return new Date(b.date) - new Date(a.date);
        }
    
    });
    renderShop(coppiedArray);
    
    
}
if(document.getElementById("categories")){
    document.getElementById("categories").addEventListener("change", filterSort);
}

if(document.getElementById("sizes")){
    document.getElementById("sizes").addEventListener("change", filterSort);
}

if(document.getElementById("brands")){
    document.getElementById("brands").addEventListener("change", filterSort);
}

if(document.getElementById("sort")){
    document.getElementById("sort").addEventListener("change", filterSort);
}


const CART_KEY = "modeline_cart";

// Ucitavanje korpe
function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Badge broj proizvoda
function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    const badge = document.getElementById("cart-count");
    if (badge) {
        badge.textContent = count;
    }
}

// Dodavanje proizvoda u korpu
function addToCart(productId) {
    const cart = getCart();
    const product = arrayShop.find(item => item.id === productId);

    if (!product) return;

    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        const firstAvailableSize = product.availability.length ? product.availability[0].size : "";

        cart.push({
            id: product.id,
            title: product.name,
            price: finalPrice(product),
            regularPrice: product.price.regular,
            image: product.image,
            category: product.category,
            size: firstAvailableSize,
            brand: product.details.brand,
            quantity: 1,
            currency: product.price.currency
        });
    }

    saveCart(cart);
    updateCartCount();
    showToast();
}

// Promena kolicine
function changeQuantity(productId, change) {
    let cart = getCart();

    cart = cart.map(item => {
        if (item.id === productId) {
            item.quantity += change;
            if (item.quantity < 1) item.quantity = 1;
        }
        return item;
    });

    saveCart(cart);
    renderCart();
    updateCartCount();
}

// Brisanje proizvoda
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);

    saveCart(cart);
    renderCart();
    updateCartCount();
}

// Prikaz korpe
function renderCart(){
    let cart = getCart();
    console.log(cart);
    let cartItemsContainer = document.getElementById("cart-items");
    let emptyCart = document.getElementById("empty-cart");

    let subtotalEl = document.getElementById("cart-subtotal");
    let shippingEl = document.getElementById("cart-shipping");
    let totalEl = document.getElementById("cart-total");

    if(!cartItemsContainer){
        return;
    }

    if(cart.length == 0){
        cartItemsContainer.innerHTML = "";
        if(emptyCart){
            emptyCart.classList.remove("d-none");
        }

        if(subtotalEl){
            subtotalEl.innerHTML = "$0.00";
        }
        if(shippingEl){
            shippingEl.innerHTML = "$0.00";
        }
        if(discountEl){
            discountEl.innerHTML = "$0.00";
        }
        if(totalEl){
            totalEl.innerHTML = "$0.00";
        }

        return;
    }

    if(emptyCart){
        emptyCart.classList.add("d-none");
    }

    let ispis = "";
    let subtotal = 0;

    for(let i = 0; i < cart.length; i++){
        let item = cart[i];
        let itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        ispis += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}" class="cart-item-img">

                <div class="cart-item-info">
                    <h3 class="cart-item-title">${item.title}</h3>
                    <p class="cart-item-meta">
                        Size: ${item.size} | Brand: ${item.brand}
                    </p>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>

                    <div class="qty-box">
                        <button class="qty-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
                        <span class="qty-number">${item.quantity}</span>
                        <button class="qty-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
                    </div>

                    <button class="remove-btn" onclick="removeFromCart(${item.id})">
                        <i class="fa fa-trash me-1"></i> Remove
                    </button>
                </div>

                <div class="cart-item-total">
                    $${itemTotal.toFixed(2)}
                </div>
            </div>
        `;
    }

    cartItemsContainer.innerHTML = ispis;

    let shipping = 0;
    if(subtotal > 0){
        shipping = 10;
    }

    let total = subtotal + shipping;

    if(subtotalEl){
        subtotalEl.innerHTML = "$" + subtotal.toFixed(2);
    }
    if(shippingEl){
        shippingEl.innerHTML = "$" + shipping.toFixed(2);
    }
    if(totalEl){
        totalEl.innerHTML = "$" + total.toFixed(2);
    }
}

// Pokretanje na load
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    renderCart();
});

function showToast(){
    let toast = document.getElementById("cart-toast");

    if(!toast){
        return;
    }

    toast.classList.add("show");

    setTimeout(function(){
        toast.classList.remove("show");
    }, 2000);
}

function renderCheckoutSummary() {
    const cart = getCart();

    const itemsContainer = document.getElementById("checkout-items");
    const subtotalEl = document.getElementById("checkout-subtotal");
    const shippingEl = document.getElementById("checkout-shipping");
    const totalEl = document.getElementById("checkout-total");

    if (!itemsContainer) return;

    if (cart.length === 0) {
        itemsContainer.innerHTML = `<p class="mb-0 text-muted">Your cart is empty.</p>`;
        if (subtotalEl) subtotalEl.textContent = "$0.00";
        if (shippingEl) shippingEl.textContent = "$0.00";
        if (totalEl) totalEl.textContent = "$0.00";
        return;
    }

    let html = "";
    let subtotal = 0;
    let shipping = 10;

    for (let item of cart) {
        let itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        html += `
            <div class="summary-product">
                <div>
                    <p class="summary-product-name">${item.title}</p>
                    <p class="summary-product-meta">Qty: ${item.quantity} | Size: ${item.size}</p>
                </div>
                <div>$${itemTotal.toFixed(2)}</div>
            </div>
        `;
    }

    itemsContainer.innerHTML = html;

    if (subtotalEl) subtotalEl.textContent = "$" + subtotal.toFixed(2);
    if (shippingEl) shippingEl.textContent = "$" + shipping.toFixed(2);
    if (totalEl) totalEl.textContent = "$" + (subtotal + shipping).toFixed(2);
}

document.addEventListener("DOMContentLoaded", function () {
    renderCheckoutSummary();
});

// CHECKOUT FORMA 

const checkoutForm = document.getElementById("checkout-form");

if(checkoutForm){

    const fullName = document.getElementById("fullName");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");
    const address = document.getElementById("address");
    const payment = document.getElementById("payment");
    const terms = document.getElementById("terms");

    const errorFullName = document.getElementById("errorFullName");
    const errorPhone = document.getElementById("errorPhone");
    const errorEmail = document.getElementById("errorEmail");
    const errorAddress = document.getElementById("errorAddress");
    const errorPayment = document.getElementById("errorPayment");
    const errorTerms = document.getElementById("errorTerms");

    checkoutForm.addEventListener("submit", function(e){
        e.preventDefault();

        try{

            let valid = true;

            const nameRegex = /^[A-ZŠĐŽČĆ][a-zšđžčć]{2,15}( [A-ZŠĐŽČĆ][a-zšđžčć]{2,15})+$/;
            const phoneRegex = /^[0-9+\s\/-]{6,20}$/;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const addressRegex = /^[A-Za-z0-9]{3,20}$/;

            // FULL NAME
            if(!nameRegex.test(fullName.value.trim())){
                errorFullName.textContent = "Name must contain name and surname";
                valid = false;
            }
            else{
                errorFullName.textContent = "";
            }

            // PHONE
            if(!phoneRegex.test(phone.value.trim())){
                errorPhone.textContent = "Invalid phone number";
                valid = false;
            }
            else{
                errorPhone.textContent = "";
            }

            // EMAIL
            if(!emailRegex.test(email.value.trim())){
                errorEmail.textContent = "Invalid email";
                valid = false;
            }
            else{
                errorEmail.textContent = "";
            }

            // ADDRESS
            if(!addressRegex.test(address.value.trim())){
                errorAddress.textContent = "Address is too short";
                valid = false;
            }
            else{
                errorAddress.textContent = "";
            }

            // PAYMENT
            if(payment.value === "0"){
                errorPayment.textContent = "Select payment method";
                valid = false;
            }
            else{
                errorPayment.textContent = "";
            }

            // TERMS
            if(!terms.checked){
                errorTerms.textContent = "You must confirm data";
                valid = false;
            }
            else{
                errorTerms.textContent = "";
            }

            // SUCCESS
            const toast = document.getElementById("checkout-toast");

            if(valid){
                toast.classList.add("show");

                setTimeout(() => {
                toast.classList.remove("show");
                }, 2500);

                checkoutForm.reset();
                localStorage.removeItem(CART_KEY);
                renderCart();
                updateCartCount();
            }

        }
        catch(error){
            console.log(error);
        }

    });
}