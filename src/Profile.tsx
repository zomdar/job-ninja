// src/Profile.tsx

import React, { useState, useEffect } from "react";
import InputWithSave from "./InputWithSave";
import { TrashIcon, PencilIcon, ClipboardIcon, DocumentCheckIcon } from "@heroicons/react/24/solid";
import { useAuth0 } from "@auth0/auth0-react";
import { useStores } from './stores';

export interface SavedItem {
  label: string;
  text: string;
  _id: string;
}

const Profile: React.FC = () => {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number>(-1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [flashingIndex, setFlashingIndex] = useState<number>(-1);
  const [editingIndex, setEditingIndex] = useState<number>(-1);
  const [deletingIndex, setDeletingIndex] = useState<number>(-1);
  const { userStore } = useStores();

  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    const fetchSavedItems = async () => {
      if (isAuthenticated) {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/${user?.sub}/links`);
        const items = await response.json();
        setSavedItems(items);
      }
    };

    fetchSavedItems();

  }, [isAuthenticated, user]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const handleSave = async (label: string, text: string) => {
    const newItem = { label, text };

    if (user?.sub === undefined) {
      console.error("user.sub is undefined");
      return;
    }

    const url = `${process.env.REACT_APP_API_URL}/api/${encodeURIComponent(user?.sub)}/links`;
    let response;

    // check if we're in edit mode
    if (editingIndex >= 0) {
      // update the existing item
      const itemToUpdate = savedItems[editingIndex];
      console.log("saved items", savedItems);
      console.log("items", savedItems);
      response = await fetch(`${url}/${itemToUpdate._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });
    } else {
      // create a new item
      response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });
    }

    if (response.ok) {
      const updatedItem = await response.json();
      if (editingIndex >= 0) {
        // replace the item at editingIndex with updatedItem
        setSavedItems(prevItems => prevItems.map((item, index) => index === editingIndex ? updatedItem : item));
      } else {
        // add the new item to the end of the list
        setSavedItems(prevItems => [...prevItems, updatedItem]);
      }
    } else {
      console.error('Error saving item:', await response.text());
    }

    setEditingIndex(-1);
    setShowModal(false);
  };


  const handleDelete = async (index: number) => {

    if (user?.sub === undefined) {
      console.error("user.sub is undefined");
      return;
    }

    const url = `${process.env.REACT_APP_API_URL}/api/${encodeURIComponent(user?.sub)}/links`;

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/${encodeURIComponent(user.sub)}/links/${savedItems[index]._id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setSavedItems(savedItems.filter((_, i) => i !== index));
    } else {
      console.error('Error deleting item:', await response.text());
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopiedIndex(index);
        setFlashingIndex(index);
        setTimeout(() => {
          setCopiedIndex(-1);
          setFlashingIndex(-1);
        }, 500);
      },
      (err) => {
        console.error("Could not copy text:", err);
      }
    );
  };

  const openModalForEdit = (index: number) => {
    setEditingIndex(index);
    setShowModal(true);
  };


  const openModalForDelete = (index: number) => {
    setDeletingIndex(index);
    setShowModal(true);
  };


  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingIndex(-1);
  };

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
          Profile
        </h1>
        <h2 className="text-xl font-extrabold pt-6">Plan</h2>
        {userStore.user && (
          <div className="py">
            <div className="flex gap-2">
              <p className="text-gray-200 font-bold">Tokens:</p>
              <p className="text-gray-400">{3 - userStore.user.resumeRequests}</p>
            </div>
          </div>
        )}
        <h2 className="text-3xl font-extrabold pt-6 pb-1">Bio</h2>
        {isAuthenticated && (
          <div className="py-2">
            <div className="flex gap-2">
              <p className="text-gray-200 font-bold">Name:</p>
              <p className="text-gray-400">{user?.name}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-gray-200 font-bold">Email:</p>
              <p className="text-gray-400">{user?.email}</p>
            </div>
          </div>
        )}
      </div>
      <div className="link-items flex justify-between items-center">
        <h2 className="text-3xl font-extrabold pt-6 pb-3">Links</h2>
        <div className="primary-button">
          <button
            onClick={openModal}
            className="bg-secondaryBase text-draculaBackground py-2 px-4 rounded font-bold shadow-md hover:bg-draculaComment"
          >
            + ADD
          </button>
        </div>
      </div>
      {showModal && deletingIndex === -1 && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
                onClick={closeModal}
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-darkBackgroundColor rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-darkBackgroundColor px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mt-3 text-start sm:mt-0 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-draculaBackground"
                      id="modal-title"
                    >
                      {editingIndex >= 0 ? 'Edit Item' : 'Add New Item'}
                    </h3>
                    <div className="mt-2">
                      <InputWithSave
                        onSave={handleSave}
                        onClose={closeModal}
                        initialValues={editingIndex >= 0 ? savedItems[editingIndex] : undefined}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModal && deletingIndex !== -1 && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Delete Item
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this item? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={() => {
                      handleDelete(deletingIndex);
                      setDeletingIndex(-1);
                      setShowModal(false);
                    }}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDeletingIndex(-1);
                      setShowModal(false);
                    }}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-wrap justify-between mt-4 space-y-4">
        {savedItems.map(({ label, text }, index) => (
          <div className="flex-col my-3 w-1/2">
            <div className="group relative">
              <div className="absolute top-[-2.5rem] right-0 pr-1">
                <div className="flex gap-2">
                  <button
                    onClick={() => openModalForDelete(index)}
                    className="flex gap-1 justify-center bg-red-500 text-draculaBackground text-xs py-2 px-3 rounded font-bold shadow-md hover:bg-red-400 opacity-0 group-hover:opacity-100"
                  >
                    <TrashIcon className="h-3 w-3" />
                    Delete
                  </button>
                  <button
                    onClick={() => openModalForEdit(index)}
                    className="flex gap-1 justify-center bg-blue-600 text-draculaBackground text-xs py-2 px-3 rounded font-bold shadow-md hover:bg-blue-500 opacity-0 group-hover:opacity-100"
                  >
                    <PencilIcon className="h-3 w-3" />
                    EDIT
                  </button>
                </div>
              </div>
              <div
                key={index}
                className={`relative content flex items-center gap-2 p-2 rounded-md cursor-pointer border-transparent group-hover:border group-hover:border-gray-300 group-hover:bg-linksHoverBackground ${flashingIndex === index ? "group-hover:border-green-500" : ""}`}
                onClick={() => handleCopy(text, index)}
                style={{ transition: "border-color 200ms" }}
              >
                <span className="font-bold">{label}:</span>
                <span className="truncate w-4/5">{text}</span>
                <span className="hidden group-hover:block absolute right-1 text-white text-xs px-2 py-1 rounded-lg">
                  {flashingIndex === index ? <DocumentCheckIcon className='h-5 w-5' /> : <ClipboardIcon className='h-5 w-5' />}
                </span>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
