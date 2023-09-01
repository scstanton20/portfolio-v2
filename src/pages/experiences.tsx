import { PortableText } from '@portabletext/react';
import { motion } from "framer-motion";
import { sanityClient, urlFor } from '../../sanity';
import { Experience } from '../../typings';


interface Props {
    experiences: Experience[];
}

export default function Experiences({ experiences }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ ease: "easeOut", duration: 0.15 }}
            className="mt-24 w-full mb-32"
        >
            <h1 className="text-black dark:text-white font-bold text-3xl mb-4 mt-8">Experiences 👨‍💼</h1>
            <div>
                {experiences.map(experience => (
                    <div key={experience._id} className="flex mb-8 items-start border-b border-slate-400 dark:border-slate-800 pb-4 last:border-0">
                        <img className="w-12 h-12 rounded-full mr-4" src={urlFor(experience.image).url()!} alt={experience.companyName}/>
                        <div className="flex-grow">
                            <p className="text-2xl font-medium">{experience.companyName}</p>
                            <p className="text-white-500">{experience.jobType}</p>
                            <p className="text-white-500"> {experience.companyLocation}</p>
                            <p className="text-gray-500"> {experience.startDate} - {experience.endDate}</p>
                            <PortableText value={experience.responsibilities as any} components={{listItem: {bullet: ({children}) => <ul className="mt-xl">{children}</ul>}}}/>
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
        startDate,
        endDate,
        jobType,
        image,
        responsibilities,
        companyName,
        companyLocation
      }`;
    const experiences = await sanityClient.fetch(experiencesquery);

    return {
        props: {
            experiences,
        }
    }
};
