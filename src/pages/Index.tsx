
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import { FeatureCard } from '@/components/FeatureCard';
import { ARPreview } from '@/components/ARPreview';
import { BarberCard } from '@/components/BarberCard';
import { Footer } from '@/components/Footer';
import { 
  Scissors, 
  Calendar, 
  MapPin, 
  Clock,
  MessageSquare,
  Sparkles,
  Download,
  ArrowRight
} from 'lucide-react';

const BARBERS = [
  { name: "Alex Martin", specialty: "Fades & Classic Cuts", rating: 4.9, reviewCount: 324, imageIndex: 1 },
  { name: "Marcus Johnson", specialty: "Beard Styling", rating: 4.7, reviewCount: 221, imageIndex: 2 },
  { name: "Ryan Garcia", specialty: "Modern Styles", rating: 4.8, reviewCount: 189, imageIndex: 3 },
  { name: "David Wilson", specialty: "Vintage Cuts", rating: 4.6, reviewCount: 156, imageIndex: 4 },
];

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <HeroSection />
        
        {/* Features Section */}
        <section id="features" className="section-padding">
          <div className="container-tight">
            <div className="text-center mb-16">
              <h2 className="heading-2 mb-4">App Features</h2>
              <p className="sub-heading max-w-2xl mx-auto">
                Explore the innovative features that make BarberMatch the ultimate barber booking platform
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                title="AI Style Recommendations"
                description="Get personalized haircut suggestions based on your face shape and preferences"
                icon={<Scissors size={24} />}
                delay={100}
              />
              <FeatureCard
                title="Smart Scheduling"
                description="Book appointments that fit perfectly into your calendar"
                icon={<Calendar size={24} />}
                delay={200}
              />
              <FeatureCard
                title="Barber Discovery"
                description="Find top-rated barbers in your area with the skills you need"
                icon={<MapPin size={24} />}
                delay={300}
              />
              <FeatureCard
                title="Wait Time Predictions"
                description="Know exactly how long your appointment will take"
                icon={<Clock size={24} />}
                delay={400}
              />
              <FeatureCard
                title="In-App Messaging"
                description="Chat directly with your barber for perfect results"
                icon={<MessageSquare size={24} />}
                delay={500}
              />
              <FeatureCard
                title="AR Technology"
                description="Preview haircuts on yourself before your appointment"
                icon={<Sparkles size={24} />}
                delay={600}
              />
            </div>
          </div>
        </section>
        
        {/* AR Preview Section */}
        <ARPreview />
        
        {/* Barbers Section */}
        <section id="find-barbers" className="section-padding">
          <div className="container-tight">
            <div className="text-center mb-16">
              <h2 className="heading-2 mb-4">Featured Barbers</h2>
              <p className="sub-heading max-w-2xl mx-auto">
                Connect with skilled professionals who can bring your style to life
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {BARBERS.map((barber, index) => (
                <BarberCard
                  key={barber.name}
                  name={barber.name}
                  specialty={barber.specialty}
                  rating={barber.rating}
                  reviewCount={barber.reviewCount}
                  imageIndex={barber.imageIndex}
                  delay={index * 100}
                />
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <a
                href="#"
                className="inline-flex items-center text-primary font-medium hover:underline"
              >
                View all barbers <ArrowRight size={16} className="ml-1" />
              </a>
            </div>
          </div>
        </section>
        
        {/* Download Section */}
        <section id="download" className="section-padding bg-primary text-white">
          <div className="container text-center">
            <h2 className="heading-2 mb-4">Download BarberMatch</h2>
            <p className="sub-heading text-white/80 max-w-xl mx-auto mb-8">
              Get the app now and transform your barbershop experience
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="#"
                className="px-6 py-3 bg-white text-primary rounded-full flex items-center justify-center gap-2 hover:bg-white/90 transition-colors"
              >
                <Download size={20} />
                <span className="font-medium">App Store</span>
              </a>
              <a
                href="#"
                className="px-6 py-3 bg-white/10 text-white border border-white/20 rounded-full flex items-center justify-center gap-2 hover:bg-white/20 transition-colors"
              >
                <Download size={20} />
                <span className="font-medium">Google Play</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
