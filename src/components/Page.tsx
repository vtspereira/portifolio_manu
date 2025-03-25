import { motion } from 'framer-motion';
import type { PageProps } from '../types';

export const Page: React.FC<PageProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      className={`w-screen h-screen overflow-hidden bg-white ${className}`}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="w-full h-full max-w-[100vw] mx-auto p-4 md:p-6 lg:p-8 overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
};