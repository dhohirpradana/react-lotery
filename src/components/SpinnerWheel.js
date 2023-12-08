// src/components/PlanetForm.js

import React, { useState } from 'react';
import './PlanetForm.css';
import WheelComponent from './WheelComponent'; // Sesuaikan dengan path file WheelComponent

const PlanetForm = () => {
  const [chosenPlanets, setChosenPlanets] = useState({
    Jupiter: 0,
    Saturn: 0,
    Uranus: 0,
    Neptune: 0,
    Mercury: 0,
    Venus: 0,
    Earth: 0,
    Mars: 0
  });

  const [selectedBet, setSelectedBet] = useState(0);

  const handleBetChange = (bet) => {
    setSelectedBet(bet);
  };

  const increaseBet = (planet) => {
    if (selectedBet !== 0) {
      setChosenPlanets({
        ...chosenPlanets,
        [planet]: chosenPlanets[planet] + selectedBet
      });
    }
  };

  const betOptions = [10, 50, 100, 1000];

  const planets = ["Jupiter", "Saturn", "Uranus", "Neptune", "Mercury", "Venus", "Earth", "Mars"];
  const segColors = []; // Sesuaikan dengan warna segment

  const onFinished = (winner) => {
    // Handle the winner here
  };

  return (
    <div className="planet-form">
      <div>
        <h2>Taruhan Planet</h2>
        <div className="bet-options">
          {betOptions.map((bet) => (
            <button key={bet} onClick={() => handleBetChange(bet)}>
              {bet}
            </button>
          ))}
        </div>
        <div className="planet-bets">
          {Object.keys(chosenPlanets).map((planet) => (
            <div key={planet} className="planet-bet">
              <p onClick={() => increaseBet(planet)}>
                {planet}: {chosenPlanets[planet]}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <WheelComponent
          segments={planets}
          segColors={segColors}
          winningSegment="MM"
          onFinished={(winner) => onFinished(winner)}
          primaryColor="red"
          contrastColor="white"
          buttonText="Spin"
          isOnlyOnce={false}
          size={190}
          upDuration={500}
          downDuration={600}
          fontFamily="Helvetica"
        />
      </div>
    </div>
  );
};

export default PlanetForm;
