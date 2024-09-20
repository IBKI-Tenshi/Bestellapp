

let isWideScreen = window.innerWidth > 860;

function renderAll() {
    getFromLocalStorage();
    renderBestseller();
    renderCategory('Pizza', './assets/img/pizza.jpg', 'Pizza');
    renderBasket();
}

function renderBestseller() {
    let bestseller_all_containerRef = document.getElementById('bestseller_dish_container');
    bestseller_all_containerRef.innerHTML = "";

    for (let indexBestseller = 0; indexBestseller < myDishes.length; indexBestseller++) {
        if (myDishes[indexBestseller].bestseller === true) {
            bestseller_all_containerRef.innerHTML += getDishTemplate(indexBestseller);
        }
    }
}

function renderCategory(categoryName, categoryImg, searchIndex) {
    renderCategoryName(categoryName);
    renderCategoryImg(categoryImg);
    renderDish(searchIndex);
}

function renderCategoryName(categoryName) {
    let categoryNameRef = document.getElementById('actuel_category_name');
    categoryNameRef.innerHTML = categoryName;
}

function renderCategoryImg(categoryImg) {
    let categoryImgRef = document.getElementById('actuel_category_img');
    categoryImgRef.src = categoryImg;
}

function renderDish(searchIndex) {
    let dish_sectionRef = document.getElementById('actuel_category');
    dish_sectionRef.innerHTML = "";

    for (let indexDish = 0; indexDish < myDishes.length; indexDish++) {
        if (myDishes[indexDish].category == searchIndex) {
            dish_sectionRef.innerHTML += getDishTemplate(indexDish);
        }
    }
}

function saveToLocalStorage() {
    localStorage.setItem("myDishes", JSON.stringify(myDishes));
}

function getFromLocalStorage() {
    if (localStorage.getItem("myDishes") !== null) {
        myDishes = JSON.parse(localStorage.getItem("myDishes"));
    }
}

function renderBasket() {
    renderBasketDishList();
    renderAllDishPrice();
    renderTotalPrice();
}

function renderBasketDishList() {
    let basketDishListRef = document.getElementById('basket_dish_list');
    basketDishListRef.innerHTML = "";

    for (let indexDish = 0; indexDish < myDishes.length; indexDish++) {
        if (myDishes[indexDish].amount > 0) {
            basketDishListRef.innerHTML += getBasketTemplate(indexDish);
        }
    }
}

function dishAmountUp(indexDish) {
    myDishes[indexDish].amount += 1;

    saveToLocalStorage();
    renderBasket();
}

function dishAmountDown(indexDish) {
    myDishes[indexDish].amount -= 1;

    saveToLocalStorage();
    renderBasket();
}

function deleteDish(indexDish) {
    myDishes[indexDish].amount = 0;

    saveToLocalStorage();
    renderBasket();
}

function getDishPrice(indexDish) {
    let getDishPriceRef = myDishes[indexDish].amount * myDishes[indexDish].price;
    return getDishPriceRef;
}

function calcAllDishPrice() {
    let allDishPriceRef = 0;

    for (let indexPrice = 0; indexPrice < myDishes.length; indexPrice++) {
        allDishPriceRef += getDishPrice(indexPrice);
    }

    return allDishPriceRef;
}

function renderAllDishPrice() {
    let allDishTotalPrice = calcAllDishPrice();
    let allDishTotalPriceRef = document.getElementById('allDishPrice_display');
    allDishTotalPriceRef.innerHTML = allDishTotalPrice.toFixed(2) + ' €';
}

function toggleCheckboxes(activeCheckboxId, inactiveCheckboxId) {
    let activeCheckbox = document.getElementById(activeCheckboxId);
    let inactiveCheckbox = document.getElementById(inactiveCheckboxId);

    if (activeCheckbox.checked) {
        inactiveCheckbox.checked = false;
    } else {
        inactiveCheckbox.checked = true;
    }

    renderBasket();
}

function renderTotalPrice() {
    let totalPriceRef = document.getElementById('total_price');

    if (document.getElementById('firstCheckbox').checked) {
        totalPriceRef.innerHTML = calcTotalPrice(0.95);
    } else {
        totalPriceRef.innerHTML = calcTotalPrice(5, 'add');
    }
}

function calcTotalPrice(value, operation = 'multiply') {
    let allDishPrice = parseFloat(document.getElementById('allDishPrice_display').innerHTML.replace('€', '').trim());

    if (operation === 'multiply') {
        return (allDishPrice * value).toFixed(2) + ' €';
    } else if (operation === 'add') {
        return (allDishPrice + value).toFixed(2) + ' €';
    }
}

window.addEventListener('load', initializeLayout);

function initializeLayout() {
    let toggleBasketButtonRef = document.getElementById('basket_button_container');
    let basketRef = document.getElementById('basket_container');
    let contentRef = document.getElementById('content_container');

    if (window.innerWidth > 860) {
        showWideScreenLayout(toggleBasketButtonRef, basketRef, contentRef);
    } else {
        showSmallScreenLayout(toggleBasketButtonRef, basketRef, contentRef);
    }
    renderAll();
}

window.addEventListener('resize', handleResizeEvent);

function handleResizeEvent() {
    let toggleBasketButtonRef = document.getElementById('basket_button_container');
    let basketRef = document.getElementById('basket_container');
    let contentRef = document.getElementById('content_container');

    if (window.innerWidth > 860 && !isWideScreen) {
        showWideScreenLayout(toggleBasketButtonRef, basketRef, contentRef);
    } 
    else if (window.innerWidth <= 860 && isWideScreen) {
        showSmallScreenLayout(toggleBasketButtonRef, basketRef, contentRef);
    }
    renderAll();
}

function showWideScreenLayout(toggleBasketButtonRef, basketRef, contentRef) {
    toggleBasketButtonRef.classList.add('d_none');
    basketRef.classList.remove('d_none');
    contentRef.classList.remove('d_none');
    isWideScreen = true;
}

function showSmallScreenLayout(toggleBasketButtonRef, basketRef, contentRef) {
    toggleBasketButtonRef.classList.remove('d_none');
    basketRef.classList.add('d_none');
    contentRef.classList.remove('d_none');
    isWideScreen = false;
}

function toggleBasket() {
    if (window.innerWidth <= 860) {
        let basketRef = document.getElementById('basket_container');
        let contentRef = document.getElementById('content_container');

        if (!basketRef.classList.contains('d_none')) {
            basketRef.classList.add('d_none');
            contentRef.classList.remove('d_none');
        } else {
            basketRef.classList.remove('d_none');
            contentRef.classList.add('d_none');
        }
    }
}

function confirmOrder() {
    myDishes.forEach(function (dish) {
        dish.amount = 0;
    });

    saveToLocalStorage();
    renderBasket();
    toggleConfirmDisplay();

}

function toggleConfirmDisplay() {
    let confirmOrderDisplay = document.getElementById('confirmed_order_display');
    confirmOrderDisplay.classList.remove('d_none');

    setTimeout(function() {
        confirmOrderDisplay.classList.add('d_none');
    }, 3000);
}




