import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";
const Hero = () => {
  return (
    <section className="lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 ">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-8 place-self-center text-center sm:text-left justify-self-start"
        >
          <div className="col-span-7 place-self-center mb-4">
            <h1 className="text-white text-start text-4xl sm:text-5xl  lg:text-7xl lg:leading-normal font-extrabold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-300">
                Hello, I&apos;m{" "}
              </span>
              <br />
              <TypeAnimation
                sequence={[
                  "Emir!",
                  1000,
                  "a Full Stack Developer",
                  1000,
                  "a Web Developer",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </h1>
            <p className="text-[#91b3d2] text-lg mb-6 text-start">
              I&apos;m a Technician in Programming at the Universidad Tecnológica
              Nacional of Argentina, and I&apos;m starting my career as a full stack developer. I&apos;m
              responsible, self-taught, committed, good at working with a team
              and I would like to gain more experience in the IT world. I mostly
              have experience with frontend but I&apos;m committed to expanding
              proficiency in backend development to broaden my skill set.
            </p>
            <div>
              <Link
                href="/#contact"
                className="px-6 text-center mb-4 inline-block py-3 w-full sm:w-1/4 mr-4 bg-gradient-to-br from-teal-400 to-sky-500 hover:bg-neutral-200 text-white"
              >
                Hire Me
              </Link>
              <Link
                href="https://drive.google.com/file/d/19k1MwIvrTeK8b0NOrSJo49Cx1Ulto5kJ/view?usp=sharing"
                target="_blank"
                className="px-6 text-center inline-block py-3 w-full sm:w-1/4 mr-4 border border-white hover:bg-neutral-500 text-white"
              >
                My CV
              </Link>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-4 place-self-center mt-4 lg:mt-0"
        >
          <div className=" rounded-full bg-[#101a3580] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] p-4 relative">
            <Image
              className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 drop-image"
              src={"/images/avatar.png"}
              alt="avatar"
              width={300}
              height={300}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
