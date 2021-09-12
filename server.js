require('dotenv').config();

let express = require("express");
let app = express();

let http = require('http').createServer(app);
let io = require('socket.io')(http);

let visionRoute = require('./routes/vision');
app.use('/api/vision', visionRoute)

const bodyParser = require('body-parser');
let mongoConnect = require("./mongoConnect.js")
let gcpConnect = require("./gcpConnect.js")

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public/'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(bodyParser.json());

http.listen(port,()=>{
  console.log("Listening on port ", port);
});
