import React, { createContext } from 'react';

interface IState {
  episodes: [],
  favorites: []
}

const initialState: IState = {
  episodes: [],
  favorites: []
};
export const Store = createContext<IState>(initialState);

const reducer = () => {

};

export const StoreProvider = ({ children }: any): JSX.Element => {
  return <Store.Provider value={initialState}>{children}</Store.Provider>
}