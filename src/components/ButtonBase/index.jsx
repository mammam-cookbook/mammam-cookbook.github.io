import React from 'react'
import './button.css'

function ButtonBase({ children, style = {}, onClick = () => {} }) {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        borderRadius: 10,
        padding: 8,
        ...style
      }}
      className="button-base"
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default ButtonBase
