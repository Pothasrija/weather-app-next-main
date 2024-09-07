import type { Metadata } from "next";
import { Outfit } from "next/font/google";

import "./globals.css";

const outfit = Outfit({
   subsets: ["latin"],
   display: "swap",
});

export const metadata: Metadata = {
   title: "Weather App",
   description: "Weather app based on Next JS",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body className={`${outfit.className} antialiased`}>{children}</body>
      </html>
   );
}
