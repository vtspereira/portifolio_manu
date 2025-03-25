import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Compass, MapPin, Mail, Globe, Phone, Calendar, ArrowRight } from 'lucide-react';
import { Navigation } from './components/Navigation';
import { Page } from './components/Page';
import { ProjectPage } from './components/ProjectPage';
import { IndexPage } from './components/IndexPage';
import { FullProjectView } from './components/FullProjectView';
import { projects } from './data';

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [viewingFullProject, setViewingFullProject] = useState<number | null>(null);
  const totalPages = projects.length + 3; // Cover + Bio + Index + Projects
  const [isMobile, setIsMobile] = useState(false);

  // Definir títulos personalizados para cada página
  const pageTitles = [
    "Inicial",
    "Sobre mim",
    "Projetos",
    ...projects.map(project => project.title)
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
        <div id="project-detail-container" style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          height: "100%",
          overflow: "auto",
          backgroundColor: "#F8F5F2",
          zIndex: 9999
        }}>
          <FullProjectView project={projectToShow} onBack={handleBackFromFullProject} />
        </div>
      );
    }
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden pb-footer">
      <AnimatePresence mode="wait" initial={false}>
        {currentPage === 0 && (
          <Page key="cover" className="bg-[#F8F5F2]">
            <div className="h-full flex flex-col items-center justify-center text-center relative">
              <Compass className="w-12 h-12 md:w-16 md:h-16 mb-6 md:mb-8 text-[#E0758A]" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-3 md:mb-4 text-[#1A1A1A] tracking-wide">SOFIA MARTINEZ</h1>
              <p className="text-base md:text-lg lg:text-xl text-[#666666] font-light">ARCHITECTURAL PORTFOLIO</p>
              
              {/* Seta minimalista centralizada */}
              <button 
                onClick={() => handleNavigate('next')} 
                className="absolute right-8 md:right-16 top-1/2 transform -translate-y-1/2 cursor-pointer focus:outline-none focus:ring-0 group"
                aria-label="Próxima página"
              >
                <div className="relative flex flex-col items-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-[#E0758A] flex items-center justify-center bg-white hover:bg-[#F5C0CB] transition-all duration-300 hover:border-[#E0758A] animate-subtle-attention shadow-sm">
                    <ArrowRight size={20} className="text-[#E0758A] transform transition-all duration-300 group-hover:translate-x-1" />
                  </div>
                  <span className="hidden md:block text-xs text-[#666666] font-light mt-2 whitespace-nowrap">Explorar portfólio</span>
                </div>
              </button>
            </div>
          </Page>
        )}

        {currentPage === 1 && (
          <Page key="bio" className="bg-[#F8F5F2]">
            <div className="h-full flex flex-col md:flex-row overflow-hidden">
              {/* Coluna lateral esquerda (30-35%) */}
              <div className="w-full md:w-[35%] h-full md:min-h-full p-4 md:p-6 lg:p-8 md:border-r border-[#E5E0DB] flex flex-col">
                {/* Foto e informações pessoais */}
                <div className="mb-4 md:mb-5 flex flex-col items-center md:items-start">
                  {/* Placeholder para foto */}
                  <div className="w-24 h-24 md:w-28 md:h-28 mb-3 md:mb-4 bg-white rounded-full overflow-hidden flex items-center justify-center border border-[#E5E0DB] shadow-sm">
                    <Compass className="w-9 h-9 text-[#E0758A]" />
                  </div>
                  
                  <h1 className="text-xl md:text-2xl lg:text-2xl font-light text-[#1A1A1A] tracking-wide mb-1">sofia martinez</h1>
                  <p className="text-xs font-light text-[#E0758A] mb-3 md:mb-4">Arquiteta & Designer</p>
                </div>
                
                {/* Informações de contato */}
                <div className="mb-4 md:mb-5">
                  <h2 className="text-xs uppercase tracking-wider text-[#1A1A1A] mb-2 font-light border-b border-[#E0758A] pb-1.5 inline-block">Contato</h2>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center gap-3">
                      <MapPin size={14} className="flex-shrink-0 text-[#E0758A]" />
                      <span className="text-xs text-[#666666]">San Francisco, CA</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail size={14} className="flex-shrink-0 text-[#E0758A]" />
                      <a href="mailto:sofia.martinez@email.com" className="text-xs text-[#666666] hover:text-[#E0758A] transition-colors duration-300">sofia.martinez@email.com</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe size={14} className="flex-shrink-0 text-[#E0758A]" />
                      <a href="https://www.sofiamartinez.com" target="_blank" rel="noopener noreferrer" className="text-xs text-[#666666] hover:text-[#E0758A] transition-colors duration-300">www.sofiamartinez.com</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={14} className="flex-shrink-0 text-[#E0758A]" />
                      <span className="text-xs text-[#666666]">(555) 123-4567</span>
                    </div>
                  </div>
                </div>
                
                {/* Sobre mim */}
                <div className="mb-4 md:mb-5">
                  <h2 className="text-xs uppercase tracking-wider text-[#1A1A1A] mb-2 font-light border-b border-[#E0758A] pb-1.5 inline-block">Perfil</h2>
                  <p className="text-xs leading-relaxed text-[#666666] mt-2">
                    With over a decade of experience in architectural design, I specialize in creating 
                    spaces that harmoniously blend functionality with aesthetic beauty. My approach 
                    combines sustainable practices with innovative design solutions.
                  </p>
                </div>
                
                {/* Idiomas em formato horizontal */}
                <div className="mb-4 md:mb-auto">
                  <h2 className="text-xs uppercase tracking-wider text-[#1A1A1A] mb-2 font-light border-b border-[#E0758A] pb-1.5 inline-block">Idiomas</h2>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-2 mt-2">
                    <div className="flex items-center">
                      <span className="text-xs text-[#666666]">English</span>
                      <span className="mx-1.5 text-[#E0758A]">•</span>
                      <span className="text-xs text-[#666666]">Nativo</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-[#666666]">Spanish</span>
                      <span className="mx-1.5 text-[#E0758A]">•</span>
                      <span className="text-xs text-[#666666]">Fluente</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-[#666666]">French</span>
                      <span className="mx-1.5 text-[#E0758A]">•</span>
                      <span className="text-xs text-[#666666]">Intermediário</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Área principal direita (65-70%) */}
              <div className="w-full md:w-[65%] h-full md:min-h-full p-4 md:p-6 lg:p-8 flex flex-col overflow-hidden">
                {/* Experiência - com timeline */}
                <div className="mb-5 md:mb-6">
                  <h2 className="text-sm uppercase font-light tracking-wider text-[#1A1A1A] border-b border-[#E0758A] pb-2 mb-4">Experiência Profissional</h2>
                  
                  <div className="relative pl-5 space-y-4 md:space-y-5 before:absolute before:top-2 before:bottom-2 before:left-0 before:w-[1px] before:bg-[#E5E0DB]">
                    <div className="relative">
                      <div className="absolute top-0 left-[-21px] w-4 h-4 rounded-full bg-white border border-[#E0758A]"></div>
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1">
                        <h3 className="text-sm font-medium text-[#1A1A1A]">Foster + Partners</h3>
                        <div className="flex items-center mt-1 sm:mt-0">
                          <span className="text-xs text-[#666666] mr-1.5">2020 - 2023</span>
                          <span className="inline-block px-1.5 py-0.5 bg-[#F5C0CB] text-[#1A1A1A] text-[10px] rounded">3 anos</span>
                        </div>
                      </div>
                      <p className="text-xs text-[#E0758A] italic mb-1">Senior Architect / Project Lead</p>
                      <ul className="space-y-0.5 list-disc list-inside text-xs text-[#666666]">
                        <li>Led design teams for major commercial projects in Asia and Europe</li>
                        <li>Developed sustainable design strategies for LEED certification</li>
                      </ul>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute top-0 left-[-21px] w-4 h-4 rounded-full bg-white border border-[#E0758A]"></div>
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1">
                        <h3 className="text-sm font-medium text-[#1A1A1A]">Gensler</h3>
                        <div className="flex items-center mt-1 sm:mt-0">
                          <span className="text-xs text-[#666666] mr-1.5">2018 - 2020</span>
                          <span className="inline-block px-1.5 py-0.5 bg-[#F5C0CB] text-[#1A1A1A] text-[10px] rounded">2 anos</span>
                        </div>
                      </div>
                      <p className="text-xs text-[#E0758A] italic mb-1">Project Architect</p>
                      <ul className="space-y-0.5 list-disc list-inside text-xs text-[#666666]">
                        <li>Designed and coordinated residential and commercial projects</li>
                        <li>Collaborated with engineers and contractors</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Educação */}
                <div className="mb-5 md:mb-6">
                  <h2 className="text-sm uppercase font-light tracking-wider text-[#1A1A1A] border-b border-[#E0758A] pb-2 mb-4">Educação</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border-l-2 border-[#E0758A] pl-3 py-0.5 hover:border-[#F5C0CB] transition-colors duration-300">
                      <div className="mb-1">
                        <h3 className="text-sm font-medium text-[#1A1A1A]">Master of Architecture</h3>
                      </div>
                      <p className="text-xs text-[#666666] mb-0.5">University of California, Berkeley</p>
                      <p className="text-xs text-[#E0758A]">2014 - 2018</p>
                    </div>
                    
                    <div className="border-l-2 border-[#E0758A] pl-3 py-0.5 hover:border-[#F5C0CB] transition-colors duration-300">
                      <div className="mb-1">
                        <h3 className="text-sm font-medium text-[#1A1A1A]">Bachelor of Arts in Architecture</h3>
                      </div>
                      <p className="text-xs text-[#666666] mb-0.5">Stanford University</p>
                      <p className="text-xs text-[#E0758A]">2010 - 2014</p>
                    </div>
                  </div>
                </div>
                
                {/* Software Skills - Visual Grid */}
                <div>
                  <h2 className="text-sm uppercase font-light tracking-wider text-[#1A1A1A] border-b border-[#E0758A] pb-2 mb-4">Habilidades de Software</h2>
                  
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-x-3 gap-y-4">
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
                        <div className="w-12 h-12 bg-white border border-[#E0758A] flex items-center justify-center mb-2 group-hover:border-[#F5C0CB] transition-all duration-300 relative overflow-hidden shadow-sm">
                          {/* Fundo sutilmente texturizado */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white to-[#FBF9F7] opacity-80"></div>
                          
                          {/* Linhas arquitetônicas */}
                          <div className="absolute h-full w-[1px] bg-[#F5C0CB] left-0"></div>
                          <div className="absolute h-full w-[1px] bg-[#F5C0CB] right-0"></div>
                          <div className="absolute w-full h-[1px] bg-[#F5C0CB] top-0"></div>
                          <div className="absolute w-full h-[1px] bg-[#F5C0CB] bottom-0"></div>
                          
                          {/* Elemento de destaque no canto */}
                          <div className="absolute top-0 right-0 w-4 h-4 bg-[#F5C0CB] transform rotate-45 translate-x-2 -translate-y-2 border-b border-l border-[#E0758A]"></div>
                          
                          {/* Conteúdo do ícone */}
                          <span className="relative text-sm font-medium text-[#1A1A1A] tracking-wide group-hover:text-[#E0758A] transition-colors duration-300">{software.icon}</span>
                        </div>
                        
                        {/* Nome do software */}
                        <span className="text-[10px] font-light text-[#666666] text-center">{software.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Page>
        )}

        {currentPage === 2 && (
          <IndexPage 
            key="index" 
            projects={projects} 
            onViewFullProject={handleViewFullProject} 
            currentPage={currentPage - 2} 
            onNavigateToPage={(index) => handleNavigateToPage(index + 3)}
            totalPages={projects.length}
          />
        )}

        {currentPage >= 3 && (
          <ProjectPage 
            key={`project-${currentPage}`} 
            project={projects[currentPage - 3]} 
            onViewFullProject={handleViewFullProject}
          />
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