import React, { Component } from 'react';
import LanguageContext from '../../contexts/LanguageContext';
import Button from '../../components/Button/Button';
import './LearningRoute.css';
import LanguageService from '../../services/language-service';
class LearningRoute extends Component {
  static contextType = LanguageContext ;

  constructor(props){
    super(props);
    this.state = {
      language: {},
      words: {},
      guess:'',
      isLoading: true,
      isCorrect: true,
    }
  }

  async componentDidMount() {
    await LanguageService.getHead()
      .then(res => {
        this.setState({
          language: this.context.language,
          words: res.firstword,
        })
      })
  }

  handleChangeAnswer = e =>{
    this.setState({
      guess: e.target.value.toLowerCase(),
    })
  }

  checkIfAnswerIsRight = value =>{
    if(value === this.state.words.translation){
      return true
    }
    return false
  }

  handleSubmit = e =>{
    e.preventDefault();
    LanguageService.postGuess({guess: this.state.guess})

    let check = this.checkIfAnswerIsRight(this.state.guess);
    if(check){
      this.setState({
        isLoading:false,
      })
      this.context.incrementLanguageTotalCount()
    }
    else {
      this.setState({ 
        isLoading:false,
        isCorrect:false,
      })
    }
  }

  handleNextWord = () => {
    this.componentDidMount()
    this.setState({
      isLoading: true,
      isCorrect: true,
      guess: '',
    });
  }

  learnPage = () => {
    return (<section className='learnPage'>
        <h2 className='languageHeader'>Learning Page</h2>
        <div>
          <p>Correct Guesses: {this.state.words.correct_count}</p> 
          <p>Incorrect Guesses: {this.state.words.incorrect_count}</p>
          <p>Total Correct Count: {this.context.language.total_score} </p> 
        </div>
        <form onSubmit={this.handleSubmit}>
          <label>How do you say <em>{this.state.words.original}</em> in English?
            <input onChange={this.handleChangeAnswer} value={this.state.guess} className='guessInput' type='text' required />
          </label>
          <br />
          <Button className='submitAnswer' type='submit'>Submit Your Answer</Button>
        </form>
      </section>
      )
  }

  feedbackPage = () => {
    if(this.state.isCorrect){
    let newcount = this.state.words.correct_count + 1;
    
    return (<section className='learnPage'>
        <h2 className='languageHeader'>You were correct!</h2> 
        <p>Correct Guesses: {newcount}</p> 
        <p>Incorrect Guesses: {this.state.words.incorrect_count}</p>
        <p>Total Correct Count: {this.context.language.total_score} </p>  
        <Button onClick={this.handleNextWord}>Next Word</Button>
      </section>
      )
    } else {
      let newcount=this.state.words.incorrect_count+1
      return (<section className='learnPage'>
        <h2 className='languageHeader'>The correct translation for {this.state.words.original} was {this.state.words.translation} and you chose {this.state.guess}.</h2> 
        <p>Correct Guesses: {this.state.words.correct_count}</p> 
        <p>Incorrect Guesses: {newcount}</p>   
        <Button onClick={this.handleNextWord}>Next Word</Button>
      </section>
      )
    }
  }

  render() {
    return (<div>
      {this.state.isLoading ? this.learnPage() : this.feedbackPage()}
      </div>
    );
  }
}

export default LearningRoute
