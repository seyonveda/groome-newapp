
import { User as SupabaseUser } from '@supabase/supabase-js';
import { Database } from './supabase';

export type User = SupabaseUser;

export type Service = {
  name: string;
  price: number;
};

export type Package = {
  name: string;
  price: number;
  includes: string[];
};

export type Artist = {
  id: string;
  name: string;
  specialty: string;
  location: string;
  bio: string;
  image_url: string;
  services: Service[];
  brands_used: string[];
  packages: Package[];
};

export type BannerRecord = {
  id: number;
  title: string | null;
  image_path: string | null;
  target_url: string | null;
  start_at: string | null;
  end_at: string | null;
  is_active: boolean | null;
  position: number | null;
  metadata?: any;
};

export type Booking = Database['public']['Tables']['bookings']['Row'] & { artist?: Pick<Artist, 'id' | 'name' | 'image_url'> };
