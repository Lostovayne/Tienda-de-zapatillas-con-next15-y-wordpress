"use client";
import { GetProductType } from "@/actions/products";
import { useCart } from "@/hooks/use-cart";
import { navbarData } from "@/lib/data";
import { Minus, MoreVertical, Plus, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

type Props = {
  products: GetProductType[];
};

export const ProductGrid = ({ products }: Props) => {
  const [toggle, setToggle] = useState<boolean>(false);
  const { isOpen, setIsOpen, items: cartItems, updateQuantity, removeItem: removeFromCart } = useCart();

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-10 bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button className="p-2" onClick={() => setToggle(!toggle)}>
            {toggle ? <X className="h-6 w-6 font-bold" /> : <MoreVertical className="h-6 w-6 font-bold" />}
            <span className="sr-only">Menu</span>
          </button>
          {toggle && (
            <div className="w-full flex gap-x-10 items-center justify-center">
              {navbarData.map((item) => (
                <Link
                  key={item.idx}
                  href={item.link}
                  className="text-lg font-medium text-gray-900 hover:text-gray-700 transition-all duration-300"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          )}

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="text-lg font-medium flex items-center gap-2">
                <span>Cart</span>
                {cartItems.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 border border-transparent rounded-full">
                    {cartItems.length > 0 && (
                      <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium bg-black text-white rounded-full">
                        {cartItems.reduce((total, item) => total + item.quantity, 0)}
                      </span>
                    )}
                  </span>
                )}
              </button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Shopping Cart</SheetTitle>
              </SheetHeader>
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[50vh]">
                  <ShoppingCart className="size-12 text-gray-300 mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  <div className="flex-1 overflow-auto py-6">
                    <ul className="space-y-6">
                      {cartItems.map((item) => (
                        <li key={item.id} className="flex gap-4">
                          <div className="size-24 flex-shrink-0 overflow-hidden rounded-md border">
                            <Image
                              src={item.images[0].src || "/placeholder.svg"}
                              alt={item.name}
                              width={100}
                              height={100}
                              className="size-full object-contain p-2"
                            />
                          </div>
                          <div className="flex flex-1 flex-col">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>{item.name}</h3>
                              <p className="ml-4">{item.price}</p>
                            </div>
                            {/* Buttons */}
                            <div className="flex items-center mt-2">
                              <button
                                className="rounded-md border p-1"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="size-4" />
                              </button>
                              <span className="mx-2 w-8 text-center">{item.quantity}</span>
                              <button
                                className="rounded-md border p-1"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="size-4" />
                              </button>

                              <button
                                className="ml-auto text-gray-400 hover:text-gray-500"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <X className="size-4" />
                                <span className="sr-only">Remove</span>
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Aqui quedé */}
                  <div className="border-t border-gray-200 py-6"></div>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </div>
  );
};
