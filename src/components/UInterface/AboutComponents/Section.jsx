import { motion } from "framer-motion";

export default function SectionPrimary({ title, children, classes, namount }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true, amount: namount }}
      className={classes}
    >
      <h2 className="text-4xl font-bold mb-6 text-primary tracking-wide drop-shadow-lg">
        {title}
      </h2>
      <div className="max-w-7xl mx-auto p-4">
        {children}
      </div>
    </motion.section>
  );
}
