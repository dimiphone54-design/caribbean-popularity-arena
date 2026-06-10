import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Caribbean Popularity Arena",
  description:
    "A fan-powered Caribbean creator ranking, voting, and discovery platform.",
  openGraph: {
    title: "Caribbean Popularity Arena",
    description:
      "Vote for Caribbean creators, track weekly leaderboards, and unlock membership boosts.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
