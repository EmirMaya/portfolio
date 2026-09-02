import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
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
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
