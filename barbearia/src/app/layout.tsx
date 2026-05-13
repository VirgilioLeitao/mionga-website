import type { Metadata } from "next";
import { Manrope, Marcellus } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Atelier Navalha | Barbearia de luxo em Lisboa",
  description:
    "Corte, barba e grooming masculino premium no Chiado, Lisboa. Marcações privadas, barbeiros sénior e rituais de assinatura.",
  keywords: [
    "barbearia Lisboa",
    "barbearia de luxo",
    "barbeiro Chiado",
    "grooming masculino",
    "corte masculino Lisboa",
  ],
  openGraph: {
    title: "Atelier Navalha | Barbearia de luxo em Lisboa",
    description:
      "Uma barbearia cinematográfica no Chiado para corte, barba e ritual de grooming com marcação privada.",
    locale: "pt_PT",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-PT"
      className={`${manrope.variable} ${marcellus.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
