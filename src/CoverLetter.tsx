// src/CoverLetter.tsx

import React, { useState } from 'react';
import axios from 'axios';

const CoverLetter: React.FC = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [generatedText, setGeneratedText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState<number>(-1);

    const handleSubmit = async () => {
        setIsLoading(true);

        const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
        const ENDPOINT = 'https://api.openai.com/v1/engines/text-davinci-003/completions';

        const prompt = `Using the following template, generate a cover letter for a ${jobTitle} position at ${companyName}:

        Dear Hiring Manager,
      
        I am excited to submit my application for the [Job Title] position at [Company Name]. As a [job-related quality], I am confident that I would be a great addition to your team.
      
        [A paragraph about the applicant's relevant experience or passion]
      
        [A paragraph about the applicant's reliability and responsibility]
      
        I am excited about the opportunity to work for [Company Name], a company that shares my values and commitment to [company values]. Thank you for considering my application, and I look forward to the opportunity to discuss my qualifications further.
      
        Sincerely,
      
        [Your Name]
        `;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
            },
        };

        const data = {
            prompt,
            max_tokens: 400,
            n: 1,
            stop: null,
            temperature: 0.8,
        };


        try {
            const response = await axios.post(ENDPOINT, data, config);
            const generatedText = response.data.choices[0].text;
            setGeneratedText(generatedText);
        } catch (error) {
            console.error('Error generating cover letter draft:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text).then(
            () => {
                console.log("Text copied to clipboard:", text);
                setCopiedIndex(index);
                setTimeout(() => {
                    setCopiedIndex(-1);
                }, 1000);
            },
            (err) => {
                console.error("Could not copy text:", err);
            }
        );
    };

    return (
        <div className='py-6 flex-col'>
            <div className="flex">
                <input
                    type="text"
                    placeholder="Job Title"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="bg-accent text-subText rounded-md py-2 px-4 mr-2"
                />
                <input
                    type="text"
                    placeholder="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="bg-accent text-subText rounded-md py-2 px-4 mr-2"
                />
            </div>
            <div className="flex gap-3 py-4">
                <button
                    onClick={() => handleCopy(generatedText, 0)}
                    className="bg-accent text-secondaryBase px-4 py-2 rounded-md font-bold hover:bg-secondaryLightHover text-sm">
                    COPY
                </button>
                <button onClick={handleSubmit} className="bg-secondaryBase text-accent px-4 py-2 rounded-md font-bold hover:bg-secondaryLightHover text-sm">
                    DRAFT LETTER
                </button>
            </div>
            {isLoading ? (
                <p className='mb-4 text-green'>Loading...</p>
            ) : (
                generatedText && (
                    <div className="p-4 bg-accent rounded-md text-subText mt-6">
                        <div className="whitespace-pre-line">{generatedText}</div>
                    </div>
                )
            )}
        </div>
    );
};

export default CoverLetter;
