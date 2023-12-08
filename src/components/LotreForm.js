// src/components/LotreForm.js

import React, { useState } from "react";
import axios from "axios";

const LotreForm = () => {
  const [chosenPlanets, setChosenPlanets] = useState({
    Jupiter: 0,
    Saturn: 0,
    Uranus: 0,
    Neptune: 0,
    Mercury: 0,
    Venus: 0,
    Earth: 0,
    Mars: 0,
  });
  const [result, setResult] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setChosenPlanets({
      ...chosenPlanets,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/lotre", {
        chosenPlanets,
      });
      setResult(response.data.result);
    } catch (error) {
      console.log(error)
      setResult("Error: Terjadi kesalahan saat memproses permintaan.");
    }
  };

  return (
    <div>
      <h2>Lotere Planet</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Earth:</label>
          <input
            type="number"
            name="Jupiter"
            value={chosenPlanets.Jupiter}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Saturn:</label>
          <input
            type="number"
            name="Saturn"
            value={chosenPlanets.Saturn}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Uranus:</label>
          <input
            type="number"
            name="Uranus"
            value={chosenPlanets.Uranus}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Neptune:</label>
          <input
            type="number"
            name="Neptune"
            value={chosenPlanets.Neptune}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Mercury:</label>
          <input
            type="number"
            name="Mercury"
            value={chosenPlanets.Mercury}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Venus:</label>
          <input
            type="number"
            name="Venus"
            value={chosenPlanets.Venus}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Earth:</label>
          <input
            type="number"
            name="Earth"
            value={chosenPlanets.Earth}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Mars:</label>
          <input
            type="number"
            name="Mars"
            value={chosenPlanets.Mars}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Lakukan Lotre</button>
      </form>
      {result && <div>Hasil Lotre: {result}</div>}
    </div>
  );
};

export default LotreForm;
