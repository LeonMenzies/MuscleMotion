import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 6000;

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

app.post('/upload', (req, res) => {
  const { bucket, key, file, fileName, fileType } = req.body;

  // Check if all required parameters are provided
  if (!bucket || !key || !file || !fileName || !fileType) {
    return res.status(400).send('Missing required parameters');
  }

  const dest = path.join('./buckets', bucket, key);

  // Check if the directory exists, if not create it
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const filePath = path.join(dest, `${fileName}.${fileType.split('/')[1]}`);

  // Remove the `data:<type>/<extension>;base64,` prefix from the base64 string
  const base64Data = file.replace(/^data:\w+\/\w+;base64,/, '');

  fs.writeFile(filePath, base64Data, 'base64', (err) => {
    if (err) {
      res.status(500).send('Error writing file');
    } else {
      res.send('Image uploaded!');
    }
  });
});

// Route to serve images
app.use('/', express.static('./buckets/'));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
