import { ConfigProvider } from 'antd'
import GlobalModal from 'components/GlobalModal'
import CreatePasswordPage from 'pages/CreatePassword'
import CreateRecipe from 'pages/CreateRecipe'
import ForgotPassword from 'pages/ForgotPassword'
import Home from 'pages/Home'
import RecipeDetail from 'pages/Recipe'
import SearchRecipe from 'pages/SearchRecipe'
import SignIn from 'pages/SignIn'
import SignUp from 'pages/SignUp'
import React from 'react'
import { useSelector } from 'react-redux'
import { HashRouter as Router, Route } from 'react-router-dom'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { history } from 'ultis/functions'
import './App.less'
import enUS from 'antd/lib/locale/en_US'
import viVN from 'antd/lib/locale/vi_VN'
import Dashboard from 'pages/Dashboard'

function App() {
  const language = useSelector(state => state.Auth.language)
  return (
    <ConfigProvider locale={language && language === 'en' ? enUS : viVN}>
      <Router history={history}>
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/forgot" component={ForgotPassword} />
        <Route path="/reset/:token" component={CreatePasswordPage} />
        <Route path="/create" component={CreateRecipe} />
        <Route path="/recipe/search" component={SearchRecipe} />
        <Route path="/recipes" component={SearchRecipe} />
        <Route path="/recipe/:id" component={RecipeDetail} />
        <Route path="/admin" component={Dashboard} />
      </Router>
      <GlobalModal />
    </ConfigProvider>
  )
}

export default App
