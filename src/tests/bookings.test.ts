
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createBooking } from '../lib/bookings';
import { supabase } from '../lib/supabase';

// Mock the entire supabase client
vi.mock('../lib/supabase', () => ({
  supabase: {
    from: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    single: vi.fn(),
  },
}));

describe('bookings service', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  describe('createBooking', () => {
    it('should create a booking successfully', async () => {
      const mockBookingInput = {
        user_id: 'user-123',
        artist_id: 'artist-456',
        booking_date: '2023-12-25',
        time_slot: '10:00 AM',
        price: 150,
        special_request: 'Glitter makeup',
      };

      const mockResponse = { data: { id: 'booking-789', ...mockBookingInput }, error: null };
      
      // Chain the mocks correctly
      const fromMock = supabase.from as vi.Mock;
      const insertMock = vi.fn().mockReturnThis();
      const selectMock = vi.fn().mockReturnThis();
      const singleMock = vi.fn().mockResolvedValue(mockResponse);

      fromMock.mockReturnValue({
        insert: insertMock,
      });
      insertMock.mockReturnValue({
          select: selectMock
      })
      selectMock.mockReturnValue({
          single: singleMock
      });

      const result = await createBooking(mockBookingInput);

      expect(supabase.from).toHaveBeenCalledWith('bookings');
      expect(insertMock).toHaveBeenCalledWith([mockBookingInput]);
      expect(selectMock).toHaveBeenCalled();
      expect(singleMock).toHaveBeenCalled();
      expect(result).toEqual(mockResponse.data);
    });

    it('should throw an error if supabase insert fails', async () => {
      const mockBookingInput = {
        user_id: 'user-123',
        artist_id: 'artist-456',
        booking_date: '2023-12-25',
        time_slot: '10:00 AM',
        price: 150,
        special_request: 'Glitter makeup',
      };

      const mockError = { message: 'Insert failed', details: 'DB error', hint: '', code: '12345' };
      
      const fromMock = supabase.from as vi.Mock;
      const insertMock = vi.fn().mockReturnThis();
      const selectMock = vi.fn().mockReturnThis();
      const singleMock = vi.fn().mockResolvedValue({ data: null, error: mockError });

      fromMock.mockReturnValue({
        insert: insertMock,
      });
      insertMock.mockReturnValue({
          select: selectMock
      })
      selectMock.mockReturnValue({
          single: singleMock
      });

      await expect(createBooking(mockBookingInput)).rejects.toThrow('Failed to create booking: Insert failed');
    });
  });
});
