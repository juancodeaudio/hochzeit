import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {routing} from 'app/i18n/routing';
import { Navbar } from "app/components/shared/Navbar";
import { Header } from "app/components/shared/Header";
import { Footer } from "app/components/shared/Footer";
import "app/sass/main.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Camila & Juan Pablo",
  description: "Camila & Juan Pablo's wedding",
};

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider>  
          <Navbar />
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
