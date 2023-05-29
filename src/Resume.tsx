// src/Resume.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DocumentCheckIcon, ClipboardIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import Lottie from 'lottie-react';
import { useAuth0 } from "@auth0/auth0-react";
import { useStores } from './stores';

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

  const { user, isAuthenticated } = useAuth0();
  const { userStore } = useStores();
  const [refreshKey, setRefreshKey] = useState(Date.now()); // Add a refreshKey

  // useEffect for fetching user
  useEffect(() => {
    if (user?.sub) {
      userStore.fetchUser(user?.sub);
    }
  }, [user?.sub, refreshKey]); // add refreshKey as a dependency

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

    if (user?.sub === undefined) {
      console.error("user.sub is undefined");
      return;
    }

    // Check if the user has reached their daily limit
    if (userStore.user && userStore.user.resumeRequests >= 3) {
      alert('You have reached your daily limit of 3 resume generations. Please subscribe to generate more.');
      return;
    }

    setIsLoading(true);

    const url = `${process.env.REACT_APP_API_URL}/api/users/${encodeURIComponent(user?.sub)}/increment`;

    // Increment the user's resume count
    try {
      await userStore.incrementResumeCount(user?.sub);
    } catch (error: any) {
      if (error.response && error.response.status === 429) {
        alert('You have reached your daily limit of 3 resume generations. Please subscribe to generate more.');
        return;
      } else {
        if (error instanceof Error) {
          console.error('Error incrementing resume count:', error.message);
        } else {
          console.error('An unknown error occurred:', error);
        }
        return;
      }
    }

    try {
      const response = await axios.post(ENDPOINT, data, config);
      const generatedText = response.data.choices[0].text;
      setGeneratedText(generatedText);
    } catch (error) {
      console.error('Error generating resume:', error);
    } finally {
      setIsLoading(false);
      setRefreshKey(Date.now()); // Toggle the refreshKey to trigger useEffect
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

  function msToTime(duration: number): string {
    let seconds: number | string = Math.floor((duration / 1000) % 60),
      minutes: number | string = Math.floor((duration / (1000 * 60)) % 60),
      hours: number | string = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + "hrs " + minutes + "min";
  }

  return (
    <div className='py-6 flex-col'>
      {/* {userStore.user && (
        <div className='flex items-center p-3 mb-4 gap-2 bg-warningBaseBackground border-2 rounded-lg border-yellow-400 text-gray-900'>
          <ExclamationTriangleIcon className='h-6 w-6 text-yellow-500' />
          <p>Tokens: {3 - userStore.user.resumeRequests}</p>
          {userStore.user.resumeRequests >= 3 && (
            <p>Resets: {msToTime(new Date(userStore.user.lastRequestDate).getTime() + 24 * 60 * 60 * 1000 - Date.now())}</p>
          )}
        </div>
      )} */}
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          className={`flex-grow bg-accent text-subText rounded-md py-2 px-6 ${jobTitleError ? 'border-2 border-red-500' : ''}`}
        />
        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className={`flex-grow bg-accent text-subText rounded-md py-2 px-6 ${companyNameError ? 'border-2 border-red-500' : ''}`}
        />
      </div>
      <div className="mb-4">
        <textarea
          placeholder="Job Description"
          rows={4}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className={`w-full bg-accent text-subText rounded-md py-2 px-4 ${jobDescriptionError ? 'border-2 border-red-500' : ''}`}
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
          disabled={isLoading || (userStore.user?.resumeRequests || 0) >= 3}
        >
          {isLoading
            ? 'LOADING...'
            : `GENERATE RESUME (${3 - (userStore.user?.resumeRequests || 0)})`}
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

