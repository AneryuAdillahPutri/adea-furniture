import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Adea Client Area",
  description: "Dashboard untuk Klien",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        {/* INI SOLUSI AJAIBNYA: Ambil Tailwind langsung dari internet */}
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className={inter.className} style={{ backgroundColor: '#f9fafb' }}>
        {children}
      </body>
    </html>
  );
}