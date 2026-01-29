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
  title: "Talha Iftikhar - Software Engineer & Web Developer",
  description: "Talha Iftikhar is a Software Engineer & Web Developer specializing in Next.js & MERN Stack. Explore his portfolio to see projects and expertise.",
  keywords: ["Software Engineer", "Talha Iftikhar", "Web Developer", "React Developer", "Next.js Developer", "Full Stack Developer", "MERN Stack Developer"],
  authors: [{ name: "Talha Iftikhar" }],
  publisher: "Talha Iftikhar",
  alternates: {
    canonical: "https://www.talhaiftikhar.com",
  },
  icons: {
    icon: "/public/Talha portfolio logo.png",          // 👈 favicon
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
    title: "Talha Iftikhar - Software Engineer & Web Developer",
    description: "Talha Iftikhar is a Software Engineer & Web Developer specializing in Next.js & React. Explore his portfolio.",
    url: "https://www.talhaiftikhar.com",
    siteName: "Talha Iftikhar Portfolio",
    images: [
      {
        url: "/assets/talha crop.webp",
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
