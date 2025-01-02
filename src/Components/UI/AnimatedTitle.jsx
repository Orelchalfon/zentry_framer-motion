import clsx from "clsx";
import { motion, useInView } from "framer-motion";
import PropTypes from 'prop-types';
import { useRef } from "react";

const AnimatedTitle = ({ title, containerClass }) =>
{
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, {
        once: false,
        margin: "0px 0px -100px 0px",
    });

    const wordVariants = {
        hidden: {
            opacity: 0,
            rotateX: 90,
            rotateY: 45,
            y: 50,
        },
        visible: (i) => ({
            opacity: 1,
            rotateX: 0,
            rotateY: 0,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.02,
            },
        }),
    };

    return (
        <div ref={containerRef??''} className={clsx("animated-title", containerClass)}>
            {title.split("<br />").map((line, lineIndex) => (
                <div
                    key={lineIndex}
                    className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
                >
                    {line.split(" ").map((word, idx) => (
                        <motion.span
                            key={idx}
                            className="animated-word"
                            variants={wordVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            custom={idx}
                            dangerouslySetInnerHTML={{ __html: word }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};
AnimatedTitle.propTypes = {
    title: PropTypes.string.isRequired,
    containerClass: PropTypes.string,
};
export default AnimatedTitle;
