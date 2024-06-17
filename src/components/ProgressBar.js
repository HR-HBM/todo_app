import React, { useState, useEffect } from 'react';

const ProgressBar = ({ progress}) => {
  const colors = [
    'rgb(255, 214, 161)',
    'rgb(255, 175, 163)',
    'rgb(108, 115, 148)',
    'rgb(141, 181, 145)',
    'rgb(110, 100, 250)',
  ]

  const [randomColor, setRandomColor] = useState('')

  useEffect(() => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    setRandomColor(color);
  }, [])

    return (
      <div className="outer-bar">
        <div className="inner-bar" style={{ width: `${progress}%`, backgroundColor: randomColor }}></div>
        <div className=""></div>
      </div>
    )
  }
  
  export default ProgressBar
  