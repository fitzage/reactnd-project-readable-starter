import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import SinglePost from './components/SinglePost'
import ShowCategory from './components/ShowCategory'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={App} />
    <Route path="/:category/:postId" component={SinglePost} />
    <Route path="/:category" component={ShowCategory} />
  </Route>
)