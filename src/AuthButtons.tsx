import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useStores } from './stores';

const AuthButtons: React.FC = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const redirectUri = process.env.REACT_APP_AUTH0_REDIRECT_URI!;
  const { userStore } = useStores(); 

  useEffect(() => {
    if (isAuthenticated && user?.sub) {
      userStore.fetchUser(user.sub);
    }
  }, [isAuthenticated, user]);

  const handleLogin = () => {
    loginWithRedirect({ appState: { returnTo: redirectUri } });
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      {!isAuthenticated && (
        <div className="block px-4 py-2 text-left text-secondaryBase hover:bg-indigo-100" onClick={handleLogin}>
          <button className="w-full">Log in</button>
        </div>
      )}
      {isAuthenticated && (
        <div className="block px-4 py-2 text-left text-secondaryBase hover:bg-indigo-100" onClick={handleLogout}>
          <button className="w-full">Log out</button>
        </div>
      )}
    </div>
  );
};

export default AuthButtons;
