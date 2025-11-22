
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Artist } from '../types';
import { mockArtists } from '../mock/artists';
import ArtistsList from '../components/ArtistsList';

const Artists = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtists = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('artists').select('*');

      if (error) {
        console.warn('Supabase fetch error, falling back to mock data:', error.message);
        setError('Could not connect to the database. Showing sample data.');
        setArtists(mockArtists);
      } else if (data && data.length > 0) {
        setArtists(data as unknown as Artist[]);
      } else {
        console.warn('No artists found in Supabase, falling back to mock data.');
        setError('No artists found. Showing sample data.');
        setArtists(mockArtists);
      }
      setLoading(false);
    };

    fetchArtists();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Meet Our Artists</h1>
      {error && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
             <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="w-full h-56 bg-gray-200"></div>
                <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
            </div>
          ))}
        </div>
      ) : (
        <ArtistsList artists={artists} />
      )}
    </div>
  );
};

export default Artists;
