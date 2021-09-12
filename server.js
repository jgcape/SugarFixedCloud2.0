require('dotenv').config();

let express = require("express");
let app = express();

let http = require('http').createServer(app);
let io = require('socket.io')(http);

let visionRoute = require('./routes/vision');
app.use('/api/vision', visionRoute)

const bodyParser = require('body-parser');
let mongoConnect = require("./mongoConnect.js")

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public/'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(bodyParser.json());

const vision = require('@google-cloud/vision');

async function quickstart() {
  // Creates a client
  const GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  const client = new vision.ImageAnnotatorClient(credentials=GOOGLE_APPLICATION_CREDENTIALS);
  console.log("Client created")
  // Performs label detection on the image file
  const [result] = await client.labelDetection('./public/uploads/test.jpg');
  const labels = result.labelAnnotations;
  console.log('Labels:');
  labels.forEach(label => console.log(label.description));
}
quickstart();

http.listen(port,()=>{
  console.log("Listening on port ", port);
});
