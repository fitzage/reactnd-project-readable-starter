import React, { Component } from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadPosts } from '../actions'

class ListPosts extends Component {
  componentDidMount() {
    this.props.loadPosts(this.props.match.params.category)
  }

  componentWillReceiveProps() {
    this.props.loadPosts(this.props.match.params.category)
  }

  render() {
    const { category } = this.props.match.params
    const { posts } = this.props
    return (
      <div><h1>{category}</h1>
        <ul className="posts">
        {posts.map((post) => (
          <li className="post" key={post.id}>
            <h2>{post.title}</h2>
            {post.body}
            {post.timestamp}
          </li>
        ))}
        </ul>
      </div>
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
    loadPosts: (category) => dispatch(loadPosts(category)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListPosts))