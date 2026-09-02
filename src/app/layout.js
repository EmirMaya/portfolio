import { Bungee } from "next/font/google";
import "./globals.css";

const bungee = Bungee({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bungee",
});

export const metadata = {
  title: {
    default: "Emir Maya - Full Stack Developer",
    template: "%s | Emir Maya",
  },
  description:
    "Portfolio of Emir Maya, a full stack developer focused on modern web applications with React, Next.js and backend technologies.",
  authors: [{ name: "Emir Maya" }],
  creator: "Emir Maya",
  openGraph: {
    title: "Emir Maya - Full Stack Developer",
    description:
      "Projects, skills and contact information for Emir Maya, full stack developer.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={bungee.className}>{children}</body>
    </html>
  );
}
