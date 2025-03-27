import { motion } from 'framer-motion';
import type { PageProps } from '../types';

export const Page: React.FC<PageProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      className={`w-screen h-screen md:overflow-hidden overflow-auto bg-[#F8F5F2] ${className}`}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30, 
        duration: 0.3,
        mass: 0.8
      }}
    >
      <div 
        className="w-full mobile-scroll md:h-full max-w-[100vw] mx-auto p-4 pt-3 md:p-8 md:pt-6 lg:p-12 lg:pt-8 md:overflow-hidden"
        style={{
          minHeight: 'calc(100% - env(safe-area-inset-bottom, 0px))'
        }}
      >
        {children}
      </div>
    </motion.div>
  );
};