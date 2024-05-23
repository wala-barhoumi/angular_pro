const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')


mongoose.connect("mongodb+srv://user:walawala@cluster0.jfztsft.mongodb.net/ecommerce")
    .then(() =>{
        console.log("connected");})
    .catch(()=>{
        console.log("error");
    })
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de connexion à MongoDB :'));
db.once('open', () => {
    console.log('Connect à MongoDB !');
});


const auth = require('./routes/routes.auth')
const cataloge = require('./routes/routes.cataloge')
const produit = require('./routes/routes.produit')
const panier = require('./routes/routes.panier')
const commande = require('./routes/routes.commande')
const msg = require('./routes/routes.communication')

app = express()
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200']
}))

app.use(express.json())

app.use('/api/auth', auth)
app.use('/api/cataloge', cataloge)
app.use('/api/produit', produit)
app.use('/api/panier', panier)
app.use('/api/commande', commande)
app.use('/api/communication', msg)

app.listen(3000 , ()=>{
    console.log('server work')
})