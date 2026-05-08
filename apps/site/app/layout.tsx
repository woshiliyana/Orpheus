import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: "Orpheus Narration",
  description:
    "Stable long-form educational narration, currently in development while provider rights and commercial terms are evaluated.",
  metadataBase: new URL("https://orpheusnarration.com"),
  openGraph: {
    title: "Orpheus Narration",
    description:
      "A founder-led SaaS product in development for stable long-form educational narration.",
    url: "https://orpheusnarration.com",
    siteName: "Orpheus Narration",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
