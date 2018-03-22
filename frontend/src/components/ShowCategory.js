import React, { Component } from 'react'
import ListPosts from './ListPosts'

class ShowCategory extends Component {
  render() {
    return (
      <div>This is a category
        <ListPosts />
      </div>
    )
  }
}

export default ShowCategory