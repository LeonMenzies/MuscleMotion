import S3 from '../aws/s3';
import { APIException } from '../helpers/exceptions';
import { Color } from '../models/color';
import { ProductCategory } from '../models/product_category';
import { ProductImageType } from '../models/product_image_type';
import { ProductImage } from '../models/product_image';
import { ProductInformation } from '../models/product_information';
import { ProductInventory } from '../models/product_inventory';
import { ProductSubCategory } from '../models/product_sub_category';
import { Product } from '../models/product';
import { Size } from '../models/size';
import { sequelize } from './sequelize';

export class ProductService {
  private bucket = 'products';
  private s3: S3;

  constructor() {
    this.s3 = new S3('accessKeyId', 'secretAccessKey', 'region');
  }

  async createProduct(
    name,
    price,
    categoryId,
    subCategoryId,
    sizes,
    colors,
    description
  ) {
    let product;

    // Start a transaction
    await sequelize.transaction(async (t) => {
      // Create ProductInformation record

      // Check if categoryId exists in ProductCategory table
      const categoryExists = await ProductCategory.findByPk(categoryId, {
        transaction: t,
      });
      const subCategoryExists = await ProductSubCategory.findByPk(
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
      product = await Product.create(
        {
          productInformationId: productInformation.dataValues.id,
          categoryId,
          subCategoryId,
          name,
          price,
        },
        { transaction: t }
      );

      // Iterate over each color
      for (const colorId of colors) {
        // Check if color exists in Colors table
        const colorExists = await Color.findByPk(colorId, { transaction: t });

        if (!colorExists) {
          throw new APIException('Color does not exist');
        }

        // Iterate over each size
        for (const sizeId of sizes) {
          // Check if size exists in Sizes table
          const sizeExists = await Size.findByPk(sizeId, { transaction: t });

          if (!sizeExists) {
            throw new APIException('Size does not exist');
          }

          // Create ProductInventory record
          await ProductInventory.create(
            {
              productId: product.dataValues.id,
              categoryId,
              subCategoryId,
              sizeId,
              colorId,
              count: 0, // Set initial count to 0
            },
            { transaction: t }
          );
        }
      }
    });

    return { productId: product.dataValues.id };
  }

  async addImage(productId: string, image: string, imageType: string) {
    const product = await Product.findByPk(productId);

    if (!product) {
      throw new APIException('Product not found');
    }

    const category = await ProductCategory.findByPk(
      product.dataValues.categoryId
    );
    const subCategory = await ProductSubCategory.findByPk(
      product.dataValues.subCategoryId
    );

    if (!category || !subCategory) {
      throw new APIException('Category or Subcategory not found');
    }

    const imageTypeRecord = await ProductImageType.findOne({
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

    const newImage = await ProductImage.create({
      productId: productId,
      imageUrl: `${key}/${imageType}.jpeg`,
      productImageTypeId: imageTypeRecord.dataValues.id,
    });

    return { imageId: newImage.dataValues.id };
  }
  async updateProduct(
    id,
    name,
    price,
    categoryId,
    subCategoryId,
    sizes,
    colors,
    description
  ) {
    let product;

    // Start a transaction
    await sequelize.transaction(async (t) => {
      // Fetch the existing Product record
      product = await Product.findByPk(id, { transaction: t });

      if (!product) {
        throw new APIException('Product does not exist');
      }

      // Check if categoryId exists in ProductCategory table
      const categoryExists = await ProductCategory.findByPk(categoryId, {
        transaction: t,
      });
      const subCategoryExists = await ProductSubCategory.findByPk(
        subCategoryId,
        { transaction: t }
      );

      if (!categoryExists) {
        throw new APIException('Category does not exist');
      }

      if (!subCategoryExists) {
        throw new APIException('Sub category does not exist');
      }

      // Update ProductInformation record
      const productInformation = (await ProductInformation.findByPk(
        product.productInformationId,
        { transaction: t }
      )) as any;

      if (productInformation) {
        productInformation.description = description;

        await productInformation.save({ transaction: t });
      }

      // Update Product record
      product.categoryId = categoryId;
      product.subCategoryId = subCategoryId;
      product.name = name;
      product.price = price;
      await product.save({ transaction: t });

      // Delete all existing ProductInventory records for the product
      await ProductInventory.destroy({
        where: { productId: id },
        transaction: t,
      });

      // Iterate over each color
      for (const colorId of colors) {
        // Check if color exists in Colors table
        const colorExists = await Color.findByPk(colorId, { transaction: t });

        if (!colorExists) {
          throw new APIException('Color does not exist');
        }

        // Iterate over each size
        for (const sizeId of sizes) {
          // Check if size exists in Sizes table
          const sizeExists = await Size.findByPk(sizeId, { transaction: t });

          if (!sizeExists) {
            throw new APIException('Size does not exist');
          }

          // Create ProductInventory record
          await ProductInventory.create(
            {
              productId: id,
              categoryId,
              subCategoryId,
              sizeId,
              colorId,
              count: 0, // Set initial count to 0
            },
            { transaction: t }
          );
        }
      }
    });
  }

  private createKey(category: string, subCategory: string, productId: string) {
    return `/${category}/${subCategory}/${productId}`;
  }
}
