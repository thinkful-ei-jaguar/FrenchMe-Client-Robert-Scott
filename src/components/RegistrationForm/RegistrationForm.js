import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, Label } from '../Form/Form';
import AuthApiService from '../../services/auth-api-service';
import Button from '../Button/Button';
import './RegistrationForm.css';
import { ReactComponent as Ladyparis } from './login.svg';

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {},
  };

  state = { error: null };

  firstInput = React.createRef();

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { name, username, password } = ev.target;
    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      password: password.value,
    })
      .then((user) => {
        name.value = '';
        username.value = '';
        password.value = '';
        this.props.onRegistrationSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  componentDidMount() {
    this.firstInput.current.focus();
  }

  render() {
    const { error } = this.state;
    return (
      <div className="signupWrap">
        <form className="register-form" onSubmit={this.handleSubmit}>
          <div role="alert">{error && <p>{error}</p>}</div>
          <Ladyparis style={{ width: '44%', justifySelf: 'left' }} />
          <div className="right-container-signup">
            <div>
              <h1 className="signup-header">Create Account</h1>
              <Label htmlFor="registration-name-input" />
              <Input
                ref={this.firstInput}
                id="registration-name-input"
                name="name"
                placeholder="Name"
                required
              />
            </div>
            <div>
              <Label htmlFor="registration-username-input" />
              <Input
                id="registration-username-input"
                name="username"
                placeholder="Username"
                required
              />
            </div>
            <div>
              <Label htmlFor="registration-password-input" />
              <Input
                id="registration-password-input"
                name="password"
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <footer>
              <Button className="signupButton" type="submit">
                Sign up
              </Button>{' '}
              <br />
              <Link className="loginLink" to="/login">
                Already have an account?
              </Link>
            </footer>
          </div>
        </form>
      </div>
    );
  }
}

export default RegistrationForm;
