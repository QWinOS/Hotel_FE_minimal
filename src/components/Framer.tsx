"use client";
import React, { useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import "./component.css";
import Image from "next/image";

const host = process.env.NEXT_PUBLIC_STRAPI_API_HOST;
const port = process.env.NEXT_PUBLIC_STRAPI_API_PORT;
const URL = host + ":" + port;

interface Props {
  children: React.JSX.Element;
  index: number;
}
interface PropsChild {
  children: React.JSX.Element;
  index: number;
}

export const Load = ({ children, index }: PropsChild) => {
  const ref = useRef(null);
  return (
    <div ref={ref}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.25 * index, duration: 0.25 }}
      >
        {children}
      </motion.div>
    </div>
  );
};
