import React, { createContext, useReducer } from 'react';
import { Episode } from './interfaces'

interface IState {
  episodes: Episode[],
  favorites: Episode[]
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
      return { ...state, favorites: [...state.favorites, payload]};
    case 'REMOVE_FAV':
      const favorites = [...state.favorites].filter(({ id }) => id !== payload);
      return { ...state, favorites: [...favorites]}
    default:
      return state;
  }
};

export const StoreProvider = ({ children }: any): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
}