import React from 'react';

export const Banner = ({ nominatedMovies }) => (
  <div className="banner">
    {nominatedMovies.length === 5 ? (
      <p>Congratulations you have successfully nominated 5 movies🎊</p>
    ) : (
      ''
    )}
  </div>
);
