
import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/MainLayout";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";

const TicketSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const purchaseData = location.state;

  useEffect(() => {
    // Если пользователь перешел на эту страницу напрямую без данных о покупке, редирект на страницу концертов
    if (!purchaseData) {
      navigate("/tour");
    }
  }, [purchaseData, navigate]);

  if (!purchaseData) {
    return null;
  }

  return (
    <MainLayout>
      <div className="pt-16 bg-black noise-bg">
        <Section>
          <div className="max-w-2xl mx-auto">
            <SectionTitle>БИЛЕТЫ КУПЛЕНЫ!</SectionTitle>
            
            <div className="bg-secondary p-8 text-left mb-8 border border-white/20">
              <div className="mb-8 text-center">
                <div className="inline-block p-4 rounded-full bg-white/5 mb-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="48" 
                    height="48" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3 className="font-mono text-xl font-bold">Спасибо за покупку!</h3>
                <p className="text-gray-400 mt-2">Ваши БИЛЕТЫ отправлены на ваш email.</p>
              </div>
              
              <div className="border-b border-white/10 pb-4 mb-4">
                <h4 className="font-mono text-lg mb-3">ДЕТАЛИ ЗАКАЗА</h4>
                <p className="text-xl mb-1">{purchaseData.showData.city}</p>
                <p className="text-gray-300">{purchaseData.showData.venue}</p>
                <p className="text-gray-400">{purchaseData.showData.address}</p>
                <p className="text-gray-300 mt-2 font-mono">{purchaseData.showData.date}</p>
              </div>
              
              <div className="border-b border-white/10 pb-4 mb-4">
                <h4 className="font-mono text-lg mb-3">ИНФОРМАЦИЯ О БИЛЕТАХ</h4>
                <p>
                  <span className="text-gray-400">Тип билета:</span>{" "}
                  <span className="font-semibold">{purchaseData.ticketType.name}</span>
                </p>
                <p>
                  <span className="text-gray-400">Количество:</span>{" "}
                  <span className="font-semibold">{purchaseData.quantity}</span>
                </p>
                <p>
                  <span className="text-gray-400">Покупатель:</span>{" "}
                  <span className="font-semibold">{purchaseData.purchaserName}</span>
                </p>
                <p className="mt-3 font-bold">
                  <span className="text-gray-400">Итого оплачено:</span>{" "}
                  <span>{purchaseData.total} ₽</span>
                </p>
              </div>
              
              <div>
                <h4 className="font-mono text-lg mb-3">ВАЖНАЯ ИНФОРМАЦИЯ</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Пожалуйста, приходите минимум за 30 минут до начала мероприятия.</li>
                  <li>Возьмите с собой удостоверение личности, соответствующее имени покупателя.</li>
                  <li>Покажите электронный билет на входе (распечатанный или на телефоне).</li>
                  <li>БИЛЕТЫ не подлежат возврату.</li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-white text-black hover:bg-gray-200">
                <Link to="/tour">ВЕРНУТЬСЯ К КОНЦЕРТАМ</Link>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/">НА ГЛАВНУЮ</Link>
              </Button>
            </div>
          </div>
        </Section>
      </div>
    </MainLayout>
  );
};

export default TicketSuccess;
