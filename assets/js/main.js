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