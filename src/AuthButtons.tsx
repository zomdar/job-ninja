import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AuthButtons: React.FC = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const redirectUri = process.env.REACT_APP_AUTH0_REDIRECT_URI!;

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
