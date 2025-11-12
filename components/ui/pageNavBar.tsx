"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from 'next/navigation'

export const PageNavBar = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  return (
  <nav className="flex items-center gap-2">
    <Button variant={isActive('/') ? "default" : "outline"} asChild>
      <Link href="/">Главная</Link>
    </Button>
    <Button variant={isActive('/products') ? "default" : "outline"} asChild>
      <Link href="/products">Продукты</Link>
    </Button>
  </nav>
)}