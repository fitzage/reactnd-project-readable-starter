import React, { Component } from "react";
import { Route, withRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Nav from "./Nav";
import SinglePost from "./SinglePost";
import ListPosts from "./ListPosts";
import NotFound from "./NotFound";
import "../App.css";
import {
  loadPosts,
  getComments,
  deletePost,
  deleteComment,
  votePost
} from "../actions";

/**
 * @description Loads initial post data from API, sets up routes and main componenst
 * @constructor
 */
class App extends Component {
  state = {
    postModalOpen: false,
    postId: ""
  };
  /**
   * @description Opens new/edit post modal
   * @param {string} postId - ID of post to be edited, if present
   * @param {boolean} postModalOpen - Sets local state to trigger rendering of modal
   */
  openPostModal = postId => {
    this.setState(() => ({
      postModalOpen: true,
      postId
    }));
  };
  /**
   * @description Closes new/edit post modal
   * @param {boolean} postModalOpen - Sets local state to trigger closing of modal
   */
  closePostModal = () => {
    this.setState(() => ({
      postModalOpen: false
    }));
  };
  /**
   * @description delete a post and associated comments
   * @param {string} id - ID of post to be deleted
   */
  onDeletePost = id => {
    this.props.getComments(id).then(comments => {
      this.props.comments.map(comment => this.props.deleteComment(comment.id));
    });
    this.props.deletePost(id);
  };
  /**
   * @description increase or decrease voteCount on specified post
   * @param {string} id - ID of post to be voted on
   * @param {string} vote - upVote or downVote
   */
  vote = (id, vote) => {
    this.props.votePost(id, { option: vote });
  };
  componentWillMount() {
    this.props.loadPosts();
  }
  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <React.Fragment>
                <Nav />
                <ListPosts
                  openPostModal={this.openPostModal}
                  closePostModal={this.closePostModal}
                  postModalOpen={this.state.postModalOpen}
                  onDeletePost={this.onDeletePost}
                  vote={this.vote}
                  postId={this.state.postId}
                />
              </React.Fragment>
            )}
          />
          <Route
            path="/404"
            status={404}
            render={() => (
              <React.Fragment>
                <Nav />
                <NotFound />
              </React.Fragment>
            )}
          />
          <Route
            path="/:category"
            exact
            render={() => (
              <React.Fragment>
                <Nav />
                <ListPosts
                  openPostModal={this.openPostModal}
                  closePostModal={this.closePostModal}
                  postModalOpen={this.state.postModalOpen}
                  onDeletePost={this.onDeletePost}
                  vote={this.vote}
                  postId={this.state.postId}
                />
              </React.Fragment>
            )}
          />
          <Route
            path="/:category/:postId"
            exact
            render={() => (
              <React.Fragment>
                <Nav />
                <SinglePost
                  openPostModal={this.openPostModal}
                  closePostModal={this.closePostModal}
                  postModalOpen={this.state.postModalOpen}
                  onDeletePost={this.onDeletePost}
                  vote={this.vote}
                  getComments={this.props.getComments}
                />
              </React.Fragment>
            )}
          />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    comments: state.comments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadPosts: () => dispatch(loadPosts()),
    deletePost: id => dispatch(deletePost(id)),
    deleteComment: id => dispatch(deleteComment(id)),
    getComments: id => dispatch(getComments(id)),
    votePost: (id, vote) => dispatch(votePost(id, vote))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
