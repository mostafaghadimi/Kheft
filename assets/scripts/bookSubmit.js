import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class BookSubmit extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

  function onChange(value) {
    console.log("Captcha value:", value);
  }

// TODO: add university, fieldofstudy and other fileds from server/models/users
    var formData = new FormData();
    var imagefile = document.getElementById('bookPicture');
    formData.append('name', document.getElementById('name').value);
    formData.append('author', document.getElementById('author').value);
    formData.append('year', document.getElementById('year').value);
    formData.append('publication', document.getElementById('publication').value);
    formData.append('picture', imagefile.files[0]);
    console.log(formData.name);
    axios.post('/bookSubmit', formData, config).then(function(res) {
      console.log('Post request has been sent to /BookSubmit. :)');
    }).catch(console.error);
  }

  render() {
    return (<form className="registrationForm">
      <input type="text" id="name" required="required" placeholder="نام کتاب"/>
      <br/>
      <input type="text" id="author" required="required" placeholder="نویسنده"/>
      <br/>
      <input type="number" id="year" required="required" placeholder="سال انتشار"/>
      <br/>
      <input type="text" id="publication" required="required" placeholder="نام انتشارات"/>
      <br/>
      <input type="text" id="major" required="required" placeholder="رشته"/>
      <input type="file" id="bookPicture"/>
      <br/>

      <button className="registerButton" onClick={this.handleSubmit}>ثبت کتاب</button>
    </form>)
  };
}
