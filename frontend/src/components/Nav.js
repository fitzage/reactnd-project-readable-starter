import React, { Component } from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadCategories, loadPosts } from '../actions'
import SinglePost from './SinglePost'
import ShowCategory from './ShowCategory'
import ListPosts from './ListPosts'
import '../App.css'
import * as postsAPI from '../utils/api'

class Nav extends Component  {
  componentDidMount() {
    this.props.loadCategories();
  }
  render () {
    const { categories } = this.props
    return (
      <ul className="nav">
        <li className="home"><Link to="/">Home</Link></li>
      {categories.map((category) => (
        <li key={category.name}>
          <Link to={category.path} >{category.name}</Link>
        </li>
      ))}
      </ul>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
