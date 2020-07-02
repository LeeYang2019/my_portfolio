const express = require('express');
const request = require('request');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const ejs = require('ejs');
const githubCredentials = require('./config/github_credentials.json');

const app = express();
app.use(cors());

//firebase
const firebaseInstance = require('./setup/firebaseSetup');
const { response } = require('express');

//template viewing engine
app.engine('html', ejs.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

//githubRepos route
app.get('/githubRepos/:username', (req, res) => {
  try {
    const options = {
      uri: `http://api.github.com/users/${req.params.username}/repos?per_page=40&sort=created:asc&client_id=${githubCredentials.githubClientId}&client_secret=${githubCredentials.githubSecret}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'No Github profile found' });
      }
      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//githubRepos repo route
app.get('/githubRepos/:username/:repo', (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/repos/${req.params.username}/${req.params.repo}/readme`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'No Github profile found' });
      }
      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//index route
app.get('/', (request, response) => {
  response.render('index');
});

exports.app = firebaseInstance.functions.https.onRequest(app);
