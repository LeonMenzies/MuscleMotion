import S3 from '../aws/S3';
import { Products } from '../models/Products';

export class ProductService {
  private bucket = 'products';
  private s3: S3;

  constructor() {
    this.s3 = new S3('accessKeyId', 'secretAccessKey', 'region');
  }

  async createProduct(name, price, category, subCategory) {
    const key = this.createKey(category, subCategory, name);

    console.log(key);

    // this.s3.upload(this.bucket, key, thumbnail1);

    // return await Products.create({
    //   name: name,
    //   price: price,
    // });
  }

  async addImage(productID, image) {
    const product = await Products.findByPk(productID);

    console.log(product);

    // const key = this.createKey(category, subCategory, name);
  }

  private createKey(category, subCategory, name) {
    return `/${category}/${subCategory}/${name}`;
  }
}
