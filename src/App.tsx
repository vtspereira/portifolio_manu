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

  // Toggle da classe no body para controlar o scroll quando estiver em visualização de projeto completo
  useEffect(() => {
    if (viewingFullProject !== null) {
      document.body.classList.add('viewing-project-detail');
    } else {
      document.body.classList.remove('viewing-project-detail');
    }
    
    // Cleanup ao desmontar o componente
    return () => {
      document.body.classList.remove('viewing-project-detail');
    };
  }, [viewingFullProject]);

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
    // Encontrar o projeto pelo ID
    setViewingFullProject(projectId);
  };

  const handleBackFromFullProject = () => {
    setViewingFullProject(null);
  };

  // Obtém o ID do projeto atual (se estiver visualizando um projeto)
  const getCurrentProjectId = () => {
    if (currentPage >= 3) {
      return projects[currentPage - 3].id;
    }
    return undefined;
  };

  // Se estiver visualizando um projeto completo, mostrar apenas esse componente
  if (viewingFullProject !== null) {
    const projectToShow = projects.find(p => p.id === viewingFullProject);
    if (projectToShow) {
      return <FullProjectView project={projectToShow} onBack={handleBackFromFullProject} />;
    }
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        {currentPage === 0 && (
          <Page key="cover" className="bg-[#f8f8f8]">
            <div className="h-full flex flex-col items-center justify-center text-center">
              <Compass className="w-12 h-12 md:w-16 md:h-16 mb-6 md:mb-8" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-3 md:mb-4">SOFIA MARTINEZ</h1>
              <p className="text-base md:text-lg lg:text-xl text-gray-600">ARCHITECTURAL PORTFOLIO</p>
            </div>
          </Page>
        )}

        {currentPage === 1 && (
          <Page key="bio">
            <div className="h-full grid grid-cols-12 gap-4 md:gap-6 lg:gap-8 overflow-hidden">
              {/* Left Column */}
              <div className="col-span-12 md:col-span-5 space-y-4 md:space-y-6 lg:space-y-8">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-light">sofia martinez</h1>
                
                {/* Contact Info */}
                <div className="space-y-1 md:space-y-2 text-xs md:text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="flex-shrink-0" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="flex-shrink-0" />
                    <span>sofia.martinez@email.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe size={14} className="flex-shrink-0" />
                    <span>www.sofiamartinez.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="flex-shrink-0" />
                    <span>(555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="flex-shrink-0" />
                    <span>Born 1992</span>
                  </div>
                </div>

                {/* About Me Section */}
                <div className="space-y-2 md:space-y-3">
                  <h2 className="text-lg md:text-xl font-medium text-[#9C6868]">ABOUT ME</h2>
                  <p className="text-xs md:text-sm leading-relaxed text-gray-700 line-clamp-3 md:line-clamp-4">
                    With over a decade of experience in architectural design, I specialize in creating 
                    spaces that harmoniously blend functionality with aesthetic beauty. My approach 
                    combines sustainable practices with innovative design solutions, ensuring each 
                    project tells its own unique story while respecting its environmental context.
                  </p>
                </div>

                {/* Education Section */}
                <div className="space-y-2 md:space-y-3">
                  <h2 className="text-lg md:text-xl font-medium text-[#9C6868]">EDUCATION</h2>
                  <div className="space-y-2 md:space-y-3">
                    <div>
                      <p className="text-xs md:text-sm text-gray-500">2014 - 2018</p>
                      <p className="text-xs md:text-sm">University of California, Berkeley</p>
                      <p className="text-xs md:text-sm text-gray-600">Master of Architecture</p>
                    </div>
                    <div>
                      <p className="text-xs md:text-sm text-gray-500">2010 - 2014</p>
                      <p className="text-xs md:text-sm">Stanford University</p>
                      <p className="text-xs md:text-sm text-gray-600">Bachelor of Arts in Architecture</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="col-span-12 md:col-span-7 space-y-4 md:space-y-6 lg:space-y-8 overflow-hidden">
                {/* Experience Section */}
                <div className="space-y-2 md:space-y-3">
                  <h2 className="text-lg md:text-xl font-medium text-[#9C6868]">EXPERIENCE</h2>
                  <div className="space-y-3 md:space-y-4">
                    <div>
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-xs md:text-sm font-medium">Foster + Partners</h3>
                        <span className="text-xs md:text-sm text-gray-500">36 months</span>
                      </div>
                      <p className="text-xs md:text-sm text-gray-600 italic">Senior Architect / Project Lead</p>
                      <ul className="mt-1 md:mt-2 space-y-0.5 md:space-y-1 text-xs md:text-sm text-gray-700">
                        <li>Led design teams for major commercial projects in Asia and Europe</li>
                        <li>Developed sustainable design strategies for LEED certification</li>
                        <li>Managed client relationships and project presentations</li>
                      </ul>
                    </div>
                    <div>
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-xs md:text-sm font-medium">Gensler</h3>
                        <span className="text-xs md:text-sm text-gray-500">24 months</span>
                      </div>
                      <p className="text-xs md:text-sm text-gray-600 italic">Project Architect</p>
                      <ul className="mt-1 md:mt-2 space-y-0.5 md:space-y-1 text-xs md:text-sm text-gray-700">
                        <li>Designed and coordinated residential and commercial projects</li>
                        <li>Collaborated with engineers and contractors</li>
                        <li>Prepared construction documents and specifications</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Languages Section */}
                <div className="space-y-2 md:space-y-3">
                  <h2 className="text-lg md:text-xl font-medium text-[#9C6868]">LANGUAGES</h2>
                  <div className="space-y-1 md:space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs md:text-sm">English</span>
                      <span className="text-xs md:text-sm text-gray-600">Native</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs md:text-sm">Spanish</span>
                      <span className="text-xs md:text-sm text-gray-600">Fluent</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs md:text-sm">French</span>
                      <span className="text-xs md:text-sm text-gray-600">Intermediate</span>
                    </div>
                  </div>
                </div>

                {/* Software Skills Section - mostrar apenas em telas maiores */}
                <div className="space-y-2 md:space-y-3 hidden md:block">
                  <h2 className="text-lg md:text-xl font-medium text-[#9C6868]">SOFTWARE PROFICIENCY</h2>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 md:gap-4">
                    {[
                      'AutoCAD', 'Revit', 'SketchUp', '3ds Max', 'V-Ray', 
                      'Photoshop', 'Illustrator', 'InDesign', 'Rhino', 'Lumion', 'ArchiCAD'
                    ].slice(0, isMobile ? 6 : 11).map((software) => (
                      <div key={software} className="flex flex-col items-center">
                        <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-gray-100 flex items-center justify-center">
                          <span className="text-[10px] md:text-xs text-gray-600">{software.slice(0, 2)}</span>
                        </div>
                        <span className="text-[10px] md:text-xs text-gray-600 mt-1">{software}</span>
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
            currentPage={0} 
            onNavigateToPage={handleNavigateToPage}
            totalPages={9}
          />
        )}

        {currentPage >= 3 && (
          <ProjectPage 
            key={`project-${currentPage}`} 
            project={projects[currentPage - 3]} 
          />
        )}
      </AnimatePresence>

      <Navigation 
        currentPage={currentPage}
        totalPages={totalPages}
        onNavigate={handleNavigate}
        onViewFullProject={handleViewFullProject}
        currentProjectId={getCurrentProjectId()}
        onNavigateToPage={handleNavigateToPage}
      />
    </div>
  );
}

export default App;