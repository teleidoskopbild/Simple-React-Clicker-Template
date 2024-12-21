import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [points, setPoints] = useState(() => {
    const savedPoints = localStorage.getItem("points");
    return savedPoints ? parseInt(savedPoints, 10) : 0;
  });
  const [pointsPerClick, setPointsPerClick] = useState(() => {
    const savedPointsPerClick = localStorage.getItem("pointsPerClick");
    return savedPointsPerClick ? parseInt(savedPointsPerClick, 10) : 1;
  });
  const [upgradeCost, setUpgradeCost] = useState(() => {
    const savedUpgradeCost = localStorage.getItem("upgradeCost");
    return savedUpgradeCost ? parseInt(savedUpgradeCost, 10) : 10;
  });
  const [autoclickerActive, setAutoclickerActive] = useState(() => {
    const savedAutoclickerActive = localStorage.getItem("autoclickerActive");
    return savedAutoclickerActive === "true";
  });
  const [autoclickerPointsPerSecond, setAutoclickerPointsPerSecond] = useState(
    () => {
      const savedAutoclickerPoints = localStorage.getItem(
        "autoclickerPointsPerSecond"
      );
      return savedAutoclickerPoints ? parseInt(savedAutoclickerPoints, 10) : 0;
    }
  );
  const [autoclickerCost, setAutoclickerCost] = useState(() => {
    const savedAutoclickerCost = localStorage.getItem("autoclickerCost");
    return savedAutoclickerCost ? parseInt(savedAutoclickerCost, 10) : 25;
  });

  // clicker button handler
  const handleClick = () => {
    setPoints(points + pointsPerClick);
  };

  // upgrade button handler

  const handleUpgrade = () => {
    if (points >= upgradeCost) {
      setPoints(points - upgradeCost);
      setPointsPerClick(pointsPerClick + 1);
      setUpgradeCost(Math.floor(upgradeCost * 1.5));
    }
  };

  // autoclicker button handler and upgrade (activates at first, then upgrades)
  const handleAutoclicker = () => {
    if (points >= autoclickerCost) {
      setPoints(points - autoclickerCost);
      if (!autoclickerActive) {
        setAutoclickerActive(true);
      }
      setAutoclickerPointsPerSecond(autoclickerPointsPerSecond + 1);
      setAutoclickerCost(Math.floor(autoclickerCost * 1.6));
    }
  };

  // effect to save all states to localStorage
  useEffect(() => {
    localStorage.setItem("points", points);
    localStorage.setItem("pointsPerClick", pointsPerClick);
    localStorage.setItem("upgradeCost", upgradeCost);
    localStorage.setItem("autoclickerActive", autoclickerActive);
    localStorage.setItem(
      "autoclickerPointsPerSecond",
      autoclickerPointsPerSecond
    );
    localStorage.setItem("autoclickerCost", autoclickerCost);
  }, [
    points,
    pointsPerClick,
    upgradeCost,
    autoclickerActive,
    autoclickerPointsPerSecond,
    autoclickerCost,
  ]);

  // useEffect for autoclicker to run every second

  useEffect(() => {
    if (autoclickerActive) {
      const interval = setInterval(() => {
        setPoints((prevPoints) => prevPoints + autoclickerPointsPerSecond);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [autoclickerActive, autoclickerPointsPerSecond]);

  // reset game handler
  const handleReset = () => {
    setPoints(0);
    setPointsPerClick(1);
    setUpgradeCost(10);
    setAutoclickerActive(false);
    setAutoclickerPointsPerSecond(0);
    setAutoclickerCost(25);
    localStorage.clear(); // clear all saved data in localStorage
  };

  return (
    <div>
      <h1>
        Points: {points.toLocaleString(undefined, { maximumFractionDigits: 3 })}
      </h1>
      <div className="button-container">
        <button className="button-class" onClick={handleClick}>
          Click for Points
        </button>
        <br />
        <button className="button-class" onClick={handleUpgrade}>
          Upgrade Clicker! (Cost:{upgradeCost} Points!)
        </button>
        <br />
        <button className="button-class" onClick={handleAutoclicker}>
          {autoclickerActive
            ? `Upgrade Autoclicker (Cost: ${autoclickerCost} Points)`
            : `Buy Autoclicker (Cost: ${autoclickerCost} Points)`}
        </button>
        <br />
        <button className="button-class" onClick={handleReset}>
          Reset Game
        </button>
      </div>
    </div>
  );
}

export default App;
