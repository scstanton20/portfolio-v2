import { motion } from "framer-motion";
import { sanityClient, urlFor } from '../../sanity';
import { Project, Certification } from '../../typings';
import Link from "next/link";
import { BiMap, BiCalendarCheck } from 'react-icons/bi';
import Tippy from '@tippyjs/react';
import { PortableText } from "@portabletext/react";
import Image from 'next/image';
interface Props {
    projects: [Project];
    certifications: [Certification];
}
export default function Home({ projects, certifications }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ ease: "easeOut", duration: 0.15 }}
            className="mt-24 w-full mb-32">
            <h1 className="mt-36 font-bold text-4xl md:text-5xl mb-4">Hey, I&apos;m Sam 👋</h1>
            <h2 className="font-medium text-3xl mb-4">What I Do 💭</h2>
            <p className="text-gray-800 dark:text-gray-300 leading-6 font-light tracking-wide mb-12">
                I am a Virginia Tech business management graduate with 8 years of front-line team management experience, 
                A/V systems integration skills, and extensive technical production background. I am highly adaptable and dedicated to ensuring 
                team members and customers alike have the tools they need to be successful. I am excited to see what the future of entertainment 
                technology brings to impactful storytelling and the effect it will have on the theme park industry.
            </p>

            <h2 className="font-medium text-3xl mb-4">Certifications 🏆</h2>
            <p className="text-gray-800 dark:text-gray-300 leading-6 font-light tracking-wide mb-6">
                Through my time as a student and working at different businesses, I have accumulated some interesting
                certifications. Hover your mouse over each icon for more details.
            </p>
            <div className="w-full flex flex-wrap flex-row justify-center p-1 border border-slate-800 rounded-md bg-white/10 dark:bg-black/10 mb-12">
                {certifications.map(certification => (
                    <ul className="flex p-2" key={certification._id}>
                            <div id="parent">
                                <Tippy className="text-sm flex font-bold justify-between" content={<>{certification.title} <br /> Issued by {certification.issuer} <br /> Received on {certification.receivedDate} </>} interactive={true} placement={'bottom'} trigger={"mouseenter"}>
                                    <button>
                                        <Image className="rounded-full" src={urlFor(certification.image).url()!} alt="Certification Images" height="50" width="50" />
                                    </button>
                                </Tippy>
                            </div>
                    </ul>
                ))}
            </div>
            
            <h2 className="font-medium text-3xl mb-4">Projects 🛠️</h2>
            <p className="text-gray-800 dark:text-gray-300 leading-6 font-light tracking-wide mb-6">
            At work and in my free time, I love partnering on projects that make things work better for my co-workers, my friends, and me. 
            I enjoy using my technological skills to create innovative solutions to our problems and create new opportunities. Included below are some of these projects.
            </p>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 gap-4">
                {projects.map(project => (
                    <Link key={project._id} href={project.projectLink} target="_blank">
                        <div className="flex mt-auto flex-col gap-1 p-2 bg-white/10 dark:bg-black/10 rounded-md border border-slate-400 hover:border-slate-700 dark:border-slate-800 dark:hover:border-slate-600 transition-colors duration-75 cursor-pointer">
                            <div className="flex font-bold justify-between text-2xl">
                                {project.title}
                                <div className="flex-shrink-0">
                                    <Image
                                    className="rounded-full"
                                    src={urlFor(project.image).url()!}
                                    alt="Project Images"
                                    width="40"
                                    height="40"
                                    />
                                </div>
                            </div>
                            <div className="text-gray-700 dark:text-gray-300 text-sm">
                                <PortableText value={project.description}/>
                            </div>
                            <div className= "mt-auto">
                                <div className="flex gap-2 flex-row items-center text-sm text-gray-800/70 dark:text-gray-100/70">
                                    <BiMap className="h-4 w-4" /> {project.place}
                                </div>   
                                <div className="flex gap-2 flex-row items-center text-sm text-gray-800/70 dark:text-gray-100/70">
                                    <BiCalendarCheck className="h-4 w-4" /> Status: {project.dateCompleted}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </motion.div>
    );
}

export const getServerSideProps = async () => {
    const projectsquery = `*[_type == "project"]{
        _id,
        title,
        dateCompleted,
        projectLink,
        place,
        description[]{...},
        image
      }`;
      const certquery = `*[_type == "certification"]{
        _id,
        title,
        image,
        issuer,
        receivedDate
      }`
    const projects = await sanityClient.fetch(projectsquery);
    const certifications = await sanityClient.fetch(certquery)

    return {
        props: {
            projects,
            certifications,
        }
    }
};