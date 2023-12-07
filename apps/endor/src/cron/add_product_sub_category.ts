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
  { id: 1, name: 'pants', displayName: 'Pants', categoryID: 1 },
  { id: 2, name: 'shorts', displayName: 'Shorts', categoryID: 1 },
  {
    id: 3,
    name: 'hoodies-sweatshirts',
    displayName: 'Hoodies & Sweatshirts',
    categoryID: 1,
  },
  { id: 4, name: 'shirts', displayName: 'Shirts', categoryID: 1 },
  { id: 5, name: 't-shirts', displayName: 'T-Shirts', categoryID: 1 },
  { id: 6, name: 'shorts', displayName: 'Shorts', categoryID: 1 },
  { id: 7, name: 'underwear', displayName: 'Underwear', categoryID: 1 },
  { id: 8, name: 'socks', displayName: 'Socks', categoryID: 1 },
  { id: 9, name: 'pants', displayName: 'Pants', categoryID: 2 },
  { id: 10, name: 'shorts', displayName: 'Shorts', categoryID: 2 },
  {
    id: 11,
    name: 'hoodies-sweatshirts',
    displayName: 'Hoodies & Sweatshirts',
    categoryID: 2,
  },
  { id: 12, name: 't-shirts', displayName: 'T-Shirts', categoryID: 2 },
  { id: 13, name: 'shorts', displayName: 'Shorts', categoryID: 2 },
  { id: 14, name: 'leggings', displayName: 'Leggings', categoryID: 2 },
  { id: 15, name: 'underwear', displayName: 'Underwear', categoryID: 2 },
  { id: 16, name: 'socks', displayName: 'Socks', categoryID: 2 },
  { id: 17, name: 'hats', displayName: 'Hats', categoryID: 3 },
  { id: 18, name: 'backpacks', displayName: 'Backpacks', categoryID: 3 },
  { id: 19, name: 'gloves', displayName: 'Gloves', categoryID: 3 },
  { id: 20, name: 'equipment', displayName: 'Equipment', categoryID: 3 },
  { id: 21, name: 'pre-workout', displayName: 'Pre-Workout', categoryID: 4 },
  {
    id: 22,
    name: 'protein-powder',
    displayName: 'Protein Powder',
    categoryID: 4,
  },
  { id: 23, name: 'vitamins', displayName: 'Vitamins', categoryID: 4 },
];
