import Achievements from './components/Achievements.jsx';
import Contact from './components/Contact.jsx';
import Experience from './components/Experience.jsx';
import Footer from './components/Footer.jsx';
import Hero from './components/Hero.jsx';
import Nav from './components/Nav.jsx';
import NeuralBackground from './components/NeuralBackground.jsx';
import Projects from './components/Projects.jsx';
import Publications from './components/Publications.jsx';
import Skills from './components/Skills.jsx';

export default function App() {
  return (
    <>
      <NeuralBackground />
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <Achievements />
        <Publications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
