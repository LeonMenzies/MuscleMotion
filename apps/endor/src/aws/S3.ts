import * as fs from 'fs';
import * as path from 'path';

export class S3 {
  private accessKeyId: string;
  private secretAccessKey: string;
  private region: string;

  constructor(accessKeyId: string, secretAccessKey: string, region: string) {
    this.accessKeyId = accessKeyId;
    this.secretAccessKey = secretAccessKey;
    this.region = region;
  }

  async upload(Bucket: string, Key: string, Body: never) {
    const filePath = path.join(Bucket, Key);

    fs.writeFileSync(filePath, Body);
    return new Promise((resolve) => setTimeout(resolve, 10));
  }

  async download(Bucket: string, Key: string) {
    const fileContent = fs.readFileSync(path.join(Bucket, Key), 'utf-8');
    await new Promise((resolve) => setTimeout(resolve, 10));

    return fileContent;
  }
}

export default S3;
