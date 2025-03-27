import { motion } from 'framer-motion';
import { useState } from 'react';
import type { Project } from '../types';
import { Page } from './Page';
import { ImageModal } from './ImageModal';
import { ExternalLink, ArrowRight } from 'lucide-react';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const openModal = (project: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedProject(project);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

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
                  className="group relative overflow-hidden cursor-pointer mb-3 w-full project-image-container"
                  style={{ 
                    aspectRatio: '4/3',
                    backgroundColor: '#f5f2ee',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}
                  onClick={() => onViewFullProject(project.id)}
                >
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="project-image max-w-full max-h-full w-auto h-auto object-none transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#E0758A] opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                  
                  {/* Botão de ver detalhes ao passar o mouse */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="bg-white/90 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-md">
                      <ExternalLink size={14} className="text-[#E0758A]" />
                      <span className="text-sm text-[#1A1A1A] font-light">Ver projeto</span>
                    </div>
                  </div>
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
                  
                  {/* Link para ver mais sobre o projeto */}
                  <button
                    onClick={() => onViewFullProject(project.id)}
                    className="mt-2 text-[#E0758A] text-xs font-light flex items-center hover:text-[#F5C0CB] transition-colors duration-300"
                  >
                    Ver mais sobre o projeto <ArrowRight size={14} className="ml-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Modal para visualização ampliada de imagens */}
      {selectedProject && (
        <ImageModal
          imageSrc={selectedProject.images[0]}
          alt={selectedProject.title}
          isOpen={isModalOpen}
          onClose={closeModal}
          hasNavigation={false}
        />
      )}
    </Page>
  );
};