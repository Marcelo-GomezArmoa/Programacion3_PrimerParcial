import { checkAuhtUser } from "../../../utils/auth";
import { getCartTotal, readCart, updateCartQuantity } from "../../../utils/cart";

const cartContent = document.getElementById("cartContent") as HTMLDivElement;
const totalValue = document.getElementById("totalValue") as HTMLSpanElement;

const currency = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

const renderTotal = (): void => {
  totalValue.textContent = currency.format(getCartTotal());
};

const renderCart = (): void => {
  const cart = readCart();

  if (cart.length === 0) {
    cartContent.innerHTML =
      '<div class="empty-box">Tu carrito esta vacio. Agrega productos desde el catalogo.</div>';
    renderTotal();
    return;
  }

  const rows = cart
    .map(
      (item) => `
        <tr>
          <td>${item.name}</td>
          <td>${currency.format(item.price)}</td>
          <td>
            <div class="qty-actions">
              <button class="qty-btn" data-action="decrease" data-id="${item.productId}">-</button>
              <span>${item.quantity}</span>
              <button class="qty-btn" data-action="increase" data-id="${item.productId}">+</button>
            </div>
          </td>
          <td>${currency.format(item.price * item.quantity)}</td>
        </tr>
      `
    )
    .join("");

  cartContent.innerHTML = `
    <table class="cart-table">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;

  renderTotal();
};

cartContent.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  const button = target.closest("button.qty-btn") as HTMLButtonElement | null;

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

  const nextQuantity = action === "increase" ? item.quantity + 1 : item.quantity - 1;
  updateCartQuantity(productId, nextQuantity);
  renderCart();
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
