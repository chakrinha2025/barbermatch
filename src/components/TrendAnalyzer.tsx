import React, { useState, useEffect, useRef } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Video, 
  Camera, 
  Music, 
  Hash, 
  Award, 
  Clock, 
  Eye, 
  Heart, 
  MessageSquare, 
  Share2,
  ChevronRight,
  ChevronDown,
  LockKeyhole,
  Scissors,
  Sparkles,
  Layers,
  Zap,
  BrainCircuit,
  LineChart,
  RefreshCw,
  ArrowRight,
  Target,
  Users,
  Search,
  FileText,
  PlayCircle,
  Download,
  Lightbulb,
  Copy,
  Check,
  Lock,
  CheckCircle2,
  Dumbbell,
  Globe,
  Loader2,
  AlertTriangle,
  Info,
  BadgeCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Tipos de dados para análise de tendências
export interface TrendingTopic {
  id: string;
  name: string;
  category: 'haircut' | 'beard' | 'product' | 'technique' | 'lifestyle';
  platform: 'instagram' | 'tiktok' | 'youtube' | 'all';
  views: number;
  engagement: number;
  growth: number; // crescimento percentual nos últimos 7 dias
  hashtags: string[];
  examples: TrendingExample[];
  description: string;
  isPremium: boolean;
  // Novos campos para análise de IA
  aiScores?: {
    virality: number; // 0-100
    relevance: number; // 0-100
    seasonality: number; // 0-100
    difficulty: number; // 0-100
    profitability: number; // 0-100
  };
  aiInsights?: string[];
  contentIdeas?: string[];
  targetDemographic?: {
    ageRange: string;
    gender: string[];
    interests: string[];
  };
  growthPrediction?: number; // crescimento previsto pela IA para próximas 2 semanas
  bestTime?: {
    days: string[];
    hours: string[];
  };
}

export interface TrendingExample {
  id: string;
  title: string;
  creator: string;
  thumbnail: string;
  url: string;
  views: number;
  likes: number;
  comments: number;
  platform: 'instagram' | 'tiktok' | 'youtube';
  duration?: string;
  publishedAt: string;
}

// Dados de insights de IA (simulados)
const AI_INSIGHTS = [
  {
    category: 'haircut',
    insights: [
      "Cortes com degradê alto continuam tendência em alta, especialmente entre o público jovem urbano.",
      "Vídeos de transformação 'antes e depois' têm 3x mais engajamento que tutoriais técnicos.",
      "Referências a séries populares aumentam em 70% o alcance orgânico dos posts sobre cortes."
    ],
    contentIdeas: [
      "Transformação de cliente inseguro para confiante com novo corte",
      "Série: '5 cortes para cada formato de rosto'",
      "Tutorial rápido: degradê perfeito em menos de 15 minutos",
      "Comparação: técnicas antigas vs. técnicas modernas"
    ]
  },
  {
    category: 'beard',
    insights: [
      "Barbas bem aparadas e definidas têm substituído estilos mais volumosos.",
      "Posts focados em cuidados e produtos têm crescido 42% em engajamento.",
      "Combinações de corte+barba geram 2x mais salvamentos que posts isolados."
    ],
    contentIdeas: [
      "Transformação: Barba desalinhada para barba estilizada",
      "5 produtos essenciais para uma barba saudável",
      "Tutorial: definindo linhas perfeitas na barba",
      "Como escolher o estilo de barba ideal para seu rosto"
    ]
  },
  {
    category: 'product',
    insights: [
      "Produtos naturais e sustentáveis estão crescendo 65% mais rápido que convencionais.",
      "Unboxing e demonstrações têm 4x mais conversão que apenas fotos do produto.",
      "Produtos usados por influenciadores têm 70% mais buscas após menção."
    ],
    contentIdeas: [
      "Review honesto: testando os 3 produtos mais populares do momento",
      "Antes e depois: 30 dias usando pomada orgânica",
      "Tutorial: como aplicar produtos para volume máximo",
      "Comparativo: pomadas importadas vs. nacionais"
    ]
  },
  {
    category: 'technique',
    insights: [
      "Técnicas de navalha estão em alta, especialmente para detalhes e desenhos.",
      "Vídeos acelerados de técnicas precisas geram maior taxa de compartilhamento.",
      "Tutoriais curtos (< 30 segundos) têm 5x mais visualizações completas."
    ],
    contentIdeas: [
      "O segredo da navalha: técnica passo a passo",
      "Como fazer desenhos na lateral do cabelo (para iniciantes)",
      "3 técnicas avançadas que todo barbeiro deveria dominar",
      "Erros comuns e como evitá-los ao usar máquina"
    ]
  },
  {
    category: 'lifestyle',
    insights: [
      "Conteúdo mostrando a rotina completa do barbeiro aumenta fidelização de clientes.",
      "Posts sobre cultura de barbearia têm 47% mais engajamento entre homens de 25-40 anos.",
      "Dicas de estilo de vida além do corte aumentam o valor percebido do profissional."
    ],
    contentIdeas: [
      "Um dia na vida de um barbeiro de sucesso",
      "Como montar seu cantinho de cuidados masculinos em casa",
      "De cliente a amigo: construindo relacionamentos na barbearia",
      "Transformação completa: cabelo, barba e estilo"
    ]
  }
];

// Tipos de categoria de tendência
const trendCategories = [
  { id: 'haircut', label: 'Cortes', icon: Scissors },
  { id: 'beard', label: 'Barbas', icon: Scissors },
  { id: 'product', label: 'Produtos', icon: Layers },
  { id: 'technique', label: 'Técnicas', icon: Scissors },
  { id: 'lifestyle', label: 'Lifestyle', icon: Sparkles },
];

