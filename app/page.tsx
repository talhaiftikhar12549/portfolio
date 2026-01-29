import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import ParticlesComponent from "./components/Particle";
import dynamic from "next/dynamic";

const AboutUs = dynamic(() => import("./components/AboutUs"));
const MyExperience = dynamic(() => import("./components/MyExperience"));
const EducationSkills = dynamic(() => import("./components/EducationSkills"));
const ContactUs = dynamic(() => import("./components/ContactUs"));
const FooterBar = dynamic(() => import("./components/FooterBar"));
const TestamonialSection = dynamic(() => import("./components/TestamonialSection"));
const GallerySection = dynamic(() => import("./components/GallerySection"));
const ProjectSection = dynamic(() => import("./components/ProjectSection"));

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
