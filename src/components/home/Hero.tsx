
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden noise-bg">
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black z-10"></div>
      
      <div className="container mx-auto px-4 relative z-20 text-center">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 animate-fade-in">
          eeolw
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto animate-slide-up">
          Музыкант из Ульяновска
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-white text-black hover:bg-gray-200 animate-slide-up">
            <Link to="/music">Слушать сейчас</Link>
          </Button>
          <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 animate-slide-up">
            <Link to="/tour">Тур по России</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
