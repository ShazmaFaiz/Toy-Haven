document.addEventListener("DOMContentLoaded", () => {
  setupMobileMenu();
  setupStoreChrome();
  updateCartCount();
  setupNewsletter();
  setupHeroSlider();
  renderFeaturedProducts();
  renderProductsPage();
  renderProductOfTheDay();
  setupRevealAnimations();
  registerServiceWorker();
});

function setupMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation",
    );
  });
  nav.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }),
  );
}

function setupStoreChrome() {
  const header = document.querySelector(".site-header");
  const nav = document.querySelector(".main-nav");
  const brand = header?.querySelector(".brand");
  if (brand && !brand.querySelector(".brand-name")) {
    brand.insertAdjacentHTML(
      "beforeend",
      '<span class="brand-name"><span>Toy</span> Haven</span>',
    );
  }
  if (header && nav && !header.querySelector(".header-actions")) {
    const actions = document.createElement("div");
    actions.className = "header-actions";
    actions.innerHTML = `<button class="header-link" type="button" data-open-panel="tracker">Track Order</button>
      <button class="header-link account-button" type="button" data-open-panel="account">Log in / Sign up</button>`;
    header.appendChild(actions);
  }

  document.querySelectorAll(".site-footer").forEach((footer) => {
    footer.innerHTML = `<div class="footer-grid">
      <div class="footer-about"><img src="images/logo.png" alt="Toy Haven"><p>Play, discover and collect with Toy Haven.</p><p class="copyright">© 2026 Toy Haven. All rights reserved.</p></div>
      <div><h2>Visit us</h2><address>42 Peradeniya Road<br>Kandy 20000, Sri Lanka</address><a href="https://www.google.com/maps/search/?api=1&query=Peradeniya+Road+Kandy+Sri+Lanka" target="_blank" rel="noopener">View location ↗</a></div>
      <div><h2>Contact</h2><a href="tel:+94812345678">Hotline: +94 81 234 5678</a><a href="mailto:hello@toyhaven.lk">hello@toyhaven.lk</a><p>Mon–Sat: 9.00 AM–6.00 PM</p></div>
      <div><h2>Quick links</h2><a href="products.html">Shop</a><a href="wishlist.html">Wishlist</a><button type="button" class="footer-button" data-open-panel="tracker">Track your order</button><a href="feedback.html">Support & FAQ</a></div>
      <div><h2>Information</h2><a href="terms.html">Terms & Conditions</a><a href="privacy.html">Privacy Policy</a><p class="social-label">Follow: Instagram · Facebook · TikTok</p></div>
    </div>`;
  });

  if (!document.querySelector("#utility-panels")) {
    const panels = document.createElement("div");
    panels.id = "utility-panels";
    panels.innerHTML = `
      <div id="account-panel" class="modal utility-modal" hidden>
        <div class="modal-backdrop" data-close-panel aria-hidden="true"></div>
        <div class="modal-dialog compact-dialog" role="dialog" aria-modal="true" aria-labelledby="account-title">
          <button class="modal-close" type="button" data-close-panel aria-label="Close account panel">×</button>
          <div class="modal-content">
            <p class="eyebrow">MY TOY HAVEN</p><h2 id="account-title">Log in or create an account</h2>
            <div class="tab-buttons"><button class="tab-button selected" type="button" data-auth-tab="login">Log in</button><button class="tab-button" type="button" data-auth-tab="signup">Sign up</button></div>
            <form id="login-form" class="mini-form"><label for="login-email">Email</label><input id="login-email" type="email" required autocomplete="email"><label for="login-password">Password</label><input id="login-password" type="password" required minlength="6" autocomplete="current-password"><button class="button" type="submit">Log in</button></form>
            <form id="signup-form" class="mini-form" hidden><label for="signup-name">Full name</label><input id="signup-name" required minlength="2" autocomplete="name"><label for="signup-email">Email</label><input id="signup-email" type="email" required autocomplete="email"><label for="signup-password">Password</label><input id="signup-password" type="password" required minlength="6" autocomplete="new-password"><button class="button" type="submit">Create account</button></form>
            <p id="account-message" class="form-message" role="status"></p><p class="demo-note">Demo feature: account details stay only in this browser.</p>
          </div>
        </div>
      </div>
      <div id="tracker-panel" class="modal utility-modal" hidden>
        <div class="modal-backdrop" data-close-panel aria-hidden="true"></div>
        <div class="modal-dialog compact-dialog" role="dialog" aria-modal="true" aria-labelledby="tracker-title">
          <button class="modal-close" type="button" data-close-panel aria-label="Close order tracker">×</button>
          <div class="modal-content"><p class="eyebrow">ORDER TRACKING</p><h2 id="tracker-title">Track your order</h2>
            <form id="tracker-form" class="mini-form"><label for="tracking-number">Order number</label><input id="tracking-number" placeholder="e.g. TH-12345678" required><label for="tracking-email">Order email</label><input id="tracking-email" type="email" required><button class="button" type="submit">Check order</button></form>
            <div id="tracking-result" class="tracking-result" aria-live="polite"></div>
          </div>
        </div>
      </div>`;
    document.body.appendChild(panels);
  }

  document
    .querySelectorAll("[data-open-panel]")
    .forEach((button) =>
      button.addEventListener("click", () =>
        openUtilityPanel(button.dataset.openPanel),
      ),
    );
  document
    .querySelectorAll("[data-close-panel]")
    .forEach((button) => button.addEventListener("click", closeUtilityPanels));
  document
    .querySelectorAll("[data-auth-tab]")
    .forEach((button) =>
      button.addEventListener("click", () =>
        switchAuthTab(button.dataset.authTab),
      ),
    );
  document
    .querySelector("#login-form")
    ?.addEventListener("submit", handleLogin);
  document
    .querySelector("#signup-form")
    ?.addEventListener("submit", handleSignup);
  document
    .querySelector("#tracker-form")
    ?.addEventListener("submit", handleTracking);
  updateAccountButton();
}

function openUtilityPanel(name) {
  closeUtilityPanels();
  const panel = document.querySelector(`#${name}-panel`);
  if (!panel) return;
  panel.hidden = false;
  document.body.classList.add("modal-open");
  panel.querySelector("input, button")?.focus();
}

function closeUtilityPanels() {
  document.querySelectorAll(".utility-modal").forEach((panel) => {
    panel.hidden = true;
  });
  if (document.querySelector("#product-modal")?.hidden !== false)
    document.body.classList.remove("modal-open");
}

function switchAuthTab(tab) {
  document.querySelector("#login-form").hidden = tab !== "login";
  document.querySelector("#signup-form").hidden = tab !== "signup";
  document
    .querySelectorAll("[data-auth-tab]")
    .forEach((button) =>
      button.classList.toggle("selected", button.dataset.authTab === tab),
    );
  document.querySelector("#account-message").textContent = "";
}

function handleSignup(event) {
  event.preventDefault();
  if (!event.currentTarget.checkValidity()) {
    event.currentTarget.reportValidity();
    return;
  }
  const user = {
    name: document.querySelector("#signup-name").value.trim(),
    email: document.querySelector("#signup-email").value.trim(),
  };
  localStorage.setItem("toyHavenUser", JSON.stringify(user));
  const message = document.querySelector("#account-message");
  message.className = "form-message success-text";
  message.textContent = `Account created. Welcome, ${user.name}!`;
  updateAccountButton();
}

function handleLogin(event) {
  event.preventDefault();
  if (!event.currentTarget.checkValidity()) {
    event.currentTarget.reportValidity();
    return;
  }
  const email = document.querySelector("#login-email").value.trim();
  const saved = JSON.parse(localStorage.getItem("toyHavenUser") || "null");
  const user =
    saved && saved.email.toLowerCase() === email.toLowerCase()
      ? saved
      : { name: email.split("@")[0], email };
  localStorage.setItem("toyHavenUser", JSON.stringify(user));
  const message = document.querySelector("#account-message");
  message.className = "form-message success-text";
  message.textContent = `You are logged in as ${user.name}.`;
  updateAccountButton();
}

