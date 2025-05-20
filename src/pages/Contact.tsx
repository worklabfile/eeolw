
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import MainLayout from "@/components/layout/MainLayout";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Отправка данных в Supabase
      const { error } = await supabase
        .from('contact_messages')
        .insert([formData]);
        
      if (error) throw error;
      
      toast({
        title: "Сообщение отправлено",
        description: "Ваше сообщение было отправлено руководству eeolw. Мы свяжемся с вами в ближайшее время!",
      });
      
      // Очистка формы
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="pt-16 bg-black noise-bg">
        <Section>
          <SectionTitle subtitle="Свяжитесь с менеджментом eeolw">
            КОНТАКТЫ
          </SectionTitle>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="text-left space-y-6">
              <h3 className="font-mono text-xl font-bold">КОНТАКТНАЯ ИНФОРМАЦИЯ</h3>
              <p className="text-gray-300">
                По вопросам организации концертов, прессы или общих вопросов, используйте форму или свяжитесь с нами напрямую:
              </p>
              
              <div className="space-y-3">
                <p className="text-gray-300">
                  <span className="font-bold">Почта:</span>{" "}
                  <a href="mailto:management@eeolw.com" className="text-white hover:underline">
                    management@eeolw.com
                  </a>
                </p>
                <p className="text-gray-300">
                  <span className="font-bold">Расположение:</span> Ульяновск, Россия
                </p>
              </div>
              
              <div className="pt-4">
                <h3 className="font-mono text-xl font-bold mb-3">СОЦСЕТИ</h3>
                <div className="flex space-x-4">
                  <a href="https://vk.com/artist/8853322076400198659" className="text-white hover:text-gray-300 transition-colors">ВКонтакте</a>
                  <a href="https://t.me/eeolw" className="text-white hover:text-gray-300 transition-colors">Telegram</a>
                  <a href="https://music.yandex.ru/artist/21742277?utm_medium=copy_link" className="text-white hover:text-gray-300 transition-colors">Yandex Music</a>
                </div>
              </div>
            </div>
            
            <div className="bg-secondary p-6">
              <h3 className="font-mono text-xl font-bold mb-4 text-left">ОТПРАВИТЬ СООБЩЕНИЕ</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="text-left">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                    Имя
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
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
                </div>
                
                <div className="text-left">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-1">
                    Тема
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-2 bg-black/50 border border-white/20 text-white focus:outline-none focus:ring-1 focus:ring-white"
                  >
                    <option value="">Выберите тему</option>
                    <option value="Booking">Организация концерта</option>
                    <option value="Press">Пресса</option>
                    <option value="General">Общий вопрос</option>
                    <option value="Other">Другое</option>
                  </select>
                </div>
                
                <div className="text-left">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                    Сообщение
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-2 bg-black/50 border border-white/20 text-white focus:outline-none focus:ring-1 focus:ring-white"
                  ></textarea>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-white text-black hover:bg-gray-200"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "ОТПРАВКА..." : "ОТПРАВИТЬ СООБЩЕНИЕ"}
                </Button>
              </form>
            </div>
          </div>
        </Section>
      </div>
    </MainLayout>
  );
};

export default Contact;
