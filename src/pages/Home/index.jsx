import { Button } from 'antd'
import Footer from 'components/Footer'
import Header from 'components/Header'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { history } from 'ultis/functions'
import '../../components/Header/header.css'
import './home.css'
import { useTranslation } from 'react-i18next'
import i18n from 'ultis/i18n'

function Home() {
  const dispatch = useDispatch()
  const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })
  const { t } = useTranslation()

  return (
    <div className="main">
      <Header />
    </div>
  )
}

export default Home
