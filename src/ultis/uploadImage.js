const cloudinary = require('cloudinary/lib/cloudinary')
cloudinary.config({
  cloud_name: 'mammam-cookbook-github-io',
  api_key: '813874793485264',
  api_secret: 'KastK_zfQ5v2-ZktRII6geP-Zdc'
})

export const upload = async image => {
  try {
    const link = await cloudinary.uploader.upload(image, () => {}, {
      secure: true
    })
    return link
  } catch (error) {
    console.log('===============imgae upload service ===========', error)
    return { error: error.message }
  }
}

export const deleteImg = async publicId => {
  try {
    const result = await cloudinary.uploader.destroy(publicId)
    return result
  } catch (error) {
    console.log('===============imgae upload service ===========', error)
    return { error: error.message }
  }
}
