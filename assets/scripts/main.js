import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Registration from './registration';
import Login from './login'

class App extends Component {
  render() {
    return (
      <Registration/>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('registration'));
ReactDOM.render(<Login/>, document.getElementById('login'));
