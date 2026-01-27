import type { Metadata } from "next";
import { Rubik } from "next/font/google"; // Import Rubik font
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"]
});

export const metadata: Metadata = {
  title: "Talha Iftikhar - Portfolio",
  description: "Portfolio of Talha Iftikhar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rubik.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
