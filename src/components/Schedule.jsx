import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const Schedule = () => {
  const [seriesMatches, setSeriesMatches] = useState([]);

  async function getSeriesInfo() {
    try {
      const response = await axios.get(
        "https://api.cricapi.com/v1/series_info?apikey=98b105c6-265f-42d4-830d-beda2d658434&offset=0&id=47b54677-34de-4378-9019-154e82b9cc1a"
      );
      
      const matches = response.data.data.matches || []; // Fetch matches array safely
      setSeriesMatches(matches);
      
    } catch (error) {
      console.error("Error fetching series info:", error);
    }
  }

  useEffect(() => {
    getSeriesInfo();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-4">
        Series Schedule
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Match Details</th>
              <th className="px-4 py-2 border">Time</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {seriesMatches.map((match, index) => (
              <tr key={index} className="border">
                {/* Match Date */}
                <td className="px-4 py-2 border text-gray-600">
                  {match.date || "N/A"}
                </td>

                {/* Match Details */}
                <td className="px-4 py-2 border">
                  <div className="font-semibold">
                    {match.teamInfo?.[0]?.shortname || match.teams?.[0] || "Team A"} vs{" "}
                    {match.teamInfo?.[1]?.shortname || match.teams?.[1] || "Team B"}, {match.matchNumber || "Match"}
                  </div>
                  <div className="text-sm text-gray-600">{match.venue || "Venue Not Available"}</div>

                  {/* If match is completed, show result */}
                  {match.status === "Completed" && (
                    <div className="text-blue-600 font-semibold text-sm">
                      {match.result || "Result Not Available"}
                    </div>
                  )}
                </td>

                {/* Match Time */}
                <td className="px-4 py-2 border text-gray-600">
                  {match.dateTimeGMT ? new Date(match.dateTimeGMT).toLocaleTimeString() : "Time Not Available"} <br />
                  <span className="text-xs text-gray-500">{match.dateTimeGMT || "N/A"} GMT</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Schedule;
