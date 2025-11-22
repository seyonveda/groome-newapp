
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
import { supabase } from '../lib/supabase';
import { Artist } from '../types';
import { mockArtists } from '../mock/artists';

const BookingPage = () => {
    const { artistId } = useParams<{ artistId: string }>();
    const navigate = useNavigate();
    const [artist, setArtist] = useState<Artist | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArtist = async () => {
            if (!artistId) return;

            setLoading(true);
            if (artistId.startsWith('mock-')) {
                const mockArtist = mockArtists.find(a => a.id === artistId);
                setArtist(mockArtist || null);
            } else {
                const { data, error } = await supabase
                    .from('artists')
                    .select('*')
                    .eq('id', artistId)
                    .single();

                if (error) {
                    console.error('Error fetching artist for booking:', error);
                } else {
                    setArtist(data as unknown as Artist);
                }
            }
            setLoading(false);
        };

        fetchArtist();
    }, [artistId]);

    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    if (!artist) {
        return <div className="text-center py-10 text-red-500">Artist details could not be loaded.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
                <h1 className="text-3xl font-bold mb-2">Book an Appointment</h1>
                <p className="text-lg text-gray-600 mb-6">with <span className="font-semibold text-pink-600">{artist.name}</span></p>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <img src={artist.image_url} alt={artist.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                    <h2 className="text-2xl font-bold text-center">{artist.name}</h2>
                    <p className="text-gray-600 text-center">{artist.specialty}</p>
                    <p className="text-gray-500 text-center mt-1">{artist.location}</p>
                </div>
            </div>
            <div>
                <BookingForm artist={artist} onSuccess={() => navigate('/booking-confirmation')} />
            </div>
        </div>
    );
};

export default BookingPage;
