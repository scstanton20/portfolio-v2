import "../globals.css";
import "nprogress/nprogress.css";
import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { NProgressHandler } from "../components/NProgressHandler";
import { ThemeScript } from "../components/ThemeScript";

export const metadata: Metadata = {
    title: "Sam Stanton",
    description: "Sam Stanton - Virginia Tech Student",
    keywords: ["Sam", "Sam Stanton", "Disney", "Virginia Tech"],
    authors: [{ name: "Sam Stanton" }],
    icons: {
        icon: "/favicon.ico",
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#000000",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <ThemeScript />
            </head>
            <body suppressHydrationWarning>
                <Suspense fallback={null}>
                    <NProgressHandler />
                </Suspense>
                <div className="text-black dark:text-white flex flex-row justify-center w-full h-full bg-linear-to-bl from-white to-white dark:from-black dark:to-[#0d131f] min-h-screen">
                    <Nav />
                    <div className="w-[80%] md:w-180">
                        {children}
                        <Footer />
                    </div>
                </div>
            </body>
        </html>
    );
}
