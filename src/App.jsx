import { domAnimation, LazyMotion } from 'framer-motion';
import { lazy, Suspense } from "react";
import Hero from "./Components/Hero";
import NavBar from './Components/Navbar';
const About = lazy(() => import('./Components/About'));

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
    <LazyMotion features={domAnimation}>

      <main className="relative  overflow-x-hidden">

        <NavBar />
        <Hero />
        <Suspense fallback={LoadingFallback}>
          <About />
        </Suspense>
      </main>
    </LazyMotion>
  </>
};

export default App;
