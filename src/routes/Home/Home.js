import React from 'react';
import './Home.css';
import { ReactComponent as Biker } from './girl-biker.svg';
import { Animated } from 'react-animated-css';

export default function Home() {
  return (
    <div className="homeWrap">
      <div className="page-wrapper">
        <p style={{ fontSize: '45px', marginTop: '15px' }}>
          Let's practice French!
        </p>
        <Animated animationIn="slideInLeft" animationInDuration={1750}>
          <Biker className="biker" />
        </Animated>
      </div>
    </div>
  );
}
