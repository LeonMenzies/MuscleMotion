import axios from 'axios';

export class S3 {
  private accessKeyId: string;
  private secretAccessKey: string;
  private region: string;

  constructor(accessKeyId: string, secretAccessKey: string, region: string) {
    this.accessKeyId = accessKeyId;
    this.secretAccessKey = secretAccessKey;
    this.region = region;
  }

  async upload(bucket: string, key: string, file: string, fileName: string) {
    const serverUrl = 'http://localhost:3001/upload';

    const response = await axios.post(serverUrl, {
      bucket: bucket,
      key: key,
      file: file,
      fileName: fileName,
    });

    return response.data;
  }
}

export default S3;
