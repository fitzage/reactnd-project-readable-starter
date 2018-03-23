import React, { Component } from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadCategories, loadPosts } from '../actions'
import ListPosts from './ListPosts'

class ShowCategory extends Component {
  render() {
    return (
      <div><h1>This is a category</h1>
        <ListPosts />
      </div>
    )
  }
}

export default ShowCategory