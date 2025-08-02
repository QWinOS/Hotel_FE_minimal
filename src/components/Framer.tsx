"use client";
import React from "react";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  index: number;
}

export const Load = ({ children, index }: Props) => {
  const variants = {
    hidden: { opacity: 0, y: 75 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.25 * index, duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
};
