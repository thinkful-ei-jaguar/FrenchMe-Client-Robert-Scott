import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LanguageService from '../../services/language-service';


class DashboardRoute extends Component {
  
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
      console.log(this.state)
    })
  }

  mapthewords=(words)=>{
    return words.map(w=>{
      return <div>
        <p>{w.original}</p>
    <p> correct:{w.correct_count} incorrect:{w.incorrect_count}</p>
        
        </div>
    })
  }




  render() {
    return (
      <section>
        <h2 className='languageHeader'>Language: {this.state.language.name}</h2>
        
        <h3 className='languageHeader'>Words to Practice</h3>
        <div>
          {this.mapthewords(this.state.words)}
          </div>
        <Link to='/learn'>Start Practicing</Link>
      </section>
    );
  }
}

export default DashboardRoute
