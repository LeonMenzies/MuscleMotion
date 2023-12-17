import axios from 'axios';
import { APIException } from '../helpers/Exceptions';

export class S3 {
  private accessKeyId: string;
  private secretAccessKey: string;
  private region: string;

  constructor(accessKeyId: string, secretAccessKey: string, region: string) {
    this.accessKeyId = accessKeyId;
    this.secretAccessKey = secretAccessKey;
    this.region = region;
  }
  async upload(
    bucket: string,
    key: string,
    file: string,
    fileName: string,
    fileType: string = 'image/jpeg'
  ) {
    try {
      const serverUrl = 'http://localhost:3001/upload';

      const response = await axios.post(serverUrl, {
        bucket: bucket,
        key: key,
        file: file,
        fileName: fileName,
        fileType: fileType,
      });
      return response.data;
    } catch (error) {
      throw new APIException('S3 upload failed');
    }
  }
}

export default S3;
