import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    var data = {
      email : document.getElementById('login-email').value,
      password : document.getElementById('login-password').value
    };
    axios.post('/login', data).then(function(res) {
      console.log('Post request has been sent to /login');
    }).catch(console.error);
  }

  render() {
    return (<form className="registrationForm">
      <input type="email" id="login-email" required="required" placeholder="ایمیل"/>
      <br/>
      <input type="password" id="login-password" required="required" placeholder="رمز عبور"/>
      <br/>
      <button className="registerButton" onClick={this.handleSubmit}>ورود</button>
    </form>)
  };
}
