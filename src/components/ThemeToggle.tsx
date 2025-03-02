
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Verificar preferência salva ou usar preferência do sistema
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialIsDark = savedTheme 
      ? savedTheme === 'dark' 
      : prefersDark;
    
    setIsDarkMode(initialIsDark);
    applyTheme(initialIsDark);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDarkMode;
    setIsDarkMode(newIsDark);
    applyTheme(newIsDark);
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };

  const applyTheme = (isDark: boolean) => {
    document.documentElement.classList.toggle('dark', isDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-secondary/80 hover:bg-secondary transition-colors"
      aria-label={isDarkMode ? "Mudar para modo claro" : "Mudar para modo escuro"}
    >
      {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

export default ThemeToggle;
