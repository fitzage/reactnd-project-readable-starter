import React, { Component } from 'react'
import { Link, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { votePost, deletePost } from '../actions'
import Moment from 'react-moment'
import Truncate from 'react-truncate'
import Modal from 'react-modal'
import PostForm from './PostForm'

/* TODO: add confirmation when deleting posts/comments ?? */

class ListPosts extends Component {
  state = {
    postModalOpen: false,
    postId: null,
    sortKey: 'timestamp',
    sortOrder: 'asc',
    notFound: false,
  }
  openPostModal = (postId) => {
    this.setState(() => ({
      postModalOpen: true,
      postId
    }))
  }
  closePostModal = () => {
    this.setState(() =>({
      postModalOpen: false,
    }))
  }
  upVote = (id) => {
    this.props.votePost(id, {option: 'upVote'})
  }
  downVote = (id) => {
    this.props.votePost(id, {option: 'downVote'})
  }
  deletePost = (id) => {
    this.props.deletePost(id)
  }
  onChangeSortKey = (value) => {
    this.setState({sortKey: value})
  }
  onChangeSortOrder = (value) => {
    this.setState({sortOrder: value})
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.categories.length !== 0) {
      if (nextProps.match.params.category && nextProps.categories.filter((obj) => obj.path === nextProps.match.params.category).length === 0) {
        this.setState({ notFound: true })
      }
    }
  }
  render() {
    const { category } = this.props.match.params
    const { posts, categories } = this.props
    const { postModalOpen, postId, sortKey, sortOrder } = this.state
    const postLink = (postCategory, postId) => `/${postCategory}/${postId}`
    let filteredPosts
    category ? filteredPosts = posts.filter((post) => post.category === category) : filteredPosts = posts
    if (this.state.notFound === false) {
    return (
      <div><h1>{category ? `Category: ${category}` : 'All Posts'}</h1>
        <select defaultValue={sortKey} onChange={(e) => this.onChangeSortKey(e.target.value)}>
          <option value="timestamp">Date/Time</option>
          <option value="voteScore">Vote Score</option>
          <option value="author">Author Name</option>
          <option value="title">Title</option>
        </select>
        <select defaultValue={sortOrder} onChange={(e) => this.onChangeSortOrder(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <Link to="#" onClick={() => this.openPostModal()} className="add-post">New Post</Link>
        <ul className="posts">
        {filteredPosts.sort((a,b) => {
          if (sortOrder === 'asc') {
            if (a[sortKey] < b[sortKey]) {
              return -1
            } else if (a[sortKey] > b[sortKey]) {
              return 1
            } else {
              return 0
            }
          } else {
            if (a[sortKey] < b[sortKey]) {
              return 1
            } else if (a[sortKey] > b[sortKey]) {
              return -1
            } else {
              return 0
            }
          }
          }).map((post) => (
          <li className="post" key={post.id}>
            <h2>
              <Link to={postLink(post.category, post.id)}>{post.title}</Link>
              <span>
                <Link to="#" onClick={() => this.openPostModal(post.id)} className="edit-post">&#9998;</Link>
                <Link to="#" onClick={() => this.deletePost(post.id)} className="delete-post">X</Link>
              </span>
            </h2>
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
                  <Link to="#" onClick={() => this.upVote(post.id)} className="upvote">&#9650;</Link>
                  <Link to="#" onClick={() => this.downVote(post.id)} className="downvote">&#9660;</Link>
                  {post.voteScore}
                </span>
                <span className="comments">Comments: {post.commentCount}</span>
              </p>
            </div>
          </li>
        ))}
        </ul>
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
            categoryId={category}
          />
        </Modal>
      </div>
    )
    } else {
      return (
        <Redirect to='/404' />
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    categories: state.categories,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    votePost: (id, vote) => dispatch(votePost(id, vote)),
    deletePost: (id) => dispatch(deletePost(id)),
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ListPosts))