import About from '@/components/About/About';
import Contact from '@/components/Contact/Contact';
import Footer from '@/components/Footer/Footer';
import Hero from '@/components/HeroSection/HeroSection';
import Navbar from '@/components/NavBar/NavBar';
import Services from '@/components/Services/Services';
import React from 'react';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <About/>
      <Services/>
      <Contact/>
      <Footer/>

    </>
  )
}
