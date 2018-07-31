import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';

export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.onChange = this.onChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
{/*// TODO: add university, fieldofstudy and other fileds from server/models/users*/}
    var formData = new FormData();
    var imagefile = document.getElementById('profilePicture');
    formData.append('name', document.getElementById('name').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('telegramId', document.getElementById('telegramId').value);
    formData.append('password', document.getElementById('password').value);
    formData.append('image', imagefile.files[0]);
    axios.post('/registration', formData, config).then(function(res) {
      console.log('res : ',res.data);
    }).catch(console.error);
  }

  // onChange(value) {
  //   console.log("Captcha value:", value);
  // }

  render() {
    return (<form className="registrationForm">
      <input type="text" name="name" id="name" required="required" placeholder="نام"/>
      <br/>
      <input type="email" id="email" required="required" placeholder="ایمیل"/>
      <br/>
      <input type="text" id="telegramId" required="required" placeholder="آی‌دی تلگرام"/>
      <br/>
      <input type="password" id="password" required="required" placeholder="رمز عبور"/>
      <br/>
      <input type="file" id="profilePicture"/>
      <br/>
      {/* TODO: get the sitekey from http://www.google.com/recaptcha/admin*/}
      <ReCAPTCHA
        ref="recaptcha"
        sitekey="Your client site key"
        onChange={this.onChange}
        />
      <button className="registerButton" onClick={this.handleSubmit}>عضویت</button>
    </form>)

  };
}
