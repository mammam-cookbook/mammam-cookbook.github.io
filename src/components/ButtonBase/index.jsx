import React from 'react'
import './button.css'

function ButtonBase({ children, style = {}, onClick = () => {} }) {
  const onClickBtn = e => {
    e?.stopPropagation()
    onClick()
  }
  return (
    <div
      style={{
        display: 'flex',
        borderRadius: 10,
        padding: 8,
        ...style
      }}
      className="button-base"
      onClick={onClickBtn}
    >
      {children}
    </div>
  )
}

export default ButtonBase
