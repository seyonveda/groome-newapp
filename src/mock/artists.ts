
import { Artist } from '../types';

export const mockArtists: Artist[] = [
  {
    id: 'mock-1',
    name: 'Aisha Khan (Mock)',
    specialty: 'Bridal Makeup',
    location: 'New York, NY',
    bio: 'Specializing in creating timeless and elegant bridal looks. Using only the highest quality products to ensure you look flawless on your special day. (This is mock data)',
    image_url: 'https://picsum.photos/seed/aisha/400/400',
    services: [
      { name: 'Bridal Makeup', price: 450 },
      { name: 'Engagement Makeup', price: 250 },
      { name: 'Party Makeup', price: 150 },
    ],
    brands_used: ['MAC', 'NARS', 'Fenty Beauty', 'Dior'],
    packages: [
      {
        name: 'Full Bridal Package',
        price: 700,
        includes: ['Makeup', 'Hair Styling', 'Saree Draping'],
      },
    ],
  },
  {
    id: 'mock-2',
    name: 'Maria Garcia (Mock)',
    specialty: 'Hair Styling',
    location: 'Los Angeles, CA',
    bio: 'Creative and passionate hairstylist with over 10 years of experience in cuts, color, and event styling. Let me create the perfect hairstyle for you. (This is mock data)',
    image_url: 'https://picsum.photos/seed/maria/400/400',
    services: [
      { name: 'Haircut & Style', price: 120 },
      { name: 'Balayage', price: 300 },
      { name: 'Updo', price: 90 },
    ],
    brands_used: ['Olaplex', 'Redken', 'Kerastase'],
    packages: [
      {
        name: 'Wedding Hair Package',
        price: 300,
        includes: ['Bride Updo', '2 Bridesmaids'],
      },
    ],
  },
   {
    id: 'mock-3',
    name: 'Chloe Nguyen (Mock)',
    specialty: 'Nail Art',
    location: 'Miami, FL',
    bio: 'Intricate and beautiful nail designs are my passion. From simple manicures to complex 3D art, I can make your nail dreams come true. (This is mock data)',
    image_url: 'https://picsum.photos/seed/chloe/400/400',
    services: [
      { name: 'Gel Manicure', price: 60 },
      { name: 'Acrylic Full Set', price: 80 },
      { name: 'Custom Nail Art (per nail)', price: 10 },
    ],
    brands_used: ['OPI', 'Kiara Sky', 'DND'],
    packages: [
      {
        name: 'Mani/Pedi Combo',
        price: 100,
        includes: ['Gel Manicure', 'Standard Pedicure'],
      },
    ],
  },
];
