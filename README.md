# Portfolio de Arquitetura - Emanuelle De Andrade

![Status do Projeto](https://img.shields.io/badge/status-ativo-success)
![Versão](https://img.shields.io/badge/versão-1.0.0-blue)
![Licença](https://img.shields.io/badge/licença-MIT-green)

<p align="center">
  <img src="public/assets/images/portfolio-preview.png" alt="Prévia do Portfolio" width="800">
</p>

## 📋 Visão Geral

Portfolio digital de arquitetura com navegação inovadora estilo "livro", desenvolvido para a arquiteta Emanuelle De Andrade. Este projeto apresenta uma experiência de usuário elegante e moderna, permitindo que os visitantes naveguem horizontalmente entre os projetos arquitetônicos como se estivessem folheando um livro de arquitetura físico.

O design minimalista, com foco em um fundo bege suave (#F8F5F0) e detalhes em rosa (#E0758A), proporciona uma experiência visual sofisticada que complementa perfeitamente os projetos arquitetônicos apresentados.

### ✨ Demonstração

<p align="center">
  <img src="public/assets/images/navigation-demo.gif" alt="Demonstração da Navegação" width="800">
</p>

## 🚀 Tecnologias Utilizadas

Este projeto foi desenvolvido com as seguintes tecnologias:

- **React** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset tipado de JavaScript
- **Framer Motion** - Biblioteca para animações fluidas
- **TailwindCSS** - Framework CSS para desenvolvimento rápido
- **Lucide React** - Ícones SVG modernos e personalizáveis
- **Vite** - Build tool e servidor de desenvolvimento

## 🌟 Características Principais

- **Navegação Estilo Livro** - Navegação horizontal intuitiva entre projetos
- **Design Responsivo** - Experiência otimizada para desktop, tablet e dispositivos móveis
- **Animações Sutis** - Transições suaves entre páginas com efeitos de fade
- **Paleta de Cores Elegante** - Esquema de cores cuidadosamente selecionado para complementar projetos de arquitetura
- **Visualização Detalhada de Projetos** - Páginas dedicadas para cada projeto com imagens, descrições e especificações técnicas
- **Acessibilidade** - Desenvolvido seguindo práticas de acessibilidade web
- **Performance Otimizada** - Carregamento rápido e otimizado para uma experiência fluida

## 🔧 Instalação

Para configurar o ambiente de desenvolvimento localmente, siga estas etapas:

```bash
# Clone o repositório
git clone https://github.com/username/portfolio-emanuelle-andradenez.git

# Acesse a pasta do projeto
cd portfolio-emanuelle-andradenez

# Instale as dependências
npm install
```

## 💻 Como Executar

Para executar o projeto em ambiente de desenvolvimento:

```bash
# Inicie o servidor de desenvolvimento
npm run dev

# O site estará disponível em:
# http://localhost:5173
```

Para construir para produção:

```bash
# Gera a build de produção
npm run build

# Para visualizar a build localmente
npm run preview
```

### 🎨 Gerando Favicons

O projeto inclui um script para gerar automaticamente todos os tamanhos de favicon necessários:

```bash
# Navegue até a pasta public
cd public

# Execute o script de geração de favicons
node generate-favicons.js

# Os arquivos serão gerados na pasta public
```

Este script criará todos os tamanhos de favicon necessários a partir do arquivo SVG base, incluindo:
- favicon.ico
- favicon-16x16.png
- favicon-32x32.png
- apple-touch-icon.png
- android-chrome-192x192.png
- android-chrome-512x512.png
- mstile-150x150.png

Após a geração, os favicons já estarão configurados corretamente para todos os dispositivos e navegadores.

## 📁 Estrutura de Arquivos

```
portfolio/
├── public/
│   ├── assets/
│   │   ├── fonts/
│   │   ├── icons/
│   │   └── images/
│   │       ├── projects/
│   │       ├── testimonials/
│   │       └── about/
│   ├── favicon.ico
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── apple-touch-icon.png
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── safari-pinned-tab.svg
│   ├── mstile-150x150.png
│   ├── site.webmanifest
│   ├── browserconfig.xml
│   ├── favicon-base.svg
│   ├── generate-favicons.js
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── home/
│   │   ├── projects/
│   │   ├── about/
│   │   └── contact/
│   ├── hooks/
│   ├── pages/
│   ├── styles/
│   ├── types/
│   ├── utils/
│   └── data/
├── config/
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── README.md
└── vite.config.js
```

## 🚢 Deployment

O projeto está configurado para ser facilmente implantado em diversas plataformas:

### Vercel/Netlify (Recomendado)

1. Conecte seu repositório GitHub à Vercel ou Netlify
2. Configure as variáveis de ambiente necessárias
3. A plataforma detectará automaticamente o projeto React e configurará a build

### Hospedagem Tradicional

1. Execute `npm run build` para gerar os arquivos estáticos
2. Faça upload do conteúdo da pasta `dist` para seu servidor web

## 👥 Contribuições

Contribuições são bem-vindas! Se você deseja contribuir para este projeto:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

Emanuelle De Andrade - [emanuelle.andradenez@email.com](mailto:emanuelle.andradenez@email.com)

Site - [www.emanuelleandradenez.com](https://www.emanuelleandradenez.com)

---

<p align="center">
  Desenvolvido com 💗 por <a href="https://github.com/username">Seu Nome</a>
</p> 