"use client";
import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface NavItemProps {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
}

export default function NavItem({ href, children, icon }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link 
      href={href}
      className={`nav-item ${isActive ? 'active' : ''} ${icon ? 'flex items-center gap-1' : ''}`}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}
