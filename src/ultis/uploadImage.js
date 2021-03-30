const cloudinary = require('cloudinary/lib/cloudinary')
cloudinary.config({
  cloud_name: 'mammam-cookbook-github-io',
  api_key: '813874793485264',
  api_secret: 'KastK_zfQ5v2-ZktRII6geP-Zdc'
})

const upload = async image => {
  try {
    const link = await cloudinary.uploader.upload(image)
    console.log('link', link)
    return link
  } catch (error) {
    console.log('===============imgae upload service ===========', error)
    return { error: error.message }
  }
}

export default upload