// Dados mockados para simulação - agora com dados de IA estendidos
const MOCK_TRENDS: TrendingTopic[] = [
  {
    id: 'trend-1',
    name: 'Corte Textured Crop',
    category: 'haircut',
    platform: 'tiktok',
    views: 15800000,
    engagement: 8.7,
    growth: 43,
    hashtags: ['#texturedcrop', '#menshair', '#barbeiro', '#hairstyle'],
    examples: [
      {
        id: 'ex-1',
        title: 'Como fazer o corte TEXTURED CROP (passo a passo)',
        creator: '@barber.style',
        thumbnail: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: 'https://tiktok.com/example',
        views: 2400000,
        likes: 320000,
        comments: 8500,
        platform: 'tiktok',
        duration: '2:15',
        publishedAt: '2023-12-10'
      },
      {
        id: 'ex-2',
        title: 'Transformação com Textured Crop 🔥',
        creator: '@masterbarber',
        thumbnail: 'https://images.unsplash.com/photo-1593702288056-f5fe5b7f9de5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: 'https://instagram.com/example',
        views: 890000,
        likes: 76000,
        comments: 3200,
        platform: 'instagram',
        publishedAt: '2023-12-05'
      }
    ],
    description: 'O Textured Crop é um corte masculino moderno caracterizado por mais comprimento no topo com textura e lados mais curtos. A tendência cresceu 43% na última semana, especialmente entre o público jovem de 18-28 anos.',
    isPremium: false,
    aiScores: {
      virality: 85,
      relevance: 92,
      seasonality: 78,
      difficulty: 45,
      profitability: 88
    },
    aiInsights: [
      "Textured Crop tem alta virabilidade em vídeos curtos 'antes e depois'.",
      "88% dos clientes que adotam este estilo retornam em 3-4 semanas para manutenção.",
      "A combinação com barba curta gera mais engajamento que apenas o corte isolado."
    ],
    contentIdeas: [
      "5 variações do Textured Crop para diferentes tipos de cabelo",
      "Tutorial: Textured Crop para iniciantes (sem ferramentas especiais)",
      "Transformação radical: de cabelo longo para Textured Crop",
      "Os melhores produtos para manter o Textured Crop perfeito"
    ],
    targetDemographic: {
      ageRange: "18-34",
      gender: ["masculino"],
      interests: ["moda", "streetwear", "fitness", "lifestyle urbano"]
    },
    growthPrediction: 52,
    bestTime: {
      days: ["Quinta", "Sexta", "Sábado"],
      hours: ["18:00-21:00"]
    }
  },
  {
    id: 'trend-2',
    name: 'Barba Estilo Viking',
    category: 'beard',
    platform: 'instagram',
    views: 7900000,
    engagement: 9.2,
    growth: 28,
    hashtags: ['#vikingbeard', '#beardstyle', '#barba', '#homemcombarba'],
    examples: [
      {
        id: 'ex-3',
        title: 'Transformação: De básico a Viking 🪓',
        creator: '@beardmaster',
        thumbnail: 'https://images.unsplash.com/photo-1514893011-72dfa15bd5b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: 'https://instagram.com/example',
        views: 1200000,
        likes: 154000,
        comments: 4800,
        platform: 'instagram',
        publishedAt: '2023-11-28'
      }
    ],
    description: 'Barbas longas com estilo nórdico estão em alta entre homens de 25-40 anos. A estética viking domina as redes sociais com um crescimento de 28% em engajamento no último mês.',
    isPremium: false,
    aiScores: {
      virality: 72,
      relevance: 85,
      seasonality: 60,
      difficulty: 68,
      profitability: 79
    },
    aiInsights: [
      "Conteúdo associando barbas vikings a traços de masculinidade tem 42% mais engajamento.",
      "Tutoriais de manutenção para barbas longas são salvos 3x mais que apenas fotos do estilo.",
      "Hashtags específicas como #vikingbeard aumentam o alcance em 50% comparado a tags genéricas."
    ],
    contentIdeas: [
      "Passo a passo: Transformação de barba comum para estilo Viking",
      "Kit essencial: Os 7 produtos para manter uma barba estilo Viking impecável",
      "Barba viking para diferentes formatos de rosto: O que funciona melhor",
      "Mitos e verdades sobre o crescimento de barbas longas"
    ],
    targetDemographic: {
      ageRange: "25-45",
      gender: ["masculino"],
      interests: ["barba", "cultura nórdica", "motociclismo", "rock", "tatuagens"]
    },
    growthPrediction: 37,
    bestTime: {
      days: ["Segunda", "Quarta", "Domingo"],
      hours: ["19:00-22:00"]
    }
  },
  {
    id: 'trend-3',
    name: 'Fade Diagonal Criativo',
    category: 'haircut',
    platform: 'tiktok',
    views: 22500000,
    engagement: 12.3,
    growth: 67,
    hashtags: ['#diagonalfade', '#creativefade', '#cabelomasculino', '#fadecut'],
    examples: [
      {
        id: 'ex-4',
        title: 'Técnica SECRETA do Fade Diagonal 👨‍🎤',
        creator: '@topbarber',
        thumbnail: 'https://images.unsplash.com/photo-1584698919612-89275301aca4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: 'https://tiktok.com/example',
        views: 5700000,
        likes: 890000,
        comments: 23000,
        platform: 'tiktok',
        duration: '3:42',
        publishedAt: '2023-12-15'
      }
    ],
    description: 'O Fade Diagonal é a tendência de corte mais crescente atualmente, com padrões geométricos inovadores. Vídeos tutoriais deste estilo estão entre os mais virais no TikTok.',
    isPremium: true,
    aiScores: {
      virality: 95,
      relevance: 88,
      seasonality: 91,
      difficulty: 82,
      profitability: 93
    },
    aiInsights: [
      "O Fade Diagonal está sendo adotado por influenciadores de moda e música, impulsionando sua popularidade.",
      "Tutoriais que mostram a técnica em câmera lenta têm 4.7x mais visualizações completas.",
      "Este estilo é frequentemente associado com personalidades confiantes e criativas na percepção do público."
    ],
    contentIdeas: [
      "Masterclass completa: Fade Diagonal do início ao fim",
      "Como criar designs personalizados no Fade Diagonal",
      "As ferramentas essenciais para o Fade Diagonal perfeito",
      "De básico a avançado: Evoluindo sua técnica de Fade"
    ],
    targetDemographic: {
      ageRange: "16-28",
      gender: ["masculino", "não-binário"],
      interests: ["moda urbana", "música", "arte", "cultura hip-hop", "streetwear"]
    },
    growthPrediction: 83,
    bestTime: {
      days: ["Terça", "Quinta", "Sábado"],
      hours: ["12:00-15:00", "19:00-21:00"]
    }
  },
  {
    id: 'trend-4',
    name: 'Pomada Matte Natural',
    category: 'product',
    platform: 'youtube',
    views: 4600000,
    engagement: 7.8,
    growth: 34,
    hashtags: ['#pomadacapilar', '#matteeffect', '#produtosmasculinos', '#hairstyling'],
    examples: [
      {
        id: 'ex-5',
        title: 'Review: TOP 5 Pomadas Matte do Mercado',
        creator: '@barberpro',
        thumbnail: 'https://images.unsplash.com/photo-1607589853342-bb0ce15221ad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: 'https://youtube.com/example',
        views: 780000,
        likes: 45000,
        comments: 3200,
        platform: 'youtube',
        duration: '12:18',
        publishedAt: '2023-11-20'
      }
    ],
    description: 'Produtos com efeito matte natural estão superando os tradicionais com brilho. A preferência por looks mais naturais impulsionou esta categoria em 34% nas buscas online.',
    isPremium: true,
    aiScores: {
      virality: 68,
      relevance: 87,
      seasonality: 75,
      difficulty: 30,
      profitability: 95
    },
    aiInsights: [
      "Conteúdo patrocinado sobre pomadas matte tem alta conversão devido à crescente demanda.",
      "Reviews com antes/depois visualmente claros geram 65% mais cliques em links de afiliados.",
      "A combinação de pomadas matte com cortes texturizados é um forte impulsionador de vendas."
    ],
    contentIdeas: [
      "5 pomadas matte para 5 tipos diferentes de cabelo: Qual é a ideal para você?",
      "Guia completo: Como aplicar pomada matte para efeito profissional",
      "Comparativo: Pomadas matte nacionais vs. importadas",
      "A ciência por trás do efeito matte: Por que funciona melhor para certos estilos"
    ],
    targetDemographic: {
      ageRange: "20-40",
      gender: ["todos"],
      interests: ["cuidados masculinos", "cabelo", "produtos", "beleza", "moda"]
    },
    growthPrediction: 41,
    bestTime: {
      days: ["Segunda", "Quarta", "Sexta"],
      hours: ["12:00-14:00", "20:00-22:00"]
    }
  },
  {
    id: 'trend-5',
    name: 'Técnica de Navalha Artística',
    category: 'technique',
    platform: 'all',
    views: 9800000,
    engagement: 10.5,
    growth: 52,
    hashtags: ['#razorwork', '#navalhadesenho', '#barberart', '#hairtattoo'],
    examples: [
      {
        id: 'ex-6',
        title: 'Arte na NAVALHA: Como criar desenhos perfeitos',
        creator: '@barberartist',
        thumbnail: 'https://images.unsplash.com/photo-1548094891-9e3b2d5df749?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
        url: 'https://youtube.com/example',
        views: 1300000,
        likes: 175000,
        comments: 8900,
        platform: 'youtube',
        duration: '18:45',
        publishedAt: '2023-12-01'
      }
    ],
    description: 'Técnicas artísticas com navalha para criar desenhos no cabelo estão entre as habilidades mais buscadas por barbeiros que desejam se destacar. Cursos online sobre o tema cresceram 95% nos últimos 30 dias.',
    isPremium: true,
    aiScores: {
      virality: 84,
      relevance: 79,
      seasonality: 65,
      difficulty: 90,
      profitability: 89
    },
    aiInsights: [
      "Vídeos time-lapse de trabalhos com navalha têm 7x mais compartilhamentos que tutoriais comuns.",
      "Detalhes geométricos e tribais estão entre os desenhos mais procurados pelos clientes.",
      "Barbeiros com esta habilidade conseguem cobrar em média 35% a mais por corte personalizado."
    ],
    contentIdeas: [
      "Do básico ao avançado: Curso completo de arte com navalha",
      "5 desenhos iniciantes para praticar sua técnica de navalha",
      "Guia de ferramentas: Escolhendo a navalha ideal para trabalhos artísticos",
      "Técnicas de estabilização para desenhos perfeitos e linhas retas"
    ],
    targetDemographic: {
      ageRange: "16-35",
      gender: ["masculino"],
      interests: ["arte urbana", "tatuagens", "design", "cultura hip-hop", "esportes"]
    },
    growthPrediction: 67,
    bestTime: {
      days: ["Quinta", "Sexta", "Sábado", "Domingo"],
      hours: ["15:00-19:00"]
    }
  }
];

