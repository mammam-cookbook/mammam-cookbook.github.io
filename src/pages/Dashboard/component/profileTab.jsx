import { UserOutlined } from '@ant-design/icons'
import { Avatar, Typography } from 'antd'
import CInput from 'components/CInput'
import React from 'react'
import '../dashboard.css'

function ProfileTab({ user }) {
  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 48
      }}
    >
      <div style={{ textAlign: 'center' }}>
        {user?.avatar ? (
          <Avatar size={150} src={user?.avatar} />
        ) : (
          <Avatar size={150} icon={<UserOutlined />} />
        )}
        <Typography style={{ fontSize: 24, marginTop: 16 }}>
          {user.fullName}
        </Typography>
      </div>

      <div style={{ width: 400 }}>
        <CInput
          className="inputBox"
          placeholder="Full name"
          defaultValue={user?.fullName}
          disabled={true}
        />
        <CInput
          className="inputBox"
          placeholder="Email"
          defaultValue={user?.email}
          disabled={true}
        />
        <CInput
          className="inputBox"
          placeholder="Phone number"
          defaultValue={user?.phoneNumber}
          disabled={true}
        />
      </div>
    </div>
  )
}

export default ProfileTab
