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
  setWords = words => {
    this.setState({ words })
  }

  render() {
    const value = {
        language: this.state.language,
        words: this.state.words,
        setLanguage:this.setLanguage,
        setWords:this.setWords,
    }
    return (
      <LanguageContext.Provider value={value}>
        {this.props.children}
      </LanguageContext.Provider>
    )
  }
}