interface TrendAnalyzerProps {
  userType: 'barber' | 'barbershop_owner';
  userPlan: 'free' | 'basic' | 'professional' | 'premium';
  className?: string;
}

// Novo tipo para o modo de visualização de análise
type AnalysisView = 'basic' | 'ai_insights' | 'content_ideas' | 'demographic';

export const TrendAnalyzer: React.FC<TrendAnalyzerProps> = ({
  userType,
  userPlan,
  className = ''
}) => {
  const [trends, setTrends] = useState<TrendingTopic[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [expandedTrend, setExpandedTrend] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [selectedPremiumTrend, setSelectedPremiumTrend] = useState<TrendingTopic | null>(null);
  
  // Novos estados para IA
  const [analysisView, setAnalysisView] = useState<AnalysisView>('basic');
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [customTrendInput, setCustomTrendInput] = useState('');
  const [analyzingProgress, setAnalyzingProgress] = useState(0);
  const [showAiInsightsModal, setShowAiInsightsModal] = useState(false);
  const [selectedAiTrend, setSelectedAiTrend] = useState<TrendingTopic | null>(null);
  const [copiedIdea, setCopiedIdea] = useState<string | null>(null);
  
  // Estado para controlar o plano selecionado para teste
  const [testPlan, setTestPlan] = useState<'free' | 'basic' | 'professional' | 'premium'>(userPlan);
  
  // Ref para o elemento de análise de tendência customizada
  const customAnalysisRef = useRef<HTMLDivElement>(null);

  // Verificar se o usuário pode acessar recursos premium
  // Usar testPlan em vez de userPlan para permitir alternar entre planos
  const canAccessPremium = testPlan === 'professional' || testPlan === 'premium';
  const canAccessAiFeatures = testPlan === 'premium';
  const canAccessAdvancedAiFeatures = testPlan === 'premium';

  // Limites por plano
  const planLimits = {
    free: {
      maxTrends: 5,
      premiumAccess: false,
      aiAccess: false
    },
    basic: {
      maxTrends: 15,
      premiumAccess: false,
      aiAccess: false
    },
    professional: {
      maxTrends: -1, // ilimitado
      premiumAccess: true,
      aiAccess: false
    },
    premium: {
      maxTrends: -1, // ilimitado
      premiumAccess: true,
      aiAccess: true
    }
  };

  // Obter descrição do plano
  const getPlanDescription = (plan: 'free' | 'basic' | 'professional' | 'premium'): string => {
    switch (plan) {
      case 'free':
        return 'Limitado a 5 tendências básicas. Sem acesso a conteúdo premium ou recursos de IA.';
      case 'basic':
        return 'Até 15 tendências e acesso limitado a conteúdo premium (1 por dia). Sem IA.';
      case 'professional':
        return 'Acesso completo a todas tendências e conteúdo premium. Sem recursos avançados de IA.';
      case 'premium':
        return 'Acesso completo a todas funcionalidades, incluindo análise de IA e insights avançados.';
    }
  };

  // Carregar dados (simulação)
  useEffect(() => {
    const fetchTrends = async () => {
      // Simulação de delay de API
      await new Promise(resolve => setTimeout(resolve, 1500));
      setTrends(MOCK_TRENDS);
      setIsLoading(false);
    };

    fetchTrends();
  }, []);

  // Filtragem de tendências
  const filteredTrends = trends.filter(trend => {
    // Filtrar por categoria
    if (selectedCategory !== 'all' && trend.category !== selectedCategory) {
      return false;
    }
    
    // Filtrar por plataforma
    if (selectedPlatform !== 'all' && trend.platform !== 'all' && trend.platform !== selectedPlatform) {
      return false;
    }
    
    return true;
  });

  // Limitar o número de tendências baseado no plano
  // Filtrar e limitar tendências com base no plano
  const filteredTrendsWithLimits = trends
    .filter(trend => {
      // Filtrar por categoria
      if (selectedCategory !== 'all' && trend.category !== selectedCategory) {
        return false;
      }
      
      // Filtrar por plataforma
      if (selectedPlatform !== 'all' && trend.platform !== 'all' && trend.platform !== selectedPlatform) {
        return false;
      }

      // No plano básico, mostrar apenas uma tendência premium por dia (simulado)
      if (testPlan === 'basic' && trend.isPremium) {
        const premiumTrendIndex = trends.filter(t => t.isPremium).indexOf(trend);
        if (premiumTrendIndex >= planLimits[testPlan].maxTrends) {
          return false;
        }
      }

      // No plano gratuito, não mostrar tendências premium
      if (testPlan === 'free' && trend.isPremium) {
        return false;
      }
      
      return true;
    })
    // Limitar número total de tendências baseado no plano
    .slice(0, planLimits[testPlan].maxTrends === -1 ? undefined : planLimits[testPlan].maxTrends);

  // Formatação de número para exibição
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    } else {
      return num.toString();
    }
  };

  // Obter ícone para categoria
  const getCategoryIcon = (categoryId: string) => {
    const category = trendCategories.find(cat => cat.id === categoryId);
    if (!category) return Scissors;
    return category.icon;
  };

  // Obter nome da categoria
  const getCategoryName = (categoryId: string): string => {
    const category = trendCategories.find(cat => cat.id === categoryId);
    return category ? category.label : 'Outro';
  };

  // Obter ícone para plataforma
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>;
      case 'tiktok':
        return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19.32 6.95C17.96 6.95 16.86 5.85 16.86 4.5H13.5V15.93C13.5 17.61 12.14 18.98 10.45 18.98C8.76 18.98 7.41 17.61 7.41 15.93C7.41 14.24 8.77 12.88 10.45 12.88C10.86 12.88 11.24 12.97 11.59 13.13V9.61C11.22 9.56 10.84 9.53 10.45 9.53C6.9 9.53 4 12.42 4 15.98C4 19.53 6.9 22.42 10.45 22.42C14.01 22.42 16.91 19.53 16.91 15.98V10.14C18.16 10.99 19.67 11.5 21.29 11.5V8.15C21.29 8.15 20.21 6.95 19.32 6.95Z" /></svg>;
      case 'youtube':
        return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>;
      case 'all':
      default:
        return <BarChart3 className="w-4 h-4" />;
    }
  };

  // Renderização do status de crescimento
  const renderGrowthIndicator = (growth: number) => {
    const color = growth > 30 ? 'text-green-500' : growth > 10 ? 'text-blue-500' : 'text-amber-500';
    
    return (
      <div className={`flex items-center ${color}`}>
        <TrendingUp size={14} className="mr-1" />
        <span className="text-sm font-semibold">{growth}%</span>
      </div>
    );
  };

  // Lidar com clique em tendência premium quando usuário não tem acesso
  const handlePremiumTrendClick = (trend: TrendingTopic) => {
    if (trend.isPremium && !canAccessPremium) {
      setSelectedPremiumTrend(trend);
      setShowPremiumModal(true);
    } else {
      setExpandedTrend(expandedTrend === trend.id ? null : trend.id);
    }
  };

  // Renderização de cada exemplo de tendência
  const renderExampleCard = (example: TrendingExample) => {
    return (
      <a 
        key={example.id} 
        href={example.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex flex-col overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md"
      >
        <div className="relative aspect-video overflow-hidden bg-muted">
          <img 
            src={example.thumbnail} 
            alt={example.title} 
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
          {example.platform === 'youtube' && example.duration && (
            <div className="absolute bottom-2 right-2 rounded bg-black/80 px-1 py-0.5 text-xs text-white">
              {example.duration}
            </div>
          )}
          </div>
        
        <div className="flex flex-1 flex-col p-3">
          <h4 className="line-clamp-2 text-sm font-medium leading-tight">{example.title}</h4>
          
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{example.creator}</span>
            
            <div className="flex items-center space-x-2">
              <span className="flex items-center text-xs text-muted-foreground">
              <Eye size={12} className="mr-1" />
                {formatNumber(example.views)}
              </span>
              
              {example.publishedAt && (
                <span className="text-xs text-muted-foreground">
                  {new Date(example.publishedAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit'
                  })}
                </span>
              )}
            </div>
            </div>
      </a>
    );
  };

  // Novo: Simular análise de IA para tendência personalizada
  const simulateAiAnalysis = () => {
    if (!customTrendInput.trim() || !canAccessAiFeatures) return;
    
    setIsAiAnalyzing(true);
    setAnalyzingProgress(0);
    
    // Simulação do progresso de análise
    const interval = setInterval(() => {
      setAnalyzingProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          
          // Após "análise" concluída, simular resultados
          setTimeout(() => {
            // Criar tendência analisada com base em tópicos existentes
            const randomCategoryIndex = Math.floor(Math.random() * trendCategories.length);
            const category = trendCategories[randomCategoryIndex].id as 'haircut' | 'beard' | 'product' | 'technique' | 'lifestyle';
            
            // Selecionar insights e ideias de conteúdo para a categoria
            const categoryInsights = AI_INSIGHTS.find(insight => insight.category === category);
            
            // Criar nova tendência com base na entrada do usuário
            const aiAnalyzedTrend: TrendingTopic = {
              id: `custom-${Date.now()}`,
              name: customTrendInput,
              category,
              platform: 'all',
              views: Math.floor(Math.random() * 5000000) + 1000000,
              engagement: +(Math.random() * 10 + 3).toFixed(1),
              growth: Math.floor(Math.random() * 50) + 15,
              hashtags: [`#${customTrendInput.toLowerCase().replace(/\s+/g, '')}`, '#barbeiro', '#tendencia', '#hairdesign'],
              examples: [],
              description: `Análise de tendência para "${customTrendInput}". Esta é uma análise gerada por IA com base em tendências similares e padrões de comportamento do público.`,
              isPremium: false,
              aiScores: {
                virality: Math.floor(Math.random() * 30) + 60,
                relevance: Math.floor(Math.random() * 20) + 75,
                seasonality: Math.floor(Math.random() * 40) + 50,
                difficulty: Math.floor(Math.random() * 60) + 30,
                profitability: Math.floor(Math.random() * 25) + 70
              },
              aiInsights: categoryInsights ? categoryInsights.insights : [],
              contentIdeas: categoryInsights ? categoryInsights.contentIdeas : [],
              targetDemographic: {
                ageRange: "18-35",
                gender: ["masculino"],
                interests: ["moda", "estilo", "cuidados pessoais", "lifestyle"]
              },
              growthPrediction: Math.floor(Math.random() * 35) + 30,
              bestTime: {
                days: ["Quinta", "Sexta", "Sábado"],
                hours: ["18:00-21:00"]
              }
            };
            
            setSelectedAiTrend(aiAnalyzedTrend);
            setIsAiAnalyzing(false);
            setShowAiInsightsModal(true);
            
            // Scroll para os resultados
            if (customAnalysisRef.current) {
              customAnalysisRef.current.scrollIntoView({ behavior: 'smooth' });
            }
          }, 500);
          
          return 100;
        }
        
        return newProgress;
      });
    }, 200);
  };

  // Renderizar barra de progresso para análise de IA
  const renderAiProgressBar = (progress: number) => {
    return (
      <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full width-dynamic-${Math.round(progress)}`}
        ></div>
      </div>
    );
  };

  // Novo: Renderizar scorecard para métricas de IA
  const renderAiScoreCard = (label: string, value: number, colorClass: string) => {
    return (
      <div className="flex flex-col items-center p-3 bg-card border rounded-lg">
        <div className={`text-xl font-bold ${colorClass}`}>{value}</div>
        <div className="text-xs text-muted-foreground text-center mt-1">{label}</div>
        </div>
    );
  };

  // Novo: Renderizar modal de insights de IA
  const renderAiInsightsModal = () => {
    if (!selectedAiTrend) return null;
    
    const {
      name,
      category,
      aiScores,
      aiInsights,
      contentIdeas,
      targetDemographic,
      growthPrediction,
      bestTime
    } = selectedAiTrend;
    
    const CategoryIcon = getCategoryIcon(category);

  return (
      <AnimatePresence>
        {showAiInsightsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowAiInsightsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card w-full max-w-4xl rounded-xl shadow-lg overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-primary p-4 text-primary-foreground flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <BrainCircuit size={24} />
                  <h2 className="text-xl font-bold">Análise de IA: {name}</h2>
        </div>
                <div className="bg-primary-foreground/20 text-primary-foreground rounded-lg px-2 py-1 text-sm font-medium">
                  {getCategoryName(category)}
                </div>
      </div>
      
              <div className="p-6 max-h-[80vh] overflow-y-auto">
                {/* Scores de IA */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Target className="mr-2 h-5 w-5 text-primary" />
                    Métricas de Potencial
                  </h3>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {aiScores && (
                      <>
                        {renderAiScoreCard("Viralidade", aiScores.virality, aiScores.virality > 80 ? "text-green-500" : aiScores.virality > 60 ? "text-amber-500" : "text-muted-foreground")}
                        {renderAiScoreCard("Relevância", aiScores.relevance, aiScores.relevance > 80 ? "text-green-500" : aiScores.relevance > 60 ? "text-amber-500" : "text-muted-foreground")}
                        {renderAiScoreCard("Sazonalidade", aiScores.seasonality, aiScores.seasonality > 80 ? "text-green-500" : aiScores.seasonality > 60 ? "text-amber-500" : "text-muted-foreground")}
                        {renderAiScoreCard("Dificuldade", aiScores.difficulty, aiScores.difficulty < 40 ? "text-green-500" : aiScores.difficulty < 70 ? "text-amber-500" : "text-red-500")}
                        {renderAiScoreCard("Rentabilidade", aiScores.profitability, aiScores.profitability > 80 ? "text-green-500" : aiScores.profitability > 60 ? "text-amber-500" : "text-muted-foreground")}
                      </>
                    )}
        </div>
                </div>
                
                {/* Insights de IA */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Lightbulb className="mr-2 h-5 w-5 text-primary" />
                    Insights
                  </h3>
                  
                  <div className="space-y-3">
                    {aiInsights && aiInsights.map((insight, idx) => (
                      <div key={idx} className="bg-muted p-3 rounded-lg text-sm">
                        {insight}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Ideias de Conteúdo */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-primary" />
                    Ideias de Conteúdo
                  </h3>
                  
                  <div className="space-y-3">
                    {contentIdeas && contentIdeas.map((idea, idx) => (
                      <div 
                        key={idx} 
                        className="bg-muted p-3 rounded-lg text-sm flex justify-between items-center group"
                      >
                        <span>{idea}</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(idea);
                            setCopiedIdea(idea);
                            setTimeout(() => setCopiedIdea(null), 2000);
                          }}
                          className="text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Copiar ideia"
                        >
                          {copiedIdea === idea ? (
                            <Check size={16} className="text-green-500" />
                          ) : (
                            <Copy size={16} />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Informações Adicionais */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Demografia Alvo */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Users className="mr-2 h-5 w-5 text-primary" />
                      Público-Alvo
                    </h3>
                    
                    {targetDemographic && (
                      <div className="bg-card border rounded-lg p-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Faixa Etária:</span>
                          <span className="text-sm font-medium">{targetDemographic.ageRange}</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Gênero:</span>
                          <span className="text-sm font-medium">{targetDemographic.gender.join(', ')}</span>
                        </div>
                        
                        <div>
                          <span className="text-sm text-muted-foreground block mb-2">Interesses:</span>
                          <div className="flex flex-wrap gap-2">
                            {targetDemographic.interests.map((interest, idx) => (
                              <span 
                                key={idx} 
                                className="bg-muted text-xs px-2 py-1 rounded-full"
                              >
                                {interest}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
            </div>
            
                  {/* Melhor Momento para Postagem */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Calendar className="mr-2 h-5 w-5 text-primary" />
                      Melhor Momento para Postagem
                    </h3>
                    
                    {bestTime && (
                      <div className="bg-card border rounded-lg p-4 space-y-4">
                        <div>
                          <span className="text-sm text-muted-foreground block mb-2">Dias da Semana:</span>
                          <div className="flex flex-wrap gap-2">
                            {bestTime.days.map((day, idx) => (
                              <span 
                                key={idx} 
                                className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                              >
                                {day}
                              </span>
                            ))}
            </div>
          </div>
          
                        <div>
                          <span className="text-sm text-muted-foreground block mb-2">Horários:</span>
                          <div className="flex flex-wrap gap-2">
                            {bestTime.hours.map((hour, idx) => (
                              <span 
                                key={idx} 
                                className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                              >
                                {hour}
                              </span>
                            ))}
              </div>
                        </div>
                        
                        <div className="pt-2 border-t">
                          <div className="flex items-center">
                            <TrendingUp className="text-green-500 h-4 w-4 mr-2" />
                            <span className="text-sm">
                              Crescimento projetado: 
                              <span className="font-bold text-green-500 ml-1">{growthPrediction}%</span>
                              <span className="text-xs text-muted-foreground ml-1">(próximas 2 semanas)</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="border-t p-4 flex justify-between">
                <button
                  onClick={() => setShowAiInsightsModal(false)}
                  className="px-4 py-2 border rounded-md hover:bg-muted transition-colors"
                >
                  Fechar
                </button>
                
                <button
                  onClick={() => {
                    // Aqui poderia implementar exportação do relatório
                    setShowAiInsightsModal(false);
                  }}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Exportar Relatório
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // Renderização da seção de análise personalizada com IA
  const renderCustomAnalysisSection = () => {
    if (!canAccessAiFeatures) return null;
    
    return (
      <div 
        ref={customAnalysisRef}
        className="mt-6 border rounded-xl overflow-hidden"
      >
        <div className="bg-primary/10 border-b p-4">
          <h3 className="text-lg font-semibold flex items-center">
            <BrainCircuit className="mr-2 h-5 w-5 text-primary" />
            Analisar Tendência Personalizada
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Use a IA para analisar o potencial de uma tendência específica que você deseja explorar
          </p>
        </div>
        
        <div className="p-4">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Digite uma tendência para analisar (ex: Barba Geométrica, Corte Degradê Colorido...)"
              value={customTrendInput}
              onChange={(e) => setCustomTrendInput(e.target.value)}
              disabled={isAiAnalyzing}
              className="flex-1 px-3 py-2 border rounded-md text-sm"
            />
            
            <button
              onClick={simulateAiAnalysis}
              disabled={!customTrendInput.trim() || isAiAnalyzing}
              className={`px-4 py-2 rounded-md text-white flex items-center ${
                isAiAnalyzing ? 'bg-primary/60' : 'bg-primary hover:bg-primary/90'
              } transition-colors`}
            >
              {isAiAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analisando...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Analisar
                </>
              )}
            </button>
          </div>
          
          {isAiAnalyzing && (
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Analisando tendências similares...</span>
                <span>{Math.round(analyzingProgress)}%</span>
              </div>
              {renderAiProgressBar(analyzingProgress)}
              <p className="text-xs text-muted-foreground italic mt-2">
                A IA está analisando o potencial de "{customTrendInput}" com base em dados de tendências similares, engajamento e feedback de clientes.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Renderização das abas de visualização para análise de IA
  const renderAnalysisViewTabs = () => {
    if (!canAccessAiFeatures) return null;

    const tabs = [
      { id: 'basic', label: 'Visão Geral', icon: BarChart3 },
      { id: 'ai_insights', label: 'Insights de IA', icon: BrainCircuit },
      { id: 'content_ideas', label: 'Ideias de Conteúdo', icon: FileText },
      { id: 'demographic', label: 'Demografia', icon: Users }
    ];

    return (
      <div className="flex flex-wrap gap-2 mb-4">
        {tabs.map((tab) => {
          const isActive = analysisView === tab.id as AnalysisView;
          const TabIcon = tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => setAnalysisView(tab.id as AnalysisView)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-colors ${
                isActive 
                  ? 'bg-primary text-primary-foreground font-medium' 
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              <TabIcon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    );
  };

  // Renderização da seção premium (bloqueada)
  const renderPremiumUpsell = () => {
    if (canAccessPremium) return null;
    
    return (
      <div className="mt-6 bg-primary/10 border border-primary/20 rounded-lg p-4 text-sm">
        <div className="flex items-start">
          <Lock size={20} className="h-5 w-5 text-primary mt-0.5 mr-3" />
          <div>
            <p className="text-foreground font-medium">Desbloqueie análises avançadas de tendências</p>
            <p className="text-muted-foreground mt-1">
              Atualize para o plano Premium ou Professional para acessar análises detalhadas, recomendações personalizadas de conteúdo e insights exclusivos sobre tendências emergentes.
            </p>
            <a 
              href="/pricing" 
              className="text-primary hover:underline mt-2 inline-block"
            >
              Ver planos disponíveis
            </a>
          </div>
        </div>
      </div>
    );
  };

  // Renderização de cada card de tendência
  const renderTrendCard = (trend: TrendingTopic) => {
                const isExpanded = expandedTrend === trend.id;
    const isPremiumLocked = trend.isPremium && !canAccessPremium;
    
    const CategoryIcon = getCategoryIcon(trend.category);
                
                return (
      <div
                    key={trend.id}
        className={`border rounded-lg overflow-hidden transition-all ${
          isExpanded ? 'shadow-md' : 'hover:shadow-sm'
        } ${isPremiumLocked ? 'bg-muted/40' : 'bg-card'}`}
                  >
                    <div 
          className={`p-4 cursor-pointer ${isPremiumLocked ? 'opacity-75' : ''}`}
                      onClick={() => handlePremiumTrendClick(trend)}
                    >
          <div className="flex justify-between items-start">
            <div className="flex-1">
                            <div className="flex items-center">
                {trend.isPremium && !canAccessPremium && (
                  <Lock size={15} className="mr-1.5 text-amber-500" />
                )}
                <h3 className="font-semibold">{trend.name}</h3>
                            </div>
              
              <div className="flex items-center mt-1 space-x-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
                  <CategoryIcon size={12} className="mr-1" />
                  {getCategoryName(trend.category)}
                </span>
                
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-muted text-xs">
                                {getPlatformIcon(trend.platform)}
                  <span className="ml-1 capitalize">{trend.platform === 'all' ? 'Todas plataformas' : trend.platform}</span>
                </span>
                          </div>
                        </div>
                        
            <div className="flex flex-col items-end">
                          {renderGrowthIndicator(trend.growth)}
              
              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                <Eye size={14} className="mr-1" />
                {formatNumber(trend.views)} visualizações
                        </div>
                      </div>
                    </div>
                    
          <p className={`mt-2 text-sm text-muted-foreground line-clamp-2 ${isPremiumLocked ? 'blur-[2px]' : ''}`}>
                              {trend.description}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {trend.hashtags.slice(0, 4).map((tag, idx) => (
              <span key={idx} className={`text-xs px-2 py-0.5 rounded-full bg-muted ${isPremiumLocked ? 'blur-[1px]' : ''}`}>
                                  {tag}
                                </span>
                              ))}
            {trend.hashtags.length > 4 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-muted">
                +{trend.hashtags.length - 4}
              </span>
            )}
          </div>
                            </div>
                            
        {/* Conteúdo expandido */}
        {isExpanded && !isPremiumLocked && (
          <div className="border-t p-4">
            {/* Pontuações de IA para planos Premium */}
            {canAccessAiFeatures && trend.aiScores && (
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2 flex items-center">
                  <BrainCircuit size={14} className="mr-1.5 text-primary" />
                  Análise de IA
                </h4>
                
                <div className="grid grid-cols-5 gap-2">
                  <div className="flex flex-col items-center">
                    <div className={`text-lg font-bold ${trend.aiScores.virality > 80 ? 'text-green-500' : 'text-muted-foreground'}`}>
                      {trend.aiScores.virality}
                              </div>
                    <div className="text-xs text-muted-foreground">Viralidade</div>
                              </div>
                  
                  <div className="flex flex-col items-center">
                    <div className={`text-lg font-bold ${trend.aiScores.relevance > 80 ? 'text-green-500' : 'text-muted-foreground'}`}>
                      {trend.aiScores.relevance}
                              </div>
                    <div className="text-xs text-muted-foreground">Relevância</div>
                            </div>
                            
                  <div className="flex flex-col items-center">
                    <div className={`text-lg font-bold ${trend.aiScores.seasonality > 80 ? 'text-green-500' : 'text-muted-foreground'}`}>
                      {trend.aiScores.seasonality}
                    </div>
                    <div className="text-xs text-muted-foreground">Sazonalidade</div>
                            </div>
                            
                  <div className="flex flex-col items-center">
                    <div className={`text-lg font-bold ${trend.aiScores.difficulty < 40 ? 'text-green-500' : 'text-red-500'}`}>
                      {trend.aiScores.difficulty}
                    </div>
                    <div className="text-xs text-muted-foreground">Dificuldade</div>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className={`text-lg font-bold ${trend.aiScores.profitability > 80 ? 'text-green-500' : 'text-muted-foreground'}`}>
                      {trend.aiScores.profitability}
                    </div>
                    <div className="text-xs text-muted-foreground">Rentabilidade</div>
                  </div>
                </div>
                
                {/* Botão para mais insights */}
                {canAccessAdvancedAiFeatures && (
                  <button
                    onClick={() => {
                      setSelectedAiTrend(trend);
                      setShowAiInsightsModal(true);
                    }}
                    className="w-full mt-3 py-1.5 border border-primary/20 text-primary rounded-md text-sm flex items-center justify-center hover:bg-primary/5 transition-colors"
                  >
                    <Lightbulb size={14} className="mr-1.5" />
                                  Ver análise completa
                  </button>
                )}
                              </div>
                            )}
            
            {/* Exemplos */}
            {trend.examples.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-3">Exemplos em destaque</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {trend.examples.map(example => renderExampleCard(example))}
                          </div>
              </div>
            )}
          </div>
        )}
        
        {/* Overlay para conteúdo premium bloqueado */}
        {isPremiumLocked && (
          <div className="border-t p-4 bg-gradient-to-b from-muted/10 to-muted/30 flex flex-col items-center justify-center">
            <Lock size={20} className="text-amber-500 mb-2" />
            <p className="text-sm font-medium text-center">Conteúdo Premium</p>
            <p className="text-xs text-muted-foreground text-center mt-1">
              Atualize seu plano para desbloquear análises detalhadas
            </p>
            <button 
              onClick={() => handlePremiumTrendClick(trend)}
              className="mt-3 px-4 py-1.5 bg-primary text-primary-foreground rounded-md text-sm"
            >
              Ver detalhes
            </button>
          </div>
      )}
      </div>
    );
  };
      
  // Renderização modal premium
  const renderPremiumModal = () => {
    return (
      <AnimatePresence>
        {showPremiumModal && selectedPremiumTrend && (
            <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowPremiumModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card w-full max-w-md rounded-xl shadow-lg overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-amber-500 p-4 text-white flex items-center">
                <Lock size={20} className="mr-2" />
                <h2 className="text-xl font-bold">Conteúdo Premium</h2>
                </div>
                
              <div className="p-6">
                <h3 className="text-lg font-medium mb-2">{selectedPremiumTrend.name}</h3>
                <p className="text-muted-foreground mb-4">
                  Este conteúdo inclui análises detalhadas, insights de IA e exemplos em destaque para ajudar você a implementar esta tendência em seu negócio.
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-start">
                    <CheckCircle2 size={18} className="text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">Análise completa de tendências</span>
                    </div>
                  <div className="flex items-start">
                    <CheckCircle2 size={18} className="text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">Insights exclusivos de IA</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 size={18} className="text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">Exemplos detalhados e tutoriais</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 size={18} className="text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">Dicas de implementação personalizada</span>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    onClick={() => setShowPremiumModal(false)}
                    className="px-4 py-2 border rounded-md hover:bg-muted transition-colors"
                  >
                    Fechar
                  </button>
                  
                  <a
                    href="/pricing"
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Atualizar plano
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Painel de seleção de plano para demonstração */}
      <div className="bg-gradient-to-r from-amber-50 to-yellow-100 border-2 border-amber-300 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <AlertTriangle size={18} className="text-amber-600 mr-2" />
            <h3 className="font-bold text-amber-800">Modo de Demonstração</h3>
          </div>
          <span className="text-xs bg-amber-200 text-amber-700 px-2 py-0.5 rounded-full">Teste de planos</span>
        </div>
        
        <p className="text-sm text-amber-700 mb-3">Selecione um plano para visualizar as diferentes funcionalidades:</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
                  <button
            onClick={() => setTestPlan('free')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              testPlan === 'free' 
                ? 'bg-amber-500 text-white' 
                : 'bg-amber-200/70 text-amber-800 hover:bg-amber-200'
            }`}
          >
            Gratuito
          </button>
          <button 
            onClick={() => setTestPlan('basic')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              testPlan === 'basic' 
                ? 'bg-amber-500 text-white' 
                : 'bg-amber-200/70 text-amber-800 hover:bg-amber-200'
            }`}
          >
            Básico
          </button>
          <button 
            onClick={() => setTestPlan('professional')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              testPlan === 'professional' 
                ? 'bg-amber-500 text-white' 
                : 'bg-amber-200/70 text-amber-800 hover:bg-amber-200'
            }`}
          >
            Profissional
          </button>
          <button 
            onClick={() => setTestPlan('premium')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              testPlan === 'premium' 
                ? 'bg-amber-500 text-white' 
                : 'bg-amber-200/70 text-amber-800 hover:bg-amber-200'
            }`}
          >
            Premium
                  </button>
                </div>
        
        <div className="flex items-center bg-amber-100 p-2 rounded text-sm text-amber-800">
          <BadgeCheck size={16} className="text-amber-600 mr-2 flex-shrink-0" />
          <div>
            <span className="font-semibold">Plano atual: </span>
            <span className="font-bold uppercase">{testPlan}</span>
            <p className="text-xs mt-0.5">{getPlanDescription(testPlan)}</p>
              </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Analisador de Tendências</h2>
          <p className="text-muted-foreground mt-1">Descubra as tendências mais populares da barbearia e obtenha insights para o seu negócio</p>
        </div>
        
        {canAccessAiFeatures && (
          <div className="flex items-center gap-1 text-sm">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span>Versão 2.0 com IA</span>
          </div>
        )}
      </div>
      
      {/* Tabs para modos de visualização (somente para planos premium) */}
      {renderAnalysisViewTabs()}
      
      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Categorias */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors ${
              selectedCategory === 'all' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            <Dumbbell size={16} />
            <span>Todas categorias</span>
          </button>
          
          {trendCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors ${
                selectedCategory === category.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              <category.icon size={16} />
              <span>{category.label}</span>
            </button>
          ))}
        </div>
        
        {/* Plataformas */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedPlatform('all')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors ${
              selectedPlatform === 'all' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            <Globe size={16} />
            <span>Todas plataformas</span>
          </button>
          
          <button
            onClick={() => setSelectedPlatform('instagram')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors ${
              selectedPlatform === 'instagram' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            {getPlatformIcon('instagram')}
            <span>Instagram</span>
          </button>
          
          <button
            onClick={() => setSelectedPlatform('tiktok')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors ${
              selectedPlatform === 'tiktok' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            {getPlatformIcon('tiktok')}
            <span>TikTok</span>
          </button>
          
          <button
            onClick={() => setSelectedPlatform('youtube')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors ${
              selectedPlatform === 'youtube' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            {getPlatformIcon('youtube')}
            <span>YouTube</span>
          </button>
        </div>
      </div>
      
      {/* Seção de análise personalizada (apenas para planos premium) */}
      {renderCustomAnalysisSection()}
      
      {/* Tendências */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 size={40} className="text-primary animate-spin mb-4" />
          <p className="text-muted-foreground">Carregando tendências...</p>
        </div>
      ) : filteredTrendsWithLimits.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {filteredTrendsWithLimits.map(trend => renderTrendCard(trend))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 border rounded-lg bg-muted/20">
          <Search size={40} className="text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Nenhuma tendência encontrada para os filtros selecionados.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedPlatform('all');
            }}
            className="mt-3 text-primary hover:underline text-sm"
          >
            Limpar filtros
          </button>
        </div>
      )}
      
      {/* Mensagem para usuários de planos inferiores */}
      {renderPremiumUpsell()}
      
      {/* Modais */}
      {renderPremiumModal()}
      {renderAiInsightsModal()}
    </div>
  );
};

export default TrendAnalyzer; 