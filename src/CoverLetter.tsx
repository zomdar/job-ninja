// src/CoverLetter.tsx

import React, { useState } from 'react';
import axios from 'axios';

const CoverLetter: React.FC = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [generatedText, setGeneratedText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        // Replace this with your OpenAI API key and endpoint
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

    return (
        <div className='py-6'>
            <input
                type="text"
                placeholder="Job Title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="bg-draculaBackground text-draculaForeground border border-draculaPurple rounded py-2 px-4 mr-2"
            />
            <input
                type="text"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="bg-draculaBackground text-draculaForeground border border-draculaPurple rounded py-2 px-4 mr-2"
            />
            <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded mb-4">
                Generate Draft
            </button>
            {isLoading ? (
                <p className='mb-4 text-green'>Loading...</p>
            ) : (
                generatedText && (
                    <div className="border border-draculaForeground p-4 bg-draculaBackground text-white mt-6">
                        <h2 className="text-xl font-bold mb-2">Generated Cover Letter Draft:</h2>
                        <div className="whitespace-pre-line">{generatedText}</div>
                    </div>
                )
            )}
        </div>
    );
};

export default CoverLetter;
