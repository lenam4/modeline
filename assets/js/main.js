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
            renderShop(shopData);
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
                            <div class="card rounded-0">
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
                                <a href="shop-single.html" class="h3 text-decoration-none">Oupidatat non</a>
                                <ul class="w-100 list-unstyled d-flex justify-content-between mb-0">
                                    <li>M/L/X/XL</li>
                                    <li class="pt-2">
                                        <span class="product-color-dot color-dot-red float-left rounded-circle ml-1"></span>
                                        <span class="product-color-dot color-dot-blue float-left rounded-circle ml-1"></span>
                                        <span class="product-color-dot color-dot-black float-left rounded-circle ml-1"></span>
                                        <span class="product-color-dot color-dot-light float-left rounded-circle ml-1"></span>
                                        <span class="product-color-dot color-dot-green float-left rounded-circle ml-1"></span>
                                    </li>
                                </ul>
                                <ul class="list-unstyled d-flex justify-content-center mb-1">
                                    <li>
                                        <i class="text-warning fa fa-star"></i>
                                        <i class="text-warning fa fa-star"></i>
                                        <i class="text-warning fa fa-star"></i>
                                        <i class="text-muted fa fa-star"></i>
                                        <i class="text-muted fa fa-star"></i>
                                    </li>
                                </ul>
                                <p class="text-center mb-0">$250.00</p>
                            </div>
                        </div>
                    </div>`
    }
    document.getElementById("shop").innerHTML = data;
}