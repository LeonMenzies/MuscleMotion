import S3 from '../aws/S3';
import { APIException } from '../helpers/Exceptions';
import { ProductCategories } from '../models/ProductCategories';
import { ProductInformation } from '../models/ProductInformation';
import { ProductSubCategories } from '../models/ProductSubCategories';
import { Products } from '../models/Products';
import { sequelize } from './sequelize';

export class ProductService {
  private bucket = 'products';
  private s3: S3;

  constructor() {
    this.s3 = new S3('accessKeyId', 'secretAccessKey', 'region');
  }

  async createProduct(name, price, categoryID, subCategoryID, description) {
    let product;

    // Start a transaction
    await sequelize.transaction(async (t) => {
      // Create ProductInformation record

      // Check if categoryID exists in ProductCategories table
      const categoryExists = await ProductCategories.findByPk(categoryID, {
        transaction: t,
      });
      const subCategoryExists = await ProductSubCategories.findByPk(
        subCategoryID,
        { transaction: t }
      );

      if (!categoryExists) {
        throw new APIException('Category does not exist');
      }

      if (!subCategoryExists) {
        throw new APIException('Sub category does not exist');
      }

      const productInformation = await ProductInformation.create(
        { description },
        { transaction: t }
      );

      // Create Product record using the obtained productInformationID
      product = await Products.create(
        {
          productInformationID: productInformation.dataValues.id,
          categoryID,
          subCategoryID,
          name,
          price,
        },
        { transaction: t }
      );
    });

    return { productID: product.dataValues.id };
  }

  async addImage(productID: string, image: string, imageName: string) {
    const product = await Products.findByPk(productID);

    if (!product) {
      throw new APIException('Product not found');
    }

    const category = await ProductCategories.findByPk(
      product.dataValues.categoryID
    );
    const subCategory = await ProductSubCategories.findByPk(
      product.dataValues.subCategoryID
    );

    if (!category || !subCategory) {
      throw new APIException('Category or Subcategory not found');
    }

    const key = this.createKey(
      category.dataValues.name,
      subCategory.dataValues.name,
      product.dataValues.id
    );

    this.s3.upload('product-images', key, image, imageName);
  }

  private createKey(category: string, subCategory: string, productID: string) {
    return `/${category}/${subCategory}/${productID}`;
  }
}
