import React from 'react';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import type { NavigationProps } from '../types';

export const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  totalPages,
  onNavigate,
  onViewFullProject,
  currentProjectId,
  onNavigateToPage
}) => {
  const handlePrev = () => onNavigate('prev');
  const handleNext = () => onNavigate('next');
  
  const handleViewFullProject = () => {
    if (currentProjectId !== undefined && onViewFullProject) {
      onViewFullProject(currentProjectId);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 py-4 md:py-6 px-4 md:px-8 flex justify-between items-center z-10 bg-gradient-to-t from-white/80 to-transparent">
      <button
        onClick={handlePrev}
        disabled={currentPage === 0}
        aria-label="Página anterior"
        className="group flex items-center gap-1 md:gap-2 text-gray-800 disabled:text-gray-400 disabled:opacity-50 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 group-hover:-translate-x-1" />
        <span className="text-xs md:text-sm font-light">Anterior</span>
      </button>

      <div className="flex space-x-3 items-center">
        {currentProjectId !== undefined && onViewFullProject && (
          <button
            onClick={handleViewFullProject}
            aria-label="Ver projeto completo"
            className="group flex items-center gap-1 text-[#5a8bb0] hover:text-[#3d6c94] transition-colors px-2 md:px-3 py-1 rounded"
          >
            <span className="text-xs md:text-sm font-light">Ver projeto completo</span>
            <ExternalLink className="h-3 w-3 md:h-4 md:w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        )}
      </div>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages - 1}
        aria-label="Próxima página"
        className="group flex items-center gap-1 md:gap-2 text-gray-800 disabled:text-gray-400 disabled:opacity-50 transition-colors"
      >
        <span className="text-xs md:text-sm font-light">Próximo</span>
        <ArrowRight className="h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 group-hover:translate-x-1" />
      </button>

      {currentPage === 2 && (
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-4 md:bottom-6 flex gap-1 md:gap-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <button
              key={i}
              onClick={() => onNavigateToPage && onNavigateToPage(i + 3)}
              aria-label={`Ir para projeto ${i + 1}`}
              title={`Projeto ${i + 1}`}
              className={`w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 hover:scale-125 
                ${currentPage === i + 3 ? 'bg-black' : 'bg-gray-300 hover:bg-gray-400'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};