"use client";

import { useEffect, useState } from "react";

const TimeStatus = () => {
    const [time, setTime] = useState<string>("00:00:00 p.m.");

    useEffect(() => {
        const updateTime = () => {
            const current = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
            setTime(`${current.slice(-11, -6)}${current.slice(-3, -1)}.M.`);
        };

        // Update immediately
        updateTime();

        // Update every minute
        const intervalId = setInterval(updateTime, 60 * 1000);

        // Cleanup interval on unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <p className="text-black/50 dark:text-white/50 text-md mb-10">
            It&apos;s currently <span className="font-semibold text-black/60 dark:text-white/60">{time}</span> where I am. I&apos;ll get
            back to you soon!
        </p>
    );
};

export default TimeStatus;
