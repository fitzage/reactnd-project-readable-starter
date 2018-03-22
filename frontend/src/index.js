import React from 'react'
import './index.css'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
import App from './components/App'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(thunk)
    )
)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter><App /></BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()