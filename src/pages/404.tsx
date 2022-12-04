import { motion } from "framer-motion";

const NotFound = () => {
    return (
        <motion.div
            key="404"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ ease: "easeOut", duration: 0.25 }}
            className="mt-36 mb-80 w-full"
        >
            <h1 className="text-black dark:text-white font-bold text-3xl mb-3 mt-8">Hmm... 🤔</h1>
            <p className="text-black dark:text-gray-200 mb-6">It seems that we can't find anything by that name</p>
        </motion.div>
    );
};

export default NotFound;