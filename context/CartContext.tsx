"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  ReactNode,
} from "react";
import { message } from "antd";
import debounce from "lodash/debounce";
import { useAuth } from "./AuthContext";
import {
  getCartItems,
  addToCart as addToCartAPI,
  updateCartQuantity as updateQuantityAPI,
  removeFromCart as removeFromCartAPI,
} from "../app/lib/user/addToCart";

/* ================= TYPES ================= */

interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addToCart: (product: CartItem) => Promise<void>;
  updateQuantity: (id: string, type: "inc" | "dec") => void;
  removeItem: (id: string) => Promise<void>;
  refreshCart: () => Promise<void>;
  clearCartLocal: () => void;
}

/* ================= CONTEXT ================= */

const CartContext = createContext<CartContextType | null>(null);

/* ================= PROVIDER ================= */

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  /* ================= FETCH CART ================= */

  const fetchCart = useCallback(async () => {
    if (!user) {
      setCart([]);
      return;
    }

    try {
      const data = await getCartItems();
      setCart(data || []);
    } catch (err) {
      console.error("Fetch cart failed");
    }
  }, [user]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  /* ================= ADD TO CART ================= */

  const addToCart = useCallback(
    async (product: CartItem) => {
      const previousCart = [...cart];

      // Optimistic update
      setCart((prev) => {
        const existing = prev.find((i) => i._id === product._id);

        if (existing) {
          return prev.map((i) =>
            i._id === product._id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        }

        return [...prev, { ...product, quantity: 1 }];
      });

      try {
        await addToCartAPI(product._id, 1);
        message.success("Added to cart");
      } catch (err) {
        setCart(previousCart);
        message.error("Failed to add");
      }
    },
    [cart]
  );

  /* ================= DEBOUNCED SYNC ================= */

  const debouncedSync = useMemo(
    () =>
      debounce(async (productId: string, quantity: number) => {
        try {
          await updateQuantityAPI(productId, quantity);
        } catch (err) {
          console.error("Quantity sync failed");
        }
      }, 500),
    []
  );

  /* ================= UPDATE QUANTITY ================= */

  const updateQuantity = useCallback(
    (id: string, type: "inc" | "dec") => {
      setCart((prev) =>
        prev.map((item) => {
          if (item._id !== id) return item;

          const newQty =
            type === "inc"
              ? item.quantity + 1
              : Math.max(1, item.quantity - 1);

          debouncedSync(id, newQty);

          return { ...item, quantity: newQty };
        })
      );
    },
    [debouncedSync]
  );

  /* ================= REMOVE ITEM ================= */

  const removeItem = useCallback(
    async (id: string) => {
      const previousCart = [...cart];

      setCart((prev) => prev.filter((item) => item._id !== id));

      try {
        await removeFromCartAPI(id);
      } catch (err) {
        setCart(previousCart);
        message.error("Remove failed");
      }
    },
    [cart]
  );

  /* ================= CLEAR LOCAL (AFTER ORDER) ================= */

  const clearCartLocal = useCallback(() => {
    setCart([]);
  }, []);

  /* ================= CART COUNT ================= */

  const cartCount = cart.length;

  /* ================= CONTEXT VALUE ================= */

  const value = useMemo(
    () => ({
      cart,
      cartCount,
      drawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
      addToCart,
      updateQuantity,
      removeItem,
      refreshCart: fetchCart, // 🔥 important
      clearCartLocal, // 🔥 optional instant clear
    }),
    [
      cart,
      cartCount,
      drawerOpen,
      addToCart,
      updateQuantity,
      removeItem,
      fetchCart,
      clearCartLocal,
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

/* ================= HOOK ================= */

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart must be used inside CartProvider");
  return context;
};
