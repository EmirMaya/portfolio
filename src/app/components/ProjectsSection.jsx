"use client";
import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import ProjectTag from "./ProjectTag";
import ProjectCard from "./ProjectCard";

const projectsData = [
  {
    id: 1,
    title: "Pecaditos Arequipa",
    description: "Landing page of a pastry shop",
    image: "/images/projects/pecaditos.jpg",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/EmirMaya/pecaditosArequipa",
    previewUrl: "https://pecaditosarequipaokk.000webhostapp.com/index.html",
  },

  {
    id: 2,
    title: "Polo de Innovación Tecnológica Región Sur Mendoza",
    description: "Landing page of a technological hub in my region",
    image: "/images/projects/pit-mendoza.jpg",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/https://pitregionsurmendoza.000webhostapp.com/",
  },

  {
    id: 3,
    title: "SportBlend",
    description: "Fullstack Sports Ecommerce with React, redux and Django Rest Framework",
    image: "/images/projects/sportblend.jpg",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/CodeSystem2022/ec-programadores-juniors.git",
    previewUrl: "https://ec-programadores-juniors.vercel.app/",
  },
  {
    id: 4,
    title: "Okinawa Sushi",
    description: "MERN Fullstack Sushi Ecommerce",
    image: "/images/projects/okinawa.jpg",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/EmirMaya/okinawa-sushi-nextjs.git",
    previewUrl: "https://okinawa-sushi-nextjs.vercel.app/",
  },

  {
    id: 5,
    title: "Hooobank",
    description: "Landing Page",
    image: "/images/projects/hoobank.jpg",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/EmirMaya/react-mordern-web-practice.git",
    previewUrl: "https://hoobankweb-rust.vercel.app/",
  },
];

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        My Projects
      </h2>
      {/* <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "Web"}
        />
      </div> */}
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
