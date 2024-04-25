import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";
import { Fade, Slide } from "react-awesome-reveal";
const Hero = () => {
  return (
    <section className="lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-8 place-self-center text-center sm:text-left justify-self-start"
        >
          <div className="col-span-7 place-self-center mb-4 relative">
            <Slide cascade>
              <div className="bg-gradient-to-r bg-teal-500 absolute h-[44px] w-full md:h-[60px] " />
              <div className="bg-gradient-to-r bg-sky-500 absolute h-[44px] w-full top-[40px] md:h-[60px] md:top-[60px]" />
              <div className="bg-gradient-to-r bg-yellow-500 absolute h-[44px] w-full top-[80px]  md:h-[60px] md:top-[120px]" />
              <div className="bg-gradient-to-r bg-red-500 absolute h-[44px] w-full top-[120px]  md:h-[60px] md:top-[180px]" />
            </Slide>
            <h1 className="text-[#e3e3dc] px-4 h-[132px] z-[1000] relative text-start text-4xl sm:text-5xl lg:text-6xl w-full  font-extrabold mb-4">
              <span className="">
                Hello,
                <br />
                I&apos;m
              </span>
              <br />
              <TypeAnimation
                sequence={[
                  "Emir!",
                  1000,
                  "a Fullstack Dev",
                  1000,
                  "a Web Dev",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </h1>
            <p className="text-[#f2f2ec] mt-14 md:mt-[120px] text-md md:text-lg mb-6 text-start roboto-condensed-font">
              I&apos;m a Technician in Programming at the Universidad
              Tecnológica Nacional of Argentina, and I&apos;m starting my career
              as a full stack developer. I&apos;m responsible, self-taught,
              committed, good at working with a team and I would like to gain
              more experience in the IT world. I mostly have experience with
              frontend but I&apos;m committed to expanding proficiency in
              backend development to broaden my skill set.
            </p>
            <div className="roboto-condensed-font font-semibold">
              <Link
                href="/#contact"
                className="px-6 text-center rounded-full mb-4 inline-block py-3 w-full sm:w-1/4 mr-4 bg-teal-500 hover:bg-yellow-500 text-white"
              >
                Hire Me
              </Link>
              <Link
                href="https://drive.google.com/file/d/19k1MwIvrTeK8b0NOrSJo49Cx1Ulto5kJ/view?usp=sharing"
                target="_blank"
                className="px-6 text-center rounded-full inline-block py-3 w-full sm:w-1/4 mr-4 bg-red-500 hover:bg-sky-500 text-white"
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
          <div className="lg:absolute lg:top-0 lg:left-[70%] lg:ml-20">
            <div className=" rounded-full  w-[300px] h-[300px] p-4 relative">
              <div className="rounded-full bg-yellow-500">
                <Fade cascade fraction={0.8}>
                  <div className="bg-gradient-to-b from-transparent to-red-500 relative top-[0px] z-20 h-[60px]" />
                  <div className="bg-gradient-to-b from-transparent to-red-500 relative top-[5px] z-20 h-[50px]" />
                  <div className="bg-gradient-to-b from-transparent to-red-500 relative top-[10px] z-20 h-[40px]" />
                  <div className="bg-gradient-to-b from-transparent to-red-500 relative top-[15px] z-20 h-[30px]" />
                  <div className="bg-gradient-to-b from-transparent to-red-500 relative top-[20px] z-20 h-[20px]" />
                  <div className="bg-gradient-to-b from-transparent to-red-500 relative top-[25px] z-20 h-[10px]" />
                  <div className="bg-gradient-to-b from-transparent to-red-500 relative top-[30px] z-20 h-[9px]" />
                  <div className="bg-gradient-to-b from-transparent to-red-500 relative top-[35px] z-20 h-[8px]" />
                  <div className="bg-gradient-to-b from-transparent to-red-500 relative top-[45px] z-20 h-[7px]" />
                  <div className="bg-gradient-to-b from-transparent to-red-500 relative top-[50px] z-20 h-[6px]" />
                  <div className="bg-gradient-to-b from-transparent to-red-500 relative top-[55px] z-20 h-[5px]" />
                  <div className="bg-gradient-to-b from-transparent to-red-500 relative top-[60px] z-20 h-[4px]" />
                  <div className="bg-gradient-to-b from-transparent to-red-500 relative top-[65px] z-20 h-[3px]" />
                  <div className="bg-gradient-to-b from-transparent to-red-500 relative top-[75px] z-20 h-[2px]" />
                  <div className="bg-gradient-to-b from-transparent to-red-500 relative top-[80px] z-20 h-[1px]" />
                </Fade>
              </div>

              <Image
                className="absolute transform z-40 -translate-x-1/2 -translate-y-1/2 top-[65%] md:top-[55%] left-1/2 drop-image"
                src={"/images/avatar.png"}
                alt="avatar"
                width={300}
                height={300}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
