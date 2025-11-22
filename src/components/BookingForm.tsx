
import React, { useState } from 'react';
import { Artist } from '../types';
import { createBooking } from '../lib/bookings';
import { useAuth } from '../hooks/useAuth';

interface BookingFormProps {
  artist: Artist;
  onSuccess: () => void;
}

const BookingForm = ({ artist, onSuccess }: BookingFormProps) => {
  const { user } = useAuth();
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [price] = useState(artist.services[0]?.price || 100); // Default to first service price
  const [specialRequest, setSpecialRequest] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fix: Changed type annotation to use React.FormEvent, which is now available from the updated import.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !timeSlot) {
      setError('Please select a date and time.');
      return;
    }
    if (!user) {
      setError('You must be logged in to book.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      await createBooking({
        user_id: user.id,
        artist_id: artist.id,
        booking_date: date,
        time_slot: timeSlot,
        price,
        special_request: specialRequest,
      });
      onSuccess();
    } catch (err) {
      setError('Failed to create booking. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h3 className="text-xl font-bold">Request a Booking</h3>
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          id="date"
          value={date}
          min={today}
          onChange={(e) => setDate(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
        />
      </div>
      <div>
        <label htmlFor="timeSlot" className="block text-sm font-medium text-gray-700">Time Slot</label>
        <select
          id="timeSlot"
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          required
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-md"
        >
          <option value="">Select a time</option>
          <option>09:00 AM</option>
          <option>11:00 AM</option>
          <option>01:00 PM</option>
          <option>03:00 PM</option>
          <option>05:00 PM</option>
        </select>
      </div>
      <div>
          <p className="text-lg font-semibold">Estimated Price: ${price}</p>
      </div>
      <div>
        <label htmlFor="specialRequest" className="block text-sm font-medium text-gray-700">Special Request (optional)</label>
        <textarea
          id="specialRequest"
          rows={3}
          value={specialRequest}
          onChange={(e) => setSpecialRequest(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
          placeholder="e.g., allergies, specific look"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-pink-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-pink-700 disabled:opacity-50 transition"
      >
        {loading ? 'Submitting...' : 'Submit Request'}
      </button>
    </form>
  );
};

export default BookingForm;