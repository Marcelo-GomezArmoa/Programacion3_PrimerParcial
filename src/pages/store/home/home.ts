import { PRODUCTS, getCategories } from "../../../data/data";
import type { Product } from "../../../types/product";
import { checkAuhtUser } from "../../../utils/auth";
import { addToCart, getCartItemsCount } from "../../../utils/cart";

const productList = document.getElementById("productList") as HTMLElement;
const categoryList = document.getElementById("categoryList") as HTMLUListElement;
const searchInput = document.getElementById("searchInput") as HTMLInputElement;
const resultInfo = document.getElementById("resultInfo") as HTMLParagraphElement;
const emptyState = document.getElementById("emptyState") as HTMLDivElement;
const cartCount = document.getElementById("cartCount") as HTMLSpanElement;
const feedback = document.getElementById("feedback") as HTMLParagraphElement;

let selectedCategory = "all";
let searchTerm = "";

const currency = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

const showFeedback = (message: string): void => {
  feedback.textContent = message;
  feedback.classList.add("visible");

  window.setTimeout(() => {
    feedback.classList.remove("visible");
  }, 1400);
};

const updateCartBadge = (): void => {
  cartCount.textContent = String(getCartItemsCount());
};

const filterProducts = (): Product[] => {
  return PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.categoryId === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });
};

const renderProducts = (): void => {
  const products = filterProducts();

  productList.innerHTML = "";

  if (products.length === 0) {
    emptyState.hidden = false;
    resultInfo.textContent = "Resultados: 0";
    return;
  }

  emptyState.hidden = true;
  resultInfo.textContent = `Resultados: ${products.length}`;

  for (const product of products) {
    const article = document.createElement("article");
    article.className = "card";
    article.innerHTML = `
      <img src="${product.image}" alt="${product.name}" loading="lazy" />
      <div class="card-content">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="card-footer">
          <span class="price">${currency.format(product.price)}</span>
          <button class="add-btn" data-id="${product.id}">Agregar</button>
        </div>
      </div>
    `;
    productList.appendChild(article);
  }
};

const renderCategories = (): void => {
  const categories = getCategories();
  categoryList.innerHTML = "";

  for (const category of categories) {
    const li = document.createElement("li");
    const button = document.createElement("button");

    button.type = "button";
    button.className = "category-button";
    button.textContent = category.label;
    button.dataset.categoryId = category.id;

    if (category.id === selectedCategory) {
      button.classList.add("active");
    }

    li.appendChild(button);
    categoryList.appendChild(li);
  }
};

categoryList.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  const button = target.closest("button.category-button") as HTMLButtonElement | null;

  if (!button) {
    return;
  }

  selectedCategory = button.dataset.categoryId ?? "all";
  renderCategories();
  renderProducts();
});

searchInput.addEventListener("input", () => {
  searchTerm = searchInput.value.trim();
  renderProducts();
});

productList.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  const button = target.closest("button.add-btn") as HTMLButtonElement | null;

  if (!button) {
    return;
  }

  const id = Number(button.dataset.id);
  const product = PRODUCTS.find((item) => item.id === id);

  if (!product) {
    return;
  }

  addToCart(product);
  updateCartBadge();
  showFeedback(`Se agrego ${product.name} al carrito`);
});

const initPage = (): void => {
  checkAuhtUser(
    "/src/pages/auth/login/login.html",
    "/src/pages/admin/home/home.html",
    "client"
  );
  renderCategories();
  renderProducts();
  updateCartBadge();
};

initPage();
