// src/RootComponent.tsx

import React, { useEffect, ReactNode } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useStores } from './stores';

// Define a type for your props
interface RootComponentProps {
  children: ReactNode; // This line is what's missing in your current code
}

const RootComponent: React.FC<RootComponentProps> = ({ children }) => {
  const { user } = useAuth0();
  const { userStore } = useStores();

  useEffect(() => {
    if (user?.sub) {
      userStore.fetchUser(user?.sub);
    }
  }, [user]);

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
};

export default RootComponent;
