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
  description: "Portfolio of Talha Iftikhar - Software Engineer and Web Developer",
  keywords: ["Software Engineer", "Web Developer", "React", "Next.js", "Portfolio", "Talha Iftikhar"],
  authors: [{ name: "Talha Iftikhar" }],
  publisher: "Talha Iftikhar",
  alternates: {
    canonical: "https://talhaiftikhar.netlify.app",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Talha Iftikhar - Portfolio",
    description: "Welcome to the portfolio of Talha Iftikhar. Explore my projects and skills.",
    url: "https://talhaiftikhar.netlify.app",
    siteName: "Talha Iftikhar Portfolio",
    images: [
      {
        url: "/assets/talha crop.JPG",
        width: 800,
        height: 600,
        alt: "Talha Iftikhar Profile",
      },
    ],
    locale: "en_US",
    type: "website",
  },
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
