//checking for async loading if page is downloaded

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  // selecting button from dom
  let btnRemoveItems = document.getElementsByClassName("btn-danger");

  // loop from every button and add eventlisteners;
  let btnRemoveItemsL = btnRemoveItems.length;
  for (let i = 0; i < btnRemoveItemsL; i++) {
    let currentButton = btnRemoveItems[i];

    currentButton.addEventListener("click", removeCartItem);
  }
  let quantityInputs = document.getElementsByClassName("cart-quantity-input");

  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  let addToCartButtons = document.getElementsByClassName("shop-item-button");
  for (let i = 0; i < addToCartButtons.length; i++) {
    let button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }
  document
    .getElementsByClassName("btn-purchase")[0]
    .addEventListener("click", purchaseClicked);
}

function purchaseClicked() {
  alert("Thank you for your purchase");
  let cartItems = document.getElementsByClassName("cart-items")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}

function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function removeCartItem(event) {
  // targeting the button
  let buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function addToCartClicked(event) {
  let button = event.target;
  let shopItem = button.parentElement.parentElement;
  let title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  let price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  console.log(title, price);
  let imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
  console.log(title, price, imageSrc);
  // method for adding item to cart
  addItemToCart(title, price, imageSrc);
  updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
  let cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  let cartItems = document.getElementsByClassName("cart-items")[0];
  let cartItemNames = cartItems.getElementsByClassName("cart-item-title");
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("This item is already added to the cart");
      return;
    }
  }
  let cartRowContents = `<div class="cart-item cart-column">
  <img
    class="cart-item-image"
    src="${imageSrc}"
    width="100"
    height="100"
  />
  <span class="cart-item-title">${title}</span>
</div>
<span class="cart-price cart-column">${price}</span>
<div class="cart-quantity cart-column">
  <input
    class="cart-quantity-input"
    type="number"
    value="1"
    name=""
    id=""
  />
  <button class="btn btn-danger" role="button">REMOVE</button>
</div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.appendChild(cartRow);
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);
}

function updateCartTotal() {
  // seklecting rows
  let cartItemContainer = document.getElementsByClassName("cart-items")[0];
  let cartRows = cartItemContainer.getElementsByClassName("cart-row");

  let total = 0;

  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let priceElement = cartRow.getElementsByClassName("cart-price")[0];
    let quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    // getting price and cut off $ sign
    let price = parseFloat(priceElement.innerText.replace("$", ""));
    // getting quantity
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = total.toFixed(2);
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total;
}
