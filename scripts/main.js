import React, {Component} from 'react'
import ReactDOM from 'react-dom'


// class App extends Component{
//   render()
// }
function Welcome(props){
  return <h1> Hello, {props.name + " " + props.lastName}</h1>
}

function App (){
  return (
    <div>
      <Welcome name='Mostafa' lastName= 'Ghadimi'/>
      <Welcome name='Mehran' lastName= 'Hosein Zade'/>
      <Welcome name='Mehran' lastName= 'Asghari'/>
    </div>
  )
}
ReactDOM.render(<App/> , document.getElementById('main'))
