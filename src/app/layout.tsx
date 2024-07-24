import type { Metadata } from "next";

import "./globals.css";
import { inter } from "@/config/fonts";
import { Provider } from "@/components/ui/provider/Provider";

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
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
