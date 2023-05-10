// src/Home.tsx

import React, { useState } from "react";
import InputWithSave from "./InputWithSave";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";

export interface SavedItem {
  label: string;
  text: string;
}

const Home: React.FC = () => {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number>(-1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [flashingIndex, setFlashingIndex] = useState<number>(-1);
  const [editingIndex, setEditingIndex] = useState<number>(-1);

  const handleSave = (label: string, text: string) => {
    if (editingIndex >= 0) {
      const updatedItems = [...savedItems];
      updatedItems[editingIndex] = { label, text };
      setSavedItems(updatedItems);
      setEditingIndex(-1);
    } else {
      setSavedItems([...savedItems, { label, text }]);
    }
    setShowModal(false);
  };


  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(
      () => {
        console.log("Text copied to clipboard:", text);
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


  const handleDelete = (index: number) => {
    setSavedItems(savedItems.filter((_, i) => i !== index));
  };

  const openModalForEdit = (index: number) => {
    setEditingIndex(index);
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
        <h2 className="text-3xl font-extrabold pt-6 pb-3">Bio</h2>
        <p className="text-gray-400">
          This is your profile page. You can save your personal information here
          and copy it to your clipboard when you need it.
        </p>
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
      {showModal && (
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
                      Add New Item
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
      <div className="flex flex-wrap justify-between mt-4 space-y-4">
        {savedItems.map(({ label, text }, index) => (
          <div className="flex-col my-3 w-1/2">
            <div className="group relative">
              <div className="absolute top-[-2.5rem] right-0 pr-1">
                <button
                  onClick={() => openModalForEdit(index)}
                  className="flex gap-1 justify-center bg-secondaryBase text-draculaBackground text-xs py-2 px-3 rounded font-bold shadow-md hover:bg-draculaComment opacity-0 group-hover:opacity-100"
                >
                  <PencilIcon className="h-3 w-3" />
                  EDIT
                </button>
              </div>
              <div
                key={index}
                className={`content flex gap-2 p-2 rounded-md cursor-pointer border-transparent group-hover:border group-hover:border-gray-300 group-hover:bg-linksHoverBackground ${flashingIndex === index ? "group-hover:border-green-500" : ""
                  }`}
                onClick={() => handleCopy(text, index)}
                style={{ transition: "border-color 200ms" }}
              >
                <span className="font-bold">{label}:</span>
                <span className="truncate w-4/5">{text}</span>
              </div>
            </div>
          </div>
        ))}
      </div>





    </div>
  );
};

export default Home;
