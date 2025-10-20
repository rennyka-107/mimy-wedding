import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Mimy",
  description: "Admin Dashboard",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
