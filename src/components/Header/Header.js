import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';
import './Header.css';
import { ReactComponent as Logo } from './Assets/logo.svg';

class Header extends Component {
  static contextType = UserContext;

  handleLogoutClick = () => {
    this.context.processLogout();
  };

  renderLogoutLink() {
    return (
      <div>
        <span className="userName">Welcome, {this.context.user.name}!</span>
        <nav>
          <Link className="links" onClick={this.handleLogoutClick} to="/login">
            Logout
          </Link>
        </nav>
      </div>
    );
  }

  renderLoginLink() {
    return (
      <nav>
        <Link className="links" to="/login">
          Login
        </Link>{' '}
        <Link className="links" to="/register">
          Sign up
        </Link>
      </nav>
    );
  }

  render() {
    return (
      <header className="header">
        <h1 className="logo">
          <Link className="logo" to="/">
            <Logo
              style={{ width: '300px', fill: '#626363', paddingTop: '20px' }}
            />
          </Link>
        </h1>
        <div className="navLinks">
          {TokenService.hasAuthToken()
            ? this.renderLogoutLink()
            : this.renderLoginLink()}
        </div>
      </header>
    );
  }
}

export default Header;
