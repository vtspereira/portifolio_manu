import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Compass, MapPin, Mail, Globe, Phone, Calendar } from 'lucide-react';
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
          backgroundColor: "white",
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
          <Page key="cover" className="bg-white">
            <div className="h-full flex flex-col items-center justify-center text-center">
              <Compass className="w-12 h-12 md:w-16 md:h-16 mb-6 md:mb-8 text-[#333333]" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-3 md:mb-4 text-[#333333] tracking-wide">SOFIA MARTINEZ</h1>
              <p className="text-base md:text-lg lg:text-xl text-[#888888] font-light">ARCHITECTURAL PORTFOLIO</p>
            </div>
          </Page>
        )}

        {currentPage === 1 && (
          <Page key="bio">
            <div className="h-full grid grid-cols-12 gap-4 md:gap-6 lg:gap-8 overflow-hidden">
              {/* Left Column */}
              <div className="col-span-12 md:col-span-5 space-y-4 md:space-y-6 lg:space-y-8">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-light text-[#333333] tracking-wide">sofia martinez</h1>
                
                {/* Contact Info */}
                <div className="space-y-1 md:space-y-2 text-xs md:text-sm text-[#888888]">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="flex-shrink-0 text-[#888888]" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="flex-shrink-0 text-[#888888]" />
                    <span>sofia.martinez@email.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe size={14} className="flex-shrink-0 text-[#888888]" />
                    <span>www.sofiamartinez.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="flex-shrink-0 text-[#888888]" />
                    <span>(555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="flex-shrink-0 text-[#888888]" />
                    <span>Born 1992</span>
                  </div>
                </div>

                {/* About Me Section */}
                <div className="space-y-2 md:space-y-3">
                  <h2 className="text-lg md:text-xl font-light text-[#333333]">SOBRE MIM</h2>
                  <div className="w-[60px] h-[2px] bg-[#333333] mb-4"></div>
                  <p className="text-xs md:text-sm leading-relaxed text-[#555555] line-clamp-3 md:line-clamp-4">
                    With over a decade of experience in architectural design, I specialize in creating 
                    spaces that harmoniously blend functionality with aesthetic beauty. My approach 
                    combines sustainable practices with innovative design solutions, ensuring each 
                    project tells its own unique story while respecting its environmental context.
                  </p>
                </div>

                {/* Education Section */}
                <div className="space-y-2 md:space-y-3">
                  <h2 className="text-lg md:text-xl font-light text-[#333333]">EDUCAÇÃO</h2>
                  <div className="w-[60px] h-[2px] bg-[#333333] mb-4"></div>
                  <div className="space-y-2 md:space-y-3">
                    <div>
                      <p className="text-xs md:text-sm text-[#888888]">2014 - 2018</p>
                      <p className="text-xs md:text-sm text-[#333333]">University of California, Berkeley</p>
                      <p className="text-xs md:text-sm text-[#555555]">Master of Architecture</p>
                    </div>
                    <div>
                      <p className="text-xs md:text-sm text-[#888888]">2010 - 2014</p>
                      <p className="text-xs md:text-sm text-[#333333]">Stanford University</p>
                      <p className="text-xs md:text-sm text-[#555555]">Bachelor of Arts in Architecture</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="col-span-12 md:col-span-7 space-y-4 md:space-y-6 lg:space-y-8 overflow-hidden">
                {/* Experience Section */}
                <div className="space-y-2 md:space-y-3">
                  <h2 className="text-lg md:text-xl font-light text-[#333333]">EXPERIÊNCIA</h2>
                  <div className="w-[60px] h-[2px] bg-[#333333] mb-4"></div>
                  <div className="space-y-3 md:space-y-4">
                    <div>
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-xs md:text-sm font-light text-[#333333]">Foster + Partners</h3>
                        <span className="text-xs md:text-sm text-[#888888]">36 months</span>
                      </div>
                      <p className="text-xs md:text-sm text-[#555555] italic">Senior Architect / Project Lead</p>
                      <ul className="mt-1 md:mt-2 space-y-0.5 md:space-y-1 text-xs md:text-sm text-[#555555]">
                        <li>Led design teams for major commercial projects in Asia and Europe</li>
                        <li>Developed sustainable design strategies for LEED certification</li>
                        <li>Managed client relationships and project presentations</li>
                      </ul>
                    </div>
                    <div>
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-xs md:text-sm font-light text-[#333333]">Gensler</h3>
                        <span className="text-xs md:text-sm text-[#888888]">24 months</span>
                      </div>
                      <p className="text-xs md:text-sm text-[#555555] italic">Project Architect</p>
                      <ul className="mt-1 md:mt-2 space-y-0.5 md:space-y-1 text-xs md:text-sm text-[#555555]">
                        <li>Designed and coordinated residential and commercial projects</li>
                        <li>Collaborated with engineers and contractors</li>
                        <li>Prepared construction documents and specifications</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Languages Section */}
                <div className="space-y-2 md:space-y-3">
                  <h2 className="text-lg md:text-xl font-light text-[#333333]">IDIOMAS</h2>
                  <div className="w-[60px] h-[2px] bg-[#333333] mb-4"></div>
                  <div className="space-y-1 md:space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs md:text-sm text-[#333333]">English</span>
                      <span className="text-xs md:text-sm text-[#555555]">Native</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs md:text-sm text-[#333333]">Spanish</span>
                      <span className="text-xs md:text-sm text-[#555555]">Fluent</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs md:text-sm text-[#333333]">French</span>
                      <span className="text-xs md:text-sm text-[#555555]">Intermediate</span>
                    </div>
                  </div>
                </div>

                {/* Software Skills Section - mostrar apenas em telas maiores */}
                <div className="space-y-2 md:space-y-3 hidden md:block">
                  <h2 className="text-lg md:text-xl font-light text-[#333333]">SOFTWARE</h2>
                  <div className="w-[60px] h-[2px] bg-[#333333] mb-4"></div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 md:gap-4">
                    {[
                      'AutoCAD', 'Revit', 'SketchUp', '3ds Max', 'V-Ray', 
                      'Photoshop', 'Illustrator', 'InDesign', 'Rhino', 'Lumion', 'ArchiCAD'
                    ].slice(0, isMobile ? 6 : 11).map((software) => (
                      <div key={software} className="flex flex-col items-center">
                        <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border border-[#dddddd] flex items-center justify-center">
                          <span className="text-[10px] md:text-xs text-[#888888]">{software.slice(0, 2)}</span>
                        </div>
                        <span className="text-[10px] md:text-xs text-[#888888] mt-1">{software}</span>
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

      <Navigation 
        currentPage={currentPage}
        totalPages={totalPages}
        onNavigate={handleNavigate}
        onNavigateToPage={handleNavigateToPage}
      />
    </div>
  );
}

export default App;