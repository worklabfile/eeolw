
import MainLayout from "@/components/layout/MainLayout";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";

const About = () => {
  return (
    <MainLayout>
      <div className="pt-16 bg-black noise-bg">
        <Section>
          <SectionTitle subtitle="Узнайте больше об артисте">ОБ АРТИСТЕ eeolw</SectionTitle>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="aspect-square bg-secondary hover-glow">
              <img 
                src="/placeholder2.svg" 
                alt="eeolw portrait" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="text-left space-y-6">
              <p className="text-lg text-gray-300">
                eeolw — это электронный музыкант и диджей из Ульяновска, Россия, который создает 
                атмосферные звуковые ландшафты с 2018 года.
              </p>
              
              <p className="text-gray-300">
                Сочетая элементы амбиента, техно и экспериментальной электронной музыки, eeolw создает 
                погружающиеся в цифровые сны звуковые ландшафты.
              </p>
              
              <p className="text-gray-300">
                С влиянием от электронной музыки 80-х и современных звуковых дизайнеров, eeolw's 
                музыка существует на пересечении ностальгии и будущего.
              </p>
              
              <div className="pt-4">
                <h3 className="font-mono text-xl font-bold mb-3">ОБОРУДОВАНИЕ И ПРОЦЕСС</h3>
                <p className="text-gray-300">
                  Используя комбинацию аудиоаппаратуры, записей из природной среды и цифровой обработки, 
                  eeolw создает каждый трек с тщательным вниманием к звуковым деталям.
                </p>
              </div>
            </div>
          </div>
        </Section>
        
        <Section className="bg-secondary">
          <SectionTitle>ДИСКОГРАФИЯ</SectionTitle>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group hover-glow">
              <div className="aspect-square bg-black mb-4">
                <img 
                  src="/album1.svg" 
                  alt="Album cover" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-mono text-lg font-bold group-hover:text-white transition-colors">ТЕМНАЯ АНДЖЕЛА</h3>
              <p className="text-gray-400">EP • 2025</p>
            </div>
            
            <div className="group hover-glow">
              <div className="aspect-square bg-black mb-4">
                <img 
                  src="/album2.svg" 
                  alt="Album cover" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-mono text-lg font-bold group-hover:text-white transition-colors">HANDYCAM</h3>
              <p className="text-gray-400">EP • 2025</p>
            </div>
            
            <div className="group hover-glow">
              <div className="aspect-square bg-black mb-4">
                <img 
                  src="/album3.svg" 
                  alt="Album cover" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-mono text-lg font-bold group-hover:text-white transition-colors">ИНСТИНКТ</h3>
              <p className="text-gray-400">EP • 2025</p>
            </div>
          </div>
        </Section>
      </div>
    </MainLayout>
  );
};

export default About;
