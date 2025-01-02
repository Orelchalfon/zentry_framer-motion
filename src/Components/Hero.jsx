import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

import Button from "./UI/Button";
import VideoPreview from "./VideoPreview";

const Hero = () =>
{
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const [tap, setTap] = useState(false);
  const [mouseTimeOut, setMouseTimeOut] = useState(null);
  const totalVideos = 4;
  const nextVdRef = useRef(null);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["center center", "bottom center"]
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    [
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      "polygon(14% 0, 72% 0, 88% 90%, 0 95%)"
    ]
  );

  const borderRadius = useTransform(
    scrollYProgress,
    [0, 1],
    ["0% 0% 0% 0%", "0% 0% 40% 10%"]
  );

  const handleVideoLoad = () =>
  {
    setLoadedVideos((prev) => prev + 1);
  };

  useEffect(() =>
  {
    if (loadedVideos === totalVideos - 1) {
      setLoading(false);
    }
  }, [loadedVideos]);

  const handleMiniVdClick = () =>
  {
    setHasClicked(true);
    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
    if (nextVdRef.current) {
      nextVdRef.current.play();
    }
  };

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  const handleMouseMove = () =>
  {
    setTap(true);
    if (mouseTimeOut) {
      clearTimeout(mouseTimeOut);
    }
    setMouseTimeOut(setTimeout(() => setTap(false), 500));
    // const { clientX, clientY } = e;
    // const { innerWidth, innerHeight } = window;

    // const x = (clientX / innerWidth) * 2 - 1;
    // const y = (clientY / innerHeight) * 2 - 1;

    // if (nextVdRef.current) {
    //   nextVdRef.current.style.transform = `rotateX(${y * 10}deg) rotateY(${
    //     x * 10
    //     }deg)`;

    // }
  }
  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setTap(true)}
        onTouchEnd={() => setTap(false)}
        onMouseEnter={() => setTap(true)}
        onMouseLeave={() => setTap(false)}
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
        style={{ clipPath, borderRadius }}
      >
        <div>
          <motion.div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer rounded-lg object-cover origin-center"
            initial={{
              border: "none",
              opacity: 0,
            }}
            animate={{
              border: `${tap ? 1 : 0}px solid #000`,
              opacity: 1,
            }}
            whileHover={{
              opacity: 1,
              transition: { duration: 0.5, ease: "easeInOut", delay: 0.2 }
            }}
          >
            <VideoPreview key={currentIndex}>
              <motion.div
                layout
                onClick={handleMiniVdClick}
                initial={{ scale: 1, opacity: 0, visibility: "hidden", border: "0px solid #000" }}
                animate={{ scale: tap ? 1 : 1, opacity: tap ? 1 : 0, visibility: "visible", border: "24px solid #000" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <video
                  ref={nextVdRef}
                  src={getVideoSrc((currentIndex % totalVideos) + 1)}
                  muted
                  loop
                  autoPlay
                  preload="metadata"
                  playsInline
                  id="current-video"
                  className="size-64 origin-center scale-150 object-cover object-center will-change-transform "
                  onLoadedData={handleVideoLoad}
                />
              </motion.div>
            </VideoPreview>
          </motion.div>

          <AnimatePresence mode="await">
            <motion.video
              key={currentIndex === totalVideos - 1 ? 1 : currentIndex}
              initial={{ left: '50%', top: '50%', x: '-50%', y: '-50%', width: '16rem', height: '16rem', visibility: "hidden" }}
              animate={{
                scaleX: hasClicked ? 1 : 0,
                scaleY: hasClicked ? 1 : 0,
                width: hasClicked ? "100%" : "16rem",
                height: hasClicked ? "100%" : "16rem",

                visibility: "visible"
              }}
              transition={{ duration: 1, ease: "easeInOut", type: "twin", stiffness: 400, damping: 30 }}
              ref={nextVdRef}
              src={getVideoSrc(currentIndex)}
              loop
              autoPlay
              muted
              preload="metadata"
              playsInline
              id="next-video"
              className="absolute z-20 w-full h-full object-cover object-center will-change-transform "
              onLoadedData={handleVideoLoad}
            />
          </AnimatePresence>

          <video
            src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
            autoPlay
            loop
            muted
            preload="metadata"
            playsInline
            className="absolute left-0 top-0 size-full object-cover object-center will-change-transform"
            onLoadedData={handleVideoLoad}
          />


        </div>
        <motion.h1
          className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          G<b>A</b>MING
        </motion.h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <motion.h1
              className="special-font hero-heading text-blue-100"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              redefi<b>n</b>e
            </motion.h1>

            <motion.p
              className="mb-5 max-w-64 font-robert-regular text-blue-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Enter the Metagame Layer <br /> Unleash the Play Economy
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                id="watch-trailer"
                title="Watch trailer"
                leftIcon={<TiLocationArrow />}
                containerClass="bg-yellow-300 flex-center gap-1"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.h1
        className="special-font hero-heading absolute bottom-5 right-5 text-black"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        G<b>A</b>MING
      </motion.h1>
    </div>
  );
};

export default Hero;
