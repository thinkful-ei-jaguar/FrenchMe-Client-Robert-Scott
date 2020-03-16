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
}

export default LanguageService
