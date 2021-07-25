import { ConfigProvider, notification } from 'antd'
import enUS from 'antd/lib/locale/en_US'
import viVN from 'antd/lib/locale/vi_VN'
import GlobalModal from 'components/GlobalModal'
import { store } from 'core/store'
import Contact from 'pages/Contact'
import CreatePasswordPage from 'pages/CreatePassword'
import CreateRecipe from 'pages/CreateRecipe'
import Dashboard from 'pages/Dashboard'
import EditRecipe from 'pages/EditRecipe'
import ForgotPassword from 'pages/ForgotPassword'
import Home from 'pages/Home'
import MealPlanner from 'pages/MealPlanner'
import Policy from 'pages/Policy'
import ProfilePage from 'pages/Profile'
import { PROFILE_PAGE } from 'pages/Profile/constant'
import RecipeDetail from 'pages/Recipe'
import SearchRecipe from 'pages/SearchRecipe'
import SignIn from 'pages/SignIn'
import {
  GetNotification,
  UpdateNotification,
  UpdateSocket
} from 'pages/SignIn/redux/actions'
import SignUp from 'pages/SignUp'
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { HashRouter as Router, Route } from 'react-router-dom'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { getNotiContent, history, MAM_TITLE, NOTI_TYPE } from 'ultis/functions'
import { socketService } from 'ultis/socket'
import './App.less'

function App() {
  const { language, user, socket, token } = useSelector(state => state.Auth)
  const { t } = useTranslation()

  useEffect(() => {
    if (user && socket === null) {
      socketService
        .connect(token)
        .then(socket => {
          store.dispatch(UpdateSocket.get(socket))
          socket.on('newNotification', data => {
            const noti = data?.notification
            const NOTI_TEXT = {
              [NOTI_TYPE.LIKE]: t('notification.liked'),
              [NOTI_TYPE.COMMENT]: t('notification.commented'),
              [NOTI_TYPE.FOLLOW]: t('notification.followed'),
              [NOTI_TYPE.REPLY]: t('notification.replied')
            }
            store.dispatch(GetNotification.get())
            notification.open({
              message: `${noti?.sender?.name} ${
                NOTI_TEXT[noti?.type]
              } ${getNotiContent(noti)}`,
              onClick: () => {
                if (
                  noti.type === NOTI_TYPE.LIKE ||
                  noti.type === NOTI_TYPE.COMMENT ||
                  noti.type === NOTI_TYPE.REPLY
                ) {
                  if (noti?.recipe) {
                    history.push(`/recipe/${noti?.recipe?.id}`)
                  }
                } else if (noti.type === NOTI_TYPE.FOLLOW) {
                  history.push(
                    `/profile?page=${PROFILE_PAGE.RECIPE}&user=${noti?.sender.id}`
                  )
                }
                store.dispatch(
                  UpdateNotification.get({
                    ...noti,
                    read: true
                  })
                )
              }
            })
          })
        })
        .catch(err => {
          console.log({ err })
        })
    }
  }, [])
  return (
    <ConfigProvider locale={language && language === 'en' ? enUS : viVN}>
      <Helmet>
        <title>{MAM_TITLE}</title>
        <meta
          name="description"
          content="Có MAM, chăm vào bếp. Trăm việc khó, có MAM lo."
        />
      </Helmet>
      <Router history={history}>
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/forgot" component={ForgotPassword} />
        <Route path="/confirm" component={CreatePasswordPage} />
        <Route path="/create" component={CreateRecipe} />
        <Route path="/recipes" component={SearchRecipe} />
        <Route path="/recipe/:id" component={RecipeDetail} />
        <Route path="/edit/:id" component={EditRecipe} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/meal-planner" component={MealPlanner} />
        <Route path="/admin" component={Dashboard} />
        <Route path="/policy" component={Policy} />
        <Route path="/contact" component={Contact} />
      </Router>
      <GlobalModal />
    </ConfigProvider>
  )
}

export default App
