import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const AuthButtons: React.FC = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const redirectUri = process.env.REACT_APP_AUTH0_REDIRECT_URI!;

  useEffect(() => {
    if (isAuthenticated && user) {
      const checkAndCreateUser = async () => {
        try {
          let response;

          if (user.sub !== undefined) {
            response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${encodeURIComponent(user.sub)}`);
          } else {
            // handle the case where auth0Id is undefined
          }

          if (response && response.data) {
            console.log("User already exists");
            return;
          }

          const createUserResponse = await axios.post(`${process.env.REACT_APP_API_URL}/api/users`, {
            auth0Id: user.sub,
            name: user.name,
            email: user.email,
            picture: user.picture,
          });
          console.log("Created user", createUserResponse.data);
        } catch (error) {
          console.log(error);
        }
      };
      checkAndCreateUser();
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
