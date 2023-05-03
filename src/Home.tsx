// src/Home.tsx

import React, { useState } from 'react';
import InputWithSave from './InputWithSave';

interface SavedItem {
  label: string;
  text: string;
}

const Home: React.FC = () => {
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
    <div className="p-4">
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
              {/* The delete icon SVG */}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
