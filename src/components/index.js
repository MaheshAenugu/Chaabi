/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';

import './index.css';

const TypingApp = () => {
  const [userInput, setUserInput] = useState('');
  const [nextKeys, setNextKeys] = useState('');
  const [keyCount, setKeyCount] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [timer, setTimer] = useState(300);
  const [intervalId, setIntervalId] = useState(null);

  const onclickButton = () => {
    setNextKeys('');
    setKeyCount(0);
    setAccuracy(0);
    generateNextKeys();

    if (timer <= 0) {
      setTimer(30);
      generateNextKeys();
    } else {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
      setIntervalId(interval);
    }
  };

  useEffect(() => {
    if (timer === 0) {
      clearInterval(intervalId);
    }
  }, [timer, intervalId]);

  const handleInputChange = (e) => {
    const input = e.target.value;

    setUserInput(input);
    const accuracyPercentage = calculateAccuracy(input);
    setAccuracy(accuracyPercentage);

    if (input.length === nextKeys.length) {
      setKeyCount(prevKeyCount => prevKeyCount + input.length);
      setUserInput('');
      generateNextKeys();
    }
  };

  const calculateAccuracy = (input) => {
    const expectedKeys = nextKeys.slice(0, input.length);
    let correctCount = 0;

    for (let i = 0; i < input.length; i++) {
      if (input[i] === expectedKeys[i]) {
        correctCount++;
      }
    }

    return Math.round((correctCount / input.length) * 100);
  };

  const generateNextKeys = () => {
    const keys = 'asdfjkl;';
    const nextKey = keys[Math.floor(Math.random() * keys.length)];

    setNextKeys(prevNextKeys => prevNextKeys + nextKey);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className='fluid-container bg-secondary p-3'>
      <h1 className='text-white'>Typing Test</h1>
      <Popup
        trigger={
          <button type="button" className="btn btn-primary m-3">
            Finger Position
          </button>
        }
        position="bottom center"
      >
        <div>
          <img className='pop-image' src="https://res.cloudinary.com/dxvsvzsai/image/upload/v1684908185/keybd_hand_position_mac_1_wfsw3r.jpg" alt="type-image" />
        </div>
      </Popup>
      <p className='timing'>Timing: <span className='timer-span'>{formatTime(timer)}</span></p>
      <p className='time-up'>{timer === 0 ? "Time Up!!!!" : ""}</p>
      <div className='card w-75 p-5 m-3 bg-primary text-white' style={{ fontSize: "35px", textAlign: "center" }}>
        <div className='card-body'>{nextKeys}</div>
      </div>
      <input placeholder='Re-Type' className='form-control w-75 ' type="text" value={userInput} onChange={handleInputChange} />
      <button className='btn btn-success p-2 m-2' onClick={onclickButton}>Start Typing</button>
      <div className='calculation-tab'>
        <p className='key-count'>Key Count: <span className='count-span'>{keyCount}</span></p>
        <p className='accuracy'>Accuracy: <span className='count-span'>{accuracy}%</span></p>
      </div>
    </div>
  );
};

export default TypingApp;
