import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { RiCloseLine, RiMenu3Line } from "react-icons/ri";
import { TiLocationArrow } from "react-icons/ti";
import { useWindowScroll } from "react-use";

import Button from "./UI/Button";

const navItems = ["About", "Prologue", "Nexus", "Contact"];
const mobileNavbarVariants = {
  open: {
    height: "17.6275rem",
    width: "100%",
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
      delayChildren: 0.3, // Delay before children animations start
      staggerChildren: 0.1, // Delay between each child animation
    },
  },
  closed: {
    height: 0,
    width: 0,
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
      delay: .4,
    },
  },
};

const mobileNavbarListVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
  closed: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};
const NavBar = () =>
{
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isFloating, setIsFloating] = useState(false);

  const toggleAudioIndicator = () =>
  {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  const toggleMobileMenu = () =>
  {
    setIsMobileMenuOpen((prev) => !prev);
  };

  useEffect(() =>
  {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() =>
  {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      setIsFloating(false);
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      setIsFloating(true);
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      setIsFloating(true);
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  return (
    <motion.div
      ref={navContainerRef}
      className={clsx(
        "fixed inset-x-0 top-0 md:top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6",
        { "floating-nav": isFloating }
      )}
      initial={{ y: 0, opacity: 1 }}
      animate={{
        y: isNavVisible ? 0 : -100,
        opacity: isNavVisible ? 1 : 0
      }}
      transition={{ duration: 0.2 }}
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <motion.img
              src="/img/logo.png"
              alt="logo"
              className="w-10"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            />

            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>

            <button
              onClick={toggleAudioIndicator}
              className="ml-10 flex items-center space-x-0.5"
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {[1, 2, 3, 4].map((bar) => (
                <motion.div
                  key={bar}
                  className={clsx("indicator-line", {
                    active: isIndicatorActive,
                  })}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                  }}
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                />
              ))}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="ml-4 block z-10 md:hidden"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <RiCloseLine className=" h-6 w-6 text-zinc-900" />
              ) : (
                <RiMenu3Line className="h-6 w-6 text-zinc-50" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence mode="wait">
          {isMobileMenuOpen && (
            <motion.div
              variants={mobileNavbarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="absolute right-0 top-0 rounded-b-lg bg-[#c9fd74] p-4 backdrop-blur-lg md:hidden"
            >
              <motion.ul
                variants={mobileNavbarVariants} // Parent applies staggerChildren
                initial="closed"
                animate="open"
                exit="closed"
                className="flex flex-col gap-4 items-start p-4"
              >
                {navItems.map((item, index) => (
                  <motion.li
                    key={index}
                    variants={mobileNavbarListVariants} // Child participates in stagger
                    className="text-zinc-900 transition-colors hover:text-blue-300"
                  >
                    <a
                      href={`#${item.toLowerCase()}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item}
                    </a>
                  </motion.li>
                ))}
                <Button
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  whileHover={{ scale: [.9, 1, 1.1, 1] }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}

                  id="mobile-product-button"
                  title="Products"
                  rightIcon={<TiLocationArrow />}
                  containerClass="bg-blue-50 w-full flex items-center justify-center gap-1"
                />
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </motion.div>
  );
};

export default NavBar;
