import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class Registration extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      name: ""
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    var data = {name : document.getElementById('name').value};
    console.log(data);
    axios.post('/registration', data)
    .then(function(res){
      console.log(res.data);
    }).catch(console.error);
  }

  handleChange (){
    this.setState({name: event.target.value});
  }
  render() {
    return (<form className="registrationForm">
      <input type="text" name="name" id="name" required="required" placeholder="نام" onChange={this.handleChange}/>
      <br/>
      {/*<input type="text" name="email" required="required" placeholder="ایمیل"/>
      <br/>
      <input type="number" name="phoneNumber" required="required" placeholder="شماره تلفن"/>
      <br/>
      <input type="password" name="password" required="required" placeholder="رمز عبور"/>
      <br/> */}
      <button className="registerButton" onClick={this.handleSubmit} >عضویت</button>
    </form>)
  };
}
