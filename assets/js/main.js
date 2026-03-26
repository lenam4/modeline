let arrayShop = "";
$(document).ready(function(){
    $.ajax({
        url:"assets/data/menu.json",
        method:"GET",
        dataType:"json",
        success:function(menuData){
            renderMenu(menuData);
            renderFooter(menuData);
        },
        error:function(xhr){
            console.log(xhr);
        }
    })
});
$(document).ready(function(){
    $.ajax({
        url:"assets/data/categories.json",
        method:"GET",
        dataType:"json",
        success:function(categoriesData){
            renderCategories(categoriesData);
        },
        error:function(xhr){
            console.log(xhr);
        }
    })
});
$(document).ready(function(){
    $.ajax({
        url:"assets/data/shop.json",
        method:"GET",
        dataType:"json",
        success:function(shopData){
            arrayShop = shopData;
            renderShop(shopData);
            renderFeatured(shopData);
        },
        error:function(xhr){
            console.log(xhr);
        }
    })
});

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

function renderShop(shopData){
    let data=``;
    for(let shop of shopData){
        data+=`<div class="col-md-4">
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
                    </div>`
    }
    if(document.getElementById("shop")){
    document.getElementById("shop").innerHTML = data;
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
                    ${oldPrice}${price.currency}
                </span>
                <span style="color:#C88EA7;">
                    ${newPrice.toFixed(2)}${price.currency}
                </span>`;
    }

    return price.regular + price.currency;
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

function renderFeatured(arrayShop){
    let data="";
    for(let shop of arrayShop){
        if(shop.isFeatured){
            data+=`<div class="col-12 col-md-4 mb-4">
                    <div class="card h-100">
                        <a href="shop-single.html">
                            <img src="${shop.image}" class="card-img-top" alt="${shop.name}">
                        </a>
                        <div class="card-body text-center">
                            <a href="shop-single.html" class="h4 text-decoration-none text-dark d-block mb-2">${shop.name}</a>
                            <p class="card-text">
                                ${shop.isFeatured.description}
                            </p>
                            <p class="text-success fw-bold">${renderPrice(shop.price)}</p>
                        </div>
                    </div>
                </div>`
        }
    }
    if(document.getElementById("featuredProducts")){
    document.getElementById("featuredProducts").innerHTML = data;
}
}