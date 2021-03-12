let products = [];
let cartItems = [];
let storageItems = JSON.parse(localStorage.getItem("demo-cart"));
if (storageItems != null) {
  cartItems = storageItems;
}
const cart = document.querySelector("#cart-button");

cart.addEventListener("click", () => {
  let cartList = document.querySelector(".cart-items");

  if (cartList.classList.contains("entry")) {
    cartList.classList.remove("entry");
    cartList.classList.add("exit");
  } else {
    cartList.classList.remove("exit");
    cartList.classList.add("entry");
  }
});

function renderCart() {
  let sum = 0;

  if (cartItems.length <= 0) {
    document.querySelector(".cart-items").innerHTML = "Cart is Empty";
  } else {
    document.querySelector(".cart-items").innerHTML = "";

    let table = document.createElement("table");
    table.id = "table";
    table.innerHTML = `
        <thead>
            <tr>
                <th>SN</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody id="tbody">

        </tbody>
      `;
    document.querySelector(".cart-items").appendChild(table);

    cartItems.forEach((cartItem) => {
      let tr = document.createElement("tr");
      tr.innerHTML = `
              <td>
                  ${cartItem.id}
              </td>
              <td>
                  ${cartItem.name}
              </td>
              <td>
                  $${cartItem.price}
              </td>
              <td>
                  ${cartItem.quantity}
              </td>
              <td>
                  $${cartItem.price * cartItem.quantity}
              </td>
              <td>
                  <button class="remove-from-cart" id=${
                    cartItem.id
                  }>Delete</button>
              </td>
          `;
      sum += cartItem.price * cartItem.quantity;
      document.querySelector("#tbody").appendChild(tr);
    });

    let div = document.createElement("div");
    div.classList.add("cart-footer");
    div.innerHTML = `
        <br><hr><br>
        <p>
            Grand Total - <span id="total-amt">${sum}</span>
        </p>
        <button id="clear-cart">Clear Cart</button>
        `;

    document.querySelector(".cart-items").appendChild(div);
    const clearCartBtn = document.querySelector("#clear-cart");

    document.querySelectorAll(".remove-from-cart").forEach((item) => {
      item.addEventListener("click", removeFromCart);
    });

    clearCartBtn.addEventListener("click", clearCart);
  }
}

function generateProducts() {
  for (let i = 1; i <= 8; i++) {
    let product = {};
    product.name = "Product " + i;
    product.price = i * 10 * 10 + 40;
    product.id = i;
    product.quantity = 1;
    products.push(product);
  }
  renderProducts();
}

function renderProducts() {
  products.forEach((product) => {
    let li = document.createElement("li");
    li.classList.add("product-item");
    li.innerHTML = `
        <div class="img">
            <img src="https://source.unsplash.com/30${product.id}x300" alt="Image">
        </div>
        <div class="description">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
        </div>
        <button class="add-to-cart" id=${product.id}>Add To Cart</button>
    `;
    document.querySelector(".product-list").appendChild(li);
  });
}

renderCart();
generateProducts();

function addToCart(e) {
  let selectedProduct = products.find((product) => product.id == e.target.id);

  if (cartItems.includes(selectedProduct)) {
    selectedProduct.quantity++;
  } else {
    cartItems.push(selectedProduct);
  }
  saveToLocalStorate(cartItems);
  renderCart();
}
function removeFromCart(e) {
  let selectedProductIndex = cartItems.findIndex(
    (cartItem) => cartItem.id == e.target.id
  );
  let selectedProduct = cartItems.find(
    (cartItem) => cartItem.id == e.target.id
  );

  selectedProduct.quantity = 1;

  if (selectedProductIndex != -1) {
    cartItems.splice(selectedProductIndex, 1)[0];
  }
  saveToLocalStorate(cartItems);
  renderCart();
}

function clearCart() {
  cartItems = [];
  products.forEach((product) => {
    product.quantity = 1;
  });
  saveToLocalStorate(cartItems);
  renderCart();
}

document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", addToCart);
});

function saveToLocalStorate(items) {
  localStorage.setItem("demo-cart", JSON.stringify(items));
}
