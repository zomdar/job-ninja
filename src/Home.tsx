// src/Home.tsx

import React, { useState, useEffect } from "react";
import InputWithSave from "./InputWithSave";
import { TrashIcon, PencilIcon, ClipboardIcon, DocumentCheckIcon } from "@heroicons/react/24/solid";
import { useAuth0 } from "@auth0/auth0-react";
import { observer } from "mobx-react-lite";
import { useStores } from './stores';

const Home: React.FC = observer(() => {
  const { user, isAuthenticated } = useAuth0();
  const { userStore } = useStores();

  useEffect(() => {
    if (user?.sub) {
      userStore.fetchUser(user?.sub);
    }
  }, [user]);

  return (
    <div className="container mx-auto flex-col p-4">
      <div className="profile py-4">
        <h1
          className="text-4xl text-primaryBase font-extrabold"
          style={{
            textShadow:
              "0.000em 0.075em #7B66FA, 0.029em 0.069em #7B66FA, 0.053em 0.053em #7B66FA, 0.069em 0.029em #7B66FA, 0.075em 0.000em #7B66FA, 0.069em -0.029em #7B66FA, 0.053em -0.053em #7B66FA, 0.029em -0.069em #7B66FA, 0.000em -0.075em #7B66FA, -0.029em -0.069em #7B66FA, -0.053em -0.053em #7B66FA, -0.069em -0.029em #7B66FA, -0.075em -0.000em #7B66FA, -0.069em 0.029em #7B66FA, -0.053em 0.053em #7B66FA, -0.029em 0.069em #7B66FA",
          }}
        >
          Home
        </h1>
        <h2 className="text-3xl font-extrabold pt-6 pb-1">Welcome to Job Ninja, {userStore.user?.name}</h2>
        {/* You can use userStore.name, userStore.email, and other properties here */}
      </div>
    </div>
  );
});

export default Home;
