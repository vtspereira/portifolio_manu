import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

// Obter o diretório atual no contexto do módulo ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Verifica se o Sharp está instalado, caso contrário instala
console.log('Verificando dependências...');
exec('npm list sharp || npm install sharp', async (error, stdout, stderr) => {
  if (error) {
    console.error(`Erro ao verificar/instalar Sharp: ${error}`);
    return;
  }
  
  try {
    // Importa o Sharp dinamicamente após garantir que está instalado
    const sharpModule = await import('sharp');
    const sharp = sharpModule.default;
    
    // Função principal para gerar os favicons
    async function generateFavicons() {
      try {
        console.log('Gerando ícones a partir do SVG base...');
        const svgBuffer = fs.readFileSync(path.join(__dirname, 'favicon-base.svg'));
        
        // Lista de tamanhos necessários
        const pngSizes = [
          { width: 16, height: 16, filename: 'favicon-16x16.png' },
          { width: 32, height: 32, filename: 'favicon-32x32.png' },
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
        
        // Gera o favicon.ico (combina 16x16, 32x32 e 48x48)
        await sharp(svgBuffer)
          .resize(48, 48)
          .toFormat('ico')
          .toFile(path.join(__dirname, 'favicon.ico'));
        
        console.log('✅ Gerado: favicon.ico');
        
        console.log('\n✨ Todos os ícones foram gerados com sucesso!');
        console.log('Os arquivos foram gerados na pasta public/ do seu projeto.');
        
      } catch (error) {
        console.error('❌ Erro ao gerar os ícones:', error);
      }
    }
    
    // Executa a função principal
    generateFavicons();
  } catch (error) {
    console.error('❌ Erro ao importar o módulo Sharp:', error);
  }
}); 