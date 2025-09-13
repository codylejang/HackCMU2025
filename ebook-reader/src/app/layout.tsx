import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AtlasMind",
  description: "Intelligent e-book reader with AI-powered insights and references",
  icons: {
    icon: "/Gemini_Generated_Image_3aa3y43aa3y43aa3(2).png",
    shortcut: "/Gemini_Generated_Image_3aa3y43aa3y43aa3(2).png",
    apple: "/Gemini_Generated_Image_3aa3y43aa3y43aa3(2).png",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
