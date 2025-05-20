
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/MainLayout";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";

const Tour = () => {
  const shows = [
    {
      id: 1,
      date: "15 июня, 2025",
      city: "Ульяновск",
      venue: "Клуб Волга",
      address: "ул. Ленина, 10, Ульяновск",
      ticketsAvailable: true
    },
    {
      id: 2,
      date: "28 июня, 2025",
      city: "Москва",
      venue: "Powerhouse",
      address: "ул. Гончарная, 7, Москва",
      ticketsAvailable: true
    },
    {
      id: 3,
      date: "10 июля, 2025",
      city: "Санкт-Петербург",
      venue: "MOD Club",
      address: "Невский проспект, 7, Санкт-Петербург",
      ticketsAvailable: false
    },
    {
      id: 4,
      date: "24 июля, 2025",
      city: "Казань",
      venue: "Смена",
      address: "ул. Бурхана, 52, Казань",
      ticketsAvailable: true
    },
    {
      id: 5,
      date: "5 августа, 2025",
      city: "Нижний Новгород",
      venue: "Music Hall",
      address: "ул. Большая Покровская, 12, Нижний Новгород",
      ticketsAvailable: true
    }
  ];

  return (
    <MainLayout>
      <div className="pt-16 bg-black noise-bg">
        <Section>
          <SectionTitle subtitle="eeolw на сцене">
            ТУР
          </SectionTitle>
          
          <div className="grid grid-cols-1 gap-4 mb-8">
            {shows.map((show) => (
              <div 
                key={show.id} 
                className="concert-item grid grid-cols-1 md:grid-cols-5 gap-4 items-center text-left"
              >
                <div>
                  <div className="font-mono font-bold">{show.date}</div>
                </div>
                
                <div className="md:col-span-2">
                  <div className="font-bold">{show.city}</div>
                  <div className="text-gray-400 text-sm">{show.venue}</div>
                  <div className="text-gray-500 text-sm">{show.address}</div>
                </div>
                
                <div className="text-white/70">
                  {show.ticketsAvailable ? "БИЛЕТЫ в продаже" : "Все БИЛЕТЫ проданы"}
                </div>
                
                <div>
                  <Button 
                    asChild
                    variant={show.ticketsAvailable ? "default" : "outline"}
                    className={show.ticketsAvailable ? "bg-white text-black hover:bg-gray-200" : "border-white/50 text-white/50"}
                    disabled={!show.ticketsAvailable}
                  >
                    <Link to={show.ticketsAvailable ? `/tour/tickets/${show.id}` : "#"}>
                      {show.ticketsAvailable ? "КУПИТЬ БИЛЕТЫ" : "  РАСПРОДАНО "}
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-secondary p-6 mt-12">
            <h3 className="font-mono text-xl font-bold mb-4">ИНФОРМАЦИЯ О Тур по России</h3>
            <div className="text-left space-y-4">
              <p className="text-gray-300">
                Присоединяйтесь к eeolw в рамках Тур по России "ТЕМНАЯ АНДЖЕЛА" по России. Иммерсивное аудиовизуальное 
                представление с треками из последнего EP и любимыми треками из предыдущих релизов.
              </p>
              <p className="text-gray-300">
                Все мероприятия 18+ если не указано иное. Двери обычно открываются за 1 час до начала выступления.
              </p>
              <p className="text-gray-300">
                По вопросам организации концертов используйте контактную форму или пишите напрямую на management@eeolw.com
              </p>
            </div>
          </div>
        </Section>
      </div>
    </MainLayout>
  );
};

export default Tour;
