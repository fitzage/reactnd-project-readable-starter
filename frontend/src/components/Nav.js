import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadCategories } from '../actions'
import '../App.css'

/* TODO: Mark active category */

class Nav extends Component  {
  componentDidMount() {
    if (this.props.categories.length === 0) {
      this.props.loadCategories();
    }
  }
  render () {
    const { categories } = this.props
    return (
      <ul className="nav">
        <li className="home"><Link to="/">Home</Link></li>
      {categories.map((category) => (
        <li key={category.name}>
          <Link to={`/${category.path}`} >{category.name}</Link>
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
