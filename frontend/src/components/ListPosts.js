import React, { Component } from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadPosts } from '../actions'
import Moment from 'react-moment'

class ListPosts extends Component {
  componentDidMount() {
    this.props.loadPosts(this.props.match.params.category)
  }

  componentWillReceiveProps(nextProps) {
    const previousCategory = this.props.match.params.category
    const nextCategory = nextProps.match.params.category
    previousCategory !== nextCategory && this.props.loadPosts(nextCategory)
  }

  render() {
    const { category } = this.props.match.params
    const { posts } = this.props
    const postLink = (id) => `/${category}/${id}`
    return (
      <div><h1>{category}</h1>
        <ul className="posts">
        {posts.map((post) => (
          <li className="post" key={post.id}>
            <h2><Link to={postLink(post.id)}>{post.title}</Link></h2>
            <p>{post.body}</p>
            <div className="meta">
              <p className="author-time"><span className="author">{post.author}</span>
                <span className="date-time"><Moment format="MMMM D, YYYY, h:mm a">{post.timestamp}</Moment></span>
              </p>
              <p className="vote-comments">
                <span className="vote"></span>
                <span className="comments">Comments: {post.commentCount}</span>
              </p>
            </div>
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