function updateAccountButton() {
  const user = JSON.parse(localStorage.getItem("toyHavenUser") || "null");
  document.querySelectorAll(".account-button").forEach((button) => {
    button.textContent = user ? `Hi, ${user.name}` : "Log in / Sign up";
  });
}

function handleTracking(event) {
  event.preventDefault();
  const number = document
    .querySelector("#tracking-number")
    .value.trim()
    .toUpperCase();
  const email = document
    .querySelector("#tracking-email")
    .value.trim()
    .toLowerCase();
  const orders = JSON.parse(localStorage.getItem("toyHavenOrders") || "[]");
  const order = orders.find(
    (item) =>
      item.orderNumber.toUpperCase() === number &&
      item.customer.email.toLowerCase() === email,
  );
  const result = document.querySelector("#tracking-result");
  if (!order) {
    result.className = "tracking-result tracking-error";
    result.innerHTML =
      "<strong>Order not found.</strong><p>Please check the order number and email, then try again.</p>";
    return;
  }
  const tracking = getTrackingDetails(order);
  result.className = "tracking-result tracking-success";
  result.innerHTML = `<div class="tracking-heading"><span class="tracking-label">Current status</span><strong>${tracking.stages[tracking.current].name}</strong></div>
    <div class="tracking-facts">
      <p><span>Order</span><strong>${order.orderNumber}</strong></p>
      <p><span>Latest location</span><strong>${tracking.stages[tracking.current].location}</strong></p>
      <p><span>Updated delivery estimate</span><strong>${tracking.estimate}</strong></p>
    </div>
    <p class="tracking-update">${tracking.stages[tracking.current].message}</p>
    <ol class="tracking-timeline">${tracking.stages.map((stage, index) => `<li class="${index < tracking.current ? "complete" : index === tracking.current ? "current" : ""}"><span class="timeline-dot" aria-hidden="true"></span><div><strong>${stage.name}</strong><small>${index <= tracking.current ? stage.location : "Waiting for update"}</small></div></li>`).join("")}</ol>
    <p class="demo-note">Tracking updates are simulated for this front-end demonstration.</p>`;
}

function getTrackingDetails(order) {
  const orderedAt = new Date(order.date);
  const hours = Math.max(0, (Date.now() - orderedAt.getTime()) / 3600000);
  const stages = [
    {
      name: "Order confirmed",
      location: "Toy Haven order system",
      message: "We have received your order and payment details.",
    },
    {
      name: "Preparing your order",
      location: "Toy Haven Warehouse, Kandy",
      message: "Your items are being checked and packed securely.",
    },
    {
      name: "Dispatched",
      location: "Kandy Distribution Centre",
      message:
        "Your package has left our warehouse and entered the delivery network.",
    },
    {
      name: "In transit",
      location: "Central Province Delivery Hub",
      message:
        "Your package is being transported to the delivery centre nearest to your address.",
    },
    {
      name: "Out for delivery",
      location: "Local Delivery Centre",
      message:
        "Your package is with the delivery team and should arrive today.",
    },
    {
      name: "Delivered",
      location: "Delivery address",
      message: "Your package has been delivered successfully.",
    },
  ];
  const current =
    hours < 6
      ? 0
      : hours < 24
        ? 1
        : hours < 48
          ? 2
          : hours < 96
            ? 3
            : hours < 120
              ? 4
              : 5;
  let estimate;
  if (current === 5) estimate = "Delivered";
  else if (current === 4) estimate = "Today";
  else {
    const remainingDays = current >= 3 ? 2 : current === 2 ? 3 : 5;
    estimate = formatDeliveryDate(addWorkingDays(new Date(), remainingDays));
  }
  return { stages, current, estimate };
}

