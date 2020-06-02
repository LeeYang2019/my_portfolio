const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ejs = require('ejs');

const app = express();
app.use(cors());

//firebase
const firebaseInstance = require('./setup/firebaseSetup');

//template viewing engine
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//index route
app.get('/', (request, response) => {
  response.render('index');
});

exports.app = firebaseInstance.functions.https.onRequest(app);
