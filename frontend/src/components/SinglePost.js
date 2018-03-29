import React, { Component } from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { votePost } from '../actions'

class SinglePost extends Component {
  upVote = () => {
    this.props.votePost(this.props.match.params.postId, {option: 'upVote'})
  }
  downVote = () => {
    this.props.votePost(this.props.match.params.postId, {option: 'downVote'})
  }
  render() {
    const { posts } = this.props
    const { postId } = this.props.match.params
    const post = posts.find((post) => post.id === postId)
    return (
      <div>
        {post &&
        <div className="single-post">
          <h1>{post.title}</h1>
          {post.body}
          <p className="vote-comments">
            <span className="vote">
              <Link to="#" onClick={this.upVote}>&#128077;</Link>
              <Link to="#" onClick={this.downVote}>&#128078;</Link>
              {post.voteScore}
            </span>
            <span className="comments">Comments: {post.commentCount}</span>
          </p>
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

function mapDispatchToProps (dispatch) {
  return {
    votePost: (id, vote) => dispatch(votePost(id, vote)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SinglePost))