import { useState } from "react";
import { motion } from "framer-motion";
import { sanityClient, urlFor } from '../../sanity';
import { Experience } from '../../typings';

interface Props {
    experiences: Experience[];
}

export default function Experiences({ experiences }: Props) {
  const ReadMoreDescription = ({ description }: { description: string | null }) => {
    const maxChars = 240; // Approximate max number of characters to display before truncation
    const [isExpanded, setIsExpanded] = useState(false);

    if (!description) {
      return null; // or return an appropriate fallback
  }
    const isTruncatable = description.length > maxChars;
    const displayedDescription = isExpanded || !isTruncatable 
        ? description 
        : description.slice(0, maxChars) + '...';

    return (
        <p>
            {displayedDescription}
            {isTruncatable && (
                <button 
                    onClick={() => setIsExpanded(!isExpanded)} 
                    className="text-blue-600 hover:text-blue-800 inline">
                    {isExpanded ? 'Read Less' : 'Read More'}
                </button>
            )}
        </p>
    );
};
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ ease: "easeOut", duration: 0.15 }}
            className="mt-24 w-full mb-32"
        >
            <h1 className="text-black dark:text-white font-bold text-3xl mb-4 mt-8">Experiences 👨‍💼</h1>
            <div className="space-y-6">
      {experiences.map((experience, index) => (
        <div key={index} className=" shadow rounded-md p-4">
          <div className="flex space-x-4">
            <img
              src={urlFor(experience.image).url()!}
              alt={`${experience.companyName} Logo`}
              className="h-16 w-16 rounded-full"
            />
            <div>
              <h3 className="text-xl font-bold">{experience.companyName}</h3>
              {experience.positions.map((position, posIndex) => (
                <div key={posIndex} className="mt-2">
                  <h4 className="text-lg font-semibold">{position.title}</h4>
                  <p className="text-gray-500">{experience.jobType} - {position.location}</p>
                  <p className="text-gray-600">
                    {new Date(position.startDate).toLocaleDateString()} - {position.endDate ? new Date(position.endDate).toLocaleDateString() : 'Present'}
                  </p>
                  <ReadMoreDescription description={position.description} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
        </motion.div>
    );
}



export const getServerSideProps = async () => {
    const experiencesquery = `*[_type == "experience"]{
        _id,
        companyName,
        companyLocation,
        jobType,
        image,
        positions[]{
          title,
          startDate,
          endDate,
          location,
          description,
        },
      }`;
    const experiences = await sanityClient.fetch(experiencesquery);

    return {
        props: {
            experiences,
        }
    }
};
