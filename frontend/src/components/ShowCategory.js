import React, { Component } from 'react'
import ListPosts from './ListPosts'

class ShowCategory extends Component {
  render() {
    return (
      <div><h1>This is a category</h1>
        <ListPosts />
      </div>
    )
  }
}

export default ShowCategory