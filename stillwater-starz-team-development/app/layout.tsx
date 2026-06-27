import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stillwater Starz Team Development",
  description: "Private lesson registration and management for Stillwater Starz Swim Team.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
