
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const BookingConfirmation = () => {
  return (
    <div className="text-center py-16 px-4">
      <div className="inline-block bg-green-100 text-green-700 p-4 rounded-full mb-6">
        <CheckCircle size={64} />
      </div>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
        Booking Confirmed!
      </h1>
      <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
        Your appointment has been successfully scheduled. You will receive a confirmation email shortly. We look forward to seeing you!
      </p>
      <div className="flex justify-center gap-4">
        <Link
          to="/account"
          className="inline-block bg-pink-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-pink-700 transition"
        >
          View My Bookings
        </Link>
        <Link
          to="/artists"
          className="inline-block bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition"
        >
          Browse More Artists
        </Link>
      </div>
    </div>
  );
};

export default BookingConfirmation;
