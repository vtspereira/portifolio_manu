import React from 'react';
import { Mail, Phone, Instagram, Linkedin, MapPin } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center px-4 py-8 md:py-12 bg-primary relative">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8 md:mb-10">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-light text-primary tracking-wider mb-3">Contato</h1>
          <div className="w-16 h-0.5 bg-accent mx-auto"></div>
        </div>
        
        <div className="space-y-6 md:space-y-8">
          {/* Para telas pequenas, mostramos em grade */}
          <div className="grid grid-cols-2 gap-4 md:hidden">
            <ContactItem 
              icon={<Instagram size={22} className="text-accent" />}
              label="@emanuelleandrade"
              href="https://www.instagram.com/emanuelleandrade"
              isExternal={true}
            />
            
            <ContactItem 
              icon={<Linkedin size={22} className="text-accent" />}
              label="LinkedIn"
              href="https://www.linkedin.com/in/emanuelleandrade"
              isExternal={true}
            />
            
            <ContactItem 
              icon={<Mail size={22} className="text-accent" />}
              label="Email"
              href="mailto:emanuelle.andrade@email.com"
              isExternal={false}
            />
            
            <ContactItem 
              icon={<Phone size={22} className="text-accent" />}
              label="(11) 99999-9999"
              href="tel:+5511999999999"
              isExternal={false}
            />
            
            <ContactItem 
              icon={<MapPin size={22} className="text-accent" />}
              label="São Paulo, SP"
              href="#"
              isExternal={false}
              noLink
            />
          </div>
          
          {/* Para telas médias e grandes, mostramos em lista vertical */}
          <div className="hidden md:block space-y-8">
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
      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <p className="text-xs text-secondary/70 font-light">© 2024 Emanuelle de Andrade</p>
      </div>
    </div>
  );
};

// Componente para itens de contato em telas pequenas
interface ContactItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isExternal: boolean;
  noLink?: boolean;
}

const ContactItem: React.FC<ContactItemProps> = ({ icon, label, href, isExternal, noLink = false }) => {
  const content = (
    <div className="flex flex-col items-center p-3">
      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-2 shadow-sm border border-[#E5E0DB]">
        {icon}
      </div>
      <span className="text-xs text-secondary font-light text-center truncate w-full">{label}</span>
    </div>
  );
  
  if (noLink) {
    return content;
  }
  
  return (
    <a 
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="block hover:bg-white/50 rounded-lg transition-colors duration-300"
    >
      {content}
    </a>
  );
}; 