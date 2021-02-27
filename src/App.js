import CreatePasswordPage from 'pages/CreatePassword'
import ForgotPassword from 'pages/ForgotPassword'
import Home from 'pages/Home'
import SignIn from 'pages/SignIn'
import SignUp from 'pages/SignUp'
import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { history } from 'ultis/functions'
import './App.less'

function App() {
  return (
    <Router history={history}>
      <Route exact path="/" component={Home} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/forgot" component={ForgotPassword} />
      <Route path="/reset/:token" component={CreatePasswordPage} />
    </Router>
  )
}

export default App
