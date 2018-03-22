import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import SinglePost from './SinglePost'
import ShowCategory from './ShowCategory'
import ListPosts from './ListPosts'
import '../App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" exact render={() => (
          <ListPosts />
        )} />
        <Route path="/:category" exact render={() => (
          <ShowCategory />
        )} />
        <Route path="/:category/:postId" exact render={() => (
          <SinglePost />
        )} />
      </div>
    );
  }
}

export default App;
