import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import type { Metadata } from "next";
import localFont from 'next/font/local'
import { Montserrat } from "next/font/google";
import { routing } from 'app/i18n/routing';
import LenisProvider from 'app/components/providers/LenisProvider';
import { Cursor } from 'app/components/common';
import { NavbarProvider } from 'app/components/shared/Navbar/NavbarContext';
import { Navbar, Header, Footer } from "app/components/shared";
import "app/sass/main.scss";

const amsterdamFour = localFont({
  src: '../../fonts/amsterdam-four.woff2',
  display: 'swap',
  variable: '--font-amsterdam-four',
});

const atteron = localFont({
  src: '../../fonts/atteron.woff2',
  display: 'swap',
  variable: '--font-atteron',
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: 'variable'
});

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
      <body className={`${montserrat.className} ${amsterdamFour.variable} ${atteron.variable}`}>
        <LenisProvider>
          <NextIntlClientProvider>  
            <Cursor />
            <NavbarProvider>
              <Navbar />
            </NavbarProvider>
            <Header />
            {children}
            <Footer />
          </NextIntlClientProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
