import { checkAuhtUser } from "../../../utils/auth";
import {
  clearCart,
  getCartTotal,
  readCart,
  updateCartQuantity,
} from "../../../utils/cart";

const cartContent = document.getElementById("cartContent") as HTMLDivElement;
const subtotalValue = document.getElementById("subtotalValue") as HTMLSpanElement;
const totalValue = document.getElementById("totalValue") as HTMLSpanElement;
const clearCartButton = document.getElementById(
  "clearCartButton"
) as HTMLButtonElement;
const checkoutButton = document.getElementById(
  "checkoutButton"
) as HTMLButtonElement;
const checkoutMessage = document.getElementById(
  "checkoutMessage"
) as HTMLParagraphElement;

const currency = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

const renderTotal = (): void => {
  const total = currency.format(getCartTotal());
  subtotalValue.textContent = total;
  totalValue.textContent = total;
};

const renderCart = (): void => {
  const cart = readCart();
  clearCartButton.disabled = cart.length === 0;

  if (cart.length === 0) {
    cartContent.innerHTML =
      '<div class="empty-box">Tu carrito esta vacio. Agrega productos desde el catalogo.</div>';
    renderTotal();
    return;
  }

  const cards = cart
    .map(
      (item) => `
        <article class="cart-item-card">
          <div class="cart-item-media">🍽</div>
          <div class="cart-item-copy">
            <h3>${item.name}</h3>
            <p>Precio unitario: ${currency.format(item.price)}</p>
            <strong>Subtotal: ${currency.format(item.price * item.quantity)}</strong>
          </div>
          <div class="cart-item-actions">
            <div class="qty-actions">
              <button class="qty-btn light-btn" data-action="decrease" data-id="${item.productId}" type="button">-</button>
              <span>${item.quantity}</span>
              <button class="qty-btn light-btn" data-action="increase" data-id="${item.productId}" type="button">+</button>
            </div>
            <button class="remove-link" data-action="remove" data-id="${item.productId}" type="button">Eliminar</button>
          </div>
        </article>
      `
    )
    .join("");

  cartContent.innerHTML = `<div class="cart-cards">${cards}</div>`;

  renderTotal();
};

cartContent.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  const button = target.closest("button[data-action]") as HTMLButtonElement | null;

  if (!button) {
    return;
  }

  const productId = Number(button.dataset.id);
  const action = button.dataset.action;
  const cart = readCart();
  const item = cart.find((current) => current.productId === productId);

  if (!item) {
    return;
  }

  const nextQuantity =
    action === "increase"
      ? item.quantity + 1
      : action === "remove"
        ? 0
        : item.quantity - 1;
  updateCartQuantity(productId, nextQuantity);
  renderCart();
});

clearCartButton.addEventListener("click", () => {
  clearCart();
  renderCart();
});

checkoutButton.addEventListener("click", () => {
  checkoutMessage.textContent =
    "El checkout no esta implementado en esta entrega frontend.";
});

const initPage = (): void => {
  checkAuhtUser(
    "/src/pages/auth/login/login.html",
    "/src/pages/admin/home/home.html",
    "client"
  );
  renderCart();
};

initPage();
