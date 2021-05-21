require("dotenv").config();
var cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});
var corsOptions = {
  origin:'*',
  methods: 'OPTIONS, GET, POST, PUT, PATCH, DELETE',
  allowedHeaders: [ 'Content-Type', 'Authorization' ]
};
app.use(cors(corsOptions));

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
// mongoose.set('debug', true);
mongoose.Promise = global.Promise;

// // Connecting to the database
mongoose.connect(dbConfig.url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.status(200).send();
});

// Require Notes routes
require('./app/routes/getdata.routes.js')(app);

app.use((req, res, next) => {
  res.status(404).send({
  status: 404,
  error: 'Not found'
  })
 })

// listen for requests
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});
