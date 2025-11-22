
import { supabase } from './supabase';
import { Booking } from '../types';

type BookingInput = Omit<Booking, 'id' | 'status' | 'created_at' | 'user_id'> & { user_id: string };

/**
 * Creates a new booking in the database.
 * @param booking - The booking data to insert.
 * @returns The created booking data.
 */
export async function createBooking(booking: BookingInput) {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert([booking])
      .select()
      .single();

    if (error) {
      console.error('Error creating booking:', error);
      throw new Error(`Failed to create booking: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error('An unexpected error occurred in createBooking:', error);
    throw error;
  }
}

/**
 * Fetches all bookings for a specific user.
 * @param userId - The ID of the user whose bookings to fetch.
 * @returns A list of bookings.
 */
export async function getBookingsForUser(userId: string) {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        artist:artists (
          id,
          name,
          image_url
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching bookings:', error);
      throw new Error(`Failed to fetch bookings: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error('An unexpected error occurred in getBookingsForUser:', error);
    throw error;
  }
}
