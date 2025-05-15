import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="mt-auto text-center text-white/60 text-sm pt-4 pb-4"
    >
      <p>© {new Date().getFullYear()} ระบบจัดการตารางเรียน</p>
    </motion.div>
  );
}