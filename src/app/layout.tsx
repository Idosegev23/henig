import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["latin", "hebrew"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "מכון הניג - טיפולים טבעיים לבעיות עיכול",
  description: "מכון מוביל בטיפולים טבעיים לבעיות עיכול. מוצרים איכותיים וקורסים מקצועיים למטפלים ולקוחות פרטיים.",
  keywords: "טיפולים טבעיים, בעיות עיכול, צרבת, מעי רגיש, קנדידה, דלקות במעיים, מכון הניג",
  authors: [{ name: "מכון הניג" }],
  creator: "מכון הניג",
  publisher: "מכון הניג",
  openGraph: {
    title: "מכון הניג - טיפולים טבעיים לבעיות עיכול",
    description: "מכון מוביל בטיפולים טבעיים לבעיות עיכול",
    url: "https://henig.co.il",
    siteName: "מכון הניג",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "מכון הניג - טיפולים טבעיים",
      },
    ],
    locale: "he_IL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "מכון הניג - טיפולים טבעיים לבעיות עיכול",
    description: "מכון מוביל בטיפולים טבעיים לבעיות עיכול",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${heebo.variable} font-hebrew antialiased min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
