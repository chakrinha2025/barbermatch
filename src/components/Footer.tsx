
import { animationClasses } from '@/lib/animations';
import { Instagram, Twitter, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary py-12 md:py-16">
      <div className="container">
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-8 ${animationClasses.fadeIn}`}>
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold mb-4">BarberMatch</h2>
            <p className="text-muted-foreground max-w-md mb-6">
              Revolutionizing the barbershop experience with AI and AR technology. Find your perfect style and barber.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground/70 hover:text-primary" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary" aria-label="Facebook">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Features', 'Virtual Try-On', 'Find Barbers', 'Download'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-primary text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              {['Privacy Policy', 'Terms of Use', 'Cookie Policy', 'Data Processing'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-primary text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} BarberMatch. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-xs text-muted-foreground hover:text-primary">
                Privacy
              </a>
              <a href="#" className="text-xs text-muted-foreground hover:text-primary">
                Terms
              </a>
              <a href="#" className="text-xs text-muted-foreground hover:text-primary">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
