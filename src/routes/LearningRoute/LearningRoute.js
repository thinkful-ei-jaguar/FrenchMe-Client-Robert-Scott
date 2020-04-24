import React, { Component } from 'react';
import LanguageContext from '../../contexts/LanguageContext';
import Button from '../../components/Button/Button';
import './LearningRoute.css';
import LanguageService from '../../services/language-service';
import { Input } from '../../components/Form/Form';
import parisBackgroundImg from '../Home/French-Moi-Biker.svg';
class LearningRoute extends Component {
  static contextType = LanguageContext;

  constructor(props) {
    super(props);
    this.nextButton = React.createRef();
    this.focus = this.focus.bind(this);
    this.state = {
      language: {},
      words: {},
      guess: '',
      isLoading: true,
      isCorrect: true,
    };
  }

  focus() {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.nextButton.current.focus();
  }

  async componentDidMount() {
    await LanguageService.getHead().then((res) => {
      this.setState({
        language: this.context.language,
        words: res.firstword,
      });
    });
  }

  handleChangeAnswer = (e) => {
    this.setState({
      guess: e.target.value.toLowerCase(),
    });
  };

  checkIfAnswerIsRight = (value) => {
    if (value === this.state.words.translation) {
      return true;
    }
    return false;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    LanguageService.postGuess({ guess: this.state.guess });

    let check = this.checkIfAnswerIsRight(this.state.guess);
    if (check) {
      this.setState({
        isLoading: false,
      });
      this.context.incrementLanguageTotalCount();
    } else {
      this.setState({
        isLoading: false,
        isCorrect: false,
      });
    }
  };

  handleNextWord = () => {
    this.componentDidMount();
    this.setState({
      isLoading: true,
      isCorrect: true,
      guess: '',
    });
  };

  learnPage = () => {
    return (
      <>
        <section className="learnPage">
          <h2 className="languageHeaderLearn">La Pratique</h2>
          <form onSubmit={this.handleSubmit}>
            <label className="question">
              How do you say{' '}
              <span
                style={{
                  color: 'rgb(60, 72, 198)',
                  fontSize: '30px',
                  paddingLeft: '5px',
                  paddingRight: '5px',
                }}
              >
                {this.state.words.original}
              </span>{' '}
              in English?
              <Input
                onChange={this.handleChangeAnswer}
                value={this.state.guess}
                className="guessInput"
                type="text"
                required
              />
            </label>

            <Button className="submitAnswer" type="submit">
              Submit
            </Button>
            <div>
              <p>Correct Guesses: {this.state.words.correct_count}</p>
              <p>Incorrect Guesses: {this.state.words.incorrect_count}</p>
              <p>Total Correct Count: {this.context.language.total_score} </p>
            </div>
          </form>
          <img
            className="parisBackground"
            src={parisBackgroundImg}
            alt="paris-background"
          />
        </section>
      </>
    );
  };

  feedbackPage = () => {
    if (this.state.isCorrect) {
      let newcount = this.state.words.correct_count + 1;

      return (
        <section className="learnPage">
          <h2 className="languageHeader">You were correct!</h2>
          <p>Correct Guesses: {newcount}</p>
          <p>Incorrect Guesses: {this.state.words.incorrect_count}</p>
          <p>Total Correct Count: {this.context.language.total_score} </p>
          <Button onClick={this.handleNextWord}>Next Word</Button>
          <img
            className="parisBackgroundLearn"
            src={parisBackgroundImg}
            alt="paris-background"
          />
        </section>
      );
    } else {
      let newcount = this.state.words.incorrect_count + 1;
      return (
        <section className="learnPage">
          <h2 className="languageHeader">
            The correct translation for {this.state.words.original} was{' '}
            {this.state.words.translation} and you chose {this.state.guess}.
          </h2>
          <p>Correct Guesses: {this.state.words.correct_count}</p>
          <p>Incorrect Guesses: {newcount}</p>
          <Button onClick={this.handleNextWord}>Next Word</Button>
          <img
            className="parisBackgroundLearn"
            src={parisBackgroundImg}
            alt="paris-background"
          />
        </section>
      );
    }
  };

  render() {
    return (
      <div>{this.state.isLoading ? this.learnPage() : this.feedbackPage()}</div>
    );
  }
}

export default LearningRoute;
