import React, { useEffect, useState } from 'react';
import './App.css';
import horoscopes from './data';
import potatoImage from './potato.svg';


function App() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    let storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      storedUserId = Math.random().toString(36).substr(2, 9);
      localStorage.setItem('userId', storedUserId);
    }
    setUserId(storedUserId);
  }, []);

  if (!userId) {
    return <div>Loading...</div>;
  }

  const currentDate = new Date();
  const start = new Date(currentDate.getFullYear(), 0, 0);
  const diff = currentDate - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  const uniqueIndex = (parseInt(userId, 36) + dayOfYear) % horoscopes.length;

  const horoscope = horoscopes[uniqueIndex];

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">오늘의 운세</h1>
        <img className="potato" src={potatoImage} alt="Potato" />
          <div className="content">
          <p className="HoroName">{horoscope.name}</p>
          <p className="score">{horoscope.score}점</p>
          <p className="Detail">{horoscope.detail}</p>
        </div>
      </header>
    </div>
  );
}

export default App;