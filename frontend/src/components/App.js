import React, { Component } from 'react'
import { Route, withRouter, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Nav from './Nav'
import SinglePost from './SinglePost'
import ListPosts from './ListPosts'
import NotFound from './NotFound'
import '../App.css'
import { loadPosts } from '../actions'

/**
 * @description Loads initial post data from API, sets up routes and main componenst
 * @constructor
 */
class App extends Component {
  componentWillMount() {
    this.props.loadPosts()
  }
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" exact render={() => (
            <React.Fragment>
            <Nav />
            <ListPosts />
            </React.Fragment>
          )} />
          <Route path="/404" status={404} render={() => (
            <React.Fragment>
            <Nav />
            <NotFound />
            </React.Fragment>
          )} />
          <Route path="/:category" exact render={() => (
            <React.Fragment>
            <Nav />
            <ListPosts />
            </React.Fragment>
          )} />
          <Route path="/:category/:postId" exact render={() => (
            <React.Fragment>
            <Nav />
            <SinglePost />
            </React.Fragment>
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
