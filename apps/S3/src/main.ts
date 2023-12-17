import express from 'express';
import multer from 'multer';
import path from 'path';

const app = express();
const port = 3001;

// Set up storage engine with multer
const storage = multer.diskStorage({
  destination: './buckets/',
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

// Initialize upload variable with multer and the storage engine
const upload = multer({ storage: storage });

// Route to upload image
app.post('/upload', upload.single('image'), (req, res) => {
  console.log(req);

  res.send('Image uploaded!');
});

// Route to serve images
app.use('/images', express.static(path.join(__dirname, './buckets/')));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
