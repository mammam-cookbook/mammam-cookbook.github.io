import { Input } from 'antd'
import 'pages/SignIn/signin.css'
import React from 'react'

function CInput(props) {
  return (
    <div
      style={{
        width: '100%',
        marginBottom: 12,
        display: 'flex',
        flexDirection: 'column',
        ...props?.style
      }}
    >
      <Input {...props} />
      {props.error && <span className="errorStyle">{props.error}</span>}
    </div>
  )
}

export default CInput
