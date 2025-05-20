
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import MainLayout from "@/components/layout/MainLayout";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { supabase } from "@/integrations/supabase/client";

interface TicketType {
  id: string;
  name: string;
  price: number;
  description: string;
}

const TicketPurchase = () => {
  const { showId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [showData, setShowData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedTicketType, setSelectedTicketType] = useState<string>("standard");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: ""
  });

  const ticketTypes: Record<string, TicketType> = {
    standard: {
      id: "standard",
      name: "Стандартный билет",
      price: 1500,
      description: "Вход на мероприятие"
    },
    vip: {
      id: "vip",
      name: "VIP билет",
      price: 3000,
      description: "Приоритетный вход, эксклюзивный мерч, встреча с артистом"
    }
  };

  useEffect(() => {
    // Имитация получения данных о концерте на основе showId
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
    
    const show = shows.find(s => s.id.toString() === showId);
    if (show) {
      setShowData(show);
    } else {
      navigate("/tour");
      toast({
        title: "Концерт не найден",
        description: "Запрошенный концерт не найден.",
        variant: "destructive"
      });
    }
    setLoading(false);
  }, [showId, navigate, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 10) {
      setQuantity(value);
    }
  };

  const handleTicketTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTicketType(e.target.value);
  };

  const calculateTotal = () => {
    const selectedTicket = ticketTypes[selectedTicketType];
    return selectedTicket.price * quantity;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Сохранение данных о заказе в Supabase
      const { error } = await supabase
        .from('ticket_orders')
        .insert([{
          full_name: formData.fullName,
          email: formData.email,
          phone_number: formData.phoneNumber,
          show_id: parseInt(showId || "0"),
          ticket_type: selectedTicketType,
          quantity: quantity,
          total_price: calculateTotal()
        }]);
      
      if (error) throw error;
      
      // Перенаправление на страницу успешного заказа
      navigate("/tickets/success", { 
        state: { 
          showData,
          ticketType: ticketTypes[selectedTicketType],
          quantity,
          total: calculateTotal(),
          purchaserName: formData.fullName
        } 
      });
    } catch (error) {
      console.error("Ошибка при оформлении заказа:", error);
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте позже.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="pt-24 min-h-[60vh] flex justify-center items-center">
          <p className="text-xl">Загрузка...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="pt-16 bg-black noise-bg">
        <Section>
          <SectionTitle>ПОКУПКА БИЛЕТОВ</SectionTitle>
          
          <div className="bg-secondary p-6 mb-8 text-left">
            <h3 className="font-mono text-xl font-bold">ИНФОРМАЦИЯ О КОНЦЕРТЕ</h3>
            <div className="mt-4">
              <p className="text-xl font-bold">{showData.city}</p>
              <p className="text-gray-300">{showData.venue}</p>
              <p className="text-gray-400">{showData.address}</p>
              <p className="text-gray-300 mt-2 font-mono">{showData.date}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-left space-y-6">
              <h3 className="font-mono text-xl font-bold">ВАРИАНТЫ БИЛЕТОВ</h3>
              
              <div className="space-y-4">
                {Object.values(ticketTypes).map(ticket => (
                  <div 
                    key={ticket.id} 
                    className={`p-4 border cursor-pointer transition-all ${
                      selectedTicketType === ticket.id 
                        ? "border-white bg-white/5" 
                        : "border-white/20 hover:border-white/50"
                    }`}
                    onClick={() => setSelectedTicketType(ticket.id)}
                  >
                    <div className="flex items-start">
                      <input
                        type="radio"
                        id={ticket.id}
                        name="ticketType"
                        value={ticket.id}
                        checked={selectedTicketType === ticket.id}
                        onChange={handleTicketTypeChange}
                        className="mt-1 mr-3"
                      />
                      <div>
                        <label htmlFor={ticket.id} className="font-bold cursor-pointer">
                          {ticket.name} - {ticket.price} ₽
                        </label>
                        <p className="text-gray-400 text-sm mt-1">{ticket.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-400 mb-1">
                  Количество
                </label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  max="10"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-24 p-2 bg-black/50 border border-white/20 text-white focus:outline-none focus:ring-1 focus:ring-white"
                />
                <p className="text-gray-400 text-sm mt-1">Максимум 10 билетов за один заказ</p>
              </div>
              
              <div className="pt-4">
                <h4 className="font-mono text-lg mb-2">ИТОГО</h4>
                <div className="flex justify-between border-b border-white/20 pb-2 mb-2">
                  <span>
                    {ticketTypes[selectedTicketType].name} x {quantity}
                  </span>
                  <span>{ticketTypes[selectedTicketType].price * quantity} ₽</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Итого</span>
                  <span>{calculateTotal()} ₽</span>
                </div>
              </div>
            </div>
            
            <div className="bg-secondary p-6">
              <h3 className="font-mono text-xl font-bold mb-4 text-left">ИНФОРМАЦИЯ О ПОКУПАТЕЛЕ</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="text-left">
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-400 mb-1">
                    ФИО
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full p-2 bg-black/50 border border-white/20 text-white focus:outline-none focus:ring-1 focus:ring-white"
                  />
                </div>
                
                <div className="text-left">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 bg-black/50 border border-white/20 text-white focus:outline-none focus:ring-1 focus:ring-white"
                  />
                  <p className="text-gray-400 text-sm mt-1">БИЛЕТЫ будут отправлены на этот email</p>
                </div>
                
                <div className="text-left">
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-400 mb-1">
                    Номер телефона
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    required
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full p-2 bg-black/50 border border-white/20 text-white focus:outline-none focus:ring-1 focus:ring-white"
                  />
                </div>
                
                <div className="text-left pt-4">
                  <p className="text-gray-400 text-sm mb-4">
                    Нажимая "Оформить заказ", вы соглашаетесь с Условиями использования и Политикой конфиденциальности.
                    БИЛЕТЫ не подлежат возврату.
                  </p>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-white text-black hover:bg-gray-200"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "ОБРАБОТКА..." : "ОФОРМИТЬ ЗАКАЗ"}
                </Button>
              </form>
            </div>
          </div>
        </Section>
      </div>
    </MainLayout>
  );
};

export default TicketPurchase;
