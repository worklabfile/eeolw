
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleNav = () => setIsOpen(!isOpen);
  const closeNav = () => setIsOpen(false);

  const navItems = [
    { path: "/", label: "ГЛАВНАЯ" },
    { path: "/about", label: "О ПРОЕКТЕ" },
    { path: "/music", label: "МУЗЫКА" },
    { path: "/tour", label: "КОНЦЕРТЫ" },
    { path: "/contact", label: "КОНТАКТЫ" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="font-mono text-2xl font-bold tracking-tighter" onClick={closeNav}>
          eeolw
        </Link>
        
        {/* Кнопка мобильного меню */}
        <button 
          className="md:hidden text-white focus:outline-none bg-white/10 p-2 rounded"
          onClick={toggleNav}
          aria-label="Переключить меню"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Десктопное меню */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-mono text-sm tracking-wider ${
                location.pathname === item.path
                  ? "text-white"
                  : "text-gray-400 hover:text-white transition-colors"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      
      {/* Мобильное меню (переработанное) */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black z-40">
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-4 border-b border-white/10">
              <Link to="/" className="font-mono text-2xl font-bold tracking-tighter" onClick={closeNav}>
                eeolw
              </Link>
              <button 
                className="text-white focus:outline-none bg-white/10 p-2 rounded"
                onClick={toggleNav}
                aria-label="Закрыть меню"
              >
                <X size={24} />
              </button>
            </div>
            
            <nav className="flex flex-col items-center justify-center flex-1 space-y-8 p-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-mono text-xl tracking-wider ${
                    location.pathname === item.path
                      ? "text-white border-b border-white pb-1"
                      : "text-gray-400 hover:text-white transition-colors"
                  }`}
                  onClick={closeNav}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            
            <div className="p-4 border-t border-white/10 flex justify-center space-x-6">
              <a href="#" className="text-white hover:text-gray-300 transition-colors">ВК</a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">TG</a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">YT</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
