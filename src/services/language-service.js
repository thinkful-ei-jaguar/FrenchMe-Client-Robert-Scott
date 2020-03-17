import config from '../config'
import TokenService from './token-service'

const LanguageService = {
    GetLanguage() {
        return fetch(`${config.API_ENDPOINT}/language`, {
          headers: {
            'Authorization':`Bearer ${TokenService.getAuthToken()}`,
            'content-type': 'application/json',
          },
        })
          .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
      },
      getHead() {
        return fetch(`${config.API_ENDPOINT}/language/head`, {
          headers: {
            'Authorization':`Bearer ${TokenService.getAuthToken()}`,
            'content-type': 'application/json',
          },
        })
          .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
      },
      postGuess(guess) {
        return fetch(`${config.API_ENDPOINT}/language/guess`, {
          method: 'POST', 
          headers: {
            'Authorization':`Bearer ${TokenService.getAuthToken()}`,
            'content-type': 'application/json',
          },
          body: JSON.stringify(guess)
      })
        .then(res =>
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
      }
}

export default LanguageService
