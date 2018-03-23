import React, { Component } from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadCategories, loadPosts } from '../actions'
import SinglePost from './SinglePost'
import ShowCategory from './ShowCategory'
import ListPosts from './ListPosts'
import '../App.css'
import * as postsAPI from '../utils/api'

class App extends Component {
  componentDidMount() {
    this.props.loadCategories();
  }
  render() {
    const { categories } = this.props
    return (
      <div className="App">
        <ul className="nav">
        {categories.map((category) => (
          <li key={category.name}>
            <Link to={category.path} >{category.name}</Link>
          </li>
        ))}
        </ul>
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

function mapStateToProps(state) {
  return {
    categories: state.categories,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadCategories: () => dispatch(loadCategories()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
