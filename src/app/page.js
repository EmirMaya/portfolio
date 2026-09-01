"use client";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import Footer from "./components/Footer";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#292929]">
      <Navbar />
      <div className="container mt-24 mx-auto px-12 py-4">
        <Hero />
        <div>
          <AboutSection />
          <ProjectsSection />
          <Contact />
        </div>
      </div>
      <Footer />
    </main>
  );
}
