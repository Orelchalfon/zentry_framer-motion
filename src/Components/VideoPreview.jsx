import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { PropTypes } from 'prop-types';
export const VideoPreview = ({ children }) =>
{
    const [isHovering, setIsHovering] = useState(false);
    const containerRef = useRef(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Create smooth spring animations for the container movement
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
        stiffness: 200,
        damping: 20
    });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
        stiffness: 200,
        damping: 20
    });

    // Create smooth spring animations for the content movement (parallax effect)
    const contentX = useSpring(useTransform(mouseX, [-0.5, 0.5], [10, -10]), {
        stiffness: 200,
        damping: 20
    });
    const contentY = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
        stiffness: 200,
        damping: 20
    });

    const handleMouseMove = (event) =>
    {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate normalized mouse position (-0.5 to 0.5)
        const normalizedX = (event.clientX - centerX) / rect.width;
        const normalizedY = (event.clientY - centerY) / rect.height;

        if (isHovering) {
            mouseX.set(normalizedX);
            mouseY.set(normalizedY);
        }
    };

    const handleMouseLeave = () =>
    {
        setIsHovering(false);
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={handleMouseLeave}
            className="absolute z-50 size-full overflow-hidden rounded-lg"
            style={{
                perspective: "1000px",
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
            }}
        >
            <motion.div
                className="origin-center rounded-lg"
                style={{
                    x: contentX,
                    y: contentY,
                    transformStyle: "preserve-3d"
                }}
            >
                {children}
            </motion.div>
        </motion.section>
    );
};

VideoPreview.propTypes = {
    children: PropTypes.node.isRequired
};
export default VideoPreview;
