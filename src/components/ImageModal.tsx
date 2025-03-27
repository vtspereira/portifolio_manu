import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageModalProps {
  imageSrc: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  hasNavigation?: boolean;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  imageSrc,
  alt,
  isOpen,
  onClose,
  onNext,
  onPrev,
  hasNavigation = false
}) => {
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && hasNavigation && onNext) {
        onNext();
      } else if (e.key === 'ArrowLeft' && hasNavigation && onPrev) {
        onPrev();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Desabilitar scroll quando o modal estiver aberto
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Forçar z-index alto para garantir que o modal apareça acima de tudo
      document.body.classList.add('modal-open');
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    };
  }, [isOpen, onClose, onNext, onPrev, hasNavigation]);
  
  // Usando AnimatePresence para melhorar a animação de entrada/saída
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            zIndex: 99999, // z-index extremamente alto para garantir que fique acima de tudo
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem'
          }}
          onClick={onClose}
        >
          <div 
            style={{
              position: 'relative',
              maxWidth: '100%',
              maxHeight: '100%',
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.img
              src={imageSrc}
              alt={alt}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              style={{
                maxWidth: '100%',
                maxHeight: 'calc(100vh - 5rem)',
                objectFit: 'contain',
                boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)'
              }}
            />
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                backgroundColor: 'white',
                borderRadius: '50%',
                width: '2.5rem',
                height: '2.5rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                zIndex: 1 // Garantir que o botão fique acima da imagem
              }}
              aria-label="Fechar modal"
            >
              <X size={20} />
            </button>
            
            {hasNavigation && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onPrev) onPrev();
                  }}
                  style={{
                    position: 'absolute',
                    left: '1rem',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    width: '3rem',
                    height: '3rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                    zIndex: 1
                  }}
                  aria-label="Imagem anterior"
                >
                  <ChevronLeft size={24} />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onNext) onNext();
                  }}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    width: '3rem',
                    height: '3rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                    zIndex: 1
                  }}
                  aria-label="Próxima imagem"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 