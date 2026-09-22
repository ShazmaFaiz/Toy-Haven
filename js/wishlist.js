document.addEventListener("DOMContentLoaded", renderWishlist);
function renderWishlist() {
  const grid = document.querySelector("#wishlist-grid");
  if (!grid) return;
  const wishlist = JSON.parse(localStorage.getItem("toyHavenWishlist") || "{}");
  const ids = Object.keys(wishlist);
  if (!ids.length) {
    grid.innerHTML = `<div class="empty-state"><h2>Your collection is empty.</h2><p>Add products to your wishlist from the Products page.</p><a class="button" href="products.html">Explore Products</a></div>`;
    return;
  }
  grid.innerHTML = ids
    .map((id) => {
      const p = getProduct(id);
      return `<article class="product-card"><div class="product-image"><img src="${p.image}" alt="${p.name}"></div><div class="product-info"><p class="product-category">${p.category}</p><h3>${p.name}</h3><label for="status-${p.id}">Collection status</label><select id="status-${p.id}" class="wishlist-status" data-id="${p.id}"><option ${wishlist[id] === "Interested" ? "selected" : ""}>Interested</option><option ${wishlist[id] === "Owned" ? "selected" : ""}>Owned</option><option ${wishlist[id] === "Not Interested" ? "selected" : ""}>Not Interested</option></select><div class="button-row"><button type="button" class="button small remove-wishlist" data-id="${p.id}">Remove</button><button type="button" class="button small add-to-cart" data-id="${p.id}">Add to Cart</button></div></div></article>`;
    })
    .join("");
  grid.querySelectorAll(".wishlist-status").forEach((select) =>
    select.addEventListener("change", () => {
      wishlist[select.dataset.id] = select.value;
      localStorage.setItem("toyHavenWishlist", JSON.stringify(wishlist));
    }),
  );
  grid.querySelectorAll(".remove-wishlist").forEach((button) =>
    button.addEventListener("click", () => {
      delete wishlist[button.dataset.id];
      localStorage.setItem("toyHavenWishlist", JSON.stringify(wishlist));
      renderWishlist();
    }),
  );
  grid
    .querySelectorAll(".add-to-cart")
    .forEach((button) =>
      button.addEventListener("click", () =>
        addToCart(Number(button.dataset.id)),
      ),
    );
}
