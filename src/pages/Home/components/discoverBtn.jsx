import 'pages/Home/home.css'
import React from 'react'
import { Button } from 'antd'

function DiscoBtn(props) {
  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Button
        style={{
          marginTop: 60,
          alignSelf: 'center'
        }}
        type="primary"
        shape="round"
        onClick={props.onClick}
      >
        Discover
      </Button>
    </div>
  )
}

export default DiscoBtn
