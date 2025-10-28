import "../globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect } from "react";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Configure NProgress
NProgress.configure({ showSpinner: false });

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();

    // Handle route change progress indicator
    useEffect(() => {
        const handleStart = () => NProgress.start();
        const handleComplete = () => NProgress.done();

        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleComplete);
        router.events.on("routeChangeError", handleComplete);

        return () => {
            router.events.off("routeChangeStart", handleStart);
            router.events.off("routeChangeComplete", handleComplete);
            router.events.off("routeChangeError", handleComplete);
        };
    }, [router]);

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>Sam Stanton</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                <meta
                    name="keywords"
                    content="Sam, Sam Stanton, Disney, Virginia Tech"
                />
                <meta name="description" content="Sam Stanton - Virginia Tech Student" />
                <meta name="author" content="Sam Stanton" />
            </Head>

            <div className="text-black dark:text-white flex flex-row justify-center w-full h-full bg-gradient-to-bl from-white to-[#fff] dark:from-black dark:to-[#0d131f] min-h-screen">
                <Nav />
                <div className="w-[80%] md:w-[45rem]">
                    <AnimatePresence mode="wait">
                        <Component {...pageProps} key={router.pathname} />
                    </AnimatePresence>
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default MyApp;
