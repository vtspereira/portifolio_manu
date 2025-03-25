import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, Ruler, Tag, Activity } from 'lucide-react';
import type { Project } from '../types';

interface FullProjectViewProps {
  project: Project;
  onBack: () => void;
}

export const FullProjectView: React.FC<FullProjectViewProps> = ({ project, onBack }) => {
  // Scroll para o topo quando o componente é montado
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen project-detail-view">
      <header className="sticky top-0 bg-white bg-opacity-90 backdrop-blur-sm z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <button 
            onClick={onBack}
            className="group flex items-center text-gray-700 hover:text-[#5a8bb0] transition-colors gap-2"
          >
            <ArrowLeft size={18} className="transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="font-light">Voltar aos projetos</span>
          </button>
          <h1 className="text-2xl font-light text-[#2c3e50]">{project.title}</h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h2 
                className="text-4xl font-light mb-4 text-[#2c3e50]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {project.title}
              </motion.h2>
              <motion.div 
                className="flex items-center gap-2 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <MapPin size={16} className="text-[#5a8bb0]" />
                <span className="text-gray-500 font-light">{project.location}</span>
                <span className="mx-2 text-gray-300">•</span>
                <Calendar size={16} className="text-[#5a8bb0]" />
                <span className="text-gray-500 font-light">{project.year}</span>
              </motion.div>
              <motion.p 
                className="text-gray-700 leading-relaxed mb-8 font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {project.description}
              </motion.p>
              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {project.projectType && (
                  <div className="bg-gray-50 p-4 rounded shadow-sm transition-all duration-300 hover:shadow hover:bg-gray-100">
                    <Tag size={16} className="text-[#5a8bb0] mb-2" />
                    <p className="text-xs text-gray-500 font-light">Tipo de Projeto</p>
                    <p className="text-sm text-gray-700">{project.projectType}</p>
                  </div>
                )}
                {project.area && (
                  <div className="bg-gray-50 p-4 rounded shadow-sm transition-all duration-300 hover:shadow hover:bg-gray-100">
                    <Ruler size={16} className="text-[#5a8bb0] mb-2" />
                    <p className="text-xs text-gray-500 font-light">Área Construída</p>
                    <p className="text-sm text-gray-700">{project.area}</p>
                  </div>
                )}
                {project.status && (
                  <div className="bg-gray-50 p-4 rounded shadow-sm transition-all duration-300 hover:shadow hover:bg-gray-100">
                    <Activity size={16} className="text-[#5a8bb0] mb-2" />
                    <p className="text-xs text-gray-500 font-light">Status</p>
                    <p className="text-sm text-gray-700">{project.status}</p>
                  </div>
                )}
                {project.sustainability && (
                  <div className="bg-gray-50 p-4 rounded shadow-sm transition-all duration-300 hover:shadow hover:bg-gray-100">
                    <Ruler size={16} className="text-[#5a8bb0] mb-2" />
                    <p className="text-xs text-gray-500 font-light">Sustentabilidade</p>
                    <p className="text-sm text-gray-700">{project.sustainability}</p>
                  </div>
                )}
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="group overflow-hidden rounded shadow-lg"
            >
              <img 
                src={project.images[0]} 
                alt={project.title}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" 
              />
            </motion.div>
          </div>
        </section>

        {/* Concept Section */}
        {project.designProcess && (
          <section className="mb-20">
            <h3 className="text-2xl font-light mb-8 text-[#5a8bb0]">Processo de Design</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-gray-700 leading-relaxed font-light">
                  {project.designProcess}
                </p>
                <p className="text-gray-700 leading-relaxed mt-6 font-light">
                  A abordagem do projeto inclui análise cuidadosa do contexto, estudos de insolação e ventilação, e a busca por criar espaços que proporcionem experiências memoráveis.
                </p>
                <p className="text-gray-700 leading-relaxed mt-6 font-light">
                  O conceito arquitetônico valoriza a relação entre os espaços internos e externos, criando uma sequência de ambientes que dialogam com o entorno e proporcionam diferentes percepções para os usuários.
                </p>
              </div>
              {project.technicalDiagram && (
                <div>
                  <div className="group overflow-hidden rounded shadow-lg">
                    <img 
                      src={project.technicalDiagram} 
                      alt={`${project.title} - Diagrama técnico`}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-3 font-light">Diagrama conceitual do projeto</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Gallery Section */}
        <section className="mb-20">
          <h3 className="text-2xl font-light mb-8 text-[#5a8bb0]">Galeria de Imagens</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.images.map((image, index) => (
              <motion.div
                key={index}
                className="group overflow-hidden rounded shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <img 
                  src={image} 
                  alt={`${project.title} - Imagem ${index + 1}`}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Additional Details Section */}
        <section className="mb-20">
          <h3 className="text-2xl font-light mb-8 text-[#5a8bb0]">Detalhes do Projeto</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded shadow-sm transition-all duration-300 hover:shadow hover:bg-gray-100">
              <h4 className="font-medium mb-4 text-[#2c3e50]">Materiais</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-[#5a8bb0]">•</span>
                  <span className="font-light text-gray-700">Concreto aparente</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#5a8bb0]">•</span>
                  <span className="font-light text-gray-700">Madeira certificada</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#5a8bb0]">•</span>
                  <span className="font-light text-gray-700">Vidro temperado</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#5a8bb0]">•</span>
                  <span className="font-light text-gray-700">Aço corten</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#5a8bb0]">•</span>
                  <span className="font-light text-gray-700">Pedra natural local</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded shadow-sm transition-all duration-300 hover:shadow hover:bg-gray-100">
              <h4 className="font-medium mb-4 text-[#2c3e50]">Métodos Construtivos</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-[#5a8bb0]">•</span>
                  <span className="font-light text-gray-700">Estrutura em concreto armado</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#5a8bb0]">•</span>
                  <span className="font-light text-gray-700">Técnicas de baixo impacto ambiental</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#5a8bb0]">•</span>
                  <span className="font-light text-gray-700">Painéis pré-fabricados</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#5a8bb0]">•</span>
                  <span className="font-light text-gray-700">Montagem modular</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded shadow-sm transition-all duration-300 hover:shadow hover:bg-gray-100">
              <h4 className="font-medium mb-4 text-[#2c3e50]">Soluções Sustentáveis</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-[#5a8bb0]">•</span>
                  <span className="font-light text-gray-700">Captação de água pluvial</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#5a8bb0]">•</span>
                  <span className="font-light text-gray-700">Painéis solares fotovoltaicos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#5a8bb0]">•</span>
                  <span className="font-light text-gray-700">Ventilação natural cruzada</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#5a8bb0]">•</span>
                  <span className="font-light text-gray-700">Telhado verde</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#5a8bb0]">•</span>
                  <span className="font-light text-gray-700">Gestão de resíduos</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-50 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-600">© 2023 Sofia Martinez Arquitetura. Todos os direitos reservados.</p>
          <button 
            onClick={onBack}
            className="mt-4 text-sm text-[#9C6868] hover:text-[#7A4F4F] transition-colors"
          >
            Voltar para a galeria de projetos
          </button>
        </div>
      </footer>
    </div>
  );
}; 