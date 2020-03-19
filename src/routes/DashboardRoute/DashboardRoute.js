import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LanguageService from '../../services/language-service';
import LanguageContext from '../../contexts/LanguageContext';
import './DashboardRoute.css';
class DashboardRoute extends Component {
  static contextType = LanguageContext ;
  constructor(props){
    super(props);
    this.state={
      language:{},
      words:[],
      total_count: null,
    }
  }

  async componentDidMount(){
    await LanguageService.GetLanguage()
    .then(res => {
      this.setState({
        language:res.language,
        words:res.words,
      })
      this.context.setLanguage(res.language);
      this.context.setWords(res.words);
    })
  }

  mapTheWords=(words)=>{
    return words.map((word, idx)=>{
      return <div key={idx}>
        <h2 className='frenchWord'>{word.original}</h2>
    <p className='correctWord'> Correct Answer Count: {word.correct_count}</p>
    <p className='incorrectWord'>Incorrect Answer Count: {word.incorrect_count}</p>
        </div>
    })
  }

  render() {
    return (
      <section className='dashboard'>
        <h2 className='languageHeader'>Language: {this.state.language.name}</h2>
        <Link className='startPracticeButton' to='/learn'>Start Practicing</Link>
        <h3> Correct Answer Count: {this.state.language.total_score} </h3>
        <br />
        <h3 className='languageHeader'>Words to Practice:</h3>
        <div>
          {this.mapTheWords(this.state.words)}
        </div>
        
      </section>
    );
  }
}

export default DashboardRoute
