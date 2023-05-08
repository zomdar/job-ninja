// src/InputWithSave.tsx

import React, { useState } from "react";

interface InputWithSaveProps {
  onSave: (label: string, text: string) => void;
  onClose: () => void;
}

const InputWithSave: React.FC<InputWithSaveProps> = ({ onSave, onClose }) => {
  const [label, setLabel] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if label or text input fields are empty or contain only whitespace
    if (!label.trim() || !text.trim()) {
      alert("Label and Text fields cannot be empty.");
      return;
    }

    onSave(label, text);
    onClose();
    setLabel("");
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex-col items-center">
      <div className="flex pb-4">
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
      </div>
      <div className="flex gap-2">
        <button
          onClick={onClose}
          className="bg-draculaForeground text-secondaryBase py-2 px-4 rounded hover:bg-stone-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-secondaryBase text-draculaBackground py-1 px-4 rounded font-bold shadow-md hover:bg-draculaComment"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default InputWithSave;
