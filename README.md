# example-multipart

## Installation

```
npm install
```

## Run

```
npm start
```

## Usage

Once deployed you can use Postman to invoke endpoint /upload or /upload2
The http method must be POST, and must contain a file as form-data
![image](https://user-images.githubusercontent.com/15154218/211275167-c3cbc66f-41de-4492-b689-13e813c9e21b.png)

/upload will receive the file with multer and tell you the size of the file, time to receive the file and network speed.
![image](https://user-images.githubusercontent.com/15154218/211275756-74f565db-ac09-4fe7-b2f3-eea9cd300c7c.png)


/upload2 will receive the file with vanilla js by chunks, telling you the size, time to receive and speed of every single chunk.
![image](https://user-images.githubusercontent.com/15154218/211275888-c80e9651-8236-4d9d-a43c-57bed8f9afa0.png)

