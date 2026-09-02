import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import Footer from "./components/Footer";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main className="site-background flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      <div className="relative z-10 container mx-auto px-6 py-4 sm:px-12">
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
