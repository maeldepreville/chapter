import type { Metadata } from "next";
import "./globals.css";
import "./phase10.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://chapter-reading.smrdsh.chatgpt.site"),
  title: "Chapter — Every book becomes part of your story",
  description: "Un journal de lecture personnel pour suivre, écrire et partager ce que les livres laissent en nous.",
  openGraph: {
    title: "Chapter",
    description: "Every book becomes part of your story.",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chapter",
    description: "Every book becomes part of your story.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
