import React, { useContext, useEffect } from 'react';
import { Store } from './Store';
import { async } from 'q';

const App = (): JSX.Element => {
  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    return () => {
      state.episodes.length === 0 && fetchDataAction()
    };
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

  return (
    <>
      {console.log(state)}
      <h1>Rick and Morty</h1>
      <p>Pick your favorite character.</p>
    </>
  )
};

export default App;
