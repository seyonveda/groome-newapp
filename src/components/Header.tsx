
import { Link } from 'react-router-dom';
import AccountMenu from './AccountMenu';
import { Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Sparkles className="h-8 w-8 text-pink-500" />
          <span className="text-2xl font-bold text-gray-800">Groome</span>
        </Link>
        <div className="flex items-center space-x-6">
          <Link
            to="/artists"
            className="text-gray-600 hover:text-pink-600 font-medium transition-colors"
          >
            Artists
          </Link>
          <AccountMenu />
        </div>
      </nav>
    </header>
  );
};

export default Header;
