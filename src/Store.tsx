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

const reducer = (state: IState, { type, payload }: { type: string, payload: any}): IState => {
  switch(type) {
    case 'FETCH_Date':
      return { ...state, episodes: payload }
    default:
      return state
  }
};

export const StoreProvider = ({ children }: any): JSX.Element => {
  return <Store.Provider value={initialState}>{children}</Store.Provider>
}