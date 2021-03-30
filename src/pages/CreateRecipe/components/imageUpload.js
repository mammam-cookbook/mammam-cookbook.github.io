import { Button } from 'antd'
import Text from 'antd/lib/typography/Text'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { FiUpload, FiX } from 'react-icons/fi'
import { COLOR } from 'ultis/functions'
import upload from 'ultis/uploadImage'

function ImageUpload(props) {
  const inputRef = useRef()
  const { t } = useTranslation()

  const addPictureStep = picture => {
    let reader = new FileReader()
    reader.readAsDataURL(picture)
    reader.onloadend = async () => {
      console.log('picture', props.value)
      const link = await upload(reader.result)
      props.onChange([...props.value, { name: picture.name, src: link }])
    }
  }

  const removeImg = index => {
    let tmp = [...props.value]
    tmp.splice(index)
    props.onChange(tmp)
  }

  return (
    <div style={{ ...props.style, display: 'flex' }}>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        ref={inputRef}
        type="file"
        onChange={e => addPictureStep(e.target.files[0])}
      />
      <div
        style={{
          width: 250,
          height: 250,
          backgroundColor: 'rgba(196, 196, 196, 0.4)',
          borderColor: COLOR.primary1,
          borderWidth: 1,
          borderRadius: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onClick={() => inputRef.current.click()}
      >
        <FiUpload size={48} color={COLOR.primary1} />
        <Text style={{ color: COLOR.primary1 }}>
          {t('create.uploadThumbnail')}
        </Text>
      </div>
      <div>
        {props.value &&
          props.value.length > 0 &&
          props.value.map((item, index) => (
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
              <Text>{item?.name}</Text>
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
    borderRadius: 9
  }
}
