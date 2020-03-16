import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LanguageService from '../../services/language-service';
import LanguageContext from '../../contexts/LanguageContext'

class DashboardRoute extends Component {
  static contextType =LanguageContext ;
  constructor(props){
    super(props);
    this.state={
      language:{},
      words:[],

    }
  }


  componentDidMount(){
    LanguageService.GetLanguage()
    .then(res=>{
      this.setState({
        language:res.language,
        words:res.words,
      })
      this.context.setLanguage(res.language);
      this.context.setWords(res.words);
      //console.log(this.state);
      //console.log(this.context);
    })
  }

  mapthewords=(words)=>{
    return words.map((w, idx)=>{
      return <div key={idx}>
        <h2>{w.original}</h2>
    <p> Correct Answer Count:{w.correct_count} Incorrect Answer Count:{w.incorrect_count}</p>
        </div>
    })
  }

  render() {
    return (
      <section>
        <h2 className='languageHeader'>Language: {this.state.language.name}</h2>
        <Link to='/learn'>Start Practicing</Link>
        <h4> Correct Answer Count:{this.state.total_count} </h4>
        <br />
        <h3 className='languageHeader'>Words to Practice</h3>
        <div>
          {this.mapthewords(this.state.words)}
        </div>
        
      </section>
    );
  }
}

export default DashboardRoute
