import { motion } from 'framer-motion';
import type { Project } from '../types';
import { Page } from './Page';

export const ProjectPage: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <Page>
      <div className="h-full flex flex-col">
        <motion.div 
          className="mb-4 md:mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-[#2c3e50]">{project.title}</h2>
          <p className="text-gray-500 mt-1 md:mt-2 font-light text-sm md:text-base">{project.year} • {project.location}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 lg:gap-8 flex-grow overflow-hidden">
          <motion.div 
            className="col-span-1 md:col-span-7 flex flex-col space-y-4 md:space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="group overflow-hidden h-[30vh] md:h-[35vh] lg:h-[40vh]">
              <img
                src={project.images[0]}
                alt={`${project.title} - Imagem principal`}
                className="w-full h-full object-cover rounded transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 h-[20vh] md:h-[25vh]">
              {project.images.length > 1 && (
                <div className="group overflow-hidden h-full">
                  <img
                    src={project.images[1]}
                    alt={`${project.title} - Detalhes`}
                    className="w-full h-full object-cover rounded transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              )}
              {project.images.length > 2 && (
                <div className="group overflow-hidden h-full">
                  <img
                    src={project.images[2]}
                    alt={`${project.title} - Detalhes adicionais`}
                    className="w-full h-full object-cover rounded transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              )}
            </div>
            
            <div className="border-t border-gray-200 pt-3 md:pt-4 max-h-[10vh] overflow-hidden">
              <p className="text-gray-700 leading-snug font-light text-xs md:text-sm line-clamp-3">{project.description}</p>
            </div>
          </motion.div>

          <motion.div 
            className="col-span-1 md:col-span-5 flex flex-col space-y-4 md:space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {project.technicalDiagram && (
              <div className="h-[30vh]">
                <h3 className="font-medium text-[#5a8bb0] mb-2 text-sm md:text-base">Diagrama Técnico</h3>
                <div className="group overflow-hidden h-[calc(100%-2rem)]">
                  <img
                    src={project.technicalDiagram}
                    alt={`${project.title} - Diagrama técnico`}
                    className="w-full h-full object-cover rounded transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-2 md:space-y-3 bg-gray-50 p-3 md:p-4 lg:p-6 rounded shadow-sm max-h-[30vh] overflow-hidden">
              <h3 className="font-medium text-[#5a8bb0] text-sm md:text-base">Características do Projeto</h3>
              <ul className="space-y-1 md:space-y-2">
                {project.projectType && (
                  <li className="flex">
                    <span className="text-xs md:text-sm text-gray-500 w-28 md:w-32 font-light">Tipo de Projeto:</span>
                    <span className="text-xs md:text-sm text-gray-700">{project.projectType}</span>
                  </li>
                )}
                {project.area && (
                  <li className="flex">
                    <span className="text-xs md:text-sm text-gray-500 w-28 md:w-32 font-light">Área Construída:</span>
                    <span className="text-xs md:text-sm text-gray-700">{project.area}</span>
                  </li>
                )}
                {project.status && (
                  <li className="flex">
                    <span className="text-xs md:text-sm text-gray-500 w-28 md:w-32 font-light">Status:</span>
                    <span className="text-xs md:text-sm text-gray-700">{project.status}</span>
                  </li>
                )}
                {project.sustainability && (
                  <li className="flex">
                    <span className="text-xs md:text-sm text-gray-500 w-28 md:w-32 font-light">Sustentabilidade:</span>
                    <span className="text-xs md:text-sm text-gray-700">{project.sustainability}</span>
                  </li>
                )}
              </ul>
            </div>
            
            {project.designProcess && (
              <div className="border-t border-gray-200 pt-3 md:pt-4 max-h-[15vh] overflow-hidden">
                <h3 className="font-medium text-[#5a8bb0] mb-1 md:mb-2 text-sm md:text-base">Processo Projetual</h3>
                <p className="text-xs md:text-sm text-gray-600 leading-snug font-light line-clamp-3">
                  {project.designProcess}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </Page>
  );
};