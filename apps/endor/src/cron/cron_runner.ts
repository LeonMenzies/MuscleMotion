import cron from 'node-cron';

// Execute task 1 every minute
cron.schedule('* * * * * *', () => {});

// Execute task 10 every two minutes
cron.schedule('* 10 * * * *', () => {});