function addWorkingDays(startDate, days) {
  const date = new Date(startDate);
  let added = 0;
  while (added < days) {
    date.setDate(date.getDate() + 1);
    if (date.getDay() !== 0 && date.getDay() !== 6) added += 1;
  }
  return date;
}

function formatDeliveryDate(date) {
  return new Intl.DateTimeFormat("en-LK", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function updateCartCount() {
  const count = getCart().reduce((total, item) => total + item.quantity, 0);
  document
    .querySelectorAll(".cart-count")
    .forEach((el) => (el.textContent = count));
}

function setupNewsletter() {
  const form = document.querySelector("#newsletter-form");
  if (!form) return;
  const email = document.querySelector("#newsletter-email");
  const saved = localStorage.getItem("toyHavenNewsletterEmail");
  if (saved && email) email.value = saved;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!email.checkValidity()) {
      email.reportValidity();
      return;
    }
    localStorage.setItem("toyHavenNewsletterEmail", email.value.trim());
    form.innerHTML =
      '<p class="success-text" role="status">✓ Thanks! You\'re subscribed to Toy Haven updates.</p>';
  });
}

function setupRevealAnimations() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  items.forEach((item) => observer.observe(item));
}

function setupHeroSlider() {
  const slides = [...document.querySelectorAll(".hero-slide")];
  const dots = [...document.querySelectorAll(".hero-dot")];
  if (slides.length < 2) return;
  let current = 0;
  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) =>
      slide.classList.toggle("active", i === current),
    );
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === current);
      dot.setAttribute("aria-current", i === current ? "true" : "false");
    });
  }
  dots.forEach((dot, i) => dot.addEventListener("click", () => show(i)));
  setInterval(() => show(current + 1), 4500);
}

function renderFeaturedProducts() {
  const container = document.querySelector("#featured-products");
  if (!container) return;
  container.innerHTML = products.slice(0, 4).map(createProductCard).join("");
  attachProductButtons(container);
}

function renderProductOfTheDay() {
  const container = document.querySelector("#product-of-day");
  if (!container) return;
  const product = products[Math.floor(Date.now() / 86400000) % products.length];
  container.innerHTML = `<div class="potd-image"><img src="${product.image}" alt="${product.name}"></div>
    <div class="potd-content"><p class="eyebrow">FEATURED PRODUCT OF THE DAY</p><h2>${product.name}</h2><p>${product.description}</p>${priceMarkup(product)}<div class="button-row"><button class="button add-to-cart" data-id="${product.id}">Add to Cart</button><button class="button button-outline wishlist-button" data-id="${product.id}">♡ Add to Wishlist</button></div></div>`;
  attachProductButtons(container);
}

