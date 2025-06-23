
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
              eeolw – новый взрыв на музыкальной сцене!
              </p>
              
              <p className="text-gray-300">
              Молодой и дерзкий исполнитель и диджей из Ульяновска, eeolw, с 2020 года создает музыку, которая ломает шаблоны и заставляет слушателей пересмотреть свои представления о современном звучании. Его треки – это не просто песни, а настоящие аудиовизуальные эксперименты, где каждая нота пропита инновациями и страстью к музыке.
              </p>
              
              <p className="text-gray-300">
              С детства вдохновляясь легендами – The Police, Queen, The Beatles, Daft Punk, Gorillaz – eeolw мастерски соединяет ретро-нотки с футуристичными битами, создавая уникальный стиль на стыке ностальгии и звуков будущего. Его музыка – это мост между поколениями, который оценят как ценители классики, так и поклонники свежих электронных волн.
              </p>
              
              <div className="pt-4">
                <h3 className="font-mono text-xl font-bold mb-3">Если ты ищешь что-то большее, чем просто музыка, если ты готов к смелым экспериментам и новым эмоциям – eeolw уже ждет тебя!</h3>
                <p className="text-gray-300">
                eeolw создает музыку, которая не просто звучит, но и заставляет слушателей переживать эмоции. Его музыка – это не просто звуки, а настоящие эксперименты, которые заставляют слушателей задуматься о музыке и ее роли в их жизни.
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
