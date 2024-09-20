function getDishTemplate(indexDish) {
    return `
            <div class="Dish">
                <h3>${myDishes[indexDish].name}</h3>
                <div class="dish_description">${myDishes[indexDish].description}</div>
                <p class="dish_price">${myDishes[indexDish].price.toFixed(2) + ' €'}</p>
                <div class="placeholder"></div>
                <a onclick="dishAmountUp(${indexDish})" class="to_basket_button">+</a>
            </div>
    `;
}

function getBasketTemplate(indexDish) {
    return `
            <div class="basket_dish">
                <div class="basket_dish_name">${myDishes[indexDish].name}</div>
                <div class="basket_dish_numbers">
                    <a onclick="dishAmountDown(${indexDish})" class="basket_button">
                        <img src="./assets/icons/minus-solid.svg" alt="">
                    </a>
                    <div id="basket_dish_amount_${indexDish}" class="amount_display">${myDishes[indexDish].amount}x
                    </div>
                    <a onclick="dishAmountUp(${indexDish})" class="basket_button">
                        <img src="./assets/icons/plus-solid.svg" alt="">
                    </a>
                    <div id="basket_dish_sum_${indexDish}" class="price_display">${getDishPrice(indexDish).toFixed(2)} €
                    </div>
                    <a onclick="deleteDish(${indexDish})" class="basket_button">
                        <img src="./assets/icons/trash-can-regular.svg" alt="">
                    </a>
                </div>
            </div>
    `;
}

