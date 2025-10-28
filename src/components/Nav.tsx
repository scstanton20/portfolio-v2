"use client";

import { AnimatePresence, motion } from "framer-motion";
import { SiLinkedin } from "react-icons/si";
import { IoDocumentAttachSharp } from "react-icons/io5";
import { FaDocker } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { classNames } from "../util/classNames";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import Tooltip from './Tooltip';

const LandingButton = ({ name, link, selected }: { name: string; link: string; selected: boolean }) => {
    return (
        <Link href={link} className={classNames(
            selected
                ? "bg-black/10 dark:bg-[#c8c8dc]/10"
                : "bg-transparent hover:bg-gray-700/5 dark:hover:bg-[#c8c8dc]/5 dark:text-white",
            "cursor-pointer px-4 py-2 text-sm rounded-md text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white transition-all duration-75"
        )}>

            {name}

        </Link>
    );
};

const MobileLandingButton = ({
    name,
    link,
    selected,
    onClick,
}: {
    name: string;
    link: string;
    selected: boolean;
    onClick: () => void;
}) => {
    return (
        <Link
            href={link}
            className={classNames(
                selected ? "bg-black/10 dark:bg-[#c8c8dc]/10" : "bg-transparent dark:text-white",
                "flex grow justify-center border border-slate-800/30 cursor-pointer w-auto py-4 text-base text-black/80 dark:text-white/80 transition-all duration-75"
            )}
            onClick={onClick}>

            {name}

        </Link>
    );
};
const LinkButton = ({ title, icon, href }: any) => {
    return (
        <Tooltip content={title}>
            <a target="_blank" rel="noreferrer" href={href}>
                {icon}
            </a>
        </Tooltip>
    );
};
const Nav = () => {
    const pathname = usePathname();
    const [mobileMenuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(old => !old);
    };

    return (
        <>
            <motion.div className="hidden z-999 fixed w-[90%] md:w-200 xs:flex flex-row justify-between items-center px-4 py-2 mt-4 md:mt-6 rounded-md bg-white/60 dark:bg-[#12181d]/60 border border-slate-800/50 backdrop-blur-lg">
                <div className="flex flex-row items-center justify-between gap-2">
                    <ThemeToggle />
                    <LandingButton name="Home" link="/" selected={pathname === "/"} />
                    <LandingButton name="Connect" link="/connect" selected={pathname === "/connect"} />
                </div>
                <div className="flex flex-row items-center justify-center gap-2 xs:gap-4">
                    <LinkButton
                        title="LinkedIn"
                        href={"http://link.scstanton.net/linkedin"}
                        icon={<SiLinkedin className="w-6 h-6 cursor-pointer" />}
                    />
                    <LinkButton
                        title="Resume"
                        href={"http://link.scstanton.net/resume"}
                        icon={<IoDocumentAttachSharp className="w-6 h-6 cursor-pointer" />}
                    />
                    <LinkButton
                        title="Website containerized with Docker"
                        href={"http://link.scstanton.net/status"}
                        icon={<FaDocker className="w-6 h-6 cursor-pointer" />}
                    />
                </div>
            </motion.div>

            <motion.div className="xs:hidden z-990 fixed w-full flex flex-row justify-between items-center px-4 py-3 bg-white/60 dark:bg-[#12181d]/60 border-b border-slate-800/50 backdrop-blur-lg">
                <div className="flex flex-row items-center justify-between gap-2">
                    <ThemeToggle />
                </div>

                <div className="flex flex-row items-center justify-center">
                    <button onClick={toggleMenu} className="h-9 w-9 flex items-center justify-center">
                        {!mobileMenuOpen ? <HiMenu className="w-7 h-7" /> : <HiX className="w-7 h-7" />}
                    </button>
                </div>
            </motion.div>

            <AnimatePresence mode='wait'>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            key="NavBackdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.1, ease: "easeInOut" }}
                            className="z-500 fixed w-full h-screen overflow-hidden backdrop-blur-md bg-black/10 flex flex-col items-center justify-content"
                        />

                        <motion.div
                            key="NavMenu"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.1, ease: "easeInOut" }}
                            className="flex flex-col items-center justify-start mt-16 fixed w-full h-auto z-700 bg-white dark:bg-[#090c0f] border-x border-b border-slate-800/30"
                        >
                            <div className="flex flex-row w-full justify-evenly">
                                <MobileLandingButton
                                    name="Home"
                                    link="/"
                                    selected={pathname === "/"}
                                    onClick={() => setMenuOpen(false)}
                                />

                                <MobileLandingButton
                                    name="Connect"
                                    link="/connect"
                                    selected={pathname === "/connect"}
                                    onClick={() => setMenuOpen(false)}
                                />
                            </div>

                            <div className="flex flex-row items-center justify-center gap-6 py-4">
                            <LinkButton
                                title="LinkedIn"
                                href={"http://link.scstanton.net/linkedin"}
                                icon={<SiLinkedin className="w-6 h-6 cursor-pointer" />}
                                />
                            <LinkButton
                                title="Resume"
                                href={"http://link.scstanton.net/resume"}
                                icon={<IoDocumentAttachSharp className="w-6 h-6 cursor-pointer" />}
                                 />
                            <LinkButton
                                title="Website containerized with Docker"
                                href={"http://link.scstanton.net/status"}
                                icon={<FaDocker className="w-6 h-6 cursor-pointer" />}
                            />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Nav;
