/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { createContext, useCallback, useState } from "react";

type Props = {
  children: React.ReactNode;
};

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  images: {
    src: string;
  }[];
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  cartTotal: number;
}

// Todo: Corregir el tipo del contexto
export const CartContext = createContext<CartContextType | null>(null);

const CartProvider = ({ children }: Props) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Crea las funciones para manejar el estado del carrito
  // Todo: Revisar que los valores se actualicen correctamente en el estado

  const addItem = useCallback((product: CartItem) => {
    const existingItem = items.find((item) => item.id === product.id);
    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      setItems((prevItems) => [...prevItems.filter((item) => item.id !== product.id), updatedItem]);
    } else {
      setItems((prevItems) => [...prevItems, { ...product, quantity: 1 }]);
    }
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId);
    }
    setItems((prevItems) => prevItems.map((item) => (item.id === productId ? { ...item, quantity } : item)));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // Calcula el total del carrito
  const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, isOpen, setIsOpen, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
