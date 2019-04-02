import React, { createContext, useReducer } from 'react';

interface IState {
  episodes: any[],
  favorites: any[]
}

const initialState: IState = {
  episodes: [],
  favorites: []
};
export const Store = createContext<IState | any>(initialState);

const reducer = (state: IState, { type, payload }: { type: string, payload: any}): IState => {
  switch(type) {
    case 'FETCH_DATA':
      return { ...state, episodes: payload };
    case 'ADD_FAV':
      return { ...state, favorites: [...state.favorites, payload]}
    default:
      return state;
  }
};

export const StoreProvider = ({ children }: any): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
}