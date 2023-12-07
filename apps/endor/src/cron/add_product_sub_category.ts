import { ProductSubCategories } from '../models/ProductSubCategories';

export async function addProductSubCategory() {
  try {
    // Fetch existing records from the database
    const existingDBRecords = await ProductSubCategories.findAll();

    // Identify new records to sync
    const newRecordsToSync = data.filter((localRecord) => {
      return !existingDBRecords.some(
        (dbRecord) =>
          dbRecord.name === localRecord.name &&
          dbRecord.categoryID === localRecord.categoryID
      );
    });

    // Insert new records into the database
    if (newRecordsToSync.length > 0) {
      await ProductSubCategories.bulkCreate(newRecordsToSync);
      console.log('New records synced with the database:', newRecordsToSync);
    } else {
      console.log('No new records to sync.');
    }
  } catch (error) {
    console.error('Error syncing records with the database:', error);
  }
}

const data = [
  { name: 'Subcategory 1', categoryID: 1 },
  { name: 'Subcategory 2', categoryID: 1 },
  // Add more records as needed
];
