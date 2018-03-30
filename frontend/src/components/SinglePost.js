import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { votePost, deletePost } from '../actions'

class SinglePost extends Component {
  state = {
    postModalOpen: false
  }
  componentDidMount() {
    console.log(this.props.posts)
    if (this.props.posts) {
      const post = this.props.posts.find((post) => post.id === this.props.match.params.postId)
      console.log(this.props.posts)
    }
  }
  upVote = () => {
    this.props.votePost(this.props.match.params.postId, {option: 'upVote'})
  }
  downVote = () => {
    this.props.votePost(this.props.match.params.postId, {option: 'downVote'})
  }
  deletePost = (id) => {
    this.props.deletePost(id)
  }
  render() {
    const { posts } = this.props
    const { postId } = this.props.match.params
    const post = posts.find((post) => post.id === postId)
    return (
      <div>
        {post &&
        <div className="single-post">
          <h1>
            {post.title}
            <Link to="/" onClick={() => this.deletePost(postId)} className="delete-post">Delete</Link>
          </h1>
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
    deletePost: (id) => dispatch(deletePost(id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SinglePost))