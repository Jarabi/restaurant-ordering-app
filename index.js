// Import data file
import MENU_ITEMS from './data.js';

const mainEl = document.getElementById('main');
const selectedMenuItems = [];

// ++++++++++++++++ EVENT LISTENERS ++++++++++++++++ //

// call function on window load
window.onload = (event) => {
    menuApp();
};

// Event listener for add button
mainEl.addEventListener('click', function (e) {
    if (e.target.classList.value === 'menu-item-add-button') {
        const itemId = parseInt(e.target.dataset.itemId);
        const selectedItem = MENU_ITEMS.find((item) => item.id === itemId);

        selectedMenuItems.push(selectedItem);
        populateCheckoutForm();
    }

    if (e.target.classList.value === 'remove-item') {
        const itemId = parseInt(e.target.dataset.itemId);
        const selectedItemIndex = selectedMenuItems.findIndex(
            (item) => item.id === itemId
        );

        selectedMenuItems.splice(selectedItemIndex, 1);
        populateCheckoutForm();
    }

    if (e.target.id === 'complete-order-button') {
        document.querySelector('.card-details-modal').classList.remove('hide');
    }

    if (e.target.id === 'checkout-button') {
        e.preventDefault();
        const cardDetailsForm = document.querySelector('.card-details-form');
        const cardholderName =
            cardDetailsForm.querySelector('#cardholder-name').value;
        const cardNumber = cardDetailsForm.querySelector('#card-number').value;
        const cvv = cardDetailsForm.querySelector('#cvv').value;

        if (cardholderName && cardNumber && cvv) {
            document.querySelector('.card-details-modal').classList.add('hide');
            selectedMenuItems.length = 0;
            populateCheckoutForm();
            confirmPayment(cardholderName);
        }
    }
});

// ++++++++++++++++ FUNCTIONS ++++++++++++++++ //

/**
 * Function to create the menu app
 * @returns {void}
 */
function menuApp() {
    menuList(MENU_ITEMS);
    checkoutForm();
    cardDetailsModal();
}

/**
 * Function to populate the menu list
 * @param {Array} menuItems - Array of menu items
 * @returns {void}
 */
function menuList(menuItems) {
    const menuListEl = document.createElement('ul');
    menuListEl.classList.add('menu-list');

    menuItems.forEach((item) => {
        const menuItemEl = createMenuItemElement(item);
        menuListEl.appendChild(menuItemEl);
    });

    mainEl.appendChild(menuListEl);
}

/**
 * Function to create the menu item element
 * @param {Object} item - Menu item object
 * @returns {HTMLElement} - Menu item element
 */
function createMenuItemElement(item) {
    const menuItemEl = document.createElement('li');
    menuItemEl.classList.add('menu-item');

    // Create item elements
    const itemEmojiEl = createItemEmojiElement(item.emoji);
    const itemDetailsEl = createItemDetailsElement(item);
    const addButtonDiv = createButtonEl(item.id);

    // Append elements to list item
    menuItemEl.appendChild(itemEmojiEl);
    menuItemEl.appendChild(itemDetailsEl);
    menuItemEl.appendChild(addButtonDiv);

    return menuItemEl;
}

/**
 * Function to create the emoji element
 * @param {String} emoji - Emoji string
 * @returns {HTMLElement} - Emoji element
 */
function createItemEmojiElement(emoji) {
    const itemEmojiEl = document.createElement('div');
    itemEmojiEl.classList.add('menu-item-emoji');
    itemEmojiEl.textContent = emoji;

    return itemEmojiEl;
}

/**
 * Function to create the item details element
 * @param {Onject} item - Menu item object
 * @returns {HTMLElement} - Item details element
 */
function createItemDetailsElement(item) {
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
    itemPriceEl.textContent = `Kes. ${item.price.toLocaleString()}`;

    // Append elements to item details element
    itemDetailsEl.appendChild(itemNameEl);
    itemDetailsEl.appendChild(itemIngredientsEl);
    itemDetailsEl.appendChild(itemPriceEl);

    return itemDetailsEl;
}

/**
 * Function to create the add button element
 * @param {Number} itemId - Menu item id
 * @returns {HTMLElement} - Add button element
 */
function createButtonEl(itemId) {
    const addButtonDiv = document.createElement('div');
    addButtonDiv.classList.add('add-button-div');

    const itemAddButtonEl = document.createElement('button');
    itemAddButtonEl.classList.add('menu-item-add-button');
    itemAddButtonEl.dataset.itemId = itemId;
    itemAddButtonEl.textContent = '+';

    addButtonDiv.appendChild(itemAddButtonEl);

    return addButtonDiv;
}

/**
 * Function to create the checkout form
 */
function checkoutForm() {
    // Create payment form element
    const paymentFormEl = document.createElement('div');
    paymentFormEl.setAttribute('id', 'payment-form');
    paymentFormEl.classList.add('payment-form', 'hide');

    const paymentFormTitleEl = document.createElement('h2');
    paymentFormTitleEl.classList.add('payment-form-title');
    paymentFormTitleEl.textContent = 'Your order';

    const paymentFormListEl = document.createElement('ul');
    paymentFormListEl.classList.add('payment-form-items');

    // Create payment form total element
    const totalPriceDiv = createFormTotalElement();

    // Create payment form submit button element
    const paymentFormSubmitButtonEl = document.createElement('button');
    paymentFormSubmitButtonEl.setAttribute('id', 'complete-order-button');
    paymentFormSubmitButtonEl.classList.add('form-btn', 'payment-form-button');
    paymentFormSubmitButtonEl.textContent = 'Complete order';

    // Append elements to payment form
    paymentFormEl.appendChild(paymentFormTitleEl);
    paymentFormEl.appendChild(paymentFormListEl);
    paymentFormEl.appendChild(totalPriceDiv);
    paymentFormEl.appendChild(paymentFormSubmitButtonEl);

    // Append payment form to main element
    mainEl.appendChild(paymentFormEl);
}

