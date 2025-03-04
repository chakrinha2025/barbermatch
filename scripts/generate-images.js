/**
 * Script para gerar imagens de cortes de cabelo usando IA
 * 
 * Este é um script de exemplo que mostra como você pode obter imagens
 * geradas por IA para os cortes de cabelo do BarberMatch.
 * 
 * Instruções:
 * 1. Você pode adaptar este script para usar qualquer API de geração de imagens
 *    como Leonardo.ai, OpenAI DALL-E, Midjourney API, Stable Diffusion, etc.
 * 2. Substitua 'YOUR_API_KEY' pela sua chave de API real
 * 3. Execute o script com 'node scripts/generate-images.js'
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuração da API (exemplo usando OpenAI, mas você pode substituir por qualquer API)
const API_KEY = 'YOUR_API_KEY'; 

// Lista de imagens necessárias e seus prompts
const imageRequests = [
  {
    name: 'real-haircut-1.jpg',
    prompt: 'Fotografia profissional moderna de um homem com corte de cabelo degradê moderno, vista frontal, fundo neutro, iluminação de estúdio'
  },
  {
    name: 'real-haircut-2.jpg',
    prompt: 'Fotografia profissional de um homem com corte de cabelo clássico elegante, vista frontal, fundo neutro, alta qualidade'
  },
  {
    name: 'real-haircut-3.jpg',
    prompt: 'Fotografia profissional de um homem com undercut lateral, vista de perfil, fundo neutro, iluminação de estúdio'
  },
  {
    name: 'real-haircut-4.jpg',
    prompt: 'Fotografia profissional de um homem com crew cut, vista frontal, fundo neutro, alta qualidade, estúdio'
  },
  {
    name: 'avatar-1.jpg',
    prompt: 'Avatar profissional de um homem com barba e cabelo estilizado, vista frontal, estilo minimalista, círculo'
  },
  {
    name: 'avatar-2.jpg',
    prompt: 'Avatar profissional de um homem jovem com corte moderno, vista frontal, estilo minimalista, círculo'
  },
  {
    name: 'avatar-3.jpg',
    prompt: 'Avatar profissional de um homem adulto com barba, vista frontal, estilo minimalista, círculo'
  },
  {
    name: 'avatar-4.jpg',
    prompt: 'Avatar profissional de um homem com corte de cabelo elegante, vista frontal, estilo minimalista, círculo'
  },
  {
    name: 'hairstyle-3d-1.jpg',
    prompt: 'Fotografia de alta qualidade de um homem com corte de cabelo moderno, vista frontal, fundo neutro, iluminação profissional'
  },
  {
    name: 'hairstyle-3d-2.jpg',
    prompt: 'Fotografia de alta qualidade de um homem com corte de cabelo moderno, vista lateral, fundo neutro, iluminação profissional'
  },
  {
    name: 'hairstyle-3d-3.jpg',
    prompt: 'Fotografia de alta qualidade de um homem com corte de cabelo moderno, vista traseira, fundo neutro, iluminação profissional'
  },
  {
    name: 'hairstyle-3d-4.jpg',
    prompt: 'Fotografia de alta qualidade de um homem com corte de cabelo moderno, vista diagonal, fundo neutro, iluminação profissional'
  },
  {
    name: 'style-1.jpg',
    prompt: 'Fotografia de homem com corte degradê clássico, primeiro plano no cabelo, profissional, alta qualidade'
  },
  {
    name: 'style-2.jpg',
    prompt: 'Fotografia de homem com pompadour moderno, primeiro plano no cabelo, profissional, alta qualidade'
  },
  {
    name: 'style-3.jpg',
    prompt: 'Fotografia de homem com undercut lateral, primeiro plano no cabelo, profissional, alta qualidade'
  },
  {
    name: 'real-person-haircut.jpg',
    prompt: 'Fotografia de alta qualidade de um homem com corte de cabelo degradê moderno e visual elegante, meio corpo, olhando para a câmera, fundo escuro, iluminação profissional'
  },
  {
    name: 'barbershop-dashboard-preview.jpg',
    prompt: 'Interface moderna de dashboard de barbearia com gráficos de desempenho, agenda e dados de clientes, design escuro com detalhes em roxo, tela de computador, profissional'
  },
  {
    name: 'hairstyle-example-1.jpg',
    prompt: 'Fotografia profissional de corte de cabelo masculino moderno, vista 3/4, fundo neutro'
  },
  {
    name: 'hairstyle-example-2.jpg',
    prompt: 'Fotografia profissional de corte de cabelo masculino degradê com barba, vista frontal, fundo neutro'
  }
];

/**
 * Função para gerar imagem usando a API da OpenAI DALL-E
 * (Exemplo - adapte para a API que você pretende usar)
 */
async function generateImage(prompt, outputPath) {
  console.log(`Gerando imagem para: ${prompt}`);
  
  // Aqui você implementaria a chamada real à API
  // Este é apenas um código de exemplo
  
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    }
  };
  
  const requestData = {
    prompt: prompt,
    n: 1,
    size: '1024x1024',
    response_format: 'url'
  };
  
  // Implementação fictícia - substitua pela chamada real à API
  console.log(`A imagem seria salva em: ${outputPath}`);
  console.log('Em um cenário real, aqui faria a chamada da API e salvaria a imagem no caminho especificado');
  
  // Código de exemplo para baixar uma imagem de uma URL
  // function downloadImage(url, outputPath) {
  //   return new Promise((resolve, reject) => {
  //     const file = fs.createWriteStream(outputPath);
  //     https.get(url, response => {
  //       response.pipe(file);
  //       file.on('finish', () => {
  //         file.close();
  //         resolve();
  //       });
  //     }).on('error', err => {
  //       fs.unlink(outputPath);
  //       reject(err);
  //     });
  //   });
  // }
}

/**
 * Função principal para gerar todas as imagens
 */
async function generateAllImages() {
  console.log('Iniciando geração de imagens...');
  
  // Certifique-se de que a pasta existe
  const imagesDir = path.join(__dirname, '..', 'public', 'images');
  const examplesDir = path.join(imagesDir, 'hairstyle-examples');
  
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
    console.log(`Pasta criada: ${imagesDir}`);
  }
  
  if (!fs.existsSync(examplesDir)) {
    fs.mkdirSync(examplesDir, { recursive: true });
    console.log(`Pasta criada: ${examplesDir}`);
  }
  
  // Gerar cada imagem da lista
  for (const request of imageRequests) {
    const outputPath = path.join(imagesDir, request.name);
    
    try {
      await generateImage(request.prompt, outputPath);
      console.log(`Imagem ${request.name} gerada com sucesso!`);
    } catch (error) {
      console.error(`Erro ao gerar imagem ${request.name}:`, error);
    }
  }
  
  console.log('Geração de imagens concluída!');
}

// Executar o script
generateAllImages().catch(console.error);

/**
 * ALTERNATIVAS PARA OBTENÇÃO DE IMAGENS:
 * 
 * 1. APIs gratuitas com limites:
 *    - Pexels API: https://www.pexels.com/api/
 *    - Unsplash API: https://unsplash.com/developers
 * 
 * 2. Serviços pagos de geração por IA:
 *    - OpenAI DALL-E: https://platform.openai.com/docs/guides/images
 *    - Midjourney API (através de Discord)
 *    - Leonardo.ai API: https://docs.leonardo.ai/
 *    - Stability AI: https://stability.ai/
 * 
 * 3. Sites com licenças comerciais para download:
 *    - Shutterstock
 *    - Adobe Stock
 *    - Freepik Premium
 */ 