import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

import AnimatedTitle from "./UI/AnimatedTitle";

const About = () =>
{
  const containerRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end "]
  });
  const y = useTransform(scrollYProgress, [.5, 1], ["0%", "50%"]);

  const width = useTransform(scrollYProgress, [.3, .65], ["25vw", "100vw"]);
  const height = useTransform(scrollYProgress, [.3, .65], ["30vh", "100vh"]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["10rem", "0px"]);
  const poligonPath = useTransform(scrollYProgress, [.4, .65], [
    "polygon(0 0, 79% 0, 100% 100%, 15% 100%)",
    "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
  ]);

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <motion.p
          className="font-general text-sm uppercase md:text-[10px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          Welcome to Zentry
        </motion.p>

        <AnimatedTitle
          title="Disc<b>o</b>ver the world's <br /> largest shared <b>a</b>dventure"
          containerClass="mt-5 !text-black text-center"
        />

        <motion.div
          className="about-subtext "
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p>The Game of Games begins—your life, now an epic MMORPG</p>
          <p className="text-gray-500">
            Zentry unites every player from countless games and platforms, both
            digital and physical, into a unified Play Economy
          </p>
        </motion.div>
      </div>

      <div className="relative h-[150dvh] w-screen" id="clip" ref={containerRef}>
        <motion.div
          className="mask-clip-path about-image "
          style={{
            width,
            height,
            borderRadius,
            x: "-50%",
            y,
            clipPath: poligonPath,
            opacity: imageLoaded ? 1 : 0,
            transition: "opacity 0.5s ease-in-out"
          }}
        >
          <motion.img
            src="img/about.webp"
            alt="Zentry's immersive gaming world background"
            className="size-full object-cover will-change-transform "
            loading="lazy"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default About;
