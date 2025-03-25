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
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

export const IndexPage: React.FC<IndexPageProps> = ({ 
  projects, 
  onViewFullProject, 
  currentPage,
  onNavigateToPage,
  totalPages = 9  // valor padrão caso não seja fornecido
}) => {
  return (
    <Page>
      <div className="h-full flex flex-col py-4 md:py-6">
        <motion.h2 
          className="text-2xl md:text-3xl lg:text-4xl font-light mb-6 md:mb-8 text-center text-[#2c3e50]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Projects
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-12 flex-grow overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="flex flex-col items-center"
              variants={cardVariants}
            >
              <div 
                className="group relative overflow-hidden cursor-pointer mb-2 md:mb-4 h-[25vh] w-full"
                onClick={() => onViewFullProject(project.id)}
              >
                <div className="w-full h-full">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03] group-hover:blur-[1px]"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                </div>
              </div>
              <a 
                onClick={() => onViewFullProject(project.id)}
                className="text-[#5a8bb0] hover:text-[#3d6c94] text-center cursor-pointer text-sm md:text-base font-light transition-colors"
              >
                {project.title}
              </a>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center gap-2 mt-4 md:mt-6">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => onNavigateToPage(i)}
              aria-label={`Ir para página ${i + 1}`}
              title={`Página ${i + 1}`}
              className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 hover:scale-125 
                ${i === currentPage ? 'bg-black' : 'bg-gray-300 hover:bg-gray-400'}`}
            />
          ))}
        </div>
      </div>
    </Page>
  );
};