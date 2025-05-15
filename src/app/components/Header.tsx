"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Header = () => {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <Image
          src="/Logo.png"
          alt="PTK Logo"
          width={80}
          height={80}
          className="mx-auto mb-4"
        />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-3xl font-bold text-shadow-lg text-white"
      >
        PTK-Schedule-Viewer
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-2 text-white text-shadow-lg font-light pb-6"
      >
        ระบบเช็คตารางเรียน โรงเรียนปทุมเทพวิทยาคาร
      </motion.p>
    </motion.div>
  );
};

export default Header;
