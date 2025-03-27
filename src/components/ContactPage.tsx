import React from 'react';
import { Mail, Phone, Instagram, Linkedin, MapPin } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center px-4 py-8 md:py-12 bg-primary relative">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-light text-primary tracking-wider mb-3">Contato</h1>
          <div className="w-16 h-0.5 bg-accent mx-auto"></div>
        </div>
        
        <div className="space-y-8">
          <div className="flex flex-col items-center">
            <a 
              href="https://www.instagram.com/emanuelleandrade" 
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-3 shadow-sm group-hover:shadow-md transition-all duration-300 border border-[#E5E0DB]">
                <Instagram size={24} className="text-accent" />
              </div>
              <span className="text-sm text-secondary font-light">@emanuelleandrade</span>
            </a>
          </div>
          
          <div className="flex flex-col items-center">
            <a 
              href="https://www.linkedin.com/in/emanuelleandrade" 
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-3 shadow-sm group-hover:shadow-md transition-all duration-300 border border-[#E5E0DB]">
                <Linkedin size={24} className="text-accent" />
              </div>
              <span className="text-sm text-secondary font-light">linkedin.com/in/emanuelleandrade</span>
            </a>
          </div>
          
          <div className="flex flex-col items-center">
            <a 
              href="mailto:emanuelle.andrade@email.com" 
              className="group flex flex-col items-center transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-3 shadow-sm group-hover:shadow-md transition-all duration-300 border border-[#E5E0DB]">
                <Mail size={24} className="text-accent" />
              </div>
              <span className="text-sm text-secondary font-light">emanuelle.andrade@email.com</span>
            </a>
          </div>
          
          <div className="flex flex-col items-center">
            <a 
              href="tel:+5511999999999" 
              className="group flex flex-col items-center transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-3 shadow-sm group-hover:shadow-md transition-all duration-300 border border-[#E5E0DB]">
                <Phone size={24} className="text-accent" />
              </div>
              <span className="text-sm text-secondary font-light">(11) 99999-9999</span>
            </a>
          </div>

          <div className="flex flex-col items-center">
            <div className="group flex flex-col items-center transition-all">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-3 shadow-sm border border-[#E5E0DB]">
                <MapPin size={24} className="text-accent" />
              </div>
              <span className="text-sm text-secondary font-light">São Paulo, SP - Brasil</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 