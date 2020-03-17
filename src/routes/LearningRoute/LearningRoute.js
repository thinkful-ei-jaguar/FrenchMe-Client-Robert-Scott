import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import LanguageContext from '../../contexts/LanguageContext'
import Button from '../../components/Button/Button';
import './LearningRoute.css';
import LanguageService from '../../services/language-service';
class LearningRoute extends Component {
  static contextType =LanguageContext ;
  constructor(props){
    super(props);
    this.state={
      language:{},
      words:{},
      guess:'',
      isLoading:true,
      isCorrect:true,
    }
    //this.checkifanswerisright=this.checkifanswerisright.bind(this)
  }
  async componentDidMount(){
    await LanguageService.getHead()
    .then(res=>{
      this.setState({
        language:this.context.language,
        words:res.firstword,
      })
      console.log(this.state);
    })
  }
  handleChangeAnswer = e =>{
    console.log(e.target.value)
    this.setState({
      guess:e.target.value,
    })
  }
  checkifanswerisright = (value) =>{
    if(value === this.state.words.translation){
      console.log("quess right")
      return true
    }
    console.log("guess wrong")
    return false
  }
  handlesubmit=(e)=>{
    e.preventDefault();
    let check = this.checkifanswerisright(this.state.guess);
    if(check){
      this.setState({
        isLoading:false,
      })
    }
    else{
      this.setState({ 
        isLoading:false,
        isCorrect:false,
      })
    }

  }

  learnpage=()=>{
    return (<section className='learnPage'>
        <h2 className='languageHeader'>This is learning page</h2>
        <div></div>
        <form onSubmit={this.handlesubmit}>
          <label>How do you say {this.state.words.original} in french?
            <input onChange={this.handleChangeAnswer} value={this.state.guess} className='guessInput' type='text' />
          </label>
          <br />
          <Button className='submitAnswer' type='submit'>Submit Your Answer</Button>
        </form>
      </section>
      )
  }


  feedbackpage=()=>{
    if(this.state.isCorrect){
    return (<section className='learnPage'>
        <h2 className='languageHeader'>You are right</h2>
        <div></div>      
        <Button>Next Word</Button>
      </section>
      )
    }else{
      return (<section className='learnPage'>
        <h2 className='languageHeader'>You are wrong</h2>
        <div></div>      
        <Button>Next Word</Button>
      </section>
      )
    }
  }


  render() {
    return (<div>
      {this.state.isLoading ? this.learnpage() : this.feedbackpage()}
      </div>
    );
  }
}

export default LearningRoute
