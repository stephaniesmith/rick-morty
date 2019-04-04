import React from 'react';
import { Episode } from './interfaces'

const EpisodesList = ({ episodes, toggleFavAction, favorites }: { episodes: Episode[], toggleFavAction: any, favorites: Episode[] }) => {
  return episodes.map(({ id, name, image, season, number }: Episode) => {
    return (
      <section key={id} className="episode-box">
        <img src={image.medium} alt={`Rick & Morty ${name}`}/>
        <h2>{name}</h2>
        <section style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p>Season: {season} Number: {number}</p>
          <button type="button" onClick={() => toggleFavAction({ id, name, image, season, number })}>
            {favorites.find((fav: any) => fav.id === id) ? '</3' : '<3'}
          </button>
        </section>
      </section>
    )
  })
};

export default EpisodesList;
