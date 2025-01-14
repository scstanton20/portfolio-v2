import React from 'react';
import MessageForm from "../components/talk/MessageForm";
import ContactLink from "../components/talk/ContactLink";
import { FiMail } from "react-icons/fi";
import { motion } from "framer-motion";
import TimeStatus from "../components/talk/TimeStatus";
import Image from 'next/image';
import { sanityClient, urlFor } from '../../sanity';
import { ConnectPhoto } from '../../typings';

interface Props {
  connectphoto: [ConnectPhoto];
}

export default function Connect(connectphoto: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ ease: "easeOut", duration: 0.15 }}
      className="mt-20 md:mt-36 w-full max-w-4xl mx-auto px-4 sm:px-6"
    >
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 mb-8">
        {/* Photo for mobile - centered and smaller */}
        <div className="md:hidden w-40 h-40 relative mb-2">
          {connectphoto.connectphoto.map(photo => (
            <Image
              key={photo._id}
              className="rounded-full shadow-lg object-cover"
              src={urlFor(photo.image).url()!}
              alt={photo.alt}
              fill
              priority
            />
          ))}
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-black dark:text-white font-bold text-2xl sm:text-3xl mb-3">
            Let&apos;s chat 💬
          </h1>
          <p className="text-gray-800 dark:text-gray-200 text-sm sm:text-base max-w-md mx-auto md:mx-0">
            Have an inquiry or want to connect? Feel free to leave a message below, or get in touch via Email.
          </p>
          <a className="mt-4 justify-center md:justify-start">
            <TimeStatus  />
          </a>
        </div>
        
        {/* Photo for desktop - larger and to the side */}
        <div className="hidden md:block w-48 h-48 relative flex-shrink-0">
          {connectphoto.connectphoto.map(photo => (
            <Image
              key={photo._id}
              className="rounded-full shadow-lg object-cover"
              src={urlFor(photo.image).url()!}
              alt={photo.alt}
              fill
              priority
            />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <MessageForm />
        </div>
        
        <div className="w-full sm:w-72 mx-auto md:mx-0">
          <ContactLink
            name="sam@scstanton.net"
            icon={<FiMail className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />}
            link="mailto:sam@scstanton.net"
            borderColor="hover:border-gray-400/50"
          />
        </div>
      </div>
    </motion.div>
  );
}

export const getServerSideProps = async () => {
  const connectphotoquery = `*[_type == "connectphoto"]{
    _id,
    alt,
    image
  }`;
  const connectphoto = await sanityClient.fetch(connectphotoquery);
  return {
    props: {
      connectphoto,
    }
  }
};