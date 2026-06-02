const CART_KEY = 'dmk_cart';

const Cart = {
  get() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch { return []; }
  },

  save(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    Cart.updateBadge();
  },

  add(product) {
    const cart = Cart.get();
    const existing = cart.find(i => i.id === product.id);
    if (existing) {
      existing.quantity += (product.quantity || 1);
    } else {
      cart.push({ ...product, quantity: product.quantity || 1 });
    }
    Cart.save(cart);
  },

  remove(productId) {
    Cart.save(Cart.get().filter(i => i.id !== productId));
  },

  updateQty(productId, qty) {
    const cart = Cart.get();
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    if (qty <= 0) { Cart.remove(productId); return; }
    item.quantity = parseInt(qty);
    Cart.save(cart);
  },

  total() {
    return Cart.get().reduce((s, i) => s + (i.price * i.quantity), 0);
  },

  count() {
    return Cart.get().reduce((s, i) => s + i.quantity, 0);
  },

  clear() {
    localStorage.removeItem(CART_KEY);
    Cart.updateBadge();
  },

  updateBadge() {
    const badge = document.getElementById('cartBadge');
    if (!badge) return;
    const count = Cart.count();
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
};

window.Cart = Cart;
document.addEventListener('DOMContentLoaded', () => Cart.updateBadge());
