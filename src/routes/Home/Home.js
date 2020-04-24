import React from 'react';
import './Home.css';
import { ReactComponent as Biker } from './girl-biker.svg';
import { Animated } from 'react-animated-css';

export default function Home() {
  return (
    <div className="page-wrapper">
      <Animated animationIn="slideInLeft" animationInDuration={1750}>
        <Biker className="biker" />
      </Animated>
    </div>
  );
}
