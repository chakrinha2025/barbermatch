
import { useState } from 'react';
import { animationClasses } from '@/lib/animations';
import { Scissors, Camera, Sparkles } from 'lucide-react';

const HAIRSTYLES = [
  { id: 1, name: 'Classic Fade' },
  { id: 2, name: 'Pompadour' },
  { id: 3, name: 'Undercut' },
  { id: 4, name: 'Crew Cut' },
  { id: 5, name: 'Buzz Cut' },
  { id: 6, name: 'Slick Back' },
];

export function ARPreview() {
  const [activeStyle, setActiveStyle] = useState(1);

  return (
    <section id="virtual-try-on" className="section-padding bg-secondary/50">
      <div className="container-tight">
        <div className="text-center mb-16">
          <h2 className="heading-2 mb-4">Virtual Haircut Preview</h2>
          <p className="sub-heading max-w-2xl mx-auto">
            Try different hairstyles virtually before your appointment using our advanced AR technology
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 flex flex-col justify-center space-y-6">
            <div className={`${animationClasses.fadeIn}`}>
              <h3 className="heading-3 mb-4">Choose Your Style</h3>
              <p className="text-muted-foreground mb-6">
                Browse through popular hairstyles and see how they look on you in real-time
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                {HAIRSTYLES.map((style) => (
                  <button
                    key={style.id}
                    className={`p-3 rounded-lg transition-all text-left ${
                      activeStyle === style.id
                        ? 'bg-primary text-white'
                        : 'bg-white/70 hover:bg-white'
                    }`}
                    onClick={() => setActiveStyle(style.id)}
                  >
                    <span className="font-medium">{style.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={`space-y-4 ${animationClasses.fadeIn}`} style={{ animationDelay: '200ms' }}>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Scissors size={16} />
                <span>AI-powered style recommendations</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Camera size={16} />
                <span>Real-time face tracking</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles size={16} />
                <span>High-fidelity rendering</span>
              </div>
            </div>
          </div>

          <div className={`lg:col-span-3 ${animationClasses.fadeIn}`} style={{ animationDelay: '300ms' }}>
            <div className="aspect-[3/4] rounded-2xl glass overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
              
              <div className="absolute inset-x-0 top-4 flex justify-center">
                <div className="px-4 py-2 rounded-full glass text-sm">
                  <span className="text-primary font-medium">AI Preview</span>
                </div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-24 h-24 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
                    <Camera size={32} className="text-muted-foreground" />
                  </div>
                  <h4 className="font-medium mb-2">Camera Access Required</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Allow camera access to try haircuts virtually
                  </p>
                  <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium">
                    Enable Camera
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ARPreview;
