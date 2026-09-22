document.addEventListener("DOMContentLoaded", renderCart);

function renderCart() {
  const container = document.querySelector("#cart-items");
  const summary = document.querySelector("#cart-summary");
  const cart = getCart();
  if (!container || !summary) return;
  if (!cart.length) {
    container.innerHTML = `<div class="empty-state"><h2>Your cart is empty.</h2><p>Add something from the collection to get started.</p><a class="button" href="products.html">Explore Products</a></div>`;
    summary.innerHTML = `<p>No items in your cart.</p>`;
    document
      .querySelector("#checkout-link")
      .setAttribute("aria-disabled", "true");
    document.querySelector("#checkout-link").style.pointerEvents = "none";
    return;
  }
  document.querySelector("#checkout-link").removeAttribute("aria-disabled");
  document.querySelector("#checkout-link").style.pointerEvents = "auto";
  container.innerHTML = `<div class="summary-card"><table class="cart-table"><thead><tr><th>Product</th><th>Quantity</th><th>Price</th><th>Subtotal</th><th><span class="sr-only">Action</span></th></tr></thead><tbody>${cart
    .map((item) => {
      const p = getProduct(item.id);
      return `<tr><td data-label="Product"><div class="cart-product"><img src="${p.image}" alt="${p.name}"><span><strong>${p.name}</strong><small>${p.category}</small></span></div></td><td data-label="Quantity"><div class="quantity-control"><button type="button" class="qty-minus" data-id="${p.id}" aria-label="Decrease ${p.name} quantity">−</button><span>${item.quantity}</span><button type="button" class="qty-plus" data-id="${p.id}" aria-label="Increase ${p.name} quantity">+</button></div></td><td data-label="Price">${formatCurrency(p.price)}</td><td data-label="Subtotal"><strong>${formatCurrency(p.price * item.quantity)}</strong></td><td data-label="Action"><button type="button" class="icon-button remove-item" data-id="${p.id}" aria-label="Remove ${p.name}">×</button></td></tr>`;
    })
    .join("")}</tbody></table></div>`;
  const total = cart.reduce(
    (sum, item) => sum + getProduct(item.id).price * item.quantity,
    0,
  );
  summary.innerHTML = `<div class="summary-row"><span>Items</span><span>${cart.reduce((n, i) => n + i.quantity, 0)}</span></div><div class="summary-row"><span>Subtotal</span><span>${formatCurrency(total)}</span></div><div class="summary-row"><span>Delivery</span><span>Free</span></div><div class="summary-row summary-total"><span>Total</span><span>${formatCurrency(total)}</span></div>`;
  container
    .querySelectorAll(".qty-minus")
    .forEach((btn) =>
      btn.addEventListener("click", () =>
        changeQuantity(Number(btn.dataset.id), -1),
      ),
    );
  container
    .querySelectorAll(".qty-plus")
    .forEach((btn) =>
      btn.addEventListener("click", () =>
        changeQuantity(Number(btn.dataset.id), 1),
      ),
    );
  container
    .querySelectorAll(".remove-item")
    .forEach((btn) =>
      btn.addEventListener("click", () =>
        removeCartItem(Number(btn.dataset.id)),
      ),
    );
  document.querySelector("#clear-cart")?.addEventListener("click", () => {
    if (confirm("Clear all items from your cart?")) {
      localStorage.removeItem("toyHavenCart");
      renderCart();
      updateCartCount();
    }
  });
}
function changeQuantity(id, delta) {
  const cart = getCart();
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) cart.splice(cart.indexOf(item), 1);
  saveCart(cart);
  renderCart();
  updateCartCount();
}
function removeCartItem(id) {
  saveCart(getCart().filter((item) => item.id !== id));
  renderCart();
  updateCartCount();
}
