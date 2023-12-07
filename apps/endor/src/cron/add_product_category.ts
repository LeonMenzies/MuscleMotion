import { ProductCategories } from '../models/ProductCategories';

export async function addProductCategory() {
  try {
    // Fetch existing records from the database
    const existingDBRecords = await ProductCategories.findAll({ raw: true });

    console.log(existingDBRecords);

    // // Identify new records to sync
    // const newRecordsToSync:  = data.filter(
    //   (localRecord) => {
    //     return !existingDBRecords.some(
    //       (dbRecord) =>
    //         dbRecord.id === localRecord.id &&
    //         dbRecord.name === localRecord.name &&
    //         dbRecord.displayName === localRecord.displayName
    //     );
    //   }
    // );

    // // Insert new records into the database
    // if (newRecordsToSync.length > 0) {
    //   await ProductCategories.bulkCreate(newRecordsToSync);
    //   console.log('New records synced with the database:', newRecordsToSync);
    // } else {
    //   console.log('No new records to sync.');
    // }
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
