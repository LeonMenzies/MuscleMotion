import cron from 'node-cron';
import { addProductSubCategory } from './add_product_sub_category';
import { addProductCategory } from './add_product_category';

// Execute task 1 every minute
cron.schedule('* * * * * *', () => {});

// Execute task 10 every two minutes
cron.schedule('* 10 * * * *', () => {
  // addProductSubCategory();
  // addProductCategory();
});
