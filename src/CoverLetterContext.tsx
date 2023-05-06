// src/CoverLetterContext.tsx

import { createContext, useContext, useState } from 'react';

interface CoverLetterContextValue {
    generatedText: string;
    setGeneratedText: React.Dispatch<React.SetStateAction<string>>;
}

const CoverLetterContext = createContext<CoverLetterContextValue | undefined>(
    undefined,
);

export const useCoverLetterContext = () => {
    const context = useContext(CoverLetterContext);
    if (!context) {
        throw new Error('useCoverLetterContext must be used within a CoverLetterProvider');
    }
    return context;
};

interface CoverLetterProviderProps {
    children: React.ReactNode;
}

export const CoverLetterProvider: React.FC<CoverLetterProviderProps> = ({ children }) => {
    const [generatedText, setGeneratedText] = useState('');
    const value = { generatedText, setGeneratedText };

    return (
        <CoverLetterContext.Provider value={value}>
            {children}
        </CoverLetterContext.Provider>
    );
};