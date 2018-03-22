import React, { Component, PropTypes } from 'react'
import '../App.css'
import * as PostsAPI from '../utils/api'

class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  }
  render() {
    return (
      <div className="App">
        {this.props.children}
      </div>
    );
  }
}

export default App;
