import S3 from '../aws/S3';
import { APIException } from '../helpers/Exceptions';
import { ProductCategories } from '../models/ProductCategories';
import { ProductImageTypes } from '../models/ProductImageTypes';
import { ProductImages } from '../models/ProductImages';
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

  async createProduct(name, price, categoryId, subCategoryId, description) {
    let product;

    // Start a transaction
    await sequelize.transaction(async (t) => {
      // Create ProductInformation record

      // Check if categoryId exists in ProductCategories table
      const categoryExists = await ProductCategories.findByPk(categoryId, {
        transaction: t,
      });
      const subCategoryExists = await ProductSubCategories.findByPk(
        subCategoryId,
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

      // Create Product record using the obtained productInformationId
      product = await Products.create(
        {
          productInformationId: productInformation.dataValues.id,
          categoryId,
          subCategoryId,
          name,
          price,
        },
        { transaction: t }
      );
    });

    return { productId: product.dataValues.id };
  }

  async addImage(productId: string, image: string, imageType: string) {
    const product = await Products.findByPk(productId);

    if (!product) {
      throw new APIException('Product not found');
    }

    const category = await ProductCategories.findByPk(
      product.dataValues.categoryId
    );
    const subCategory = await ProductSubCategories.findByPk(
      product.dataValues.subCategoryId
    );

    if (!category || !subCategory) {
      throw new APIException('Category or Subcategory not found');
    }

    const imageTypeRecord = await ProductImageTypes.findOne({
      where: {
        imageType: imageType,
      },
    });

    if (!imageTypeRecord) {
      throw new APIException('Image type not found');
    }

    const key = this.createKey(
      category.dataValues.name,
      subCategory.dataValues.name,
      product.dataValues.id
    );

    this.s3.upload('product-images', key, image, imageType);

    const newImage = await ProductImages.create({
      productId: productId,
      imageUrl: `${key}/${imageType}.jpg`,
      productImageTypeId: imageTypeRecord.dataValues.id,
    });

    return { imageId: newImage.dataValues.id };
  }

  private createKey(category: string, subCategory: string, productId: string) {
    return `/${category}/${subCategory}/${productId}`;
  }
}
