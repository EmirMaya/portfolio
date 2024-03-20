"use client";
import Image from "next/image";
import React, { useState, useTransition } from "react";
import TabButton from "./TabButton";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="list-disc pl-2">
        <li>HTML</li>
        <li>CSS</li>
        <li>SASS</li>
        <li>TailwindCSS</li>
        <li>JavaScript</li>
        <li>React</li>
        <li>Redux</li>
        <li>Next.js</li>
        <li>Angular</li>
        <li>SOLID principles</li>
        <li>Git</li>
        <li>Node.js</li>
        <li>Express.js</li>
        <li>MongoDB</li>
        <li>PostgreSQL</li>
        <li>MySQL</li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-disc pl-2">
        <li>Technician in Programming</li>
        <li>
          {" "}
          Universidad Tecnológica Nacional, Argentina, San Rafale, Mendoza.
        </li>
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <ul className="list-disc pl-2">
        <li>SAP ABAP, Logali Group</li>
        <li>ReactJS, Coderhouse</li>
        <li>Javascript, Coderhouse</li>
        <li>Web Developer, Coderhouse</li>
        <li>Fullstack Web, Egg Education</li>
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
        <Image
          src="/images/about-image.png"
          alt="about"
          width={300}
          height={300}
        />

        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-base lg:text-lg">
            I&apos;m a versatile web developer proficient in both frontend and
            backend technologies, dedicated to crafting engaging and dynamic web
            solutions. My toolkit includes JavaScript, React, Redux, Angular,
            Node.js, Express, PostgreSQL, HTML, CSS, TailwindCSS, SASS and Git.
            Continuously seeking growth opportunities, I thrive on learning new
            concepts and refining my abilities. Collaborative by nature, I&apos;m
            eager to join forces with fellow developers to produce exceptional
            applications.
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
