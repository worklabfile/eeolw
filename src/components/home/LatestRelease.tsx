
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Section from "../ui/Section";
import SectionTitle from "../ui/SectionTitle";

const LatestRelease = () => {
  return (
    <Section className="bg-black">
      <SectionTitle subtitle="Доступен на стриминговых платформах">
        Последний релиз
      </SectionTitle>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="aspect-square bg-secondary hover-glow">
          <img 
            src="/placeholder.svg" 
            alt="Latest album cover" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="text-left space-y-4">
          <h3 className="font-mono text-2xl font-bold">ТЕМНАЯ АНДЖЕЛА</h3>
          <p className="text-gray-400">Выпущен: 2025</p>
          <p className="text-gray-300">
            Последний EP от eeolw исследует пересечение эмбиентных текстур и новых ритмов, создавая звуковой ландшафт, отражающий цифровую эпоху, в которую мы живем.
          </p>
          
          <div className="pt-4">
            <h4 className="font-mono text-lg mb-2">Трэклист</h4>
            <ul className="space-y-1 text-gray-300">
              <li>1. ЗАПОМНИ</li>
              <li>2. ИНВЕРСИЯ (feat. gu1vazZ)</li>
              <li>3. ПРОСТО</li>
              <li>4. МОДЕЛЬ (feat. 3pleOpium)</li>
            </ul>
          </div>
          
          <div className="pt-4">
            <Button asChild className="bg-white text-black hover:bg-gray-200">
              <Link to="/music">Слушать сейчас</Link>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default LatestRelease;
