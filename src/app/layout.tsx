import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Caveat, Klee_One } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const kleeOne = Klee_One({
  variable: "--font-klee",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Three Good Things",
  description: "毎日3つの良いことを記録するアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ja"
      className={`${geist.variable} ${caveat.variable} ${kleeOne.variable} h-full`}
    >
      <body className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-klee), var(--font-geist), system-ui" }}>
        {children}
      </body>
    </html>
  );
}
