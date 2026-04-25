export const getCart = () => {
  if (typeof window === "undefined") return [];

  return JSON.parse(localStorage.getItem("cart") || "[]");
};

export const saveCart = (cart: any[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
};

export const addToCart = (product: any) => {
  const cart = getCart();

  const index = cart.findIndex((item: any) => item.id === product.id);

  if (index !== -1) {
    cart[index].quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  }

  saveCart(cart);
};

export const removeFromCart = (id: number) => {
  const cart = getCart().filter((item: any) => item.id !== id);
  saveCart(cart);
};

export const updateQuantity = (id: number, type: "inc" | "dec") => {
  const cart = getCart().map((item: any) => {
    if (item.id === id) {
      if (type === "inc") return { ...item, quantity: item.quantity + 1 };
      if (type === "dec" && item.quantity > 1)
        return { ...item, quantity: item.quantity - 1 };
    }
    return item;
  });

  saveCart(cart);
};