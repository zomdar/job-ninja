import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AuthButtons: React.FC = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const redirectUri = process.env.REACT_APP_AUTH0_REDIRECT_URI!;

  const handleLogin = () => {
    loginWithRedirect({ appState: { returnTo: redirectUri } });
  };  

  return (
    <div>
      {!isAuthenticated && (
        <button onClick={handleLogin}>Log in</button>
      )}
      {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
    </div>
  );
};

export default AuthButtons;
