const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors')

const register = require('./controllers/register.js');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const knex = require('knex')({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'test',
        database : 'face-recognition'
    }
});


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (request, response)=> {
    response.send(database.users);
})

app.post('/signin', (req, res)=> { signin.handleSignin(req, res, knex, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, knex, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, knex)})

app.put('/image', (req, res) => { image.handleImage(req, res, knex)})

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

/* bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
});

// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
}); */

app.listen(3000, () => {
    console.log('app running on port 3000');
})