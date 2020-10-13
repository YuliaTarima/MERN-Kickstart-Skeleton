import path from 'path'
import express from 'express'
import {MongoClient} from 'mongodb'
import template from './../template'
import devBundle from './devBundle' // dev mode only, comment before prod build
// Webpack will compile and bundle the React code into dist/bundle.js.

const app = express()
devBundle.compile(app) // dev mode only, comment out before building for production

const CURRENT_WORKING_DIR = process.cwd()
// Webpack will compile client-side code in both development and production mode,
// then place the bundled files in the dist folder.
// To make these static files available on requests from the client side:
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

app.get('/', (req, res) => {
    // When the server receives a request at the root URL /,
    // we will render template.js in the browser.
    res.status(200).send(template())
})

let port = process.env.PORT || 3000
// listen on the specified port for incoming requests
app.listen(port, function onStart(err) {
    if (err) {
        console.log(err)
    }
    console.info('Server started on port %s.', port)
})

// connect Node server to MongoDB
// make sure you have MongoDB running
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mernSimpleSetup'
// MongoClient is the driver that connects to the running MongoDB instance
// using its url and allows us to implement the database related code in the backend.
MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, db) => {
    console.log("Connected successfully to mongodb server")
    db.close()
})
