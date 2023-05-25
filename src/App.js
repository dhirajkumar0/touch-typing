import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import moment from "moment";
import "./styles.css";

const App = () => {
  const [keys, setKeys] = useState([]);
  const [accuracy, setAccuracy] = useState(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    axios.get("https://api.random.org/json/?min=1&max=8&count=8")
      .then((response) => {
        setKeys(response.data);
      })
      .catch((error) => {
        console.error("Error fetching keys:", error);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleKeyDown = (event) => {
    const key = event.keyCode;

    if (keys.includes(key)) {
      setKeys((prevKeys) => {
        return prevKeys.filter((prevKey) => prevKey !== key);
      });
      setAccuracy((prevAccuracy) => prevAccuracy + 1);
    } else {
      setAccuracy((prevAccuracy) => prevAccuracy - 1);
    }
  };

  return (
    <div style={{ background: "lightgray" }}>
      <h1 style={{ color: "black", fontSize: "16px" }}>Touch Typing</h1>
      <div style={{ border: "1px solid black" }}>
        <ul style={{ background: "lightgray", color: "black" }}>
          {keys.map((key) => (
            <li key={key}>
              <span>{key}</span>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ border: "1px solid black", margin: "10px" }}>
        <input
          type="text"
          placeholder="Type here"
          onKeyDown={handleKeyDown} 
        />
      </div>
      <div style={{ color: "black", fontSize: "16px" }}>
        <h2>Accuracy: {accuracy}</h2>
        <h2>Time: {moment.utc(time * 1000).format("mm:ss")}</h2>
      </div>
    </div>
  );
};

export default App;
