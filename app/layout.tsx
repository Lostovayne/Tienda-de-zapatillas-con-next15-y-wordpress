import type { Metadata } from "next";
import { DM_Mono } from "next/font/google";
import "./globals.css";

const dmmono = DM_Mono({
  weight: "400",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Deus Store Yeezy",
  description: "Deus Store Yeezy is a store for Deus Shoes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning >
      <body
        className={`${dmmono.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
