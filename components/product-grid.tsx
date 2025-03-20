"use client";
import { navbarData } from "@/lib/data";
import { MoreVertical, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Props = {
  products: any[];
};

export const ProductGrid = ({ products }: Props) => {
  const [toggle, setToggle] = useState<boolean>(false);
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
        </div>
      </header>
    </div>
  );
};
