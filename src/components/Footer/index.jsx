import React from 'react'
import logo from 'assets/logo.svg'
import { Layout } from 'antd'
const { Footer } = Layout

function FooterComponent() {
  return (
    <Footer
      style={{ backgroundColor: '#212121', textAlign: 'center', width: '100%' }}
    >
      <img
        src={logo}
        width="100"
        height="100"
        style={{ objectFit: 'contain' }}
      />
      <p>All Right Reserved | COURSEDO 2021</p>
    </Footer>
  )
}

export default FooterComponent
