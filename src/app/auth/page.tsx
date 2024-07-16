import Image from "next/image";
import { Montserrat_Alternates } from 'next/font/google';
import { titleFont } from "@/config/fonts";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/auth/login")
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Aplicación Teslo Shop</h1>
      <h1 className={titleFont.className}>Fuente Montserrat_Alternates</h1>
    </main>
  );
}
