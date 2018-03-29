import React, { Component } from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadPosts, votePost, deletePost } from '../actions'
import Moment from 'react-moment'
import Truncate from 'react-truncate'

class ListPosts extends Component {
  upVote = (id) => {
    this.props.votePost(id, {option: 'upVote'})
  }
  downVote = (id) => {
    this.props.votePost(id, {option: 'downVote'})
  }
  deletePost = (id) => {
    this.props.deletePost(id)
  }
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
            <h2><Link to={postLink(post.category, post.id)}>{post.title}</Link><Link to="#" onClick={() => this.deletePost(post.id)}>Delete</Link></h2>
            <Truncate lines={3} ellipsis={<span className="ellipsis">...</span>}>
            {post.body}
            </Truncate>
            <div className="meta">
              <p className="author-time">
                <span className="author">{post.author}</span>
                <span className="date-time"><Moment format="MMMM D, YYYY, h:mm a">{post.timestamp}</Moment></span>
              </p>
              <p className="vote-comments">
                <span className="vote">
                  <Link to="#" onClick={() => this.upVote(post.id)}>&#128077;</Link>
                  <Link to="#" onClick={() => this.downVote(post.id)}>&#128078;</Link>
                  {post.voteScore}
                </span>
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
    votePost: (id, vote) => dispatch(votePost(id, vote)),
    deletePost: (id) => dispatch(deletePost(id)),
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ListPosts))