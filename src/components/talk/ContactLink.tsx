"use client";

import type { ReactElement } from "react";
import { FiExternalLink } from "react-icons/fi";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { classNames } from "../../util/classNames";

const ContactLink = ({
    name,
    icon,
    link,
    borderColor,
}: {
    name: string;
    icon: ReactElement;
    link: string;
    borderColor?: string;
}) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(event.clientX - centerX);
        y.set(event.clientY - centerY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.a
            href={link}
            target="_blank"
            rel="noreferrer noopener"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 350, damping: 40 }}
            className={classNames(
                borderColor ? borderColor : "hover:border-white/50",
                `shadow-white shadow-none hover:shadow-lg mb-4 row-start-3 flex flex-row items-center bg-opacity-50 bg-white dark:bg-white/5 rounded-md p-4 border border-zinc-800/50 cursor-pointer transition-colors duration-150`
            )}
        >
            {icon}
            <h1 className="font-medium text-sm text-black/80 dark:text-slate-400 mx-3">{name}</h1>
            <FiExternalLink className="w-5 h-5 text-gray-600" />
        </motion.a>
    );
};

export default ContactLink;
