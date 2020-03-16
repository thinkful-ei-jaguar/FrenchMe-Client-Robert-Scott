import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LanguageContext from '../../contexts/LanguageContext'

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
      <section>
        <h2 className='languageHeader'>This is learning page</h2>
        <div>
          <p>question</p>
        </div>
        <Link to='/'>Home</Link>
      </section>
    );
  }
}

export default LearningRoute
