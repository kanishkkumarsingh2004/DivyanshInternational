"use client";

import { motion } from "framer-motion";

export default function AnimationWrapper({
    children,
    className,
    delay = 0,
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
                duration: 0.6, 
                delay, 
                ease: [0.25, 0.46, 0.45, 0.94],
                opacity: { duration: 0.4 }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
