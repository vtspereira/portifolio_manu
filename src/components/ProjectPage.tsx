import { motion } from 'framer-motion';
import { useState } from 'react';
import type { Project } from '../types';
import { Page } from './Page';
import { ExternalLink, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { ImageModal } from './ImageModal';

export const ProjectPage: React.FC<{ 
  project: Project;
  onViewFullProject?: (projectId: number) => void; 
}> = ({ project, onViewFullProject }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
  };
  
  const handlePrevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };
  
  const handleNextImage = () => {
    setCurrentImageIndex(prev => 
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };
  
  const openModal = (e: React.MouseEvent) => {
    e.stopPropagation(); // Impede que o evento se propague para elementos pai
    setIsModalOpen(true);
    console.log("Modal aberto"); // Debug para confirmar que a função está sendo chamada
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Page>
      <div className="h-full md:flex md:flex-col">
        <motion.div 
          className="mb-3 md:mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-[#1A1A1A] tracking-wide">{project.title}</h2>
          <p className="text-[#666666] mt-1 md:mt-2 text-sm md:text-base font-light">{project.year} • {project.location}</p>
          <div className="w-full h-[1px] bg-[#E5E0DB] mt-2 md:mt-3"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 md:flex-grow md:overflow-hidden pb-16">
          {/* Imagem principal */}
          <motion.div 
            className="col-span-1 md:col-span-7 flex flex-col space-y-2 md:space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="group relative overflow-hidden flex justify-center items-center aspect-[4/3] md:h-[60vh] md:max-h-[58vh] bg-[#f5f2ee]">
              <div 
                className="w-full h-full flex justify-center items-center cursor-pointer"
                onClick={openModal}
              >
                <img
                  src={project.images[currentImageIndex]}
                  alt={`${project.title} - Imagem principal`}
                  className="max-w-full max-h-full object-contain"
                />
                
                {/* Overlay com efeito hover para indicar ampliar imagem */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/20 transition-all duration-300 opacity-0 group-hover:opacity-100">
                  <div className="bg-white/90 px-3 py-2 rounded-md flex items-center gap-2 shadow-sm">
                    <ImageIcon size={16} className="text-[#E0758A]" />
                    <span className="text-sm text-[#1A1A1A] font-light">Ampliar imagem</span>
                  </div>
                </div>
              </div>
              
              {/* Controles de navegação - visíveis sempre no mobile */}
              <div className="absolute inset-x-0 inset-y-0 flex items-center justify-between px-3 pointer-events-none">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage();
                  }}
                  className="w-10 h-10 md:w-8 md:h-8 rounded-full bg-white/70 flex items-center justify-center text-[#1A1A1A] shadow-sm pointer-events-auto"
                  aria-label="Imagem anterior"
                >
                  <ChevronLeft size={22} className="md:w-4 md:h-4" />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                  className="w-10 h-10 md:w-8 md:h-8 rounded-full bg-white/70 flex items-center justify-center text-[#1A1A1A] shadow-sm pointer-events-auto"
                  aria-label="Próxima imagem"
                >
                  <ChevronRight size={22} className="md:w-4 md:h-4" />
                </button>
              </div>
            </div>
            
            <div className="flex flex-col space-y-1 md:space-y-1.5">
              {/* Grid de miniaturas - apenas desktop */}
              <div className="hidden md:grid grid-cols-4 gap-[1px]">
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
              
              {/* Indicadores de slides - mobile */}
              <div className="flex justify-center space-x-2 md:hidden mt-2">
                {project.images.slice(0, 4).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageClick(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      currentImageIndex === index 
                        ? 'bg-[#E0758A] scale-110' 
                        : 'bg-[#E5E0DB]'
                    }`}
                    aria-label={`Ir para imagem ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Painel lateral */}
          <motion.div 
            className="col-span-1 md:col-span-5 flex flex-col pl-0 md:pl-4 mt-4 md:mt-0 md:overflow-y-auto"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="space-y-5 md:space-y-6">
              <div>
                <h3 className="text-base md:text-lg font-light text-[#1A1A1A] mb-2 md:mb-3">Sobre o projeto</h3>
                <div className="w-full h-[1px] bg-[#E5E0DB] mb-3 md:mb-4"></div>
                <p className="text-[#666666] leading-relaxed font-light text-sm">{project.description}</p>
              </div>
              
              <div>
                <h3 className="text-base md:text-lg font-light text-[#1A1A1A] mb-2 md:mb-3">Especificações</h3>
                <div className="w-full h-[1px] bg-[#E5E0DB] mb-3 md:mb-4"></div>
                <ul className="space-y-2 md:space-y-3">
                  {project.projectType && (
                    <li className="border-b border-[#E5E0DB] pb-2 md:pb-3">
                      <span className="text-[#666666] font-light text-xs md:text-sm block mb-0.5 md:mb-1">Tipo de Projeto</span>
                      <span className="text-[#1A1A1A] font-light text-sm md:text-base">{project.projectType}</span>
                    </li>
                  )}
                  {project.area && (
                    <li className="border-b border-[#E5E0DB] pb-2 md:pb-3">
                      <span className="text-[#666666] font-light text-xs md:text-sm block mb-0.5 md:mb-1">Área</span>
                      <span className="text-[#1A1A1A] font-light text-sm md:text-base">{project.area}</span>
                    </li>
                  )}
                  {project.status && (
                    <li className="border-b border-[#E5E0DB] pb-2 md:pb-3">
                      <span className="text-[#666666] font-light text-xs md:text-sm block mb-0.5 md:mb-1">Status</span>
                      <span className="text-[#1A1A1A] font-light text-sm md:text-base">{project.status}</span>
                    </li>
                  )}
                  {project.sustainability && (
                    <li className="border-b border-[#E5E0DB] pb-2 md:pb-3">
                      <span className="text-[#666666] font-light text-xs md:text-sm block mb-0.5 md:mb-1">Sustentabilidade</span>
                      <span className="text-[#1A1A1A] font-light text-sm md:text-base">{project.sustainability}</span>
                    </li>
                  )}
                </ul>
              </div>
              
              {onViewFullProject && (
                <div className="w-full mb-10 md:mb-0" style={{ width: "100%" }}>
                  <div style={{ width: "100%", position: "relative", overflow: "hidden" }}>
                    <button
                      onClick={() => onViewFullProject(project.id)}
                      aria-label="Ver projeto completo"
                      style={{
                        width: "100%",
                        backgroundColor: "#E0758A",
                        color: "white",
                        border: "1px solid #E0758A",
                        borderRadius: "9999px",
                        padding: "0.75rem 1.25rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "0.875rem",
                        fontWeight: "300",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        position: "relative",
                        zIndex: "5"
                      }}
                    >
                      <span>Ver projeto completo</span>
                      <ExternalLink style={{ width: "0.875rem", height: "0.875rem", marginLeft: "0.5rem" }} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Modal para visualização ampliada de imagens */}
      <ImageModal
        imageSrc={project.images[currentImageIndex]}
        alt={`${project.title} - Imagem ${currentImageIndex + 1}`}
        isOpen={isModalOpen}
        onClose={closeModal}
        onNext={handleNextImage}
        onPrev={handlePrevImage}
        hasNavigation={project.images.length > 1}
      />
    </Page>
  );
};