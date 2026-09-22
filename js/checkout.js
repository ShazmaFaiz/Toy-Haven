document.addEventListener("DOMContentLoaded", () => {
  renderCheckoutSummary();
  const form = document.querySelector("#checkout-form");
  const error = document.querySelector("#checkout-error");
  const cardFields = document.querySelector("#card-fields");

  document.querySelectorAll("input[name=payment]").forEach((radio) =>
    radio.addEventListener("change", () => {
      const cardSelected = radio.value === "Card" && radio.checked;
      cardFields.hidden = !cardSelected;
      document.querySelector("#card-number").required = cardSelected;
      document.querySelector("#card-name").required = cardSelected;
    }),
  );

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    error.textContent = "";
    const cart = getCart();
    if (!cart.length) {
      error.textContent =
        "Your cart is empty. Please add a product before checkout.";
      return;
    }
    if (!form.checkValidity()) {
      error.textContent =
        "Please check the highlighted fields and complete the form correctly.";
      form.reportValidity();
      return;
    }

    const payment = document.querySelector(
      "input[name=payment]:checked",
    )?.value;
    const total = cart.reduce(
      (sum, item) => sum + getProduct(item.id).price * item.quantity,
      0,
    );
    const order = {
      orderNumber: `TH-${Date.now().toString().slice(-8)}`,
      date: new Date().toISOString(),
      status: "Confirmed",
      estimatedDelivery: "3–5 working days",
      customer: {
        name: document.querySelector("#full-name").value.trim(),
        email: document.querySelector("#email").value.trim(),
        address: document.querySelector("#address").value.trim(),
      },
      payment,
      total,
      items: cart,
    };

    const orders = JSON.parse(localStorage.getItem("toyHavenOrders") || "[]");
    orders.push(order);
    localStorage.setItem("toyHavenOrders", JSON.stringify(orders));
    localStorage.removeItem("toyHavenCart");
    updateCartCount();

    const checkoutLayout = document.querySelector(".checkout-layout");
    const intro = document.querySelector(".page-intro");
    if (checkoutLayout) {
      checkoutLayout.hidden = true;
      checkoutLayout.style.display = "none";
    }
    if (intro) {
      intro.hidden = true;
      intro.style.display = "none";
    }

    const success = document.querySelector("#checkout-success");
    success.hidden = false;
    success.innerHTML = `<div class="success-icon" aria-hidden="true">✓</div>
      <p class="eyebrow">ORDER CONFIRMED</p>
      <h1>Thank you for your order, ${escapeText(order.customer.name)}!</h1>
      <p>Your order <strong>${order.orderNumber}</strong> has been confirmed and is now being prepared.</p>
      <p>We’ll send updates to <strong>${escapeText(order.customer.email)}</strong>. Your delivery should arrive within <strong>3–5 working days</strong>.</p>
      <div class="confirmation-details"><span>Total paid <strong>${formatCurrency(total)}</strong></span><span>Payment <strong>${payment}</strong></span></div>
      <p class="delivery-note">Keep your order number to track its progress from the “Track Order” option.</p>
      <div class="button-row confirmation-actions"><button class="button button-outline" type="button" data-open-tracker>Track Order</button><a class="button" href="products.html">Continue Shopping</a></div>`;
    success
      .querySelector("[data-open-tracker]")
      ?.addEventListener("click", () => {
        document.querySelector("#tracking-number").value = order.orderNumber;
        document.querySelector("#tracking-email").value = order.customer.email;
        openUtilityPanel("tracker");
      });
    success.setAttribute("tabindex", "-1");
    success.focus({ preventScroll: true });
    success.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

function escapeText(value) {
  const element = document.createElement("span");
  element.textContent = value;
  return element.innerHTML;
}

function renderCheckoutSummary() {
  const element = document.querySelector("#checkout-summary");
  if (!element) return;
  const cart = getCart();
  if (!cart.length) {
    element.innerHTML =
      '<p>Your cart is empty. <a href="products.html">Shop products</a>.</p>';
    return;
  }
  const total = cart.reduce(
    (sum, item) => sum + getProduct(item.id).price * item.quantity,
    0,
  );
  element.innerHTML =
    cart
      .map((item) => {
        const product = getProduct(item.id);
        return `<div class="summary-row"><span>${product.name} × ${item.quantity}</span><span>${formatCurrency(product.price * item.quantity)}</span></div>`;
      })
      .join("") +
    `<div class="summary-row summary-total"><span>Total</span><span>${formatCurrency(total)}</span></div>`;
}
