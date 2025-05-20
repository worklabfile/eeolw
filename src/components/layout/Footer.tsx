
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-left">
            <h3 className="font-mono text-lg font-bold mb-4">eeolw</h3>
            <p className="text-gray-400 text-sm">
              Музыкант из Ульяновска
            </p>
          </div>
          
          <div className="text-left">
            <h3 className="font-mono text-lg font-bold mb-4">Ссылки</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors">Главная</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white text-sm transition-colors">Обо мне</Link></li>
              <li><Link to="/music" className="text-gray-400 hover:text-white text-sm transition-colors">Музыка</Link></li>
              <li><Link to="/tour" className="text-gray-400 hover:text-white text-sm transition-colors">Тур</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Контакты</Link></li>
            </ul>
          </div>
          
          <div className="text-left">
            <h3 className="font-mono text-lg font-bold mb-4">Связь</h3>
            <p className="text-gray-400 text-sm mb-4">
              Подпишитесь на eeolw в социальных сетях и стриминговых платформах
            </p>
            <div className="flex space-x-4">
              <a href="https://t.me/eeolw" className="text-white hover:text-gray-300 transition-colors">Telegram</a>
            </div>
            <div className="flex space-x-4">
              <a href="https://t.me/DarkAngelRecords" className="text-white hover:text-gray-300 transition-colors">DAR</a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-white/10 text-center text-sm text-gray-500">
          <p>&copy; {currentYear} eeolw. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
