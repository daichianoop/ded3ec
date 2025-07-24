import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

// Setup primary font for body text (Inter)
const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

// Setup display font for headings (Playfair Display)
const playfairDisplay = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair-display",
});

// Metadata for SEO and browser tabs
export const metadata: Metadata = {
    title: "DedSec | Exclusive Deals & Community",
    description: "The ultimate destination for savvy shoppers. Join the DedSec community to discover exclusive deals, limited-time offers, and insider discounts.",
};

/**
 * RootLayout component
 * This sets up the basic HTML structure, applies global styles and fonts.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The rendered root layout.
 */
export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={`${inter.variable} ${playfairDisplay.variable} bg-[#0A0A1A] text-[#EAEAEA] font-sans`}>
        {children}
        </body>
        </html>
    );
}
