
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { User as UserIcon, LogOut, LayoutDashboard } from 'lucide-react';

const AccountMenu = () => {
  const { user, session } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsOpen(false);
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!session) {
    return (
      <Link to="/login" className="bg-pink-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-pink-700 transition-colors">
        Login
      </Link>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center">
        <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">
            <UserIcon className="w-5 h-5 text-gray-600" />
        </div>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
          <div className="px-4 py-2 text-sm text-gray-700 border-b">
            <p className="font-semibold">Signed in as</p>
            <p className="truncate">{user?.email}</p>
          </div>
          <Link
            to="/account"
            onClick={() => setIsOpen(false)}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <LayoutDashboard className="mr-2 h-4 w-4"/>
            My Bookings
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <LogOut className="mr-2 h-4 w-4"/>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountMenu;
