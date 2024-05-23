import MessageForm from "../components/talk/MessageForm";
import ContactLink from "../components/talk/ContactLink";
import { FiMail } from "react-icons/fi";
import { motion } from "framer-motion";
import TimeStatus from "../components/talk/TimeStatus";
import Image from 'next/image'

function Connect() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ ease: "easeOut", duration: 0.15 }}
            className="mt-36 w-full"
        >
            <h1 className="text-black dark:text-white font-bold text-3xl mb-3 mt-8">Let&apos;s chat 💬</h1>
            <p className="text-gray-800 dark:text-gray-200 mb-6">
                Have an inquiry or want to connect? Feel free to leave a message below, or get in touch via Email.
            </p>
            <TimeStatus />
            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4 mb-20">
                <MessageForm />
                <div className="row-start-1 md:row-auto">
                    <div className="h-28px w-28px mb-4 md:mx-10">
                        <Image className="rounded-full" src="/photo.png" alt="My senior photo" width="200" height="200"/>
                    </div>
                    <ContactLink
                        name="sam@scstanton.net"
                        icon={<FiMail className="w-6 h-6 text-gray-400" />}
                        link="mailto:sam@scstanton.net"
                        borderColor="hover:border-gray-400/50"
                    />
                </div>
            </div>
        </motion.div>
    );
}

export default Connect;
