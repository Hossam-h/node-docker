const express  = require('express');
const mongoose = require('mongoose');
const redis    = require('redis');


const PORT = 4000;
const app  = express();


const REDIS_PORT = 6379;
const REDIS_HOST  = 'redis';

//connect to rdis
const redisClient = redis.createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis Client connect ....'));
redisClient.connect();

const DB_USER='root';
const DB_PASSWORD='example';
const DB_BORT=27017;
const DB_HOST='mongo';


const URL= `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_BORT}`;

mongoose.connect(URL)
.then(()=> console.log('db connect .....'))
.catch((err)=> console.log('faild to connect db',err) );

app.get('/',(req,res) =>{ 
    res.send('<h1> Hello Hossam Tets </h1>')
    redisClient.set('test-redis','test-redis ........');
});



app.get('/test',async (req,res) =>{ 
    test = await redisClient.get('test-redis');
    res.send(`<h1> Hello in rdis => ${test} </h1>`)
});

app.listen(PORT, ()=>  {
    console.log(`app is work ${PORT}`)
})