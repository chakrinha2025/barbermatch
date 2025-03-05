import * as faceapi from 'face-api.js';

export interface FaceDetectionResult {
  detections: faceapi.FaceDetection[];
  landmarks?: faceapi.FaceLandmarks68[];
  expressions?: faceapi.FaceExpressions[];
  descriptors?: Float32Array[];
  faceShape?: 'oval' | 'round' | 'square' | 'heart' | 'long' | 'diamond' | 'triangle' | 'unknown';
}

export interface DetectionOptions {
  withLandmarks?: boolean;
  withExpressions?: boolean;
  withDescriptors?: boolean;
  determineFaceShape?: boolean;
}

class FaceRecognition {
  private modelsLoaded = false;
  private modelPath = '/models';

  /**
   * Inicializa e carrega os modelos necessários para o reconhecimento facial
   */
  async loadModels(): Promise<void> {
    if (this.modelsLoaded) return;

    try {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(this.modelPath),
        faceapi.nets.faceLandmark68Net.loadFromUri(this.modelPath),
        faceapi.nets.faceRecognitionNet.loadFromUri(this.modelPath),
        faceapi.nets.faceExpressionNet.loadFromUri(this.modelPath)
      ]);
      
      console.log('Modelos de reconhecimento facial carregados com sucesso');
      this.modelsLoaded = true;
    } catch (error) {
      console.error('Erro ao carregar modelos de reconhecimento facial:', error);
      throw new Error('Não foi possível carregar os modelos de reconhecimento facial');
    }
  }

  /**
   * Verifica se os modelos já foram carregados
   */
  areModelsLoaded(): boolean {
    return this.modelsLoaded;
  }

  /**
   * Detecta faces em uma imagem ou elemento de vídeo
   */
  async detectFaces(
    input: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement,
    options: DetectionOptions = {}
  ): Promise<FaceDetectionResult> {
    if (!this.modelsLoaded) {
      await this.loadModels();
    }

    const detectionOptions = new faceapi.TinyFaceDetectorOptions({
      inputSize: 512,
      scoreThreshold: 0.5
    });

    try {
      // Detecção básica de face
      let detections = await faceapi.detectAllFaces(input, detectionOptions);
      let landmarks;
      let expressions;
      let descriptors;
      let faceShape;

      // Adicionar landmarks se solicitado
      if (options.withLandmarks) {
        landmarks = await Promise.all(
          detections.map(async (detection) => {
            const landmarks = await faceapi.detectFaceLandmarks(input);
            return landmarks;
          })
        );
      }

      // Adicionar expressões se solicitado
      if (options.withExpressions) {
        expressions = await Promise.all(
          detections.map(async (detection) => {
            const expressions = await faceapi.detectFaceExpressions(input);
            return expressions;
          })
        );
      }

      // Adicionar descritores faciais se solicitado
      if (options.withDescriptors) {
        descriptors = await Promise.all(
          detections.map(async (detection) => {
            const descriptor = await faceapi.computeFaceDescriptor(input);
            return descriptor;
          })
        );
      }

      // Determinar o formato do rosto com base nos landmarks
      if (options.determineFaceShape && landmarks && landmarks.length > 0) {
        faceShape = this.determineFaceShape(landmarks[0]);
      }

      return {
        detections,
        landmarks,
        expressions,
        descriptors,
        faceShape
      };
    } catch (error) {
      console.error('Erro ao detectar faces:', error);
      throw new Error('Falha na detecção facial');
    }
  }

  /**
   * Determina o formato do rosto com base nos pontos de referência faciais
   */
  private determineFaceShape(landmarks: faceapi.FaceLandmarks68): 'oval' | 'round' | 'square' | 'heart' | 'long' | 'diamond' | 'triangle' | 'unknown' {
    try {
      const positions = landmarks.positions;
      
      // Pontos importantes para determinação do formato do rosto
      const faceBounds = landmarks.getBox();
      const faceWidth = faceBounds.width;
      const faceHeight = faceBounds.height;
      
      // Largura da testa (pontos 0 a 16)
      const foreheadWidth = positions[16].x - positions[0].x;
      
      // Largura do queixo (pontos 5 a 11)
      const chinWidth = positions[11].x - positions[5].x;
      
      // Largura da bochecha (pontos 2 a 14)
      const cheekWidth = positions[14].x - positions[2].x;
      
      // Altura da testa até o queixo
      const foreheadToChin = positions[8].y - positions[24].y;
      
      // Relação largura/altura
      const widthToHeightRatio = faceWidth / faceHeight;
      
      // Testa/queixo
      const foreheadToChinRatio = foreheadWidth / chinWidth;
      
      // Bochecha/queixo
      const cheekToChinRatio = cheekWidth / chinWidth;

      // Lógica para determinar o formato do rosto com base nas proporções
      if (widthToHeightRatio > 0.95 && widthToHeightRatio < 1.05 && foreheadToChinRatio < 1.3) {
        return 'round'; // Rosto redondo: largura aproximadamente igual à altura
      } else if (widthToHeightRatio < 0.85 && foreheadToChin > faceHeight * 0.6) {
        return 'long'; // Rosto comprido: muito mais alto que largo
      } else if (widthToHeightRatio > 0.85 && foreheadToChinRatio > 1.5) {
        return 'heart'; // Rosto de coração: testa larga, queixo estreito
      } else if (widthToHeightRatio > 0.9 && foreheadToChinRatio < 1.2 && cheekToChinRatio < 1.2) {
        return 'square'; // Rosto quadrado: largura similar e linhas de mandíbula fortes
      } else if (cheekToChinRatio > 1.4 && foreheadToChinRatio > 1.2 && foreheadToChinRatio < 1.4) {
        return 'diamond'; // Rosto diamante: bochechas mais largas, testa e queixo estreitos
      } else if (cheekToChinRatio > 1.4 && foreheadToChinRatio < 1.2) {
        return 'triangle'; // Rosto triangular: queixo estreito, linha da mandíbula larga
      } else {
        return 'oval'; // Formato oval (o mais comum)
      }
    } catch (error) {
      console.error('Erro ao determinar formato do rosto:', error);
      return 'unknown';
    }
  }

  /**
   * Sobrepõe uma imagem de corte/barba no rosto detectado
   */
  async applyHairstyleOverlay(
    canvas: HTMLCanvasElement,
    faceDetection: FaceDetectionResult,
    hairstyleImage: HTMLImageElement
  ): Promise<void> {
    if (!faceDetection.detections || faceDetection.detections.length === 0) {
      throw new Error('Nenhum rosto detectado para aplicar o estilo');
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Não foi possível obter o contexto 2D do canvas');
    }

    // Usar a primeira face detectada
    const detection = faceDetection.detections[0];
    const box = detection.box;

    // Ajustar posicionamento com base na categoria do corte
    // Esta é uma implementação básica, precisa ser refinada para cada tipo de estilo
    const hairstyleCategory = hairstyleImage.getAttribute('data-category') || 'corte';
    
    if (hairstyleCategory === 'corte') {
      // Para cortes de cabelo, posicionar acima da cabeça
      const scale = box.width / hairstyleImage.width * 1.5; // Escala para cobrir toda a cabeça
      const offsetX = box.x - (hairstyleImage.width * scale - box.width) / 2;
      const offsetY = box.y - hairstyleImage.height * scale * 0.7; // Posicionar acima da cabeça
      
      ctx.drawImage(
        hairstyleImage,
        offsetX,
        offsetY,
        hairstyleImage.width * scale,
        hairstyleImage.height * scale
      );
    } else if (hairstyleCategory === 'barba') {
      // Para estilos de barba, posicionar na parte inferior do rosto
      const scale = box.width / hairstyleImage.width * 1.2;
      const offsetX = box.x - (hairstyleImage.width * scale - box.width) / 2;
      const offsetY = box.y + box.height * 0.4; // Posicionar na parte inferior do rosto
      
      ctx.drawImage(
        hairstyleImage,
        offsetX,
        offsetY,
        hairstyleImage.width * scale,
        hairstyleImage.height * scale
      );
    }
  }

  /**
   * Recomenda estilos de corte com base no formato do rosto
   */
  recommendHairstyles(faceShape: string, hairstyles: any[]): any[] {
    if (!hairstyles || hairstyles.length === 0) {
      return [];
    }

    // Filtrar estilos compatíveis com o formato do rosto
    const compatibleStyles = hairstyles.filter(style => {
      if (!style.face_shape_compatibility) return true;
      return style.face_shape_compatibility.includes(faceShape);
    });

    // Ordenar por relevância para o formato do rosto
    // Aqui pode-se implementar uma lógica mais complexa baseada em outros fatores
    return compatibleStyles.slice(0, 5); // Retornar os 5 mais relevantes
  }
}

export const faceRecognition = new FaceRecognition(); 