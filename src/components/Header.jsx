import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Donor Programme', path: '/donor' },
    { label: 'Fertility Preservation', path: '/fertility' },
    { label: 'Advanced Treatments', path: '/treatments' },
    { label: 'Infertility Treatments', path: '/infertility' },
    { label: 'IVF Testing', path: '/testing' },
    { label: 'About Us', path: '/about' },
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img 
              src="https://t3.ftcdn.net/jpg/02/94/50/30/360_F_294503009_Ug7nq7b1HneKgNxANdTwckhojSmP9EcT.webp" 
              alt="IVF Pulse" 
              className="h-8" 
            />
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-600 hover:text-coral-red transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <button className="px-6 py-2 bg-coral-red text-white rounded-lg hover:bg-red-600 transition-colors">
              Talk to Us →
            </button>
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-coral-red"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>


        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-gray-600 hover:text-coral-red transition-colors px-2 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <button 
                className="px-6 py-2 bg-coral-red text-white rounded-lg hover:bg-red-600 transition-colors w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                Talk to Us →
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
