import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(
    `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL || "emirfullstackdev.vercel.app"}`
  ),
  title: {
    default: "Emir Maya - Full Stack Developer",
    template: "%s | Emir Maya",
  },
  description:
    "Portfolio of Emir Maya, a full stack developer focused on modern web applications with React, Next.js and backend technologies.",
  authors: [{ name: "Emir Maya" }],
  creator: "Emir Maya",
  icons: {
    apple: [{ url: "/images/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Emir Maya - Full Stack Developer",
    description:
      "Projects, skills and contact information for Emir Maya, full stack developer.",
    type: "website",
    siteName: "Emir Maya Portfolio",
    images: [{
      url: "/images/social-preview.png",
      width: 1280,
      height: 640,
      alt: "Emir Maya — EM logo with violet, blue and cyan stripes",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emir Maya - Full Stack Developer",
    description:
      "Projects, skills and contact information for Emir Maya, full stack developer.",
    images: [{
      url: "/images/social-preview.png",
      alt: "Emir Maya — EM logo with violet, blue and cyan stripes",
    }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
