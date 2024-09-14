// src/api/fetchCountries.js
import axios from 'axios';

/**
 * Fetches country data from a remote URL or a local file as a fallback.
 * @returns {Promise<Array>} The country data.
 */
export const fetchCountries = async () => {
  const URL = 'https://dpaste.com/79QXDY8TD.txt'; // Remote data URL
  const LOCAL_FILE = 'data/countries.txt'; // Path to the local file

  try {
    // Attempt to fetch data from the remote URL
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch from URL, trying local file', error);
    
    // Fallback to local file
    try {
      const response = await fetch(LOCAL_FILE);
      if (!response.ok) {
        throw new Error('Failed to fetch from local file');
      }
      return response.json();
    } catch (localError) {
      console.error('Failed to fetch from local file', localError);
      return []; // Return an empty array if both fetches fail
    }
  }
};
