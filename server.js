const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');
const knex = require('knex');


const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'pass',
        database: 'facedetection'
    }
})

// db.select('*').from('users').then(data=>{
//     console.log(data);
// })

const app = express();


app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'Jhon',
            email: 'jn@gmail.com',
            pass: "jn123",
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sa@gmail.com',
            pass: "sa124",
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/',(req,res)=>{
    res.send(database.users)
})



// Signin

app.post('/signin', (req,res)=>{signin.handleSignin(req,res,db,bcrypt)})

// Register

// This is called Dependency Injection which provides all the dependencies that handleRegister needs
app.post('/register', (req,res)=>{ register.handleRegister(req,res,db,bcrypt)})

// Profile

app.get('/profile/:id', (req,res)=>{profile.handleProfileGet(req,res,db)})

// Image Update the user to increase the entry count

app.put('/image', (req,res)=> {image.handleImage(req,res,db)})

app.post('/imageurl', (req,res)=> {image.handleApiCall(req,res)})





app.listen(3000, ()=>{
    console.log('App is running on port 3000');
})

/*
Some Routing
/ --> res = this is working
/Signin --> POST = success/fail (For security purpose we are using POST method)
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT = user (For Ranking)
*/ 