import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  LogIn, 
  User, 
  Scissors, 
  Store, 
  TrendingUp, 
  Sparkles, 
  Calendar,
  BarChart,
  MapPin,
  Clock,
  MessageSquare,
  Star,
  Smartphone,
  ChevronRight,
  Users,
  Zap,
  BadgePercent,
  Cpu
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import AnimatedLogo from './AnimatedLogo';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Função para lidar com links de âncora
  const handleAnchorClick = (anchorId: string) => {
    if (isHomePage) {
      // Se já estiver na página inicial, apenas role até a âncora
      document.getElementById(anchorId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Se estiver em outra página, navegue para a home com a âncora
      navigate(`/#${anchorId}`);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-2 bg-background/80 backdrop-blur-lg shadow-sm' 
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="container-tight flex justify-between items-center">
        <Link to="/" className="z-10">
          <AnimatedLogo size={isScrolled ? 'small' : 'default'} />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-3">
          <div className="flex items-center space-x-6 mr-3">
            <Link to="/about" className="nav-link font-medium hover:text-primary transition-colors">
              Sobre
            </Link>
            
            {/* Menu Recursos */}
            <div className="relative group">
              <button 
                type="button"
                className="nav-link font-medium hover:text-primary flex items-center cursor-pointer bg-transparent border-none transition-colors"
                onMouseEnter={() => setDropdownOpen('recursos')}
                onMouseLeave={() => setDropdownOpen('')}
              >
                Recursos
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div 
                className={`absolute left-0 mt-2 w-80 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 transform transition-all duration-200 z-50 ${
                  dropdownOpen === 'recursos' ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onMouseEnter={() => setDropdownOpen('recursos')}
                onMouseLeave={() => setDropdownOpen('')}
              >
                <div className="py-2 px-3">
                  <div className="mb-2 pb-1 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Recursos Premium</span>
                  </div>
                  <Link 
                    to="/recursos/analise-tendencias" 
                    className="block px-3 py-2.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md flex items-start group transition-colors"
                  >
                    <div className="mr-3 p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-md group-hover:bg-purple-200 dark:group-hover:bg-purple-800/30 transition-colors mt-0.5 flex-shrink-0">
                      <TrendingUp className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium block">Análise de Tendências</span>
                        <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300">
                          <Cpu className="h-3 w-3 mr-1" />
                          IA
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Descubra o que está bombando no mundo da barbearia</span>
                      <span className="text-xs text-green-600 dark:text-green-400 font-medium">+67% de novos clientes em média</span>
                    </div>
                  </Link>
                  <Link 
                    to="/recursos/experiencia-virtual" 
                    className="block px-3 py-2.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md flex items-start group transition-colors mt-2"
                  >
                    <div className="mr-3 p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-md group-hover:bg-blue-200 dark:group-hover:bg-blue-800/30 transition-colors mt-0.5 flex-shrink-0">
                      <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium block">Experiência Virtual</span>
                        <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                          <Zap className="h-3 w-3 mr-1" />
                          AR
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Teste cortes antes de ir à barbearia</span>
                      <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">200+ estilos para experimentar</span>
                    </div>
                  </Link>
                  <Link 
                    to="/recursos/gestao-negocio" 
                    className="block px-3 py-2.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md flex items-start group transition-colors mt-2"
                  >
                    <div className="mr-3 p-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-md group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/30 transition-colors mt-0.5 flex-shrink-0">
                      <Store className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium block">Gestão de Negócio</span>
                        <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300">
                          <BarChart className="h-3 w-3 mr-1" />
                          PRO
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Dashboard completo para sua barbearia</span>
                      <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">+43% no faturamento médio</span>
                    </div>
                  </Link>
                  
                  <div className="my-3 pb-1 pt-2 border-t border-gray-100 dark:border-gray-700">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Agendamento</span>
                  </div>
                  <Link 
                    to="/recursos/agendamento-inteligente" 
                    className="block px-3 py-2.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md flex items-start group transition-colors"
                  >
                    <div className="mr-3 p-1.5 bg-green-100 dark:bg-green-900/30 rounded-md group-hover:bg-green-200 dark:group-hover:bg-green-800/30 transition-colors mt-0.5 flex-shrink-0">
                      <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium block">Agendamento Inteligente</span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 block">Reduza faltas em até 80% com lembretes automáticos</span>
                    </div>
                  </Link>
                  <Link 
                    to="/recursos/descoberta-barbeiros" 
                    className="block px-3 py-2.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md flex items-start group transition-colors mt-2"
                  >
                    <div className="mr-3 p-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-md group-hover:bg-amber-200 dark:group-hover:bg-amber-800/30 transition-colors mt-0.5 flex-shrink-0">
                      <MapPin className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium block">Descoberta de Barbeiros</span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Encontre os melhores profissionais próximos</span>
                    </div>
                  </Link>
                  <Link 
                    to="/recursos/chat-barbeiros" 
                    className="block px-3 py-2.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md flex items-start group transition-colors mt-2"
                  >
                    <div className="mr-3 p-1.5 bg-rose-100 dark:bg-rose-900/30 rounded-md group-hover:bg-rose-200 dark:group-hover:bg-rose-800/30 transition-colors mt-0.5 flex-shrink-0">
                      <MessageSquare className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium block">Chat com Barbeiros</span>
                        <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300">
                          Novo
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Comunique-se para resultados perfeitos</span>
                    </div>
                  </Link>
                  
                  <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 text-center">
                    <Link 
                      to="/recursos" 
                      className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      Ver todos os recursos
                      <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => handleAnchorClick('find-barbers')}
              className="nav-link font-medium hover:text-primary cursor-pointer bg-transparent border-none transition-colors"
              type="button"
            >
              Barbeiros
            </button>
            
            <button 
              onClick={() => handleAnchorClick('barbershop-owners')}
              className="nav-link font-medium hover:text-primary cursor-pointer bg-transparent border-none transition-colors"
              type="button"
            >
              Para Proprietários
            </button>
            
            <Link 
              to="/pricing" 
              className="nav-link font-medium hover:text-primary transition-colors"
            >
              Planos
            </Link>
          </div>
          
          <div className="h-6 w-px bg-border/60 mx-2"></div>
          
          {/* Menu Para Quem */}
          <div className="relative group mr-2">
            <button 
              type="button"
              className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onMouseEnter={() => setDropdownOpen('para-quem')}
              onMouseLeave={() => setDropdownOpen('')}
            >
              Acesso
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div 
              className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 transform transition-all duration-200 z-50 ${
                dropdownOpen === 'para-quem' ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}
              onMouseEnter={() => setDropdownOpen('para-quem')}
              onMouseLeave={() => setDropdownOpen('')}
            >
              <div className="py-1">
                <Link to="/login?type=client" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Área do Cliente
                </Link>
                <Link to="/login?type=barber" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center">
                  <Scissors className="mr-2 h-4 w-4" />
                  Área do Barbeiro
                </Link>
                <Link to="/barbershop-login" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center">
                  <Store className="mr-2 h-4 w-4" />
                  Área da Barbearia
                </Link>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Link 
              to="/register" 
              className="px-3 py-1.5 text-sm font-medium bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cadastrar
            </Link>
            
            <Link 
              to="/login" 
              className="bg-primary text-primary-foreground px-4 py-1.5 rounded text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Entrar
            </Link>
            
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <ThemeToggle />
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="ml-2 p-2 rounded-md text-muted-foreground hover:text-foreground"
            aria-label="Abrir menu"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 bg-background/80 backdrop-blur-sm z-50 transition-opacity duration-300 md:hidden ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex justify-end p-4">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground"
              aria-label="Fechar menu"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col items-center gap-6 p-8">
            <Link 
              to="/" 
              className="text-2xl font-bold"
              onClick={() => setMobileMenuOpen(false)}
            >
              <AnimatedLogo size="default" />
            </Link>
            
            <div className="w-full space-y-3 mt-8">
              <Link 
                to="/about" 
                className="flex justify-center items-center py-2.5 px-4 rounded-lg hover:bg-muted text-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sobre
              </Link>
              
              <div className="w-full border-t my-2"></div>
              
              <p className="text-sm font-medium text-muted-foreground px-4 py-1">Recursos Premium:</p>
              <Link 
                to="/recursos/analise-tendencias" 
                className="flex items-start py-3 px-4 rounded-md hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="mr-3 p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-md mt-0.5 flex-shrink-0">
                  <TrendingUp className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="font-medium block">Análise de Tendências</span>
                    <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300">
                      <Cpu className="h-3 w-3 mr-1" />
                      IA
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground block">Descubra o que está bombando no mundo da barbearia</span>
                </div>
              </Link>
              <Link 
                to="/recursos/experiencia-virtual" 
                className="flex items-start py-3 px-4 rounded-md hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="mr-3 p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-md mt-0.5 flex-shrink-0">
                  <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="font-medium block">Experiência Virtual</span>
                    <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                      <Zap className="h-3 w-3 mr-1" />
                      AR
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">Teste cortes antes de ir à barbearia</span>
                </div>
              </Link>
              <Link 
                to="/recursos/gestao-negocio" 
                className="flex items-start py-3 px-4 rounded-md hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="mr-3 p-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-md mt-0.5 flex-shrink-0">
                  <Store className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="font-medium block">Gestão de Negócio</span>
                    <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300">
                      <BarChart className="h-3 w-3 mr-1" />
                        PRO
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">Dashboard completo para sua barbearia</span>
                </div>
              </Link>
              
              <p className="text-sm font-medium text-muted-foreground px-4 py-1 mt-3">Agendamento:</p>
              <Link 
                to="/recursos/agendamento-inteligente" 
                className="flex items-start py-3 px-4 rounded-md hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="mr-3 p-1.5 bg-green-100 dark:bg-green-900/30 rounded-md mt-0.5 flex-shrink-0">
                  <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="font-medium block">Agendamento Inteligente</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Marque horários com confirmação automática</span>
                </div>
              </Link>
              <Link 
                to="/recursos/descoberta-barbeiros" 
                className="flex items-start py-3 px-4 rounded-md hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="mr-3 p-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-md mt-0.5 flex-shrink-0">
                  <MapPin className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="font-medium block">Descoberta de Barbeiros</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Encontre os melhores profissionais próximos</span>
                </div>
              </Link>
              <Link 
                to="/recursos/chat-barbeiros" 
                className="flex items-start py-3 px-4 rounded-md hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="mr-3 p-1.5 bg-rose-100 dark:bg-rose-900/30 rounded-md mt-0.5 flex-shrink-0">
                  <MessageSquare className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                </div>
                <div>
                  <div className="flex items-center">
                    <span className="font-medium block">Chat com Barbeiros</span>
                    <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300">
                      Novo
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">Comunique-se para resultados perfeitos</span>
                </div>
              </Link>

              <div className="mt-4 px-4">
                <Link 
                  to="/recursos" 
                  className="flex items-center justify-center py-2 px-4 bg-muted/50 rounded-md hover:bg-muted transition-colors text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="font-medium">Ver todos os recursos</span>
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
              
              <div className="w-full border-t my-3"></div>
              
              <button
                className="w-full flex justify-center items-center py-2.5 px-4 rounded-lg hover:bg-muted text-lg transition-colors"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleAnchorClick('find-barbers');
                }}
              >
                Barbeiros
              </button>
              <button
                className="w-full flex justify-center items-center py-2.5 px-4 rounded-lg hover:bg-muted text-lg transition-colors"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleAnchorClick('barbershop-owners');
                }}
              >
                Para Proprietários
              </button>
              
              <Link 
                to="/pricing" 
                className="flex justify-center items-center py-2.5 px-4 rounded-lg hover:bg-muted text-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Planos
              </Link>

              <div className="w-full border-t my-3"></div>
              
              <p className="text-sm font-medium text-muted-foreground px-4 py-1">Acesso:</p>
              <Link 
                to="/login?type=client" 
                className="flex items-center py-2 px-4 rounded-md hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="mr-2 h-4 w-4" />
                <span>Área do Cliente</span>
              </Link>
              <Link 
                to="/login?type=barber" 
                className="flex items-center py-2 px-4 rounded-md hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Scissors className="mr-2 h-4 w-4" />
                <span>Área do Barbeiro</span>
              </Link>
              <Link 
                to="/barbershop-login" 
                className="flex items-center py-2 px-4 rounded-md hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Store className="mr-2 h-4 w-4" />
                <span>Área da Barbearia</span>
              </Link>
  
              <div className="w-full border-t my-3"></div>
              
              <div className="flex flex-col gap-2 px-4">
                <Link 
                  to="/register" 
                  className="block text-center py-2 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Cadastrar
                </Link>
                <Link 
                  to="/login" 
                  className="block text-center py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Entrar
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
