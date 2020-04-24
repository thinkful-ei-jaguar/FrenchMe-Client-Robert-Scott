import React, { Component } from 'react';
import { Input, Label } from '../Form/Form';
import AuthApiService from '../../services/auth-api-service';
import UserContext from '../../contexts/UserContext';
import Button from '../Button/Button';
import './LoginForm.css';
import { Link } from 'react-router-dom';
import { ReactComponent as Girl } from './login.svg';
import Loader from 'react-loader-spinner';
class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {},
  };

  static contextType = UserContext;

  state = { error: null, loading: false };

  firstInput = React.createRef();

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { username, password } = ev.target;

    this.setState({ error: null, loading: true });

    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then((res) => {
        username.value = '';
        password.value = '';
        this.context.processLogin(res.authToken);
        this.props.onLoginSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  componentDidMount() {
    this.firstInput.current.focus();
  }

  render() {
    const { error, loading } = this.state;
    return (
      <>
        {loading ? (
          <Loader
            type="Grid"
            height={80}
            width={80}
            color="rgb(60, 72, 198)"
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '50px',
            }}
          />
        ) : (
          <form className="main-container" onSubmit={this.handleSubmit}>
            {/* <div className="loginWrap"> */}
            <div className="left-container-login">
              <Girl style={{ fill: 'white', width: '65%', marginTop: '7%' }} />
            </div>
            <div className="right-container-login">
              <div className="username">
                <Label htmlFor="login-username-input" />
                <Input
                  ref={this.firstInput}
                  id="login-username-input"
                  name="username"
                  placeholder="Username"
                  required
                />
              </div>
              <div className="password">
                <Label htmlFor="login-password-input" />
                <Input
                  id="login-password-input"
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>
              <Button type="submit">Login</Button>
              <div role="alert">{error && <p>{error}</p>}</div>

              <Link className="signup" to="/register">
                Sign Up
              </Link>
            </div>
          </form>
        )}
      </>
    );
  }
}

export default LoginForm;
