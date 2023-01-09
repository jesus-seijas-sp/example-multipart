const express = require('express');
const multer = require('multer');

const limit = process.env.LIMIT_SIZE || '100mb';
const port = process.env.PORT || 3000;
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('file');

const app = express();
app.use(express.urlencoded({ extended: false, limit }));
app.use(express.json({ limit }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/upload', (req, res) => {
  const hrstart = process.hrtime();
  return upload(req, res, err => {
    const hrend = process.hrtime(hrstart);
    const ms = (hrend[0] * 1000000000 + hrend[1]) / 1000000;
    console.log(`Time to receive the file: ${ms} ms`);
    console.log(`File size: ${req.file.size}`);
    console.log(`Speed: ${req.file.size * 1000  / (1024 * ms)} KB/s`);
    res.send('OK');
  });
});

app.post('/upload2', (req, res) => {
  const hrstartall = process.hrtime();
  let hrstart = process.hrtime();
  let total = 0;
  req.on('data', (chunk) => {
    total += chunk.length;
    const hrend = process.hrtime(hrstart);
    const ms = (hrend[0] * 1000000000 + hrend[1]) / 1000000;
    console.log(`received chunk of size ${chunk.length} in ${ms} ms at speed ${chunk.length * 1000  / (1024 * ms)} KB/s`);
  });
  req.on('end', () =>{
    const hrend = process.hrtime(hrstartall);
    const ms = (hrend[0] * 1000000000 + hrend[1]) / 1000000;
    console.log(`==== received FILE of size ${total} in ${ms} ms at speed ${total * 1000  / (1024 * ms)} KB/s`);
    res.send('OK');
  })
});

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server started on port ${port}`);
});