function renderProductsPage() {
  const grid = document.querySelector("#product-grid");
  if (!grid) return;
  const search = document.querySelector("#product-search");
  const filters = document.querySelector("#category-filters");
  const sort = document.querySelector("#product-sort");
  const price = document.querySelector("#price-filter");
  const age = document.querySelector("#age-filter");
  const saleOnly = document.querySelector("#sale-filter");
  const clear = document.querySelector("#clear-filters");
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];
  filters.innerHTML = categories
    .map(
      (category) =>
        `<button type="button" class="filter-button ${category === "All" ? "selected" : ""}" data-category="${category}">${category}</button>`,
    )
    .join("");
  let activeCategory = "All";
  const initialCategory = new URLSearchParams(window.location.search).get(
    "category",
  );
  if (initialCategory && categories.includes(initialCategory))
    activeCategory = initialCategory;

  function render() {
    const term = search.value.trim().toLowerCase();
    let filtered = products.filter((product) => {
      const searchable = [
        product.name,
        product.category,
        product.description,
        product.details,
      ]
        .join(" ")
        .toLowerCase();
      const priceMatch =
        !price?.value ||
        (price.value === "under5000" && product.price < 5000) ||
        (price.value === "5000to7000" &&
          product.price >= 5000 &&
          product.price <= 7000) ||
        (price.value === "over7000" && product.price > 7000);
      const ageMatch = !age?.value || product.age === age.value;
      return (
        (activeCategory === "All" || product.category === activeCategory) &&
        searchable.includes(term) &&
        priceMatch &&
        ageMatch &&
        (!saleOnly?.checked || product.oldPrice)
      );
    });
    const sorters = {
      "price-low": (a, b) => a.price - b.price,
      "price-high": (a, b) => b.price - a.price,
      name: (a, b) => a.name.localeCompare(b.name),
      rating: (a, b) => b.rating - a.rating,
    };
    if (sorters[sort?.value]) filtered.sort(sorters[sort.value]);
    grid.innerHTML = filtered.length
      ? filtered.map(createProductCard).join("")
      : `<div class="empty-state"><h2>We couldn't find a matching toy.</h2><p>Try a different name, fewer letters, or clear the selected filters.</p><button class="button reset-search" type="button">Clear all filters</button></div>`;
    const count = document.querySelector("#product-result-count");
    if (count)
      count.textContent = `Showing ${filtered.length} of ${products.length} products${term ? ` for “${search.value.trim()}”` : ""}`;
    attachProductButtons(grid);
    grid
      .querySelector(".reset-search")
      ?.addEventListener("click", resetFilters);
  }

  function resetFilters() {
    search.value = "";
    activeCategory = "All";
    if (sort) sort.value = "featured";
    if (price) price.value = "";
    if (age) age.value = "";
    if (saleOnly) saleOnly.checked = false;
    filters
      .querySelectorAll(".filter-button")
      .forEach((button) =>
        button.classList.toggle("selected", button.dataset.category === "All"),
      );
    render();
  }

  filters.addEventListener("click", (event) => {
    const button = event.target.closest(".filter-button");
    if (!button) return;
    activeCategory = button.dataset.category;
    filters
      .querySelectorAll(".filter-button")
      .forEach((item) => item.classList.remove("selected"));
    button.classList.add("selected");
    render();
  });
  [search, sort, price, age, saleOnly]
    .filter(Boolean)
    .forEach((control) =>
      control.addEventListener(control === search ? "input" : "change", render),
    );
  clear?.addEventListener("click", resetFilters);
  filters
    .querySelectorAll(".filter-button")
    .forEach((button) =>
      button.classList.toggle(
        "selected",
        button.dataset.category === activeCategory,
      ),
    );
  render();
}

function priceMarkup(product) {
  if (!product.oldPrice)
    return `<strong class="current-price">${formatCurrency(product.price)}</strong>`;
  const discount = Math.round((1 - product.price / product.oldPrice) * 100);
  return `<span class="price-wrap"><strong class="current-price">${formatCurrency(product.price)}</strong><del>${formatCurrency(product.oldPrice)}</del><span class="discount-label">${discount}% off</span></span>`;
}

function createProductCard(product) {
  const wishlist = JSON.parse(localStorage.getItem("toyHavenWishlist") || "{}");
  const wished = Boolean(wishlist[product.id]);
  const saleBadge = product.oldPrice
    ? '<span class="sale-badge">Sale</span>'
    : "";
  return `<article class="product-card reveal visible"><button class="product-image view-product" type="button" data-id="${product.id}" aria-label="View details for ${product.name}">${saleBadge}<img src="${product.image}" alt="${product.name}"></button><div class="product-info"><p class="product-category">${product.category} · Ages ${product.age}</p><h3>${product.name}</h3><p class="product-description">${product.description}</p><div class="rating" aria-label="${product.rating} out of 5 stars">★ ${product.rating}</div><div class="product-price-row">${priceMarkup(product)}</div><div class="product-actions"><button type="button" class="icon-button wishlist-button ${wished ? "is-wished" : ""}" data-id="${product.id}" aria-label="${wished ? "Remove" : "Add"} ${product.name} ${wished ? "from" : "to"} wishlist">${wished ? "♥" : "♡"}</button><button type="button" class="button small view-product" data-id="${product.id}">View</button><button type="button" class="button small add-to-cart" data-id="${product.id}">Add to Cart</button></div></div></article>`;
}

