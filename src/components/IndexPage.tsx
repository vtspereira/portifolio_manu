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
      <div className="h-full flex flex-col py-4 md:py-5 overflow-auto">
        <motion.h2 
          className="text-2xl md:text-3xl font-light mb-5 md:mb-7 text-center text-[#1A1A1A] tracking-wide px-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Projetos
        </motion.h2>
        
        <div className="px-3 sm:px-5 md:px-6 pb-16 flex-grow overflow-hidden">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 sm:gap-6 md:gap-8 max-w-6xl mx-auto"
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
                  className="group relative overflow-hidden cursor-pointer mb-3 w-full"
                  style={{ 
                    aspectRatio: '4/3',
                    maxHeight: '280px'
                  }}
                  onClick={() => onViewFullProject(project.id)}
                >
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03] group-hover:blur-[2px]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#E0758A] opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                </div>
                <div className="min-h-[60px] mt-1 pb-3 flex flex-col">
                  <h3 
                    className="text-[#1A1A1A] cursor-pointer text-base font-light mb-1.5 hover:text-[#E0758A] transition-colors duration-300 truncate w-full pr-1"
                    onClick={() => onViewFullProject(project.id)}
                    title={project.title}
                  >
                    {project.title}
                  </h3>
                  <p className="text-[#666666] text-sm font-light truncate w-full pr-1" title={`${project.location}, ${project.year}`}>
                    {project.location}, {project.year}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </Page>
  );
};