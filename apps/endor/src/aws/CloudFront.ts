export class CloudFront {
  private cloudFrontDomain: string;

  constructor(cloudFrontDomain: string) {
    this.cloudFrontDomain = cloudFrontDomain;
  }

  generateUrl(filePath: string): string {
    // Simulate CloudFront URL generation
    const url = `https://${this.cloudFrontDomain}/${filePath}`;
    return url;
  }
}

export default CloudFront;
