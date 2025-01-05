import { domAnimation, LazyMotion } from 'framer-motion';
import { lazy, Suspense } from "react";
import Hero from "./Components/Hero";
import NavBar from './Components/Navbar';
import Head from './Components/Head';
const About = lazy(() => import('./Components/About'));
const Features = lazy(() => import('./Components/Features'));
const Story = lazy(() => import('./Components/Story'));
const Contact = lazy(() => import('./Components/Contact'));
const Footer = lazy(() => import('./Components/Footer'));
const LoadingFallback = () => (
  <div className="flex-center min-h-screen w-screen bg-violet-50">
    <div className="three-body">
      <div className="three-body__dot"></div>
      <div className="three-body__dot"></div>
      <div className="three-body__dot"></div>
    </div>
  </div>
);
const App = () =>
{
  return <>
    <Head />

    <LazyMotion features={domAnimation}>

      <main className="relative  overflow-x-hidden">
        <NavBar />
        <Hero />

        <Suspense fallback={LoadingFallback}>
          <About />
          <Story />
          <Features />
          <Contact />
          <Footer />
        </Suspense>
      </main>
    </LazyMotion>
  </>
};

export default App;
