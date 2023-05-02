// src/InputWithSave.tsx

import React, { useState } from 'react';

interface InputWithSaveProps {
  onSave: (label: string, text: string) => void;
}

const InputWithSave: React.FC<InputWithSaveProps> = ({ onSave }) => {
  const [label, setLabel] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if label or text input fields are empty or contain only whitespace
    if (!label.trim() || !text.trim()) {
      alert('Label and Text fields cannot be empty.');
      return;
    }

    onSave(label, text);
    setLabel('');
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        placeholder="Label"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        className="bg-draculaBackground text-draculaForeground border border-draculaPurple rounded py-2 px-4 mr-2"
      />
      <input
        type="text"
        placeholder="Text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="bg-draculaBackground text-draculaForeground border border-draculaPurple rounded py-2 px-4 mr-2"
      />
      <button type="submit" className="bg-draculaPurple text-draculaBackground py-2 px-4 rounded">
        Save
      </button>
    </form>
  );
};

export default InputWithSave;