/**
 * Function to create the form title element
 * @param {Object} item - Item object
 * @returns {HTMLElement} - List element
 */
function createListItem(item) {
    const paymentItemEl = document.createElement('li');
    paymentItemEl.classList.add('payment-item');

    // Create item name element
    const paymentItemNameEl = document.createElement('h3');
    paymentItemNameEl.classList.add('payment-item-name');
    paymentItemNameEl.textContent = item.name;

    // Remove item span
    const removeItemSpan = document.createElement('span');
    removeItemSpan.classList.add('remove-item');
    removeItemSpan.dataset.itemId = item.id;
    removeItemSpan.textContent = 'remove';

    // Attach span to h3
    paymentItemNameEl.appendChild(removeItemSpan);

    // Create item price element
    const paymentItemPriceEl = document.createElement('p');
    paymentItemPriceEl.classList.add('payment-item-price');
    paymentItemPriceEl.textContent = `Kes. ${item.price.toLocaleString()}`;

    paymentItemEl.appendChild(paymentItemNameEl);
    paymentItemEl.appendChild(paymentItemPriceEl);

    return paymentItemEl;
}

/**
 * Function to create the total price element
 * @returns {HTMLElement} - Total price element
 */
function createFormTotalElement() {
    // Create total div
    const totalPriceDiv = document.createElement('div');
    totalPriceDiv.classList.add('payment-form-total');

    // Create total price label
    const totalPriceLabel = document.createElement('p');
    totalPriceLabel.classList.add('payment-form-total-label');
    totalPriceLabel.textContent = 'Total price:';

    // Create total value element
    const totalPriceValue = document.createElement('p');
    totalPriceValue.classList.add('payment-form-total-value');

    totalPriceDiv.appendChild(totalPriceLabel);
    totalPriceDiv.appendChild(totalPriceValue);

    return totalPriceDiv;
}

/**
 * Function to populate the checkout form
 * @returns {void}
 */
function populateCheckoutForm() {
    if (selectedMenuItems.length > 0) {
        const paymentFormEl = document.getElementById('payment-form');
        paymentFormEl.classList.remove('hide');

        const paymentFormListEl = paymentFormEl.querySelector(
            '.payment-form-items'
        );
        const totalPriceValue = paymentFormEl.querySelector(
            '.payment-form-total-value'
        );

        paymentFormListEl.innerHTML = '';
        totalPriceValue.textContent = 0;

        selectedMenuItems.forEach((item) => {
            const paymentItemEl = createListItem(item);
            paymentFormListEl.appendChild(paymentItemEl);
        });

        // Update total price
        const totalPrice = selectedMenuItems.reduce(
            (acc, item) => acc + item.price,
            0
        );
        totalPriceValue.textContent = `Kes. ${totalPrice.toLocaleString()}`;
    } else {
        document.getElementById('payment-form').classList.add('hide');
    }
}

/**
 * Function to create the card details modal
 * @returns {void}
 */
function cardDetailsModal() {
    const formInputs = [
        {
            label: 'Enter your name',
            type: 'text',
            id: 'cardholder-name',
        },
        {
            label: 'Enter card number',
            type: 'text',
            id: 'card-number',
        },
        {
            label: 'Enter CVV',
            type: 'text',
            id: 'cvv',
        },
    ];

    const cardDetailsModal = document.createElement('form');
    cardDetailsModal.classList.add('card-details-modal', 'hide');

    const formHeading = document.createElement('h2');
    formHeading.classList.add('form-heading');
    formHeading.textContent = 'Enter card details';

    const cardDetailsForm = document.createElement('div');
    cardDetailsForm.classList.add('card-details-form');

    // Card inputs
    formInputs.forEach((input) => {
        const formInput = document.createElement('input');
        formInput.classList.add('card-detail-input');
        formInput.setAttribute('type', input.type);
        formInput.setAttribute('id', input.id);
        formInput.setAttribute('placeholder', input.label);
        formInput.setAttribute('required', true);

        cardDetailsForm.appendChild(formInput);
    });

    // Payment button
    const paymentButton = document.createElement('button');
    paymentButton.setAttribute('id', 'checkout-button');
    paymentButton.setAttribute('type', 'submit');
    paymentButton.classList.add('form-btn', 'payment-button');
    paymentButton.textContent = 'Pay';

    cardDetailsModal.appendChild(formHeading);
    cardDetailsModal.appendChild(cardDetailsForm);
    cardDetailsModal.appendChild(paymentButton);

    mainEl.appendChild(cardDetailsModal);
}

function confirmPayment(cardholderName) {
    const paymentFormEl = document.getElementById('payment-form');
    const paymentFormListEl = paymentFormEl.querySelector(
        '.payment-form-items'
    );
    const totalPriceValue = paymentFormEl.querySelector(
        '.payment-form-total-value'
    );

    paymentFormListEl.innerHTML = '';
    totalPriceValue.textContent = 0;

    const paymentConfirmation = document.createElement('div');
    paymentConfirmation.classList.add('payment-confirmation');

    const confirmationMessage = document.createElement('p');
    confirmationMessage.classList.add('confirmation-message');
    confirmationMessage.textContent = `Thank, ${cardholderName}! Your order is on its way!`;

    paymentConfirmation.appendChild(confirmationMessage);
    mainEl.appendChild(paymentConfirmation);
}