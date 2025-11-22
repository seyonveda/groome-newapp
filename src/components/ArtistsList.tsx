
import React from 'react';
import { Artist } from '../types';
import ArtistCard from './ArtistCard';

interface ArtistsListProps {
  artists: Artist[];
}

const ArtistsList = ({ artists }: ArtistsListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {artists.map((artist) => (
        // Fix: Use React.createElement to work around potential JSX transform issues causing incorrect type checking for the 'key' prop.
        React.createElement(ArtistCard, { key: artist.id, artist: artist })
      ))}
    </div>
  );
};

export default ArtistsList;