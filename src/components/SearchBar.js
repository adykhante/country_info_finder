// src/components/SearchBar.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchBar.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios.get('https://dpaste.com/79QXDY8TD.txt')
      .then(response => {
        setCountries(response.data);
        setFilteredCountries(response.data);
      })
      .catch(() => {
        fetch('/data/countries.json')
          .then(response => response.json())
          .then(data => {
            setCountries(data);
            setFilteredCountries(data);
          })
          .catch(error => console.error('Error fetching data:', error));
      });
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredCountries([]);
    } else {
      const results = countries.filter(country =>
        country.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCountries(results);
    }
  }, [searchTerm, countries]);

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setSearchTerm('');
    setFilteredCountries([]);
  };

  const handleClear = () => {
    setSelectedCountry(null);
  };

  return (
    <div className="search-bar-wrapper">
      <h1 className="app-title">Country Search</h1>
      <div className="search-bar-container">
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a country..."
          />
          {filteredCountries.length > 0 && !selectedCountry && (
            <ul className="results-list">
              {filteredCountries.map((country, index) => (
                <li
                  key={index}
                  className="result-item"
                  onClick={() => handleSelectCountry(country)}
                >
                  <div className="result-name">{country.country}</div>
                  <div className="result-capital">{country.capital}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {selectedCountry && (
          <div className="selected-result">
            <button className="clear-button" onClick={handleClear}>×</button>
            <h3>{selectedCountry.country}</h3>
            <p><strong>Capital:</strong> {selectedCountry.capital}</p>
            <p><strong>Population:</strong> {selectedCountry.population.toLocaleString()}</p>
            <p><strong>Official Language:</strong> {Array.isArray(selectedCountry.official_language) ? selectedCountry.official_language.join(', ') : selectedCountry.official_language}</p>
            <p><strong>Currency:</strong> {selectedCountry.currency}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
