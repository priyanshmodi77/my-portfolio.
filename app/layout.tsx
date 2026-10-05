import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Priyansh Modi — Developer, Analyst, Builder",
  description:
    "Priyansh Modi builds digital experiences and turns ideas into meaningful solutions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@300;400;500;600&family=Fragment+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
