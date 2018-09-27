const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const cors = require('cors')
const port = 3200
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());

const dbConfig = require('./config.js');
mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");    
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

app.listen(port, (err) => {
  if (err) 
    {return console.log('something bad happened', err)}
  else {console.log(`server is listening on ${port}`)}
})

const routes = require('./routes')(app);