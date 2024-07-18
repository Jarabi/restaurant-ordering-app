// Import data file
import MENU_ITEMS from './data.js';

function createListElements() {
    // Get DOM elements
    const menuEl = document.querySelector('.menu');

    // Generate menu elements
    let menuListEl = document.createElement('ul');
    menuListEl.classList.add('menu-list');

    MENU_ITEMS.forEach((item) => {
        // Create list item
        let menuItemEl = document.createElement('li');
        menuItemEl.classList.add('menu-item');

        // Create item emoji element
        const itemEmojiEl = document.createElement('div');
        itemEmojiEl.classList.add('menu-item-emoji');
        itemEmojiEl.textContent = item.emoji;

        // Create item details element
        const itemDetailsEl = document.createElement('div');
        itemDetailsEl.classList.add('menu-item-details');

        // Create item name element
        const itemNameEl = document.createElement('h2');
        itemNameEl.classList.add('menu-item-name');
        itemNameEl.textContent = item.name;

        // Create item ingredients element
        const itemIngredientsEl = document.createElement('p');
        itemIngredientsEl.classList.add('menu-item-ingredients');
        itemIngredientsEl.textContent = item.ingredients.join(', ');

        // Create item price element
        const itemPriceEl = document.createElement('p');
        itemPriceEl.classList.add('menu-item-price');
        itemPriceEl.textContent = `$${item.price}`;

        // Append elements to item details element
        itemDetailsEl.appendChild(itemNameEl);
        itemDetailsEl.appendChild(itemIngredientsEl);
        itemDetailsEl.appendChild(itemPriceEl);

        // Create item add button element
        let addButtonDiv = document.createElement('div');
        addButtonDiv.classList.add('add-button-div');

        const itemAddButtonEl = document.createElement('button');
        itemAddButtonEl.classList.add('menu-item-add-button');
        itemAddButtonEl.textContent = '+';

        addButtonDiv.appendChild(itemAddButtonEl);

        // Append elements to list item
        menuItemEl.appendChild(itemEmojiEl);
        menuItemEl.appendChild(itemDetailsEl);
        menuItemEl.appendChild(addButtonDiv);

        // Append list item to menu list
        menuListEl.appendChild(menuItemEl);
    });

    // Append menu list to menu element
    menuEl.appendChild(menuListEl);
}

// Call function to create menu list elements
createListElements();
