
import { Scissors } from 'lucide-react';

export function Logo({ size = 'default' }: { size?: 'small' | 'default' | 'large' }) {
  const sizes = {
    small: {
      container: 'h-8 w-8',
      icon: 16,
      text: 'text-lg'
    },
    default: {
      container: 'h-10 w-10',
      icon: 20,
      text: 'text-xl'
    },
    large: {
      container: 'h-14 w-14',
      icon: 28,
      text: 'text-2xl'
    }
  };

  const sizeConfig = sizes[size];

  return (
    <div className="flex items-center gap-2">
      <div className={`${sizeConfig.container} flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-white shadow-premium`}>
        <Scissors size={sizeConfig.icon} className="transform -rotate-45" />
      </div>
      <span className={`font-heading font-bold ${sizeConfig.text} tracking-tight`}>
        Barber<span className="text-primary">Match</span>
      </span>
    </div>
  );
}

export default Logo;
