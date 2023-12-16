import { ProductSubCategories } from '../models/ProductSubCategories';

export async function addProductSubCategory() {
  try {
    // Fetch existing records from the database
    const existingDBRecords: any = await ProductSubCategories.findAll({
      raw: true,
    });

    const filteredItems = data.filter((item1) => {
      return !existingDBRecords.some((item2) => item1.id === item2.id);
    });

    // Insert new records into the database
    if (filteredItems.length > 0) {
      await ProductSubCategories.bulkCreate(filteredItems);
      console.log('New records synced with the database:', filteredItems);
    } else {
      console.log('No new records to sync.');
    }
  } catch (error) {
    console.error('Error syncing records with the database:', error);
  }
}
const data = [
  { id: 1, name: 'pants', displayName: 'Pants', categoryId: 1 },
  { id: 2, name: 'shorts', displayName: 'Shorts', categoryId: 1 },
  {
    id: 3,
    name: 'hoodies-sweatshirts',
    displayName: 'Hoodies & Sweatshirts',
    categoryId: 1,
  },
  { id: 4, name: 'shirts', displayName: 'Shirts', categoryId: 1 },
  { id: 5, name: 't-shirts', displayName: 'T-Shirts', categoryId: 1 },
  { id: 6, name: 'shorts', displayName: 'Shorts', categoryId: 1 },
  { id: 7, name: 'underwear', displayName: 'Underwear', categoryId: 1 },
  { id: 8, name: 'socks', displayName: 'Socks', categoryId: 1 },
  { id: 9, name: 'pants', displayName: 'Pants', categoryId: 2 },
  { id: 10, name: 'shorts', displayName: 'Shorts', categoryId: 2 },
  {
    id: 11,
    name: 'hoodies-sweatshirts',
    displayName: 'Hoodies & Sweatshirts',
    categoryId: 2,
  },
  { id: 12, name: 't-shirts', displayName: 'T-Shirts', categoryId: 2 },
  { id: 13, name: 'shorts', displayName: 'Shorts', categoryId: 2 },
  { id: 14, name: 'leggings', displayName: 'Leggings', categoryId: 2 },
  { id: 15, name: 'underwear', displayName: 'Underwear', categoryId: 2 },
  { id: 16, name: 'socks', displayName: 'Socks', categoryId: 2 },
  { id: 17, name: 'hats', displayName: 'Hats', categoryId: 3 },
  { id: 18, name: 'backpacks', displayName: 'Backpacks', categoryId: 3 },
  { id: 19, name: 'gloves', displayName: 'Gloves', categoryId: 3 },
  { id: 20, name: 'equipment', displayName: 'Equipment', categoryId: 3 },
  { id: 21, name: 'pre-workout', displayName: 'Pre-Workout', categoryId: 4 },
  {
    id: 22,
    name: 'protein-powder',
    displayName: 'Protein Powder',
    categoryId: 4,
  },
  { id: 23, name: 'vitamins', displayName: 'Vitamins', categoryId: 4 },
];
