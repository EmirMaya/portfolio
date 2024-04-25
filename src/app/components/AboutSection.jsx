"use client";
import Image from "next/image";
import React, { useState, useTransition } from "react";
import TabButton from "./TabButton";

const skills = [
  "HTML",
  "CSS",
  "SASS",
  "TailwindCSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.Js",
  "Redux",
  "Angular",
  "SOLID principles",
  "Git",
  "Node.js",
  "Express.js",
  "MongoDB",
  "MySQL",
  "PostgreSQL",
];

const certifications = [
  'SAP ABAP, Logali Group',
  'ReactJS, Coderhouse',
  'Javascript, Coderhouse',
  'Web Developer, Coderhouse',
  'Fullstack Web, Egg Education',
]
const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="list-none pl-2 flex flex-wrap justify-center gap-4">
        {skills.map((sk) => (
          <li key={sk} className="">
            <span className="inline-flex items-center rounded-md bg-gradient-to-r from-teal-400 to-sky-500 px-2 py-1 text-md font-medium text-slate-800 ring-1 ring-inset ring-sky-700">
              {sk}
            </span>
          </li>
        ))}
        <li></li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-none pl-2">
        <li className="text-center">
          <span className="inline-flex items-center rounded-md bg-gradient-to-r from-teal-400 to-sky-500 px-2 py-1 text-md font-medium text-slate-800 ring-1 ring-inset ring-sky-700">
            Technician in Programming <br /> {" "} Universidad Tecnológica Nacional,
            Argentina, San Rafael, Mendoza.
          </span>
        </li>
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <ul className="list-none pl-2 flex flex-wrap justify-center gap-4">
        {
          certifications.map((cert) => (
            <li key={cert}>
              <span className="inline-flex items-center rounded-md bg-gradient-to-r from-teal-400 to-sky-500 px-2 py-1 text-md font-medium text-slate-800 ring-1 ring-inset ring-sky-700">
                {cert}
              </span>
            </li>
          ))
        }
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();
  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };
  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image src="/images/about.jpg" alt="about" width={450} height={450} />

        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-base lg:text-lg">
            I&apos;m a versatile web developer proficient in both frontend and
            backend technologies, dedicated to crafting engaging and dynamic web
            solutions. My toolkit includes JavaScript, React, Redux, Angular,
            Node.js, Express, PostgreSQL, HTML, CSS, TailwindCSS, SASS and Git.
            Continuously seeking growth opportunities, I thrive on learning new
            concepts and refining my abilities. Collaborative by nature,
            I&apos;m eager to join forces with fellow developers to produce
            exceptional applications.
          </p>
          <div className="flex flex-row justify-start mt-8">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              {" "}
              Skills{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              {" "}
              Education{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("certifications")}
              active={tab === "certifications"}
            >
              {" "}
              Certifications{" "}
            </TabButton>
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
