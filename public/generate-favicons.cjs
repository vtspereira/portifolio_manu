const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Verifica se o Sharp está instalado, caso contrário instala
console.log('Verificando dependências...');
exec('npm list sharp png-to-ico || npm install sharp png-to-ico', (error, stdout, stderr) => {
  if (error) {
    console.error(`Erro ao verificar/instalar dependências: ${error}`);
    return;
  }
  
  // Importa as bibliotecas necessárias
  const sharp = require('sharp');
  const pngToIco = require('png-to-ico');
  
  // Função principal para gerar os favicons
  async function generateFavicons() {
    try {
      console.log('Gerando ícones a partir do SVG base...');
      const svgBuffer = fs.readFileSync(path.join(__dirname, 'favicon-base.svg'));
      
      // Lista de tamanhos necessários
      const pngSizes = [
        { width: 16, height: 16, filename: 'favicon-16x16.png' },
        { width: 32, height: 32, filename: 'favicon-32x32.png' },
        { width: 48, height: 48, filename: 'favicon-48x48.png' },
        { width: 180, height: 180, filename: 'apple-touch-icon.png' },
        { width: 192, height: 192, filename: 'android-chrome-192x192.png' },
        { width: 512, height: 512, filename: 'android-chrome-512x512.png' },
        { width: 150, height: 150, filename: 'mstile-150x150.png' }
      ];
      
      // Gera cada tamanho de PNG
      for (const size of pngSizes) {
        await sharp(svgBuffer)
          .resize(size.width, size.height)
          .png()
          .toFile(path.join(__dirname, size.filename));
        
        console.log(`✅ Gerado: ${size.filename}`);
      }
      
      // Gera o favicon.ico usando png-to-ico (combinando 16x16, 32x32 e 48x48)
      try {
        const pngPaths = [
          path.join(__dirname, 'favicon-16x16.png'),
          path.join(__dirname, 'favicon-32x32.png'),
          path.join(__dirname, 'favicon-48x48.png')
        ];
        
        const icoBuffer = await pngToIco(pngPaths);
        fs.writeFileSync(path.join(__dirname, 'favicon.ico'), icoBuffer);
        console.log('✅ Gerado: favicon.ico');
        
        // Opcional: remover o arquivo temporário de 48x48
        fs.unlinkSync(path.join(__dirname, 'favicon-48x48.png'));
      } catch (icoError) {
        console.error('❌ Erro ao gerar favicon.ico:', icoError);
      }
      
      console.log('\n✨ Todos os ícones foram gerados com sucesso!');
      console.log('Os arquivos foram gerados na pasta public/ do seu projeto.');
      
    } catch (error) {
      console.error('❌ Erro ao gerar os ícones:', error);
    }
  }
  
  // Executa a função principal
  generateFavicons();
}); 