import { motion } from "framer-motion";
import { sanityClient, urlFor } from '../../sanity';
import { Experience } from '../../typings';
interface Props {
    experiences: [Experience];
}

export default function Experiences({ experiences }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ ease: "easeOut", duration: 0.15 }}
            className="mt-36 w-full"
        >
            <h1 className="text-black dark:text-white font-bold text-3xl mb-3 mt-8">Experiences 👨‍💼</h1>
            <div>
            {experiences.map(experience => (
                    <div key={experience._id}>
                        <img className="w-12 h-12 rounded-full" src={urlFor(experience.image).url()!} alt=""/>
                        <p className="text-2xl">{ experience.companyName}</p>
                        <p>{experience.jobType}</p>
                        <p>{experience.companyLocation}</p>
                        <p>{experience.startDate} - {experience.endDate}</p>
                        
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