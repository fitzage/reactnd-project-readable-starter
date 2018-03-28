import React, { Component } from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadPosts } from '../actions'
import Moment from 'react-moment'
import Truncate from 'react-truncate'

class ListPosts extends Component {
  render() {
    const { category } = this.props.match.params
    const { posts } = this.props
    const postLink = (postCategory, postId) => `/${postCategory}/${postId}`
    let filteredPosts
    category ? filteredPosts = posts.filter((post) => post.category === category) : filteredPosts = posts
    return (
      <div><h1>{category}</h1>
        <ul className="posts">
        {filteredPosts.map((post) => (
          <li className="post" key={post.id}>
            <h2><Link to={postLink(post.category, post.id)}>{post.title}</Link></h2>
            <Truncate lines={3} ellipsis={<span className="ellipsis">...</span>}>
            {post.body}
            </Truncate>
            <div className="meta">
              <p className="author-time">
                <span className="author">{post.author}</span>
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

export default withRouter(connect(mapStateToProps)(ListPosts))