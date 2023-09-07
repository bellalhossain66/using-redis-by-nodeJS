require('dotenv').config()
const express = require('express')
const {createClient} = require('redis')

const app = express()
const port = process.env.APP_PORT || 3000;
const client = createClient({
    socket: {
        host: process.env.APP_HOST,
        port: process.env.APP_PORT,
    }
});

async function redisJSON() {
    try {
        await client.on('connect', err => {
            if(err) console.log('Redis error: '+err)
            console.log('Redis connected')
        })
        await client.connect(err => {
            if(err) console.log('Redis not connect')
            console.log('Redis connected.')
        })
        await client.json.set(process.env.KEY, {
            name: 'Bellal',
            role: 'Programmer'
        });
        const getValue = await client.json.get(process.env.KEY);
        console.log('Redis cash: '+getValue)
    } catch (error) {
        console.log('err: '+error)
    }
}

redisJSON()
app.listen(port, err => {
    console.log('app is listing on port: '+port)
})