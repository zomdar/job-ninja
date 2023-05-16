// src/Resume.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DocumentCheckIcon, ClipboardIcon } from "@heroicons/react/24/solid";
import Lottie from 'lottie-react';

const Resume: React.FC = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number>(-1);
  const [flashingIndex, setFlashingIndex] = useState<number>(-1);
  const [jobTitleError, setJobTitleError] = useState(false);
  const [companyNameError, setCompanyNameError] = useState(false);
  const [jobDescriptionError, setJobDescriptionError] = useState(false);
  const [loadingAnimation, setLoadingAnimation] = useState(null);

  useEffect(() => {
    const fetchAnimationData = async () => {
      try {
        const response = await fetch('https://assets3.lottiefiles.com/packages/lf20_yfn1jaiue6.json');
        const data = await response.json();
        setLoadingAnimation(data);
      } catch (e) {
        console.error('Error fetching Lottie animation:', e);
      }
    };

    fetchAnimationData();
  }, []);

  const handleSubmit = async () => {
    // Reset error states
    setJobTitleError(false);
    setCompanyNameError(false);
    setJobDescriptionError(false);

    // Use local variables to store error states
    let localJobTitleError = false;
    let localCompanyNameError = false;
    let localJobDescriptionError = false;

    // Set error states if inputs are empty or contain only whitespace
    if (!jobTitle.trim()) {
      setJobTitleError(true);
      localJobTitleError = true;
    }
    if (!companyName.trim()) {
      setCompanyNameError(true);
      localCompanyNameError = true;
    }
    if (!jobDescription.trim()) {
      setJobDescriptionError(true);
      localJobDescriptionError = true;
    }

    // Return if there are any errors, preventing the API call
    if (localJobTitleError || localCompanyNameError || localJobDescriptionError) {
      return;
    }

    setIsLoading(true);

    const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
    const ENDPOINT = 'https://api.openai.com/v1/engines/text-davinci-003/completions';

    const prompt = `Create a professional resume for the following details:

        Job Title: ${jobTitle}
        Company Name: ${companyName}
        Job Description: ${jobDescription}

        The resume should include the following sections: 
        - Professional Experience 
        - Education
        - Skills
        - Tools
        - Social Links
        - Projects

        The Professional Experience section should detail specific roles, responsibilities, and achievements in previous jobs, including the current role. 

        The Education section should detail the highest level of education achieved, including the degree, the institution, and the year of graduation.

        The Skills and Tools sections should detail relevant technical and soft skills, as well as proficiency in specific software or tools.

        The Social Links section should provide URLs to professional social media profiles or portfolios.

        The Projects section should provide URLs to notable projects or work samples.`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
    };

    const data = {
      prompt,
      max_tokens: 800,
      n: 1,
      stop: null,
      temperature: 0.8,
    };

    try {
      const response = await axios.post(ENDPOINT, data, config);
      const generatedText = response.data.choices[0].text;
      setGeneratedText(generatedText);
    } catch (error) {
      console.error('Error generating resume:', error);
    } finally {
      setIsLoading(false);
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

  return (
    <div className='py-6 flex-col'>
      <div className="flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          className={`bg-accent text-subText rounded-md py-2 px-6 ${jobTitleError ? 'border-2 border-red-500' : ''}`}
        />
        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className={`bg-accent text-subText rounded-md py-2 px-6 ${companyNameError ? 'border-2 border-red-500' : ''}`}
        />
      </div>
      <div className="flex py-2">
        <textarea
          placeholder="Job Description"
          rows={4}
          cols={50}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className={`bg-accent text-subText rounded-md py-2 px-4 ${jobDescriptionError ? 'border-2 border-red-500' : ''}`}
        />
      </div>
      <div className="flex gap-3 py-4">
        <button
          onClick={() => handleCopy(generatedText, 0)}
          className="bg-slate-100 text-secondaryBase px-4 py-2 rounded-md font-bold hover:bg-slate-300 text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          COPY
        </button>
        <button
          onClick={handleSubmit}
          className="bg-secondaryBase text-accent px-4 py-2 rounded-md font-bold hover:bg-secondaryBaseHover text-sm disabled:bg-gray-500 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'LOADING...' : 'GENERATE RESUME'}
        </button>
      </div>
      {isLoading && loadingAnimation ? (
        <div className="flex justify-center">
          <Lottie animationData={loadingAnimation} style={{}} />
        </div>
      ) : (
        generatedText && (
          <div
            onClick={() => handleCopy(generatedText, 0)}
            className={`group relative p-4 bg-accent rounded-md text-subText mt-6 hover:cursor-pointer hover:outline hover:outline-indigo-500 hover:outline-offset-2 ${flashingIndex === 0 ? "hover:outline-emerald-400" : ""}`}
            style={{ transition: "border-color 200ms" }}
          >
            <div className="whitespace-pre-line">{generatedText}</div>
            <div className="hidden group-hover:block absolute top-0 right-0 bg-black text-white text-xs px-2 py-1 rounded-bl-md rounded-tr-md">
              <div className="flex gap-1 items-center">
                {flashingIndex === 0 ? <DocumentCheckIcon className='h-3 w-3' /> : <ClipboardIcon className='h-3 w-3' />}
                <p>{flashingIndex === 0 ? "Copied!" : "Copy"}</p>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Resume;

