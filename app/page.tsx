import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import AboutUs from "./components/AboutUs";
import MyExperience from "./components/MyExperience";
import EducationSkills from "./components/EducationSkills";
import ContactUs from "./components/ContactUs";
import FooterBar from "./components/FooterBar";
import TestamonialSection from "./components/TestamonialSection";
import GallerySection from "./components/GallerySection";
import ProjectSection from "./components/ProjectSection";
import ParticlesComponent from "./components/Particle";

export default function Home() {
  return (
    <main>
      {/* First section */}
      <section className='h-[100vh] w-full relative'>

        <div id='Home' className='absolute inset-0 max-w-[100%] h-[100vh]'>
          <NavBar />
          <ParticlesComponent id="particles" />
        </div>

        <div>
          <HeroSection />
        </div>

      </section>

      {/* About US section */}
      <AboutUs />

      {/* Experience Section */}
      <MyExperience />

      {/* Gallery Section */}
      <GallerySection />

      {/* Projects Section */}
      <ProjectSection />

      {/* Education & Skills */}
      <EducationSkills />

      {/* Testamonial */}
      <TestamonialSection />

      {/* Contact Us Section*/}
      <ContactUs />

      {/* Footer Bar  */}
      <FooterBar />
    </main>
  );
}
