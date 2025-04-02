import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [currentMatches, setCurrentMatches] = useState([]);

  async function getMatches() {
    const result = await axios.get(
      "https://api.cricapi.com/v1/currentMatches?apikey=98b105c6-265f-42d4-830d-beda2d658434&offset=0"
    );
    setCurrentMatches(result.data.data);
  }

  useEffect(() => {
    getMatches();
  }, []);

  // Function to shorten team names (Chennai Super Kings -> CSK)
  const formatTeamName = (name) => {
    const words = name.split(' ');
    return words.length === 1 ? name : words.map((word) => word.charAt(0).toUpperCase()).join('');
  };

  return (
    <div className="p-4 ">
      <h1 className="text-lg sm:text-xl md:text-4xl font-bold text-center mb-4 mt-4">Live Cricket Score</h1>
      {/* Responsive Grid: 1 column on mobile, 4 columns on large screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {currentMatches.map((match, index) => (
          <div key={index} className="bg-white shadow-md  rounded-xl p-4 h-48 flex flex-col justify-between">
            {/* Match Header */}
            <div className="text-sm text-gray-500 flex justify-between">
              <span>{match.name}</span>
              <span className="bg-gray-800 text-white px-2 py-1 text-xs rounded-md">{match.matchType}</span>
            </div>

            {/* Teams and Scores */}
            <div className="mt-2">
              {match.teams.map((team, i) => (
                <div key={i} className="flex justify-between items-center">
                  {/* Formatted Team Name */}
                  <span className="font-semibold text-lg flex items-center p-2">{formatTeamName(team)}</span>
                  {/* Score */}
                  <span className="text-md text-gray-700">
                    {match.score[i] ? `${match.score[i].r}-${match.score[i].w} (${match.score[i].o} ov)` : 'Yet to Bat'}
                  </span>
                </div>
              ))}
            </div>

            {/* Match Status */}
            <div className="text-gray-600 text-sm">{match.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
