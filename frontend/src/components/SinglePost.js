import React, { Component } from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadPosts } from '../actions'

class SinglePost extends Component {
  render() {
    const { posts } = this.props
    const { postId } = this.props.match.params
    const post = posts.find((post) => post.id === postId)
    return (
      <div>
        {post &&
        <div className="single-post">
          <h1>{post.title}</h1>
          <p>{post.text}</p>
        </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
  }
}

export default withRouter(connect(mapStateToProps)(SinglePost))