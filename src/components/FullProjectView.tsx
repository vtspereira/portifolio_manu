import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, Ruler, Tag, Activity, ExternalLink } from 'lucide-react';
import type { Project } from '../types';
import { ImageModal } from './ImageModal';

// Componente do botão com estilos garantidos
const VerProjetoBtn = ({ onClick, className = "" }) => (
  <button
    onClick={onClick}
    aria-label="Ver projeto completo"
    style={{
      width: "100%",
      backgroundColor: "#E0758A",
      color: "white",
      border: "1px solid #E0758A",
      borderRadius: "9999px",
      padding: "0.75rem 1.5rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "0.875rem",
      fontWeight: "300",
      cursor: "pointer",
      transition: "all 0.3s ease",
      position: "relative",
      zIndex: "5",
      overflow: "hidden"
    }}
    className={className}
  >
    <span>Ver projeto completo</span>
    <ExternalLink style={{ width: "0.875rem", height: "0.875rem", marginLeft: "0.5rem" }} />
  </button>
);

interface FullProjectViewProps {
  project: Project;
  onBack: () => void;
}

export const FullProjectView: React.FC<FullProjectViewProps> = ({ project, onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const handleNextImage = () => {
    setSelectedImageIndex(prev => 
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };
  
  const handlePrevImage = () => {
    setSelectedImageIndex(prev => 
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    // Forçar scroll para o topo quando o componente é montado
    window.scrollTo(0, 0);
    
    // Ajustar o body e html diretamente com estilos forçados
    document.body.style.overflow = "auto";
    document.body.style.position = "static";
    document.body.style.height = "auto";
    document.body.style.minHeight = "100vh";
    document.body.style.display = "block";
    document.body.style.visibility = "visible";
    document.body.style.backgroundColor = "#F8F5F0";
    
    document.documentElement.style.overflow = "auto";
    document.documentElement.style.height = "auto";
    document.documentElement.style.position = "relative";
    document.documentElement.style.backgroundColor = "#F8F5F0";
    
    // Remover classes que possam estar causando conflitos
    document.body.classList.remove('book-layout');
    document.body.classList.add('viewing-project-detail');
    
    return () => {
      // Restaurar valores originais ao desmontar
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.height = "";
      document.body.style.minHeight = "";
      document.body.style.display = "";
      document.body.style.visibility = "";
      
      document.documentElement.style.overflow = "";
      document.documentElement.style.height = "";
      document.documentElement.style.position = "";
      
      document.body.classList.remove('viewing-project-detail');
      document.body.classList.add('book-layout');
    };
  }, []);

  if (!project) {
    return <div>Carregando projeto...</div>;
  }

  return (
    <div 
      style={{
        backgroundColor: "#F8F5F0",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        minHeight: "100vh",
        overflowY: "auto",
        overflowX: "hidden",
        zIndex: 9999,
        visibility: "visible",
        display: "block"
      }}
      className="fade-in"
    >
      <header style={{
        position: "sticky",
        top: 0,
        backgroundColor: "rgba(248, 245, 240, 0.95)",
        backdropFilter: "blur(8px)",
        zIndex: 50,
        borderBottom: "1px solid #E0758A",
        padding: "1.5rem 0"
      }}>
        <div style={{
          maxWidth: "72rem",
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <button 
            onClick={onBack}
            className="btn-back"
          >
            <ArrowLeft size={18} />
            <span>Voltar</span>
          </button>
          <h1 style={{
            fontSize: "1.25rem",
            fontWeight: 300,
            color: "#333333",
            letterSpacing: "0.5px"
          }}>{project.title}</h1>
        </div>
      </header>

      <main style={{
        maxWidth: "72rem",
        margin: "0 auto",
        padding: "4rem 1.5rem"
      }}>
        {/* Hero Section */}
        <section style={{ marginBottom: "6rem" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "4rem",
            alignItems: "start"
          }}>
            <div>
              <h2 style={{
                fontSize: "1.875rem",
                fontWeight: 300,
                marginBottom: "1rem",
                color: "#333333"
              }}>
                {project.title}
              </h2>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "1.5rem"
              }}>
                <MapPin size={16} style={{ color: "#E0758A" }} />
                <span style={{ color: "#666666", fontWeight: 300 }}>{project.location}</span>
                <span style={{ margin: "0 0.5rem", color: "#E0758A" }}>•</span>
                <Calendar size={16} style={{ color: "#E0758A" }} />
                <span style={{ color: "#666666", fontWeight: 300 }}>{project.year}</span>
              </div>
              <div className="section-divider"></div>
              <p style={{
                color: "#555555",
                lineHeight: 1.7,
                marginBottom: "3rem",
                fontWeight: 300
              }}>
                {project.description}
              </p>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                gap: "1.5rem"
              }}>
                {project.projectType && (
                  <div style={{ borderBottom: "1px solid #E0758A", paddingBottom: "1rem" }}>
                    <Tag size={16} style={{ color: "#E0758A", marginBottom: "0.5rem" }} />
                    <p style={{ color: "#666666", fontWeight: 300, fontSize: "0.75rem" }}>Tipo de Projeto</p>
                    <p style={{ color: "#333333", fontSize: "0.875rem" }}>{project.projectType}</p>
                  </div>
                )}
                {project.area && (
                  <div style={{ borderBottom: "1px solid #E0758A", paddingBottom: "1rem" }}>
                    <Ruler size={16} style={{ color: "#E0758A", marginBottom: "0.5rem" }} />
                    <p style={{ color: "#666666", fontWeight: 300, fontSize: "0.75rem" }}>Área</p>
                    <p style={{ color: "#333333", fontSize: "0.875rem" }}>{project.area}</p>
                  </div>
                )}
                {project.status && (
                  <div style={{ borderBottom: "1px solid #E0758A", paddingBottom: "1rem" }}>
                    <Activity size={16} style={{ color: "#E0758A", marginBottom: "0.5rem" }} />
                    <p style={{ color: "#666666", fontWeight: 300, fontSize: "0.75rem" }}>Status</p>
                    <p style={{ color: "#333333", fontSize: "0.875rem" }}>{project.status}</p>
                  </div>
                )}
                {project.sustainability && (
                  <div style={{ borderBottom: "1px solid #E0758A", paddingBottom: "1rem" }}>
                    <Ruler size={16} style={{ color: "#E0758A", marginBottom: "0.5rem" }} />
                    <p style={{ color: "#666666", fontWeight: 300, fontSize: "0.75rem" }}>Sustentabilidade</p>
                    <p style={{ color: "#333333", fontSize: "0.875rem" }}>{project.sustainability}</p>
                  </div>
                )}
              </div>
            </div>
            <div style={{ 
              overflow: "hidden",
              position: "relative" 
            }}>
              <img 
                src={project.images[0]} 
                alt={project.title}
                style={{ 
                  width: "100%", 
                  height: "auto", 
                  objectFit: "cover",
                  cursor: "pointer"
                }}
                onClick={() => openModal(0)}
              />
              <div style={{
                position: "absolute",
                bottom: "0.75rem",
                right: "0.75rem",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                padding: "0.5rem 0.75rem",
                borderRadius: "0.375rem",
                fontSize: "0.75rem",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                pointerEvents: "none",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)"
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E0758A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"></path>
                </svg>
                <span>Ampliar imagem</span>
              </div>
            </div>
          </div>
        </section>

        {/* Concept Section */}
        {project.designProcess && (
          <section style={{ marginBottom: "6rem" }}>
            <h3 className="project-detail-title">Processo de Design</h3>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "4rem",
              alignItems: "start"
            }}>
              <div>
                <p style={{ color: "#555555", lineHeight: 1.7, fontWeight: 300 }}>
                  {project.designProcess}
                </p>
                <p style={{ color: "#555555", lineHeight: 1.7, marginTop: "1.5rem", fontWeight: 300 }}>
                  A abordagem do projeto inclui análise cuidadosa do contexto, estudos de insolação e ventilação, e a busca por criar espaços que proporcionem experiências memoráveis.
                </p>
                <p style={{ color: "#555555", lineHeight: 1.7, marginTop: "1.5rem", fontWeight: 300 }}>
                  O conceito arquitetônico valoriza a relação entre os espaços internos e externos, criando uma sequência de ambientes que dialogam com o entorno e proporcionam diferentes percepções para os usuários.
                </p>
              </div>
              {project.technicalDiagram && (
                <div>
                  <div style={{ 
                    overflow: "hidden",
                    position: "relative"
                  }}>
                    <img 
                      src={project.technicalDiagram} 
                      alt={`${project.title} - Diagrama técnico`}
                      style={{ 
                        width: "100%", 
                        height: "auto", 
                        objectFit: "cover",
                        cursor: "pointer"
                      }}
                      onClick={() => {
                        // Adiciona o diagrama técnico como última imagem
                        openModal(project.images.length);
                      }}
                    />
                    <div style={{
                      position: "absolute",
                      bottom: "0.75rem",
                      right: "0.75rem",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      padding: "0.5rem 0.75rem",
                      borderRadius: "0.375rem",
                      fontSize: "0.75rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      pointerEvents: "none",
                      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)"
                    }}>
                       <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E0758A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"></path>
                      </svg>
                      <span>Ampliar imagem</span>
                    </div>
                  </div>
                  <p style={{ color: "#666666", marginTop: "0.75rem", fontSize: "0.875rem", fontWeight: 300 }}>Diagrama conceitual do projeto</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Gallery Section */}
        <section style={{ marginBottom: "6rem" }}>
          <h3 className="project-detail-title">Galeria de Imagens</h3>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2.5rem"
          }}>
            {project.images.map((image, index) => (
              <div key={index} style={{ 
                overflow: "hidden",
                position: "relative"
              }}>
                <img 
                  src={image} 
                  alt={`${project.title} - Imagem ${index + 1}`}
                  style={{ 
                    width: "100%", 
                    height: "auto", 
                    objectFit: "cover",
                    cursor: "pointer",
                    transition: "transform 0.3s ease"
                  }}
                  onClick={() => openModal(index)}
                  onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                  onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                />
                <div style={{
                  position: "absolute",
                  bottom: "0.75rem",
                  right: "0.75rem",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "0.375rem",
                  fontSize: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  pointerEvents: "none",
                  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)"
                }}>
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E0758A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"></path>
                </svg>
                  <span>Ampliar imagem</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Additional Details Section */}
        <section style={{ marginBottom: "6rem" }}>
          <h3 className="project-detail-title">Detalhes do Projeto</h3>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "2.5rem"
          }}>
            <div className="project-detail-section">
              <h4 style={{ fontWeight: 300, fontSize: "1.25rem", marginBottom: "1.5rem", color: "#333333" }}>Materiais</h4>
              <ul className="custom-list">
                <li>
                  <span style={{ fontWeight: 300, color: "#555555" }}>Concreto aparente</span>
                </li>
                <li>
                  <span style={{ fontWeight: 300, color: "#555555" }}>Madeira certificada</span>
                </li>
                <li>
                  <span style={{ fontWeight: 300, color: "#555555" }}>Vidro temperado</span>
                </li>
                <li>
                  <span style={{ fontWeight: 300, color: "#555555" }}>Aço corten</span>
                </li>
                <li>
                  <span style={{ fontWeight: 300, color: "#555555" }}>Pedra natural local</span>
                </li>
              </ul>
            </div>
            <div className="project-detail-section">
              <h4 style={{ fontWeight: 300, fontSize: "1.25rem", marginBottom: "1.5rem", color: "#333333" }}>Métodos Construtivos</h4>
              <ul className="custom-list">
                <li>
                  <span style={{ fontWeight: 300, color: "#555555" }}>Estrutura em concreto armado</span>
                </li>
                <li>
                  <span style={{ fontWeight: 300, color: "#555555" }}>Técnicas de baixo impacto ambiental</span>
                </li>
                <li>
                  <span style={{ fontWeight: 300, color: "#555555" }}>Painéis pré-fabricados</span>
                </li>
                <li>
                  <span style={{ fontWeight: 300, color: "#555555" }}>Montagem modular</span>
                </li>
              </ul>
            </div>
            <div className="project-detail-section">
              <h4 style={{ fontWeight: 300, fontSize: "1.25rem", marginBottom: "1.5rem", color: "#333333" }}>Soluções Sustentáveis</h4>
              <ul className="custom-list">
                <li>
                  <span style={{ fontWeight: 300, color: "#555555" }}>Captação de água pluvial</span>
                </li>
                <li>
                  <span style={{ fontWeight: 300, color: "#555555" }}>Painéis solares fotovoltaicos</span>
                </li>
                <li>
                  <span style={{ fontWeight: 300, color: "#555555" }}>Ventilação natural cruzada</span>
                </li>
                <li>
                  <span style={{ fontWeight: 300, color: "#555555" }}>Telhado verde</span>
                </li>
                <li>
                  <span style={{ fontWeight: 300, color: "#555555" }}>Gestão de resíduos</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      
      <footer style={{
        padding: "2rem 0",
        marginTop: "3rem",
        borderTop: "1px solid #E0758A",
        textAlign: "center",
        backgroundColor: "#F8F5F0"
      }}>
        <div style={{
          maxWidth: "72rem",
          margin: "0 auto",
          padding: "0 1.5rem",
        }}>
          <p style={{ color: "#666666" }}>© 2025 Emanuelle de Andrade Arquitetura</p>
          <button 
            onClick={onBack}
            className="btn-back mt-4 mx-auto"
            style={{
              display: "inline-flex",
              marginTop: "1.5rem"
            }}
          >
            <ArrowLeft size={18} />
            <span>Voltar para a galeria de projetos</span>
          </button>
        </div>
      </footer>
      
      {/* Modal para visualização ampliada das imagens */}
      <ImageModal
        imageSrc={selectedImageIndex === project.images.length && project.technicalDiagram 
          ? project.technicalDiagram 
          : project.images[selectedImageIndex]}
        alt={selectedImageIndex === project.images.length && project.technicalDiagram
          ? `${project.title} - Diagrama técnico`
          : `${project.title} - Imagem ${selectedImageIndex + 1}`}
        isOpen={isModalOpen}
        onClose={closeModal}
        onNext={handleNextImage}
        onPrev={handlePrevImage}
        hasNavigation={project.images.length > 1}
      />
    </div>
  );
}; 