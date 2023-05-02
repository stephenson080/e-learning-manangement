import {
    v2 as cloudinary,
    UploadApiResponse,
    UploadApiErrorResponse,
} from 'cloudinary';

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

export default class CloudinaryService {
    cloudinary = cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME as string,
        api_key: process.env.API_KEY as string,
        api_secret: process.env.API_SECRET as string,
    });
    async  uploadFileToCloud(file: {path: string}) {
        return await new Promise(
            (
              res: (val: UploadApiResponse | undefined) => void,
              rej: (err: UploadApiErrorResponse) => void,
            ) => {
              cloudinary.uploader.upload(
                file.path,
                {
                  use_filename: true,
                  unique_filename: true,
                  overwrite: false,
                  resource_type: 'auto',
                },
                (err, result) => {
                    console.log(err, result, 'dsd')
                  if (err) rej(err);
                  res(result!);
                },
              );
            },
          );
    }
}