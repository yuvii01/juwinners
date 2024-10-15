import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./InterestSelector.css";  // Import the custom CSS file

const InterestSelector = () => {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const interests = [
    "Political", "Astrological", "Cooking", "Geopolitical", "Science",
    "Business", "Environment", "Doctors", "Technology", "Movie Reviews",
    "Entertainment", "Traveling", "Stock Market", "Food",
    "Product Review", "Spiritual", "Self Help", "Love Guru",
    "Motivational Speaker", "College Counsellor"
  ];

  // Function to handle interest selection by clicking the entire item
  const handleInterestClick = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  // Function to handle form submission
  const handleSubmit = () => {
    if (selectedInterests.length >= 3) {
      console.log("Selected Interests: ", selectedInterests);
    } else {
      console.log("Please select at least 3 interests.");
    }
  };

  return (
    <div className="interest-selector">
      <h1>Select Your Interests</h1>
      <div className="interest-grid">
        {interests.map((interest, index) => (
          <div
            key={index}
            className={`interest-item ${selectedInterests.includes(interest) ? 'selected' : ''}`}
            onClick={() => handleInterestClick(interest)}
          >
            {interest}
          </div>
        ))}
      </div>
      <div className="text-center">
        {/* Button is disabled if selected interests are less than 3 */}
        <button
          className="btn submit-btn"
          onClick={handleSubmit}
          disabled={selectedInterests.length < 3}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default InterestSelector;
