import React from 'react';
import { Slider } from '@material-ui/core';

interface SliderProps {
  taxiAmount: number,
  handleChange: any
}

const sliderInput = ({taxiAmount, handleChange}: SliderProps) => { 

  const marks = [
    {
      value: 0,
      label: '1',
    },
    {
      value: 25,
      label: '25',
    },
    {
      value: 50,
      label: '50',
    },
  ];

  return (
   
    <Slider
      value={taxiAmount}
      defaultValue={1}
      aria-labelledby="discrete-slider-small-steps"
      step={1}
      min={1}
      max={50}
      onChange={handleChange}
      valueLabelDisplay="auto"
      marks={marks}
    />
 
  );
}

export default sliderInput;