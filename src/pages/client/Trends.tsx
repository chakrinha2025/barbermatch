import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Scissors, 
  Search, 
  Filter, 
  ChevronRight, 
  Star, 
  Calendar, 
  ArrowRight,
  Clock,
  Users,
  Share2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { TrendAnalyzer } from '@/components/TrendAnalyzer';

// Interfaces
interface TrendingStyle {
  id: string;
  name: string;
  image: string;
  popularity: number;
  description: string;
  tags: string[];
}

interface PopularBarber {
  id: string;
  name: string;
  avatar: string;
  shop: string;
  specialty: string;
  rating: number;
  distance: string;
  trending: boolean;
}

export default function TrendsPage() {
  const [trendingStyles, setTrendingStyles] = useState<TrendingStyle[]>([]);
  const [popularBarbers, setPopularBarbers] = useState<PopularBarber[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'styles' | 'analytics'>('styles');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const allTags = ['Corte Curto', 'Médio', 'Longo', 'Degradê', 'Clássico', 'Moderno', 'Com Barba', 'Colorido'];
  
  // Simular carregamento de dados
  useEffect(() => {
    // Em produção, carregaria do backend
    setTimeout(() => {
      const fakeTrendingStyles: TrendingStyle[] = [
        {
          id: '1',
          name: 'Degradê Moderno',
          image: 'https://images.unsplash.com/photo-1621605774941-06134b0b46fa?q=80&w=1470&auto=format&fit=crop',
          popularity: 95,
          description: 'Um corte com transição suave que combina com diversos estilos e formatos de rosto',
          tags: ['Degradê', 'Moderno', 'Corte Curto']
        },
        {
          id: '2',
          name: 'Undercut Clássico',
          image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=1470&auto=format&fit=crop',
          popularity: 88,
          description: 'Lateral e nuca raspadas com volume no topo, perfeito para um visual ousado',
          tags: ['Clássico', 'Undercut', 'Médio']
        },
        {
          id: '3',
          name: 'Corte com Barba Lenhador',
          image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=1471&auto=format&fit=crop',
          popularity: 87,
          description: 'Combinação perfeita entre corte texturizado e barba média bem definida',
          tags: ['Com Barba', 'Médio', 'Moderno']
        },
        {
          id: '4',
          name: 'Crop Textured',
          image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1470&auto=format&fit=crop',
          popularity: 82,
          description: 'Corte curto com textura no topo e acabamento preciso, muito popular entre jovens',
          tags: ['Corte Curto', 'Moderno', 'Texturizado']
        },
        {
          id: '5',
          name: 'Pompadour Moderno',
          image: 'https://images.unsplash.com/photo-1484515991647-c5760fcecfc7?q=80&w=1449&auto=format&fit=crop',
          popularity: 79,
          description: 'Releitura contemporânea do clássico corte, com mais textura e menos volume',
          tags: ['Clássico', 'Médio', 'Moderno']
        },
        {
          id: '6',
          name: 'Corte Desconectado',
          image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=1374&auto=format&fit=crop',
          popularity: 75,
          description: 'Transição marcada entre laterais curtas e topo mais longo, para um visual impactante',
          tags: ['Médio', 'Undercut', 'Moderno']
        }
      ];
      
      const fakePopularBarbers: PopularBarber[] = [
        {
          id: '1',
          name: 'Rafael Costa',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          shop: 'Barbearia Vintage',
          specialty: 'Degradês & Cortes Modernos',
          rating: 4.9,
          distance: '1.2 km',
          trending: true
        },
        {
          id: '2',
          name: 'André Martins',
          avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
          shop: 'BarberKing',
          specialty: 'Barbas & Estilos Clássicos',
          rating: 4.8,
          distance: '2.5 km',
          trending: true
        },
        {
          id: '3',
          name: 'Lucas Oliveira',
          avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
          shop: 'Cortes & Cia',
          specialty: 'Cortes Desconectados & Colorações',
          rating: 4.7,
          distance: '3.7 km',
          trending: false
        },
        {
          id: '4',
          name: 'Matheus Silva',
          avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
          shop: 'Barba Negra',
          specialty: 'Barbas Estilizadas & Navalhados',
          rating: 4.6,
          distance: '5.3 km',
          trending: false
        }
      ];
      
      setTrendingStyles(fakeTrendingStyles);
      setPopularBarbers(fakePopularBarbers);
      setLoading(false);
    }, 1000);
  }, []);
  
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  // Filtrar estilos com base na busca e tags selecionadas
  const filteredStyles = trendingStyles.filter(style => {
    const matchesSearch = style.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          style.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
                        selectedTags.some(tag => style.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });
  
  // Ordenar por popularidade
  const sortedStyles = [...filteredStyles].sort((a, b) => b.popularity - a.popularity);
  
  return (
    <div className="space-y-8 pb-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tendências</h1>
        
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab('styles')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              activeTab === 'styles' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted hover:bg-muted/80'
            }`}
            aria-label="Ver estilos em tendência"
          >
            <Scissors size={16} className="inline-block mr-2" />
            Estilos
          </button>
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              activeTab === 'analytics' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted hover:bg-muted/80'
            }`}
            aria-label="Ver análise de tendências"
          >
            <TrendingUp size={16} className="inline-block mr-2" />
            Análise
          </button>
        </div>
      </div>
      
      {activeTab === 'styles' ? (
        <div className="space-y-6">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder="Buscar cortes e estilos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
            <button className="p-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors" aria-label="Filtrar tendências">
              <Filter size={20} />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : sortedStyles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedStyles.map(style => (
                <motion.div
                  key={style.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="group overflow-hidden rounded-xl border bg-card shadow-sm hover:shadow-md transition-all"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={style.image} 
                      alt={style.name} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-white">{style.name}</h3>
                        <div className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                          {style.popularity}% em alta
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      className="absolute top-2 right-2 p-2 bg-white/20 backdrop-blur-sm text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/30"
                      aria-label="Compartilhar estilo"
                    >
                      <Share2 size={16} />
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground mb-3">{style.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {style.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="px-2 py-0.5 bg-muted text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Link 
                        to="/app/try-on" 
                        className="text-primary hover:underline text-sm flex items-center"
                      >
                        Experimentar <ArrowRight size={14} className="ml-1" />
                      </Link>
                      
                      <Link 
                        to="/app/explore" 
                        className="text-primary hover:underline text-sm flex items-center"
                      >
                        Barbeiros <ChevronRight size={14} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/20 rounded-lg border border-dashed">
              <Scissors size={40} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum estilo encontrado</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                {searchQuery || selectedTags.length > 0
                  ? "Não encontramos estilos com os filtros selecionados."
                  : "Não há estilos em tendência disponíveis no momento."}
              </p>
              {(searchQuery || selectedTags.length > 0) && (
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedTags([]);
                  }}
                  className="text-primary font-medium hover:underline"
                >
                  Limpar filtros
                </button>
              )}
            </div>
          )}
          
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Users className="mr-2" size={20} />
              Barbeiros em Alta
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {popularBarbers.map(barber => (
                <motion.div
                  key={barber.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card rounded-lg border p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center">
                    <div className="relative">
                      <img 
                        src={barber.avatar} 
                        alt={barber.name} 
                        className="w-12 h-12 rounded-full object-cover" 
                      />
                      {barber.trending && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-medium flex items-center justify-center rounded-full">
                          <TrendingUp size={10} />
                        </div>
                      )}
                    </div>
                    
                    <div className="ml-3">
                      <h3 className="font-medium">{barber.name}</h3>
                      <p className="text-xs text-muted-foreground">{barber.shop}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3 text-xs">
                    <p className="mb-2 text-muted-foreground">{barber.specialty}</p>
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <Star size={12} className="text-amber-500 fill-current mr-1" />
                        <span className="font-medium">{barber.rating}</span>
                      </div>
                      <span className="text-muted-foreground">{barber.distance}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t flex justify-between">
                    <Link 
                      to={`/app/barber/${barber.id}`} 
                      className="text-xs text-primary hover:underline"
                    >
                      Ver perfil
                    </Link>
                    <Link 
                      to={`/app/chat/barber/${barber.id}`} 
                      className="text-xs text-primary hover:underline"
                    >
                      Conversar
                    </Link>
                    <Link 
                      to="/app/appointments/new" 
                      className="text-xs text-primary hover:underline"
                    >
                      Agendar
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <TrendAnalyzer detailedView={true} showControls={true} />
          
          <div className="mt-8 border-t pt-8">
            <h2 className="text-xl font-semibold mb-4">Aproveite essas tendências</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-primary/5 border rounded-lg p-6">
                <h3 className="font-medium flex items-center">
                  <Calendar className="mr-2 text-primary" size={18} />
                  Agendamento Inteligente
                </h3>
                <p className="text-sm text-muted-foreground mt-2 mb-4">
                  Use nosso sistema para encontrar horários disponíveis com os barbeiros especializados nos estilos em alta.
                </p>
                <Link 
                  to="/app/appointments/new" 
                  className="text-primary hover:underline text-sm flex items-center"
                >
                  Agendar agora <ArrowRight size={14} className="ml-1" />
                </Link>
              </div>
              
              <div className="bg-primary/5 border rounded-lg p-6">
                <h3 className="font-medium flex items-center">
                  <Scissors className="mr-2 text-primary" size={18} />
                  Experimentação Virtual
                </h3>
                <p className="text-sm text-muted-foreground mt-2 mb-4">
                  Teste os cortes em tendência usando nossa ferramenta de realidade aumentada antes de agendar.
                </p>
                <Link 
                  to="/app/try-on" 
                  className="text-primary hover:underline text-sm flex items-center"
                >
                  Experimentar estilos <ArrowRight size={14} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 