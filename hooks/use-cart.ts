"use client";

import { CartContext } from "@/providers/cart-context";
import { use } from "react";

export function useCart() {
  const context = use(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
