// require('dotenv').config();
// const GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS;
// const vision = require('@google-cloud/vision');

// // Creates a client
// const client = new vision.ImageAnnotatorClient();

// const fileName = './public/uploads.test.jpg';

// // Performs text detection on the local file
// const [result] = await client.textDetection(fileName);
// const detections = result.textAnnotations;
// console.log('Text:');
// detections.forEach(text => console.log(text));