import React, { Component } from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadPosts } from '../actions'

class SinglePost extends Component {
  componentWillMount() {
    if (this.props.posts.length === 0) {
      this.props.loadPosts()
    }
  }
  render() {
    const { posts } = this.props
    return (
      <div><h1></h1></div>
    )
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SinglePost))