import { Button } from 'antd'
import Text from 'antd/lib/typography/Text'
import Title from 'antd/lib/typography/Title'
import logo from 'assets/logo.svg'
import badgeVi from 'assets/images/google-play-badge-vi.png'
import badgeEn from 'assets/images/google-play-badge-en.png'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ButtonBase from 'components/ButtonBase'
import { useTranslation } from 'react-i18next'

function AppFooter() {
  const history = useHistory()
  const language = useSelector(state => state.Auth.language)
  const { t } = useTranslation()

  return (
    <div
      className="body-container"
      style={{
        backgroundColor: '#f3f3f3',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 32
      }}
    >
      <div
        className="row-container"
        style={{
          justifyContent: 'space-between',
          width: '100%',
          marginBottom: 40
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 32,
            marginLeft: 8
          }}
        >
          <Title level={5} style={{ fontWeight: 700 }}>
            {t('common.policy')}
          </Title>
          <div>
            <Button
              type="text"
              style={{ fontWeight: 500, padding: 0 }}
              onClick={() => history.push('/policy')}
            >
              {t('common.privacyPolicy')}
            </Button>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 32
          }}
        >
          <Title
            level={5}
            style={{ fontWeight: 700, padding: 0, marginLeft: 8 }}
          >
            {t('common.app')}
          </Title>
          <ButtonBase style={{ padding: 0 }}>
            <img
              src={language === 'vi' ? badgeVi : badgeEn}
              width="130"
              style={{ objectFit: 'contain' }}
            />
          </ButtonBase>
        </div>
      </div>
      <img
        src={logo}
        width="100"
        height="100"
        style={{ objectFit: 'contain' }}
      />
      <Text>All Right Reserved | MAM 2021</Text>
    </div>
  )
}

export default AppFooter
