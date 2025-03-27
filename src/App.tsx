import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Compass, MapPin, Mail, Globe, Phone, Calendar, ArrowRight, ArrowLeft } from 'lucide-react';
import { Navigation } from './components/Navigation';
import { Page } from './components/Page';
import { ProjectPage } from './components/ProjectPage';
import { IndexPage } from './components/IndexPage';
import { FullProjectView } from './components/FullProjectView';
import { ContactPage } from './components/ContactPage';
import { projects } from './data';

// Configuração das animações de transição de página
const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
};

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [viewingFullProject, setViewingFullProject] = useState<number | null>(null);
  const totalPages = projects.length + 4; // Cover + Bio + Index + Projects + Contact
  const [isMobile, setIsMobile] = useState(false);
  
  // Referências para controle de swipe
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50; // Distância mínima em pixels para considerar um swipe

  // Definir títulos personalizados para cada página
  const pageTitles = [
    "Inicial",
    "Sobre mim",
    "Projetos",
    ...projects.map(project => project.title),
    "Contato"
  ];

  // Detectar se é dispositivo móvel e ajustar variável CSS para altura da viewport
  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      
      // Ajustar variável CSS para altura real da viewport em dispositivos móveis
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Aplicar as classes corretas logo no carregamento da página
  useEffect(() => {
    // Definir a cor de fundo no documento e no html
    document.body.style.backgroundColor = "#F8F5F0";
    document.documentElement.style.backgroundColor = "#F8F5F0";
    
    // Por padrão, aplicar o modo livro
    if (viewingFullProject === null) {
      document.body.classList.add('book-layout');
      document.documentElement.classList.remove('viewing-project-detail');
      
      // Reiniciar os estilos para o padrão sem scroll
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.height = "100%";
    }
    
    return () => {
      // Cleanup
      document.body.classList.remove('book-layout');
    };
  }, [viewingFullProject]);

  // Adicionar suporte para navegação com as teclas de seta
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Não capturar teclas se estiver em um elemento de formulário
      if (
        e.target instanceof HTMLInputElement || 
        e.target instanceof HTMLTextAreaElement || 
        e.target instanceof HTMLSelectElement ||
        viewingFullProject !== null
      ) {
        return;
      }

      if (e.key === 'ArrowLeft') {
        handleNavigate('prev');
      } else if (e.key === 'ArrowRight') {
        handleNavigate('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentPage, totalPages, viewingFullProject]);
  
  // Adicionar suporte para navegação com swipe em dispositivos móveis
  useEffect(() => {
    // Não adicionar swipe quando estiver visualizando projeto completo
    if (viewingFullProject !== null) return;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.changedTouches[0].screenX;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX.current = e.changedTouches[0].screenX;
      handleSwipe();
    };
    
    const handleSwipe = () => {
      if (touchStartX.current === null || touchEndX.current === null) return;
      
      const distance = touchStartX.current - touchEndX.current;
      const isLeftSwipe = distance > minSwipeDistance;
      const isRightSwipe = distance < -minSwipeDistance;
      
      if (isLeftSwipe) {
        handleNavigate('next');
      } else if (isRightSwipe) {
        handleNavigate('prev');
      }
      
      // Reset para próximo swipe
      touchStartX.current = null;
      touchEndX.current = null;
    };
    
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentPage, viewingFullProject]);

  const handleNavigate = (direction: 'prev' | 'next') => {
    setCurrentPage(prev => 
      direction === 'next' 
        ? Math.min(prev + 1, totalPages - 1)
        : Math.max(prev - 1, 0)
    );
  };

  const handleNavigateToPage = (pageIndex: number) => {
    // Garantir que o índice está dentro do intervalo permitido
    if (pageIndex >= 0 && pageIndex < totalPages) {
      setCurrentPage(pageIndex);
    }
  };

  const handleViewFullProject = (projectId: number) => {
    // Garantir que a página scrolle para o topo quando abrir o projeto completo
    window.scrollTo(0, 0);
    
    // Atualizar o estado
    setViewingFullProject(projectId);
  };

  const handleBackFromFullProject = () => {
    // Atualizar o estado
    setViewingFullProject(null);
  };

  // Se estiver visualizando um projeto completo, mostrar apenas esse componente
  if (viewingFullProject !== null) {
    const projectToShow = projects.find(p => p.id === viewingFullProject);
    if (projectToShow) {
      // Usar um div adicional para garantir que o FullProjectView apareça
      return (
        <motion.div 
          id="project-detail-container" 
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            height: "100%",
            overflow: "auto",
            backgroundColor: "#F8F5F0",
            zIndex: 9999
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <FullProjectView project={projectToShow} onBack={handleBackFromFullProject} />
        </motion.div>
      );
    }
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden pb-footer bg-primary">
      <AnimatePresence mode="wait" initial={false}>
        {currentPage === 0 && (
          <motion.div key="cover" {...pageTransition}>
            <Page key="cover" className="bg-primary">
              <div className="h-full flex flex-col items-center justify-center text-center relative">
                <Compass className="w-12 h-12 md:w-16 md:h-16 mb-6 md:mb-8 text-accent" />
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-light mb-3 md:mb-4 text-primary tracking-wide">EMANUELLE DE ANDRADE</h1>
                <p className="text-base md:text-lg lg:text-xl text-secondary font-light">ARCHITECTURAL PORTFOLIO</p>
                
                {/* Seta minimalista centralizada - em mobile, mova para baixo */}
                <button 
                  onClick={() => handleNavigate('next')} 
                  className={`
                    ${isMobile ? 'absolute bottom-12 right-1/2 translate-x-1/2' : 'absolute right-8 md:right-16 top-1/2 transform -translate-y-1/2'} 
                    cursor-pointer focus:outline-none focus:ring-0 group
                  `}
                  aria-label="Próxima página"
                >
                  <div className="relative flex flex-col items-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-accent flex items-center justify-center bg-white hover:bg-accent-light transition-all duration-300 hover:border-accent animate-subtle-attention shadow-sm">
                      <ArrowRight size={20} className="text-accent transform transition-all duration-300 group-hover:translate-x-1" />
                    </div>
                    <span className="hidden md:block text-xs text-secondary font-light mt-2 whitespace-nowrap">Explorar portfólio</span>
                  </div>
                </button>
              </div>
            </Page>
          </motion.div>
        )}

        {currentPage === 1 && (
          <motion.div key="bio" {...pageTransition}>
            <Page key="bio" className="bg-primary">
              <div className="h-full flex flex-col md:flex-row overflow-auto mobile-scroll pb-16 md:pb-0 md:overflow-hidden">
                {/* Coluna lateral esquerda (30-35%) */}
                <div className="w-full md:w-[35%] p-4 md:p-6 lg:p-8 md:border-r border-[#E5E0DB] flex flex-col">
                  {/* Foto e informações pessoais */}
                  <div className="mb-4 md:mb-5 flex flex-col items-center md:items-start">
                    {/* Placeholder para foto */}
                    <div className="w-24 h-24 md:w-28 md:h-28 mb-3 md:mb-4 bg-white rounded-full overflow-hidden flex items-center justify-center border border-[#E5E0DB] shadow-sm">
                      <Compass className="w-9 h-9 text-accent" />
                    </div>
                    
                    <h1 className="text-xl md:text-2xl lg:text-2xl font-light text-primary tracking-wide mb-1">emanuelle de andrade</h1>
                    <p className="text-xs font-light text-accent mb-3 md:mb-4">Arquiteta & Designer</p>
                  </div>
                  
                  {/* Informações de contato */}
                  <div className="mb-6 md:mb-5">
                    <h2 className="text-xs uppercase tracking-wider text-primary mb-2 font-light border-b border-accent pb-1.5 inline-block">Contato</h2>
                    <div className="space-y-3 mt-3">
                      <div className="flex items-center gap-3">
                        <MapPin size={16} className="flex-shrink-0 text-accent" />
                        <span className="text-sm text-secondary">San Francisco, CA</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail size={16} className="flex-shrink-0 text-accent" />
                        <a href="mailto:emanuelle.deandrade@email.com" className="text-sm text-secondary hover:text-accent transition-colors duration-300">emanuelle.deandrade@email.com</a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Globe size={16} className="flex-shrink-0 text-accent" />
                        <a href="https://www.emanuelledeandrade.com" target="_blank" rel="noopener noreferrer" className="text-sm text-secondary hover:text-accent transition-colors duration-300">www.emanuelledeandrade.com</a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone size={16} className="flex-shrink-0 text-accent" />
                        <span className="text-sm text-secondary">(555) 123-4567</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Sobre mim */}
                  <div className="mb-6 md:mb-5">
                    <h2 className="text-xs uppercase tracking-wider text-primary mb-1.5 font-light border-b border-accent pb-1.5 inline-block">Perfil</h2>
                    <p className="text-sm leading-relaxed text-secondary mt-3">
                      With over a decade of experience in architectural design, I specialize in creating 
                      spaces that harmoniously blend functionality with aesthetic beauty. My approach 
                      combines sustainable practices with innovative design solutions.
                    </p>
                  </div>
                  
                  {/* Idiomas em formato horizontal */}
                  <div className="mb-8 md:mb-auto">
                    <h2 className="text-xs uppercase tracking-wider text-primary mb-1.5 font-light border-b border-accent pb-1.5 inline-block">Idiomas</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-3 mt-3">
                      <div className="flex items-center">
                        <span className="text-sm text-secondary">English</span>
                        <span className="mx-1.5 text-accent">•</span>
                        <span className="text-sm text-secondary">Nativo</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-secondary">Spanish</span>
                        <span className="mx-1.5 text-accent">•</span>
                        <span className="text-sm text-secondary">Fluente</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-secondary">French</span>
                        <span className="mx-1.5 text-accent">•</span>
                        <span className="text-sm text-secondary">Intermediário</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Divisor para mobile */}
                  <div className="block md:hidden w-full h-px bg-[#E5E0DB] my-2"></div>
                </div>
                
                {/* Área principal direita (65-70%) */}
                <div className="w-full md:w-[65%] p-4 md:p-6 lg:p-8 flex flex-col">
                  {/* Experiência - com timeline */}
                  <div className="mb-8 md:mb-5">
                    <h2 className="text-sm uppercase font-light tracking-wider text-primary border-b border-accent pb-1.5 mb-4">Experiência Profissional</h2>
                    
                    <div className="relative pl-5 space-y-5 md:space-y-4 before:absolute before:top-2 before:bottom-2 before:left-0 before:w-[1px] before:bg-[#E5E0DB]">
                      <div className="relative">
                        <div className="absolute top-0 left-[-21px] w-4 h-4 rounded-full bg-white border border-accent"></div>
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                          <h3 className="text-sm font-medium text-primary">Foster + Partners</h3>
                          <div className="flex items-center mt-1 sm:mt-0">
                            <span className="text-xs text-secondary mr-1.5">2020 - 2023</span>
                            <span className="inline-block px-1.5 py-0.5 bg-accent-light text-primary text-[10px] rounded">3 anos</span>
                          </div>
                        </div>
                        <p className="text-xs text-accent italic mb-2">Senior Architect / Project Lead</p>
                        <ul className="space-y-1 list-disc list-inside text-xs text-secondary">
                          <li>Led design teams for major commercial projects in Asia and Europe</li>
                          <li>Developed sustainable design strategies for LEED certification</li>
                        </ul>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute top-0 left-[-21px] w-4 h-4 rounded-full bg-white border border-accent"></div>
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                          <h3 className="text-sm font-medium text-primary">Gensler</h3>
                          <div className="flex items-center mt-1 sm:mt-0">
                            <span className="text-xs text-secondary mr-1.5">2018 - 2020</span>
                            <span className="inline-block px-1.5 py-0.5 bg-accent-light text-primary text-[10px] rounded">2 anos</span>
                          </div>
                        </div>
                        <p className="text-xs text-accent italic mb-2">Project Architect</p>
                        <ul className="space-y-1 list-disc list-inside text-xs text-secondary">
                          <li>Designed and coordinated residential and commercial projects</li>
                          <li>Collaborated with engineers and contractors</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  {/* Educação */}
                  <div className="mb-8 md:mb-5">
                    <h2 className="text-sm uppercase font-light tracking-wider text-primary border-b border-accent pb-1.5 mb-4">Educação</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border-l-2 border-accent pl-3 py-1 hover:border-accent-light transition-colors duration-300">
                        <div className="mb-1">
                          <h3 className="text-sm font-medium text-primary">Master of Architecture</h3>
                        </div>
                        <p className="text-xs text-secondary mb-0.5">University of California, Berkeley</p>
                        <p className="text-xs text-accent">2014 - 2018</p>
                      </div>
                      
                      <div className="border-l-2 border-accent pl-3 py-1 hover:border-accent-light transition-colors duration-300">
                        <div className="mb-1">
                          <h3 className="text-sm font-medium text-primary">Bachelor of Arts in Architecture</h3>
                        </div>
                        <p className="text-xs text-secondary mb-0.5">Stanford University</p>
                        <p className="text-xs text-accent">2010 - 2014</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Software Skills - Visual Grid */}
                  <div className="mb-8 md:mb-0">
                    <h2 className="text-sm uppercase font-light tracking-wider text-primary border-b border-accent pb-1.5 mb-4">Habilidades de Software</h2>
                    
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-x-2 gap-y-4">
                      {[
                        {name: 'AutoCAD', icon: 'A'},
                        {name: 'Revit', icon: 'R'},
                        {name: 'SketchUp', icon: 'S'},
                        {name: '3ds Max', icon: '3D'},
                        {name: 'V-Ray', icon: 'V'},
                        {name: 'Photoshop', icon: 'Ps'},
                        {name: 'Illustrator', icon: 'Ai'},
                        {name: 'InDesign', icon: 'Id'},
                        {name: 'Rhino', icon: 'Rh'},
                        {name: 'Lumion', icon: 'Lu'},
                        {name: 'ArchiCAD', icon: 'AC'}
                      ].map((software) => (
                        <div key={software.name} className="group flex flex-col items-center">
                          {/* Ícone com design minimalista arquitetônico */}
                          <div className="w-10 h-10 bg-white border border-accent flex items-center justify-center mb-1.5 group-hover:border-accent-light transition-all duration-300 relative overflow-hidden shadow-sm">
                            {/* Fundo sutilmente texturizado */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white to-[#FBF9F7] opacity-80"></div>
                            
                            {/* Linhas arquitetônicas */}
                            <div className="absolute h-full w-[1px] bg-accent-light left-0"></div>
                            <div className="absolute h-full w-[1px] bg-accent-light right-0"></div>
                            <div className="absolute w-full h-[1px] bg-accent-light top-0"></div>
                            <div className="absolute w-full h-[1px] bg-accent-light bottom-0"></div>
                            
                            {/* Elemento de destaque no canto */}
                            <div className="absolute top-0 right-0 w-4 h-4 bg-accent-light transform rotate-45 translate-x-2 -translate-y-2 border-b border-l border-accent"></div>
                            
                            {/* Conteúdo do ícone */}
                            <span className="relative text-sm font-medium text-primary tracking-wide group-hover:text-accent transition-colors duration-300">{software.icon}</span>
                          </div>
                          
                          {/* Nome do software */}
                          <span className="text-[10px] font-light text-secondary text-center">{software.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Page>
          </motion.div>
        )}

        {currentPage === 2 && (
          <motion.div key="index" {...pageTransition}>
            <IndexPage 
              key="index" 
              projects={projects} 
              onViewFullProject={handleViewFullProject} 
              currentPage={currentPage - 2} 
              onNavigateToPage={(index) => handleNavigateToPage(index + 3)}
              totalPages={projects.length}
            />
          </motion.div>
        )}

        {currentPage >= 3 && currentPage < totalPages - 1 && (
          <motion.div key={`project-${currentPage}`} {...pageTransition}>
            <ProjectPage 
              key={`project-${currentPage}`} 
              project={projects[currentPage - 3]} 
              onViewFullProject={handleViewFullProject}
            />
          </motion.div>
        )}

        {currentPage === totalPages - 1 && (
          <motion.div key="contact" {...pageTransition}>
            <Page key="contact" className="bg-primary">
              <ContactPage />
            </Page>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Renderizar a navegação apenas se não estiver na página de capa */}
      {currentPage !== 0 && (
        <Navigation 
          currentPage={currentPage}
          totalPages={totalPages}
          onNavigate={handleNavigate}
          onNavigateToPage={handleNavigateToPage}
          pageTitles={pageTitles}
        />
      )}
    </div>
  );
}

export default App;