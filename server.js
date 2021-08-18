require('dotenv').config();

let express = require("express");
let app = express();

let http = require('http').createServer(app);
// let io = require('socket.io')(http);
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;


// MongoDB Config
// const uri = process.env.MONGO_URI;
// const client = new mongoClient(uri,{ useNewUrlParser : true });

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Endpoints
// app.get('/', (req, res) => {
// });



http.listen(port,()=>{
  console.log("Listening on port ", port);
});
