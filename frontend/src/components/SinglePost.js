import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { votePost, deletePost, getComments, deleteComment, voteComment } from '../actions'
import Modal from 'react-modal'
import PostForm from './PostForm'
import CommentForm from './CommentForm'

class SinglePost extends Component {
  state = {
    postModalOpen: false,
    commentModalOpen: false,
    commentId: '',
  }
  openPostModal = (postId) => {
    this.setState(() => ({
      postModalOpen: true
    }))
  }
  openCommentModal = (postId, commentId) => {
    this.setState(() => ({
      commentModalOpen: true,
      commentId
    }))
  }
  closePostModal = () => {
    this.setState(() =>({
      postModalOpen: false,
    }))
  }
  closeCommentModal = () => {
    this.setState(() =>({
      commentModalOpen: false,
    }))
  }
  componentDidMount() {
    this.props.getComments(this.props.match.params.postId)
  }
  upVote = () => {
    this.props.votePost(this.props.match.params.postId, {option: 'upVote'})
  }
  downVote = () => {
    this.props.votePost(this.props.match.params.postId, {option: 'downVote'})
  }
  upVoteComment = (id) => {
    this.props.voteComment(id, {option: 'upVote'})
  }
  downVoteComment = (id) => {
    this.props.voteComment(id, {option: 'downVote'})
  }
  deletePost = (id) => {
    this.props.deletePost(id)
  }
  render() {
    const { comments, posts } = this.props
    const { postId } = this.props.match.params
    const { postModalOpen, commentModalOpen, commentId } = this.state
    const post = posts.find((post) => post.id === postId)
    return (
      <div>
        {post &&
        <div className="single-post">
          <h1>
            {post.title}
            <Link to="#" onClick={() => this.openPostModal(post.id)} className="edit-post">Edit</Link>
            <Link to="/" onClick={() => this.deletePost(postId)} className="delete-post">Delete</Link>
          </h1>
          {post.body}
          <p className="vote-comments">
            <span className="vote">
              <Link to="#" onClick={this.upVote}>&#8963;</Link>
              <Link to="#" onClick={this.downVote}>&#8964;</Link>
              {post.voteScore}
            </span>
            <span className="comments">Comments: {post.commentCount}</span>
          </p>
          <h2>Comments</h2>
          <Link to="#" onClick={() => this.openCommentModal(post.id)} className="add-comment">New Comment</Link>
          <ul className="comments">
            {comments.map((comment) => (
              <li key={comment.id}>
                <p className="author-edit">
                  <span className="author">{comment.author}</span>
                  <Link to="#" onClick={() => this.openCommentModal(post.id,comment.id)} className="edit-post">Edit</Link>
                  <Link to="#" onClick={() => this.props.deleteComment(comment.id)} className="delete-post">Delete</Link>
                </p>
                <p>{comment.body}</p>
                <p className="vote-comments">
                  <span className="vote">
                    <Link to="#" onClick={() => this.upVoteComment(comment.id)}>&#8963;</Link>
                    <Link to="#" onClick={() => this.downVoteComment(comment.id)}>&#8964;</Link>
                    {comment.voteScore}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
        }
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={postModalOpen}
          contentLabel='Modal'
        >
          <Link className="close-modal" to="#" onClick={this.closePostModal}>X</Link>
          <PostForm
            postId={postId}
            closePostModal={this.closePostModal}
          />
        </Modal>
        <Modal
          className='modal'
          overlayClassName='overlay'
          isOpen={commentModalOpen}
          contentLabel='Modal'
        >
          <Link className="close-modal" to="#" onClick={this.closeCommentModal}>X</Link>
          <CommentForm
            postId={postId}
            commentId={commentId}
            closeCommentModal={this.closeCommentModal}
            comment={comments.filter(comment => comment.id === commentId)[0]}
          />
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    comments: state.comments
  }
}

function mapDispatchToProps (dispatch) {
  return {
    votePost: (id, vote) => dispatch(votePost(id, vote)),
    deletePost: (id) => dispatch(deletePost(id)),
    getComments: (id) => dispatch(getComments(id)),
    deleteComment: (id) => dispatch(deleteComment(id)),
    voteComment: (id, vote) => dispatch(voteComment(id, vote)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SinglePost))