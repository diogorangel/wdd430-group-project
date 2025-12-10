import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Updated for Handcrafted Haven
  title: "Handcrafted Haven | Artisan Marketplace",
  description: "A virtual marketplace connecting talented crafters with customers who appreciate unique, handmade products. Promoting community and sustainable consumption.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Set lang to 'en' for accessibility (WCAG 2.1)
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <main>{children}</main>
        
        {/* Added Footer Section with Copyright (using inline styles for quick implementation) */}
        <footer style={{ 
          textAlign: 'center', 
          padding: '20px 0', 
          marginTop: '40px', 
          borderTop: '1px solid #ccc',
          fontSize: '0.8rem',
          color: 'var(--foreground)'
        }}>
          <p className="wt-footer-copyright-pagaraph">
            Copyright © 2025 <a 
              href="https://www.linkedin.com/in/diogorangels/" 
              style={{color: 'var(--foreground)', textDecoration: 'underline'}} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="WDD430 Group Project creator's LinkedIn profile"
            >
              Wdd430 Group Project - Diogo Rangel Dos Santos
            </a>. All Rights Reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}