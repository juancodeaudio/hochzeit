import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "app/components/shared/Navbar";
import { Header } from "app/components/shared/Header";
import { Footer } from "app/components/shared/Footer";
import "app/sass/main.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Camila & Juan Pablo",
  description: "Camila & Juan Pablo's wedding",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
