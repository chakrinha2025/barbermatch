import React, { useState } from 'react';
import { Search, MapPin, Star, Scissors, Filter, Clock, Lock } from 'lucide-react';
import BarberCard from './BarberCard';
import { Link } from 'react-router-dom';

interface Barber {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  location: string;
  distance: string;
  imageIndex: number;
}

const MOCK_BARBERS: Barber[] = [
  { 
    id: '1', 
    name: 'Carlos Silva', 
    specialty: 'Cortes Modernos', 
    rating: 4.8, 
    reviewCount: 127, 
    location: 'Centro, São Paulo', 
    distance: '1.2 km',
    imageIndex: 0
  },
  { 
    id: '2', 
    name: 'André Martins', 
    specialty: 'Barbas Modeladas', 
    rating: 4.6, 
    reviewCount: 98, 
    location: 'Pinheiros, São Paulo', 
    distance: '2.5 km',
    imageIndex: 1
  },
  { 
    id: '3', 
    name: 'Marcos Oliveira', 
    specialty: 'Degradê e Desenhos', 
    rating: 4.9, 
    reviewCount: 215, 
    location: 'Vila Madalena, São Paulo', 
    distance: '3.1 km',
    imageIndex: 2
  },
  { 
    id: '4', 
    name: 'Lucas Ferreira', 
    specialty: 'Cortes Clássicos', 
    rating: 4.7, 
    reviewCount: 145, 
    location: 'Moema, São Paulo', 
    distance: '4.8 km',
    imageIndex: 3
  },
];

export function BasicBarberFinder() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBarbers, setFilteredBarbers] = useState<Barber[]>(MOCK_BARBERS);
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = MOCK_BARBERS.filter(barber => 
      barber.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      barber.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      barber.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBarbers(filtered);
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nome, especialidade ou local..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-background"
            />
          </div>
          <button 
            type="submit" 
            className="px-4 py-2 bg-primary text-white rounded-lg"
          >
            Buscar
          </button>
          <button 
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 border border-gray-300 dark:border-gray-700 rounded-lg"
            aria-label="Toggle filters"
          >
            <Filter className="h-5 w-5" />
          </button>
        </form>
      </div>

      {showFilters && (
        <div className="mb-6 p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
          <h3 className="font-medium mb-3">Filtros Básicos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Especialidade</label>
              <select className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-background">
                <option value="">Todas as especialidades</option>
                <option value="moderno">Cortes Modernos</option>
                <option value="barba">Barbas</option>
                <option value="degrade">Degradê</option>
                <option value="classico">Cortes Clássicos</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Avaliação Mínima</label>
              <select className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-background">
                <option value="0">Qualquer avaliação</option>
                <option value="3">3+ estrelas</option>
                <option value="4">4+ estrelas</option>
                <option value="4.5">4.5+ estrelas</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Distância</label>
              <select className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-background">
                <option value="0">Qualquer distância</option>
                <option value="1">Até 1 km</option>
                <option value="5">Até 5 km</option>
                <option value="10">Até 10 km</option>
              </select>
            </div>
          </div>
          <div className="mt-4 text-center text-xs text-gray-500">
            <span className="inline-flex items-center">
              <Lock size={12} className="mr-1" /> 
              Filtros avançados disponíveis no plano premium
            </span>
          </div>
        </div>
      )}

      {filteredBarbers.length === 0 ? (
        <div className="text-center py-10">
          <div className="mb-4">
            <Search className="h-12 w-12 text-gray-400 mx-auto" />
          </div>
          <h3 className="text-lg font-medium mb-2">Nenhum resultado encontrado</h3>
          <p className="text-gray-500 mb-4">Tente ajustar sua busca ou filtros</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setFilteredBarbers(MOCK_BARBERS);
            }}
            className="text-primary font-medium"
          >
            Ver todos os barbeiros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBarbers.map((barber, index) => (
            <div key={barber.id} className="flex flex-col">
              <BarberCard
                name={barber.name}
                specialty={barber.specialty}
                rating={barber.rating}
                reviewCount={barber.reviewCount}
                imageIndex={barber.imageIndex}
                delay={index * 0.1}
              />
              <div className="mt-2 px-2">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <MapPin size={14} className="mr-1" />
                  <span>{barber.location}</span>
                  <span className="mx-1">•</span>
                  <span>{barber.distance}</span>
                </div>
                <Link
                  to={`/barbeiros/${barber.id}`}
                  className="w-full py-2 mt-2 flex justify-center items-center gap-2 bg-primary text-white rounded-lg text-sm font-medium transition-colors hover:bg-primary/90"
                >
                  <Clock size={14} />
                  Agendar Horário
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
        <p className="text-sm text-gray-500 mb-4">
          Mostrando {filteredBarbers.length} de {MOCK_BARBERS.length} barbeiros disponíveis
        </p>
        <Link
          to="/pricing"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
        >
          Desbloqueie recursos premium para encontrar o barbeiro perfeito
          <Scissors size={14} />
        </Link>
      </div>
    </div>
  );
}

export default BasicBarberFinder;
