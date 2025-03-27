import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { NavigationProps } from '../types';

export const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  totalPages,
  onNavigate,
  onNavigateToPage,
  pageTitles
}) => {
  const handlePrev = () => onNavigate('prev');
  const handleNext = () => onNavigate('next');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showPageIndicator, setShowPageIndicator] = useState(false);

  // Mostra o indicador de página por 2 segundos quando clicado
  const handleIndicatorClick = () => {
    setShowPageIndicator(true);
    setTimeout(() => setShowPageIndicator(false), 2000);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[60px] md:h-[50px] flex justify-center items-center z-30 bg-[#F8F5F2] border-t border-[#E5E0DB]">
      {/* Indicador de página atual para mobile */}
      {showPageIndicator && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#1A1A1A] text-white text-xs py-1 px-3 rounded-full whitespace-nowrap animate-fade-in">
          {pageTitles && pageTitles[currentPage]}
          <div className="absolute w-2 h-2 bg-[#1A1A1A] transform rotate-45 left-1/2 -translate-x-1/2 bottom-[-4px]"></div>
        </div>
      )}
      
      <div className="flex items-center gap-5 md:gap-8">
        {/* Botão anterior (circular) */}
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          aria-label="Página anterior"
          className="w-12 h-12 md:w-8 md:h-8 rounded-full border-2 md:border border-[#E5E0DB] flex items-center justify-center text-[#E5E0DB] hover:text-[#E0758A] hover:border-[#E0758A] disabled:opacity-30 transition-all duration-300"
        >
          <ArrowLeft className="h-5 w-5 md:h-4 md:w-4" />
        </button>
        
        {/* Navegação para desktop - bolinhas */}
        <div className="hidden md:flex gap-3 relative">
          {Array.from({ length: totalPages }).map((_, i) => (
            <div key={i} className="relative group">
              <button
                onClick={() => onNavigateToPage && onNavigateToPage(i)}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                aria-label={pageTitles && pageTitles[i] ? pageTitles[i] : `Ir para página ${i + 1}`}
                className={`rounded-full transition-all duration-300 hover:opacity-80 
                  ${currentPage === i 
                    ? 'w-2.5 h-2.5 bg-[#E0758A]' 
                    : 'w-2 h-2 bg-[#E5E0DB] hover:bg-[#F5C0CB]'}`}
              />
              
              {/* Tooltip com o nome da página */}
              {hoveredIndex === i && pageTitles && pageTitles[i] && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#1A1A1A] text-white text-xs py-1 px-2 rounded whitespace-nowrap animate-fade-in">
                  {pageTitles[i]}
                  <div className="absolute w-2 h-2 bg-[#1A1A1A] transform rotate-45 left-1/2 -translate-x-1/2 bottom-[-4px]"></div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Indicador de página para mobile */}
        <button 
          onClick={handleIndicatorClick}
          className="md:hidden text-sm text-[#4D4D4D] font-light px-5 py-2 border border-[#E5E0DB] rounded-full"
        >
          {currentPage + 1} / {totalPages}
        </button>
        
        {/* Botão próximo (circular) */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
          aria-label="Próxima página"
          className="w-12 h-12 md:w-8 md:h-8 rounded-full border-2 md:border border-[#E5E0DB] flex items-center justify-center text-[#E5E0DB] hover:text-[#E0758A] hover:border-[#E0758A] disabled:opacity-30 transition-all duration-300"
        >
          <ArrowRight className="h-5 w-5 md:h-4 md:w-4" />
        </button>
      </div>
    </div>
  );
};