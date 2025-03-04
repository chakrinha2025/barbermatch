import { useEffect, useRef } from 'react';

interface DataPoint {
  label: string;
  value: number;
}

interface LineChartProps {
  data: DataPoint[];
  height?: number;
  showPoints?: boolean;
  showValues?: boolean;
  showLabels?: boolean;
  formatValue?: (value: number) => string;
  title?: string;
  description?: string;
  className?: string;
  color?: string;
  fillArea?: boolean;
  gridLines?: boolean;
}

const LineChart = ({
  data,
  height = 250,
  showPoints = true,
  showValues = true,
  showLabels = true,
  formatValue = (value) => value.toString(),
  title,
  description,
  className = '',
  color = 'rgba(99, 102, 241, 0.8)', // Indigo por padrão
  fillArea = true,
  gridLines = true
}: LineChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Encontrar o valor máximo para escala
  const maxValue = Math.max(...data.map(item => item.value));
  
  // Desenhar o gráfico
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Limpar o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Configurar dimensões
    const padding = 20;
    const bottomPadding = showLabels ? 40 : padding;
    const chartWidth = canvas.width - (padding * 2);
    const chartHeight = canvas.height - padding - bottomPadding;
    
    // Calcular a largura entre cada ponto
    const pointGap = chartWidth / (data.length - 1);
    
    // Desenhar eixos
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(156, 163, 175, 0.5)';
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, chartHeight + padding);
    ctx.lineTo(canvas.width - padding, chartHeight + padding);
    ctx.stroke();
    
    // Desenhar linhas de grade horizontais
    if (gridLines) {
      const gridCount = 5;
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(156, 163, 175, 0.2)';
      for (let i = 0; i <= gridCount; i++) {
        const y = padding + ((chartHeight / gridCount) * i);
        ctx.moveTo(padding, y);
        ctx.lineTo(canvas.width - padding, y);
      }
      ctx.stroke();
    }
    
    if (data.length >= 2) {
      // Desenhar área sob a linha se solicitado
      if (fillArea) {
        ctx.beginPath();
        ctx.moveTo(padding, chartHeight + padding); // Começar no canto inferior esquerdo
        
        // Criar caminho da área
        data.forEach((item, index) => {
          const x = padding + (index * pointGap);
          const y = chartHeight + padding - ((item.value / maxValue) * chartHeight);
          ctx.lineTo(x, y);
        });
        
        // Fechar o caminho no canto inferior direito
        ctx.lineTo(padding + chartWidth, chartHeight + padding);
        ctx.closePath();
        
        // Preencher com gradiente
        const gradient = ctx.createLinearGradient(0, padding, 0, chartHeight + padding);
        const colorBase = color.replace(/[^,]+(?=\))/, '0.1');
        gradient.addColorStop(0, color.replace(/[^,]+(?=\))/, '0.4'));
        gradient.addColorStop(1, colorBase);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      
      // Desenhar linha
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = color;
      
      data.forEach((item, index) => {
        const x = padding + (index * pointGap);
        const y = chartHeight + padding - ((item.value / maxValue) * chartHeight);
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.stroke();
      
      // Desenhar pontos e valores
      data.forEach((item, index) => {
        const x = padding + (index * pointGap);
        const y = chartHeight + padding - ((item.value / maxValue) * chartHeight);
        
        // Pontos
        if (showPoints) {
          ctx.beginPath();
          ctx.fillStyle = 'white';
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.beginPath();
          ctx.lineWidth = 2;
          ctx.strokeStyle = color;
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.stroke();
        }
        
        // Valores acima dos pontos
        if (showValues) {
          const formattedValue = formatValue(item.value);
          ctx.fillStyle = 'rgba(51, 65, 85, 0.9)';
          ctx.font = '12px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(formattedValue, x, y - 15);
        }
        
        // Labels abaixo da linha
        if (showLabels) {
          ctx.fillStyle = 'rgba(51, 65, 85, 0.9)';
          ctx.font = '12px sans-serif';
          ctx.textAlign = 'center';
          
          // Abreviar labels longos
          let label = item.label;
          if (label.length > 10) {
            label = label.substring(0, 8) + '...';
          }
          
          ctx.fillText(label, x, chartHeight + padding + 20);
        }
      });
    }
  }, [data, height, showPoints, showValues, showLabels, formatValue, color, fillArea, gridLines]);
  
  // Ajuste de escala para dispositivos high-DPI
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = height * dpr;
    
    ctx.scale(dpr, dpr);
    
    canvas.style.width = rect.width + 'px';
    canvas.style.height = height + 'px';
  }, [height]);
  
  return (
    <div className={`w-full ${className}`}>
      {(title || description) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-medium">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      <canvas 
        ref={canvasRef} 
        className={`w-full h-[${height}px]`}
      />
    </div>
  );
};

export default LineChart; 