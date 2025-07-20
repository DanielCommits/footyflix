import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Footyflix",
  description: "Watch football matches live and on demand.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
