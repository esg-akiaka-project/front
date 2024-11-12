import dotenv from 'dotenv';

dotenv.config();

import { S3Client, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';

const REGION = process.env.NEXT_PUBLIC_AWS_REGION || "";
const ACCESS_KEY_ID = process.env.NEXT_PUBLIC_ACCESS_KEY_ID || "";
const SECRET_ACCESS_KEY = process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY_ID || "";
const S3_BUCKET_NAME = process.env.NEXT_PUBLIC_S3_BUCKET_NAME || ""; 

// AWS S3 클라이언트 설정
const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

// 파일 업로드 함수
export const uploadToS3Seoro = async (file: File) => {
  // file이 유효하지 않은 경우 오류를 던집니다.
  if (!file || !file.name) {
    throw new Error("유효하지 않은 파일입니다.");
  }

  const timestamp = Date.now();
  const extension = file.name.split('.').pop();
  const fileName = `upload/${timestamp}.${extension}`;

  try {
    const uploadParams: PutObjectCommandInput = {
      Bucket: S3_BUCKET_NAME,
      Key: fileName,
      Body: file,
      ContentType: file.type,
      ACL: 'public-read', 
    };

    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);

    // 업로드된 파일의 URL 반환
    return `https://${S3_BUCKET_NAME}.s3.${REGION}.amazonaws.com/${fileName}`;
  } catch (error: unknown) {
    console.error("S3 업로드 실패:", error);
    if (error instanceof Error) {
      throw new Error("S3 업로드 실패: " + error.message);
    } else {
      throw new Error("S3 업로드 실패: 알 수 없는 오류");
    }
  }
};
