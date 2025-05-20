
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Section from "../ui/Section";
import SectionTitle from "../ui/SectionTitle";

const UpcomingShows = () => {
  const shows = [
    {
      id: 1,
      date: "June 15, 2025",
      city: "Ulyanovsk",
      venue: "Club Volga",
      ticketsAvailable: true
    },
    {
      id: 2,
      date: "June 28, 2025",
      city: "Moscow",
      venue: "Powerhouse",
      ticketsAvailable: true
    },
    {
      id: 3,
      date: "July 10, 2025",
      city: "Saint Petersburg",
      venue: "MOD Club",
      ticketsAvailable: false
    }
  ];

  return (
    <Section className="bg-secondary">
      <SectionTitle subtitle="Присоединяйся">
        Ближайшие концерты
      </SectionTitle>
      
      <div className="grid grid-cols-1 gap-4 mb-8">
        {shows.map((show) => (
          <div 
            key={show.id} 
            className="concert-item grid grid-cols-1 md:grid-cols-4 gap-4 items-center text-left"
          >
            <div>
              <div className="font-mono font-bold">{show.date}</div>
            </div>
            
            <div>
              <div className="font-bold">{show.city}</div>
              <div className="text-gray-400 text-sm">{show.venue}</div>
            </div>
            
            <div className="text-white/70">
              {show.ticketsAvailable ? "Билеты доступны" : "Билеты распроданы"}
            </div>
            
            <div>
              <Button 
                asChild
                variant={show.ticketsAvailable ? "default" : "outline"}
                className={show.ticketsAvailable ? "bg-white text-black hover:bg-gray-200" : "border-white/50 text-white/50"}
                disabled={!show.ticketsAvailable}
              >
                <Link to={show.ticketsAvailable ? `/tour/tickets/${show.id}` : "#"}>
                  {show.ticketsAvailable ? "КУПИТЬ БИЛЕТ" : "  РАСПРОДАНО "}
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
          <Link to="/tour">Все концерты</Link>
        </Button>
      </div>
    </Section>
  );
};

export default UpcomingShows;
