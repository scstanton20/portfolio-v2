import "../globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { AnimatePresence } from "framer-motion";
import { Router } from "next/router";

import NProgress from "nprogress";
import "nprogress/nprogress.css";
// import { init } from "@socialgouv/matomo-next";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

// const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL;
// const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID;
// let url:string = MATOMO_URL!;
// let siteId:string = MATOMO_SITE_ID!;

function MyApp({ Component, pageProps, router }: AppProps) {
   
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>Sam Stanton</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width,initial-scale=1" />
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
                    <AnimatePresence mode='wait'>
                        <Component {...pageProps} key={router.pathname} />
                    </AnimatePresence>
                    <Footer />
                </div>
            </div>
        </>
    );
}
export default MyApp;
