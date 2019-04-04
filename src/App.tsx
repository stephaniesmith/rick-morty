import React, { useContext, useEffect, lazy, Suspense } from 'react';
import { Store } from './Store';

const EpisodesList = lazy<any>(() => import('./EpisodesList'));

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

  
  const props = {
    episodes: state.episodes,
    favorites: state.favorites,
    toggleFavAction
  }

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
      <Suspense fallback={<div>Loading...</div>}>
        <section className="episode-layout">
          <EpisodesList {...props}/>
        </section>
      </Suspense>
    </>
  )
};

export default App;
