import React, { Component } from 'react'
import '../App.css'
import * as PostsAPI from '../utils/api'

class App extends Component {

  // comment '894tuq4ut84ut8v4t8wun89g'
  // post '8xf0y6ziyjabvozdd253nd'
  componentDidMount () {
    PostsAPI.deleteComment('894tuq4ut84ut8v4t8wun89g').then((posts) => {
      console.log(posts)
    })
  }

  render() {
    return (
      <div className="App">
      <h1></h1>
      </div>
    );
  }
}

export default App;
