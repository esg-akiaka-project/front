import dotenv from 'dotenv';

dotenv.config();

console.log(process.env.S3_BUCKET_NAME); // 'my-bucket-name'
console.log(process.env.AWS_REGION);     // 'us-west-2'

import { S3Client, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';

//const REGION = process.env.AWS_REGION || "";
//const ACCESS_KEY_ID = process.env.REACT_APP_ACCESS_KEY_ID || "";
// const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY || "";
// const S3_BUCKET_NAME = process.env.REACT_APP_S3_BUCKET_NAME || "";

// AWS S3 클라이언트 설정
const s3Client = new S3Client({
  region: `${process.env.AWS_REGION}`,
  credentials: {
    accessKeyId: `${process.env.ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.SECRET_ACCESS_KEY_ID}`,
  },
});

// 파일 업로드 함수
export const uploadToS3 = async (file: File) => {
  const timestamp = Date.now();
  const extension = file.name.split('.').pop();
  const fileName = `upload/${timestamp}.${extension}`;

  try {
    const uploadParams: PutObjectCommandInput = {
      Bucket: `${process.env.S3_BUCKET_NAME}`,
      Key: fileName,
      Body: file,
      ContentType: file.type,
      ACL: 'public-read', 
    };

    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);

    // 업로드된 파일의 URL 반환
    //https://undefined.s3.undefined.amazonaws.com/upload/1731054897585.png?x-id=PutObject
    return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
  } catch (error: unknown) {
    console.error("S3 업로드 실패:", error);
    if (error instanceof Error) {
      throw new Error("S3 업로드 실패: " + error.message);
    } else {
      throw new Error("S3 업로드 실패: 알 수 없는 오류");
    }
  }
};




// 기존 코드 (백에 구축된 s3 서버로 보내는 코드)
/* import axios from "axios";
import axiosInstance from "./axiosInstance";
import { useUserStore } from "../store/useUserStore";

export const uploadToS3 = async (photo: File) => {
  const timestamp = Date.now();
  const extension = photo.name.split('.').pop();
  const fileName = `${timestamp}.${extension}`;

  try {
    const { data: uploadUrl } = await axiosInstance.get(`/s3/upload-url?fileName=${fileName}`);
    const formData = new FormData();
    formData.append("file", photo);

    await axios.put(uploadUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return uploadUrl.split("?")[0];
  } catch (error) {
    throw new Error("S3 업로드 실패: " + error);
  }
}; */
