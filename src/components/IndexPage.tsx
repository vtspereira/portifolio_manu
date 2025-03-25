import { motion } from 'framer-motion';
import type { Project } from '../types';
import { Page } from './Page';

interface IndexPageProps {
  projects: Project[];
  onViewFullProject: (projectId: number) => void;
  currentPage: number;
  onNavigateToPage: (pageIndex: number) => void;
  totalPages: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const IndexPage: React.FC<IndexPageProps> = ({ 
  projects, 
  onViewFullProject, 
  currentPage,
  onNavigateToPage,
  totalPages
}) => {
  return (
    <Page>
      <div className="h-full flex flex-col py-6 md:py-10">
        <motion.h2 
          className="text-2xl md:text-3xl font-light mb-12 md:mb-16 text-center text-[#333333] tracking-wide"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Projetos
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 flex-grow overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="flex flex-col"
              variants={cardVariants}
            >
              <div 
                className="group relative overflow-hidden cursor-pointer mb-4 h-[280px] w-full"
                onClick={() => onViewFullProject(project.id)}
              >
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03] group-hover:blur-[2px]"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              </div>
              <div className="mt-1">
                <h3 
                  className="text-[#333333] cursor-pointer text-base font-light mb-1 hover:text-[#888888] transition-colors duration-300"
                  onClick={() => onViewFullProject(project.id)}
                >
                  {project.title}
                </h3>
                <p className="text-[#888888] text-sm font-light">{project.location}, {project.year}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Page>
  );
};