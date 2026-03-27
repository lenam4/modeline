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
        data+=`<li class="nav-item">
                        <a class="nav-link" href="${menu.href}">${menu.name}</a>
                    </li>`
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

function renderProductCard(shop){
    return `<div class="col-md-4">
                <div class="card mb-4 product-wap rounded-0">
                    <div class="card rounded-0 position-relative image-holder">
                        ${renderBadge(shop)}
                        <img class="card-img rounded-0 img-fluid" src="${shop.image}">
                        <div class="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                            <ul class="list-unstyled">
                                <li><a class="btn btn-success text-white" href="shop-single.html"><i class="far fa-heart"></i></a></li>
                                <li><a class="btn btn-success text-white mt-2" href="shop-single.html"><i class="far fa-eye"></i></a></li>
                                <li><a class="btn btn-success text-white mt-2" href="shop-single.html"><i class="fas fa-cart-plus"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="card-body">
                        <a href="shop-single.html" class="h3 text-decoration-none">${shop.name}</a>
                        <p class="text-muted mb-1">${shop.details.brand}</p>
                        <ul class="w-100 list-unstyled d-flex justify-content-between mb-0">
                            <li>${renderSize(shop.availability)}</li>
                            <li class="pt-2">
                                <span class="product-color-dot color-dot-red float-left rounded-circle ml-1"></span>
                                <span class="product-color-dot color-dot-blue float-left rounded-circle ml-1"></span>
                                <span class="product-color-dot color-dot-black float-left rounded-circle ml-1"></span>
                                <span class="product-color-dot color-dot-light float-left rounded-circle ml-1"></span>
                                <span class="product-color-dot color-dot-green float-left rounded-circle ml-1"></span>
                            </li>
                        </ul>
                        ${renderStock(shop.availability)}
                        <p class="mb-0">${renderPrice(shop.price)}</p>
                        <button class="mt-3 btn btn-success w-100">
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
    let data = `<option value="0">${firstOptionText}</option>`;
    for(let item of arrayData){
        data += `<option value="${item[valueField]}">${item.name}</option>`;
    }
    document.getElementById(id).innerHTML = data;
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
document.getElementById("categories").addEventListener("change", filterSort);
document.getElementById("sizes").addEventListener("change", filterSort);
document.getElementById("brands").addEventListener("change", filterSort);
document.getElementById("sort").addEventListener("change", filterSort);