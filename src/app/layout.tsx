import type { Metadata, Viewport } from "next";
import { ComplianceShell } from "@/components/compliance-shell";
import { caribbeanFreedomArenaApp } from "@/lib/caribbean-freedom-arena-app";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: caribbeanFreedomArenaApp.name,
    template: `%s · ${caribbeanFreedomArenaApp.name}`
  },
  description: caribbeanFreedomArenaApp.description,
  applicationName: caribbeanFreedomArenaApp.name,
  appleWebApp: {
    capable: true,
    title: caribbeanFreedomArenaApp.name,
    statusBarStyle: "black-translucent"
  },
  formatDetection: {
    telephone: false
  },
  icons: {
    icon: caribbeanFreedomArenaApp.icon192,
    apple: caribbeanFreedomArenaApp.appleTouchIcon
  },
  openGraph: {
    title: caribbeanFreedomArenaApp.name,
    description: caribbeanFreedomArenaApp.description,
    type: "website"
  }
};

export const viewport: Viewport = {
  themeColor: caribbeanFreedomArenaApp.themeColor,
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ComplianceShell>{children}</ComplianceShell>
      </body>
    </html>
  );
}
