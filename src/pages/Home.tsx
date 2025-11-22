
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const Home = () => {
  return (
    <div className="text-center py-16 md:py-24">
      <div className="inline-block bg-pink-100 text-pink-700 p-3 rounded-full mb-6">
        <Sparkles size={48} />
      </div>
      <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
        Discover Your Perfect Look
      </h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
        Connect with talented makeup artists, hairstylists, saree drapers, and nail technicians near you. Your beauty journey starts here.
      </p>
      <Link
        to="/artists"
        className="inline-block bg-pink-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-pink-700 transition-transform transform hover:scale-105"
      >
        Browse Artists
      </Link>
    </div>
  );
};

export default Home;
