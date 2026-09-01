"use client";
import Image from "next/image";
import React, { useState, useTransition } from "react";
import TabButton from "./TabButton";
import { aboutTabs, certifications, education, skills } from "../data/profile";

const badgeColors = ["#ef4444", "#eab308", "#14b8a6", "#0ea5e9"];

const getBadgeColor = (index) => badgeColors[index % badgeColors.length];

const Badge = ({ children, colorIndex = 0 }) => (
  <span
    className="inline-flex items-center rounded-md px-2 py-1 text-md font-semibold text-slate-800"
    style={{ backgroundColor: getBadgeColor(colorIndex) }}
  >
    {children}
  </span>
);

const renderTabContent = (tab) => {
  if (tab === "education") {
    return (
      <ul className="list-none pl-2 roboto-condensed-font">
        <li className="text-center">
          <Badge>
            {education.title} <br /> {education.institution},{" "}
            {education.location}
          </Badge>
        </li>
      </ul>
    );
  }

  const list = tab === "certifications" ? certifications : skills;

  return (
    <ul className="list-none pl-2 flex flex-wrap justify-center gap-4 roboto-condensed-font">
      {list.map((item, index) => (
        <li key={item}>
          <Badge colorIndex={index}>{item}</Badge>
        </li>
      ))}
    </ul>
  );
};

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [, startTransition] = useTransition();
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
            {aboutTabs.map((aboutTab) => (
              <TabButton
                key={aboutTab.id}
                selectTab={() => handleTabChange(aboutTab.id)}
                active={tab === aboutTab.id}
              >
                {aboutTab.title}
              </TabButton>
            ))}
          </div>
          <div className="mt-8">{renderTabContent(tab)}</div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
