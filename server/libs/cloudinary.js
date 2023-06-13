import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
    cloud_name:"dkxaxie0h",
    api_key:"376959696225378",
    api_secret:"rOG40fO54C82rVYDTA4Jjl0AMMI"
})

export const uploadImage = async filePath => {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'test'
    })
}

export const deleteImage = async id => {
    return await cloudinary.uploader.destroy(id, (error, result) => {
        if(error) {
            console.log('error', error)
        } else {
            console.log('Imagen eliminada:', result)
        }
    })
}