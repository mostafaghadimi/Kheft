import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Registration from './registration';

class App extends Component {
  render() {
    return (
      <Registration/>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('main'));
