import { ProductCategory } from '../models/product_category';

export async function addProductCategory() {
  try {
    // Fetch existing records from the database
    const existingDBRecords: any = await ProductCategory.findAll({
      raw: true,
    });

    const filteredItems = data.filter((item1) => {
      return !existingDBRecords.some((item2) => item1.id === item2.id);
    });

    // Insert new records into the database
    if (filteredItems.length > 0) {
      await ProductCategory.bulkCreate(filteredItems);
      console.log('New records synced with the database:', filteredItems);
    } else {
      console.log('No new records to sync.');
    }
  } catch (error) {
    console.error('Error syncing records with the database:', error);
  }
}

const data = [
  { id: 1, name: 'men', displayName: 'Men' },
  { id: 2, name: 'woman', displayName: 'Woman' },
  { id: 3, name: 'accessories', displayName: 'Accessories' },
  { id: 4, name: 'supplements', displayName: 'Supplements' },
];
