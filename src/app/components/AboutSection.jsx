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
  "PowerApps",
  "Node.js",
  "Express.js",
  "MongoDB",
  "MySQL",
  "PostgreSQL",
];

const getRandomColor = () => {
  const colors = ["#ef4444", "#eab308", "#14b8a6", "#0ea5e9"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const certifications = [
  "SAP ABAP, Logali Group",
  "ReactJS, Coderhouse",
  "Javascript, Coderhouse",
  "Web Developer, Coderhouse",
  "Fullstack Web, Egg Education",
];
const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="list-none pl-2 flex flex-wrap justify-center gap-4 roboto-condensed-font">
        {skills.map((sk) => (
          <li key={sk}>
            <span
              className="inline-flex items-center rounded-md px-2 py-1 text-md font-semibold text-slate-800"
              style={{ backgroundColor: getRandomColor() }}
            >
              {sk}
            </span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-none pl-2 roboto-condensed-font">
        <li className="text-center">
          <span
            className="inline-flex items-center rounded-md px-2 py-1 text-md font-semibold text-slate-800"
            style={{ backgroundColor: getRandomColor() }}
          >
            Technician in Programming <br /> Universidad Tecnológica Nacional,
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
      <ul className="list-none pl-2 flex flex-wrap justify-center gap-4 roboto-condensed-font">
        {certifications.map((cert) => (
          <li key={cert}>
            <span
              className="inline-flex items-center rounded-md px-2 py-1 text-md font-semibold text-slate-800"
              style={{ backgroundColor: getRandomColor() }}
            >
              {cert}
            </span>
          </li>
        ))}
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
    <section className="text-white mt-[100px]" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image className="rounded-xl" src="/images/about.jpg" alt="about" width={450} height={450} />

        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl pl-1 font-bold text-[#e3e3dc] mb-4 w-full bg-yellow-500">About Me</h2>
          <p className="text-base text-[#f2f2ea] lg:text-lg roboto-condensed-font">
            I&apos;m a versatile web developer proficient in both frontend and
            backend technologies, dedicated to crafting engaging and dynamic web
            solutions. My toolkit includes JavaScript, React, Redux, Angular,
            Node.js, Express, PostgreSQL, HTML, CSS, TailwindCSS, SASS and Git.
            Continuously seeking growth opportunities, I thrive on learning new
            concepts and refining my abilities. Collaborative by nature,
            I&apos;m eager to join forces with fellow developers to produce
            exceptional applications.
          </p>
          <div className="flex flex-row justify-start mt-8 roboto-condensed-font">
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
