
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Artist, Package, Service } from '../types';
import { mockArtists } from '../mock/artists';
import { DollarSign, Tag, Package as PackageIcon } from 'lucide-react';

const ArtistProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtist = async () => {
      setLoading(true);
      if (!id) return;
      
      // Handle mock artist IDs
      if (id.startsWith('mock-')) {
        const mockArtist = mockArtists.find(a => a.id === id);
        setArtist(mockArtist || null);
        setLoading(false);
        return;
      }
      
      const { data, error } = await supabase
        .from('artists')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching artist:', error);
      } else {
        setArtist(data as unknown as Artist);
      }
      setLoading(false);
    };

    fetchArtist();
  }, [id]);

  if (loading) {
    return <div className="text-center py-10">Loading artist profile...</div>;
  }

  if (!artist) {
    return <div className="text-center py-10 text-red-500">Artist not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img className="h-64 w-full object-cover md:w-64" src={artist.image_url} alt={artist.name} />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-pink-500 font-semibold">{artist.specialty}</div>
            <h1 className="block mt-1 text-3xl leading-tight font-bold text-black">{artist.name}</h1>
            <p className="mt-2 text-gray-500">{artist.location}</p>
            <p className="mt-4 text-gray-600">{artist.bio}</p>
          </div>
        </div>
        <div className="p-8 border-t border-gray-200">
          <Link
            to={`/book/${artist.id}`}
            className="w-full text-center bg-pink-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-pink-700 transition duration-300"
          >
            Book Now
          </Link>
        </div>
        <div className="p-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {artist.services?.map((service: Service, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
                <span className="font-medium text-gray-700">{service.name}</span>
                <span className="text-gray-900 font-semibold flex items-center"><DollarSign size={16} className="mr-1"/>{service.price}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Packages</h2>
            {artist.packages?.map((pkg: Package, index) => (
                <div key={index} className="bg-pink-50 border border-pink-200 p-4 rounded-lg mb-4">
                    <h3 className="font-bold text-pink-800 flex items-center"><PackageIcon size={20} className="mr-2"/>{pkg.name} - ${pkg.price}</h3>
                    <p className="text-pink-700 text-sm mt-2">{pkg.includes.join(', ')}</p>
                </div>
            ))}
        </div>
        <div className="p-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center"><Tag size={24} className="mr-2"/>Brands I Use</h2>
          <div className="flex flex-wrap gap-2">
            {artist.brands_used?.map((brand, index) => (
              <span key={index} className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfile;
