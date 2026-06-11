import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Footer from "../components/Footer/Footer";
import AboutSection from "../components/AboutSection/AboutSection";
import ScrollProgress from "../components/ScrollProgress/ScrollProgress";
import Stats from "../components/Stats/Stats";
import ClientMarquee from "../components/ClientMarquee/ClientMarquee";
import ProductCards from "../components/ProductCard/ProductCard";
import WhatsappButton from "../components/WhatsappButton/WhatsappButton";
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";
import ProjectGallery from "../components/ProjectGallery/ProjectGallery";
import Testimonials from "../components/Testimonials/Testimonials";
import LightboxGallery from "../components/LightboxGallery/LightboxGallery";
import CTA from "../components/CTA/CTA";
import ScrollReveal from "../components/ScrollReveal";

export default function Home() {
  return (
    <>
      <ScrollProgress />

      <Navbar />

      <Hero />

      <section className="py-24 bg-white dark:bg-[#0b0f19] gold:bg-[#0c0c0c] border-b border-slate-200/5 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal direction="flip">
            <h2 className="text-4xl md:text-5xl font-black text-center mb-10 text-slate-900 dark:text-white gold:gradient-gold font-outfit">
              About MultiFab Engineering
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.25}>
            <p className="text-center text-lg text-gray-600 dark:text-gray-300 gold:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              We specialize in industrial engineering solutions,
              precision manufacturing, automation systems,
              quality control and innovative industrial products.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <AboutSection />

      <WhyChooseUs />

      <Stats />

      <ProductCards />

      <ProjectGallery />

      <Testimonials />

      <LightboxGallery />

      <ClientMarquee />

      <CTA />

      <WhatsappButton />

      <Footer />
    </>
  );
}