function attachProductButtons(container) {
  container
    .querySelectorAll(".add-to-cart")
    .forEach((button) =>
      button.addEventListener("click", () =>
        addToCart(Number(button.dataset.id)),
      ),
    );
  container
    .querySelectorAll(".wishlist-button")
    .forEach((button) =>
      button.addEventListener("click", () =>
        toggleWishlist(Number(button.dataset.id), button),
      ),
    );
  container
    .querySelectorAll(".view-product")
    .forEach((button) =>
      button.addEventListener("click", () =>
        openProductModal(Number(button.dataset.id)),
      ),
    );
}

function addToCart(id) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === id);
  if (existing) existing.quantity += 1;
  else cart.push({ id, quantity: 1 });
  saveCart(cart);
  updateCartCount();
  showToast("Added to cart ✓");
}

function toggleWishlist(id, button) {
  const wishlist = JSON.parse(localStorage.getItem("toyHavenWishlist") || "{}");
  if (wishlist[id]) {
    delete wishlist[id];
    button.classList.remove("is-wished");
    button.textContent = "♡";
    button.setAttribute("aria-label", `Add ${getProduct(id).name} to wishlist`);
    showToast("Removed from wishlist");
  } else {
    wishlist[id] = "Interested";
    button.classList.add("is-wished");
    button.textContent = "♥";
    button.setAttribute(
      "aria-label",
      `Remove ${getProduct(id).name} from wishlist`,
    );
    showToast("Saved to wishlist ♥");
  }
  localStorage.setItem("toyHavenWishlist", JSON.stringify(wishlist));
}

function openProductModal(id) {
  const product = getProduct(id);
  const modal = document.querySelector("#product-modal");
  if (!product || !modal) return;
  modal.querySelector(".modal-image").innerHTML =
    `<img src="${product.image}" alt="${product.name}">`;
  modal.querySelector(".modal-category").textContent =
    `${product.category} · Ages ${product.age}`;
  modal.querySelector(".modal-title").textContent = product.name;
  modal.querySelector(".modal-description").textContent = product.description;
  modal.querySelector(".modal-price").innerHTML = priceMarkup(product);
  let meta = modal.querySelector(".modal-meta");
  if (!meta) {
    meta = document.createElement("div");
    meta.className = "modal-meta";
    modal.querySelector(".modal-description").after(meta);
  }
  meta.innerHTML = `<p><strong>Product details:</strong> ${product.details}</p><p><strong>Rating:</strong> ★ ${product.rating}/5</p><p><strong>Availability:</strong> ${product.stock} in stock</p>`;
  modal.querySelector(".modal-add-cart").dataset.id = product.id;
  modal.querySelector(".modal-wishlist").dataset.id = product.id;
  modal.hidden = false;
  document.body.classList.add("modal-open");
  modal.querySelector(".modal-close").focus();
}

function closeProductModal() {
  const modal = document.querySelector("#product-modal");
  if (!modal) return;
  modal.hidden = true;
  if (
    ![...document.querySelectorAll(".utility-modal")].some(
      (panel) => !panel.hidden,
    )
  )
    document.body.classList.remove("modal-open");
}

document.addEventListener("click", (event) => {
  if (
    event.target.matches(
      "#product-modal .modal-close, #product-modal .modal-backdrop",
    )
  )
    closeProductModal();
  if (event.target.matches(".modal-add-cart"))
    addToCart(Number(event.target.dataset.id));
  if (event.target.matches(".modal-wishlist"))
    toggleWishlist(Number(event.target.dataset.id), event.target);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeProductModal();
    closeUtilityPanels();
  }
});

function showToast(message) {
  let toast = document.querySelector("#toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    toast.setAttribute("role", "status");
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator && location.protocol !== "file:")
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
}
