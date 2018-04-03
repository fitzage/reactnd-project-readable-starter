import React, { Component } from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Nav from './Nav'
import SinglePost from './SinglePost'
import ListPosts from './ListPosts'
import NotFound from './NotFound'
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
        <Switch>
          <Route path="/" exact render={() => (
            <ListPosts />
          )} />
          <Route path="/404" component={NotFound} status={404} />
          <Route path="/:category" exact render={() => (
            <ListPosts />
          )} />
          <Route path="/:category/:postId" exact render={() => (
            <SinglePost />
          )} />
        </Switch>
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
