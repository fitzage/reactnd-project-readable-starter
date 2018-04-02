import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Nav from './Nav'
import SinglePost from './SinglePost'
import ListPosts from './ListPosts'
import '../App.css'
import { loadPosts } from '../actions'

class App extends Component {
  componentWillMount() {
    this.props.loadPosts()
  }
  render() {
    return (
      <div className="App">
        <Nav />
        <Route path="/" exact render={() => (
          <ListPosts />
        )} />
        <Route path="/:category" exact render={() => (
          <ListPosts />
        )} />
        <Route path="/:category/:postId" exact render={() => (
          <SinglePost />
        )} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadPosts: () => dispatch(loadPosts()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
