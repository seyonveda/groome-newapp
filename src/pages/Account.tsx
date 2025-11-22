
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getBookingsForUser } from '../lib/bookings';
import { Booking } from '../types';
import { Calendar, MapPin, User, Tag } from 'lucide-react';

const Account = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      if (user) {
        setLoading(true);
        try {
          const userBookings = await getBookingsForUser(user.id);
          setBookings(userBookings as Booking[]);
        } catch (error) {
          console.error("Failed to load bookings", error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadBookings();
  }, [user]);

  if (!user) {
    return <div>Loading user information...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My Account</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center"><User className="mr-2" />Profile</h2>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>
        {loading ? (
          <p>Loading bookings...</p>
        ) : bookings.length > 0 ? (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="border border-gray-200 p-4 rounded-lg flex items-center flex-wrap">
                <img src={booking.artist?.image_url} alt={booking.artist?.name} className="w-16 h-16 rounded-full object-cover mr-4" />
                <div className="flex-grow">
                  <h3 className="text-xl font-bold">{booking.artist?.name}</h3>
                  <div className="flex items-center text-gray-600 text-sm mt-1">
                      <Calendar size={14} className="mr-2"/> {new Date(booking.booking_date).toLocaleDateString()}
                      <span className="mx-2">|</span>
                      {booking.time_slot}
                  </div>
                </div>
                <div className="text-right mt-4 md:mt-0 w-full md:w-auto">
                    <p className="font-semibold text-lg">${booking.price}</p>
                    <span className="text-xs bg-green-100 text-green-800 font-medium px-2.5 py-0.5 rounded-full">{booking.status}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>You have no past or upcoming bookings.</p>
        )}
      </div>
    </div>
  );
};

export default Account;
