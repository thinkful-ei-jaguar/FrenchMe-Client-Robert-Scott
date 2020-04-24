import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LanguageService from '../../services/language-service';
import LanguageContext from '../../contexts/LanguageContext';
import './DashboardRoute.css';
class DashboardRoute extends Component {
  static contextType = LanguageContext;
  constructor(props) {
    super(props);
    this.state = {
      language: {},
      words: [],
      total_count: null,
    };
  }

  async componentDidMount() {
    await LanguageService.GetLanguage().then((res) => {
      this.setState({
        language: res.language,
        words: res.words,
      });
      this.context.setLanguage(res.language);
      this.context.setWords(res.words);
    });
  }

  mapTheWords = (words) => {
    return words.map((word, idx) => {
      return (
        <div key={idx}>
          <h2 className="frenchWord">{word.original}</h2>
          <p className="correctWord">
            {' '}
            Correct Answer Count: {word.correct_count}
          </p>
          <p className="incorrectWord">
            Incorrect Answer Count: {word.incorrect_count}
          </p>
        </div>
      );
    });
  };

  render() {
    return (
      <section className="dashboard">
        <div className="left-container">
          <h2 className="languageHeader">
            Français: {this.state.language.name}
          </h2>
          <Link className="startPracticeButton" to="/learn">
            Start Practicing
          </Link>
          <h3> Total Correct Answers: {this.state.language.total_score} </h3>
          <br />
        </div>
        <div className="right-container">
          <div className="practiceWords">
            <p className="word-header">Words To Practice </p>
            {this.mapTheWords(this.state.words)}
          </div>
        </div>
      </section>
    );
  }
}

export default DashboardRoute;
