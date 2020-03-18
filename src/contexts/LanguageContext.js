import React, { Component } from 'react'
//import TokenService from '../services/token-service'


const LanguageContext = React.createContext({
  language: {},
  words:[],
  setLanguage: () => {},
  setWords: () => {},
})

export default LanguageContext

export class LanguageProvider extends Component {
  constructor(props) {
    super(props)
    const state = { language: {}, words: [] }
    this.state = state;
  }

  setLanguage = language => {
    this.setState({ language })
  }
  incrementLanguageTotalCount = () => {
    let newCount = this.state.language.total_score + 1
    this.setState({
      language: {total_score: newCount}
    })
  }
  setWords = words => {
    this.setState({ words })
  }

  render() {
    const value = {
        language: this.state.language,
        words: this.state.words,
        setLanguage: this.setLanguage,
        setWords: this.setWords,
        incrementLanguageTotalCount: this.incrementLanguageTotalCount,
    }
    return (
      <LanguageContext.Provider value={value}>
        {this.props.children}
      </LanguageContext.Provider>
    )
  }
}