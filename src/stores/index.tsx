// src/stores/index.tsx

import React, { createContext, useContext, ReactNode } from 'react';
import UserStore from './UserStore';

const store = {
  userStore: new UserStore(),
};

const StoreContext = createContext(store);

export const StoreProvider: React.FC<{children: ReactNode}> = ({ children }) => (
  <StoreContext.Provider value={store}>
    {children}
  </StoreContext.Provider>
);

export const useStores = () => useContext(StoreContext);
