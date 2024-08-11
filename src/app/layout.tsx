import type { Metadata } from "next";

import "./globals.css";
import { inter } from "@/config/fonts";
import { Providers } from "@/components/ui/providers/Providers";

export const metadata: Metadata = {
  title: {
    template: "%s - Teslo | Shp",
    default: "Home",
  },
  description: "Página de Teslo shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
