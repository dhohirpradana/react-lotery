import React, { useState } from "react";
import axios from "axios";
import "./PlanetForm.css"; // Pastikan file CSS untuk styling telah di-import

const PlanetForm = () => {
  const initialBetState = {
    Jupiter: 0,
    Saturn: 0,
    Uranus: 0,
    Neptune: 0,
    Mercury: 0,
    Venus: 0,
    Earth: 0,
    Mars: 0,
  };

  const kali = ["45x", "25x", "15x", "10x", "5x", "5x", "5x", "5x"];

  const [chosenPlanets, setChosenPlanets] = useState(initialBetState);

  const [selectedBet, setSelectedBet] = useState(10);
  const [result, setResult] = useState("");

  const handleBetChange = (bet) => {
    setSelectedBet(bet);
  };

  const increaseBet = (planet) => {
    const totalNonZero = Object.values(chosenPlanets).reduce(
      (accumulator, currentValue) => accumulator + (currentValue !== 0 ? 1 : 0),
      0
    );
    if (selectedBet !== 0 && chosenPlanets[planet] === 0 && totalNonZero >= 6) {
    } else if (selectedBet !== 0) {
      setChosenPlanets({
        ...chosenPlanets,
        [planet]: chosenPlanets[planet] + selectedBet,
      });
    }
  };

  const betOptions = [10, 50, 100, 1000];

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://103.127.97.98:3555/galaxy", {
        ...chosenPlanets,
      });
      setResult(response.data);
    } catch (error) {
      console.log(error);
      setResult("Error: Terjadi kesalahan saat memproses permintaan.");
    }
  };

  const resetBets = () => {
    setChosenPlanets(initialBetState);
  };

  const bgColors = [
    "#ff9999",
    "#99ff99",
    "#9999ff",
    "#ffff99",
    "#ff99ff",
    "#99ffff",
    "#ffcc99",
    "#cc99ff",
  ];

  return (
    <div className="planet-form-container">
      <h2>Galaxy</h2>
      <div className="bet-options">
        {betOptions.map((bet) => (
          <button
            key={bet}
            onClick={() => handleBetChange(bet)}
            className={selectedBet === bet ? "selected" : ""}
          >
            {bet}
          </button>
        ))}
        <button onClick={resetBets} className="reset">
          RESET
        </button>
      </div>
      <div className="planet-bets">
        {Object.keys(chosenPlanets).map((planet, i) => (
          <div
            key={planet}
            className="planet-bet"
            style={{ backgroundColor: bgColors[i] }}
          >
            <div
              onClick={() => increaseBet(planet)}
              onDoubleClick={(e) => {
                e.preventDefault();
              }}
              className="no-select"
            >
              <div>
                {planet} {kali[i]}
              </div>
              <div>{chosenPlanets[planet]}</div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="lotre-form">
        {result && <div className="result-text">{result.out}</div>}
        {result && <div className="result">{result.bonus}</div>}
        <button type="submit" className="spin-button">
          Spin
        </button>
      </form>
    </div>
  );
};

export default PlanetForm;
