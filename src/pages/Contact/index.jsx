import { Button } from 'antd'
import Text from 'antd/lib/typography/Text'
import Title from 'antd/lib/typography/Title'
import AppFooter from 'components/Footer'
import AppHeader from 'components/Header'
import { convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import React, { useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { useTranslation } from 'react-i18next'
import '../SignIn/signin.css'
import GlobalModal from 'components/GlobalModal'
import * as emailjs from 'emailjs-com'
import { MODAL_TYPE } from 'ultis/functions'
import { useHistory } from 'react-router-dom'

function Contact() {
  const { t } = useTranslation()
  const [des, setDes] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()

  const handleDescription = state => {
    const rawContentState = convertToRaw(state.getCurrentContent())
    const markup = draftToHtml(rawContentState)
    setDes(markup)
  }

  const handleSubmit = () => {
    setIsLoading(true)
    const templateId = 'template_au6dxgl'

    sendFeedback(templateId, {
      message: des
    })
  }

  const sendFeedback = (templateId, variables) => {
    emailjs
      .send(
        'service_h7rbnhl',
        templateId,
        variables,
        'user_HtyRAWZ0qPrrd6fdH4EFJ'
      )
      .then(res => {
        setIsLoading(false)

        setDes('')
        GlobalModal.alertMessage(
          null,
          t('contact.sendSuccess'),
          MODAL_TYPE.NORMAL,
          () => history.push('/')
        )
      })
      .catch(err => {
        setIsLoading(false)

        GlobalModal.alertMessage()
      })
  }

  return (
    <div>
      <AppHeader />
      <div
        style={{
          marginTop: 48,
          paddingBottom: 60,
          display: 'flex',
          flexDirection: 'column'
        }}
        className="body-container"
      >
        <Title level={3}>{t('common.contact')}</Title>
        <Text>
          {t('contact.contactUs')}{' '}
          <a style={{ fontWeight: 700 }}>mammam.cookbook@gmail.com</a>.
        </Text>
        <br />
        <Text>
          {t('contact.survey')}{' '}
          <a
            style={{ fontWeight: 700 }}
            target="_blank"
            rel="noreferrer"
            href="https://surbee.io/s/QSD1ZA"
          >
            {t('contact.here')}
          </a>
          .
        </Text>
        <br />
        <Text>{t('contact.submitForm')}</Text>
        <br />
        <Editor
          wrapperClassName="wrapperClassName"
          onBlur={(event, state) => handleDescription(state)}
          onEditorStateChange={state => handleDescription(state)}
          editorStyle={{
            maxHeight: 500,
            minHeight: 300,
            border: '1px solid #ccc'
          }}
        />
        <div style={{ marginTop: 48 }}>
          <Button
            loading={isLoading}
            disabled={des?.length < 9}
            type="primary"
            onClick={handleSubmit}
          >
            {t('forgotPass.proceed')}
          </Button>
        </div>
      </div>
      <AppFooter />
    </div>
  )
}

export default Contact
