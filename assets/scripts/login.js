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

    var formData = new FormData();
    formData.append('email', document.getElementById('email').value);
    formData.append('password', document.getElementById('password').value);
    axios.post('/login', formData).then(function(res) {
      console.log('Post request has been sent to /login');
    }).catch(console.error);
  }

  render() {
    return (<form className="registrationForm">
      <input type="email" id="email" required="required" placeholder="ایمیل"/>
      <br/>
      <input type="password" id="password" required="required" placeholder="رمز عبور"/>
      <br/>
      <button className="registerButton" onClick={this.handleSubmit}>ورود</button>
    </form>)
  };
}
