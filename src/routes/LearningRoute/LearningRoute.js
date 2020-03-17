import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LanguageContext from '../../contexts/LanguageContext'
import Button from '../../components/Button/Button';
import './LearningRoute.css';
class LearningRoute extends Component {
  static contextType =LanguageContext ;
  constructor(props){
    super(props);
    this.state={
      language:{},
      words:[],

    }
  }
  async componentDidMount(){
    await this.setState({
        language:this.context.language,
        words:this.context.words,
      })
    //console.log(this.context);
    console.log(this.state);
  }


  render() {
    return (
      <section className='learnPage'>
        <h2 className='languageHeader'>This is learning page</h2>
        <div></div>
        <form>
          <label>How do you say x in french?
            <input className='guessInput' type='text' />
          </label>
          <br />
          <Button className='submitAnswer' type='submit'>Submit Your Answer</Button>
        </form>
        
        <Button>Next Word</Button>
      </section>
    );
  }
}

export default LearningRoute
