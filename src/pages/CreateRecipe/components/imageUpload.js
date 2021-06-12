import { LoadingOutlined } from '@ant-design/icons'
import { Button, Spin } from 'antd'
import Text from 'antd/lib/typography/Text'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiUpload, FiX } from 'react-icons/fi'
import { COLOR } from 'ultis/functions'
import { deleteImg, upload } from 'ultis/uploadImage'

const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
const MAX_IMAGES = 3
function ImageUpload(props) {
  const inputRef = useRef()
  const { t } = useTranslation()
  const [isUploading, setIsUploading] = useState(false)
  const canUpload = props.value && props.value.length < MAX_IMAGES

  const uploadList = async list => {
    let newList = props.value || []
    const lengthLeft = MAX_IMAGES - newList.length
    const addLength = lengthLeft < list.length ? lengthLeft : list.length
    if (newList.length < 3) {
      props?.setIsUploading && props?.setIsUploading(true)
      setIsUploading(true)
      for (let i = 0; i < addLength; i++) {
        const link = await addPictureStep(list[i])
        newList.push({ name: list[i].name, src: link })
      }
      props?.setIsUploading && props?.setIsUploading(true)
      props?.onChange && props.onChange(newList)
      setIsUploading(false)
    }
  }

  const addPictureStep = async picture => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader()
      reader.readAsDataURL(picture)
      reader.onloadend = async () => {
        const link = await upload(reader.result)
        resolve(link)
      }
    })
  }

  const removeImg = async index => {
    let tmp = props.value
    const deleteResult = await deleteImg(tmp[index].src.public_id)
    if (deleteResult.result === 'ok') {
      tmp.splice(index, 1)
      if (props?.step) {
        props.onDelete(tmp)
      } else {
        props.onChange(tmp)
      }
    }
  }

  return (
    <div
      style={{ ...props.style, display: 'flex', flex: 1 }}
      className="img-upload-container"
    >
      <input
        accept="image/*"
        style={{ display: 'none' }}
        ref={inputRef}
        type="file"
        multiple
        onChange={e => {
          if (e.target.files.length > 0 && canUpload) {
            uploadList(e.target.files)
          }
        }}
      />
      <div
        style={{
          width: 200,
          height: 200,
          backgroundColor: 'rgba(196, 196, 196, 0.4)',
          borderColor: COLOR.primary1,
          borderWidth: 1,
          borderRadius: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onClick={() => {
          if (canUpload && !isUploading) {
            inputRef.current.click()
          }
        }}
      >
        {!isUploading && <FiUpload size={48} color={COLOR.primary1} />}
        {!isUploading && (
          <Text style={{ color: COLOR.primary1, textAlign: 'center' }}>
            {t('create.uploadThumbnail')}
          </Text>
        )}
        {!isUploading && canUpload && (
          <Text style={{ color: COLOR.primary1, textAlign: 'center' }}>
            {t('create.maxImg')}
          </Text>
        )}
        {!isUploading && !canUpload && (
          <Text style={{ color: COLOR.primary1, textAlign: 'center' }}>
            {t('create.maxReach')}
          </Text>
        )}
        {isUploading && <Spin indicator={loadingIcon} />}
        {isUploading && (
          <Text style={{ color: COLOR.primary1, textAlign: 'center' }}>
            {t('create.uploading')}
          </Text>
        )}
      </div>
      <div style={{}}>
        {props?.error && (
          <Text style={{ color: 'red', paddingLeft: 24 }}>{props.error}</Text>
        )}
        {props.value &&
          props.value.length > 0 &&
          props.value.map((item, index) => (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 8,
                flex: 1,
                width: '100%'
              }}
              key={`upload-${index}`}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <span
                  style={{
                    ...style.imageSrc,
                    backgroundImage: `url("${item.src.url}")`
                  }}
                />
                <Text
                  ellipsis
                  style={{ display: 'flex', flex: 1, maxWidth: '15vw' }}
                >
                  {item?.name}
                </Text>
              </div>
              <Button
                type="link"
                shape="circle"
                onClick={() => removeImg(index)}
                icon={<FiX size={28} color="black" />}
              />
            </div>
          ))}
      </div>
    </div>
  )
}

ImageUpload.defaultProps = {
  onChange: data => {},
  style: {},
  value: []
}

export default ImageUpload

const style = {
  imageSrc: {
    width: 84,
    height: 84,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    borderRadius: 9,
    marginLeft: 16,
    marginRight: 16
  }
}
