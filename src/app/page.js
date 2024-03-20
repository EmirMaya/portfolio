"use client";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Achievments from "./components/Achievments";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#252525]">
      <Navbar />
      <div className="container mt-24 mx-auto px-12 py-4">
        <Hero />
        {/* <Achievments /> */}
        <AboutSection />
        <ProjectsSection />
      </div>
      <Footer />
    </main>
  );
}
