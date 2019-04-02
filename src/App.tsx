import React, { useContext, useEffect } from 'react';
import { Store } from './Store';

const App = (): JSX.Element => {
  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    state.episodes.length === 0 && fetchDataAction()
  })

  const fetchDataAction = async() => {
    const URL = 'https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes'
    const data = await fetch(URL);
    const dataJSON = await data.json();
    return dispatch({
      type: 'FETCH_DATA',
      payload: dataJSON._embedded.episodes
    })
  }
  
  const toggleFavAction = (episode: any) => {
    const favExists = state.favorites.filter(({ id }: { id: number }) => id === episode.id).length;
    console.log(favExists);
    const dispatchObj = !favExists 
      ? { type: 'ADD_FAV', payload: episode }
      : { type: 'REMOVE_FAV', payload: episode.id };

    return dispatch(dispatchObj);
  }

  console.log(state);

  return (
    <>
      <header className="header">
        <div>
          <h1>Rick and Morty</h1>
          <p>Pick your favorite character.</p>
        </div>
        <div>
          Favorites: {state.favorites.length}
        </div>
      </header>
      <section className="episode-layout">
        {state.episodes.map(({ id, name, image, season, number }: { id: number, name: string, image: any, season: number, number: number }) => {
          return (
            <section key={id} className="episode-box">
              <img src={image.medium} alt={`Rick & Morty ${name}`}/>
              <h2>{name}</h2>
              <section>
                <p>Season: {season} Number: {number}</p>
                <button type="button" onClick={() => toggleFavAction({ id, name, image, season, number })}>
                  {state.favorites.find((fav: any) => fav.id === id) ? '</3' : '<3'}
                </button>
              </section>
            </section>
          )
        })}
      </section>
    </>
  )
};

export default App;
