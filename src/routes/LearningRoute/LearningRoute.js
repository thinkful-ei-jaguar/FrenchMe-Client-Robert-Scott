import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class LearningRoute extends Component {
  render() {
    return (
      <section>
        <h2 className='languageHeader'>Language: French</h2>
        <h3 className='languageHeader'>Words to Practice</h3>
        <div>
          <p>Each French word here with correct/incorrect count</p>
        </div>
        <Link to='/'>Home</Link>
      </section>
    );
  }
}

export default LearningRoute
