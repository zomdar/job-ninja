// src/App.tsx

import React, { useState } from 'react';
import './tailwind.css';
import NavBar from './NavBar';
import InputWithSave from './InputWithSave';

interface SavedItem {
  label: string;
  text: string;
}

const App: React.FC = () => {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number>(-1);

  const handleSave = (label: string, text: string) => {
    setSavedItems([...savedItems, { label, text }]);
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(
      () => {
        console.log('Text copied to clipboard:', text);
        setCopiedIndex(index);
        setTimeout(() => {
          setCopiedIndex(-1);
        }, 1000);
      },
      (err) => {
        console.error('Could not copy text:', err);
      },
    );
  };

  const handleDelete = (index: number) => {
    setSavedItems(savedItems.filter((_, i) => i !== index));
  };

  return (
    <div className="App bg-draculaBackground text-draculaForeground min-h-screen">
      <NavBar />
      <header className="App-header p-4">
        <InputWithSave onSave={handleSave} />
        <ul className="mt-4">
          {savedItems.map(({ label, text }, index) => (
            <li key={index} className="flex items-center my-2">
              <span className="font-bold mr-4">{label}:</span>
              <span className="mr-4">{text}</span>
              <button
                onClick={() => handleCopy(text, index)}
                className="bg-blue-400 text-draculaBackground py-1 px-4 rounded mr-2"
              >
                Copy
              </button>
              {copiedIndex === index && (
                <span className="ml-2 text-draculaGreen">Copied</span>
              )}
              <button
                onClick={() => handleDelete(index)}
                className="bg-pastelRed text-draculaBackground py-1 px-4 rounded"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>

              </button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
};

export default App;
