
import { Link } from 'react-router-dom';
import { Artist } from '../types';
import { MapPin } from 'lucide-react';

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard = ({ artist }: ArtistCardProps) => {
  return (
    <Link to={`/artists/${artist.id}`} className="group block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
        <img
          className="w-full h-56 object-cover"
          src={artist.image_url}
          alt={artist.name}
        />
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-1">{artist.name}</h3>
          <p className="text-pink-600 font-semibold mb-2">{artist.specialty}</p>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin size={16} className="mr-1.5" />
            <span>{artist.location}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArtistCard;
