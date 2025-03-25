import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { NavigationProps } from '../types';

export const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  totalPages,
  onNavigate,
  onNavigateToPage
}) => {
  const handlePrev = () => onNavigate('prev');
  const handleNext = () => onNavigate('next');

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[50px] flex justify-center items-center z-30 bg-white border-t border-[#eeeeee]">
      <div className="flex items-center gap-6 md:gap-8">
        {/* Botão anterior (circular) */}
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          aria-label="Página anterior"
          className="w-7 h-7 rounded-full border border-[#dddddd] flex items-center justify-center text-[#dddddd] hover:text-[#333333] hover:border-[#333333] disabled:opacity-30 transition-all duration-300"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
        </button>
        
        {/* Bolinhas de navegação */}
        <div className="flex gap-3">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => onNavigateToPage && onNavigateToPage(i)}
              aria-label={`Ir para página ${i + 1}`}
              title={`Página ${i + 1}`}
              className={`rounded-full transition-all duration-300 hover:opacity-80 
                ${currentPage === i 
                  ? 'w-2.5 h-2.5 bg-[#333333]' 
                  : 'w-2 h-2 bg-[#dddddd] hover:bg-[#aaaaaa]'}`}
            />
          ))}
        </div>
        
        {/* Botão próximo (circular) */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
          aria-label="Próxima página"
          className="w-7 h-7 rounded-full border border-[#dddddd] flex items-center justify-center text-[#dddddd] hover:text-[#333333] hover:border-[#333333] disabled:opacity-30 transition-all duration-300"
        >
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};