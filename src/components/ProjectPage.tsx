import { motion } from 'framer-motion';
import { useState } from 'react';
import type { Project } from '../types';
import { Page } from './Page';
import { ExternalLink } from 'lucide-react';

export const ProjectPage: React.FC<{ 
  project: Project;
  onViewFullProject?: (projectId: number) => void; 
}> = ({ project, onViewFullProject }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <Page>
      <div className="h-full flex flex-col">
        <motion.div 
          className="mb-4 md:mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl md:text-3xl font-light text-[#1A1A1A] tracking-wide">{project.title}</h2>
          <p className="text-[#666666] mt-2 font-light">{project.year} • {project.location}</p>
          <div className="w-full h-[1px] bg-[#E5E0DB] mt-3"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 flex-grow overflow-hidden pb-16">
          {/* Imagem principal (55% da largura) */}
          <motion.div 
            className="col-span-1 md:col-span-7 flex flex-col space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="group overflow-hidden h-[60vh] max-h-[58vh]">
              <img
                src={project.images[currentImageIndex]}
                alt={`${project.title} - Imagem principal`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
            
            <div className="flex flex-col space-y-1.5">
              {/* Indicador de posição acima das miniaturas */}
              <div className="flex justify-end">
                <span className="text-xs text-[#666666] font-light">
                  {currentImageIndex + 1}/{Math.min(project.images.length, 4)}
                </span>
              </div>
              
              {/* Grid de miniaturas com espaçamento reduzido */}
              <div className="grid grid-cols-4 gap-[1px]">
                {project.images.slice(0, 4).map((image, index) => (
                  <div 
                    key={index} 
                    className={`relative h-[80px] cursor-pointer overflow-hidden
                      ${currentImageIndex === index 
                        ? 'ring-1 ring-[#E0758A]' 
                        : 'ring-1 ring-[#E5E0DB]'}`}
                    onClick={() => handleImageClick(index)}
                  >
                    <img
                      src={image}
                      alt={`${project.title} - Miniatura ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.05]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Painel lateral (35% da largura) */}
          <motion.div 
            className="col-span-1 md:col-span-5 flex flex-col pl-0 md:pl-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-light text-[#1A1A1A] mb-3">Sobre o projeto</h3>
                <div className="w-full h-[1px] bg-[#E5E0DB] mb-4"></div>
                <p className="text-[#666666] leading-relaxed font-light text-sm">{project.description}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-light text-[#1A1A1A] mb-3">Especificações</h3>
                <div className="w-full h-[1px] bg-[#E5E0DB] mb-4"></div>
                <ul className="space-y-3">
                  {project.projectType && (
                    <li className="border-b border-[#E5E0DB] pb-3">
                      <span className="text-[#666666] font-light text-sm block mb-1">Tipo de Projeto</span>
                      <span className="text-[#1A1A1A] font-light">{project.projectType}</span>
                    </li>
                  )}
                  {project.area && (
                    <li className="border-b border-[#E5E0DB] pb-3">
                      <span className="text-[#666666] font-light text-sm block mb-1">Área</span>
                      <span className="text-[#1A1A1A] font-light">{project.area}</span>
                    </li>
                  )}
                  {project.status && (
                    <li className="border-b border-[#E5E0DB] pb-3">
                      <span className="text-[#666666] font-light text-sm block mb-1">Status</span>
                      <span className="text-[#1A1A1A] font-light">{project.status}</span>
                    </li>
                  )}
                  {project.sustainability && (
                    <li className="border-b border-[#E5E0DB] pb-3">
                      <span className="text-[#666666] font-light text-sm block mb-1">Sustentabilidade</span>
                      <span className="text-[#1A1A1A] font-light">{project.sustainability}</span>
                    </li>
                  )}
                </ul>
              </div>
              
              {onViewFullProject && (
                <div>
                  <button
                    onClick={() => onViewFullProject(project.id)}
                    aria-label="Ver projeto completo"
                    className="group border border-[#E0758A] bg-[#E0758A] text-white hover:bg-[#F5C0CB] hover:border-[#F5C0CB] hover:text-[#1A1A1A] transition-all duration-300 px-5 py-2 rounded-full text-sm font-light flex items-center"
                  >
                    <span>Ver projeto completo</span>
                    <ExternalLink className="h-3 w-3 ml-2 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </Page>
  );
};