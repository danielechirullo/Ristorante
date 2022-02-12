const express = require('express');
const app = express();
const bodyParser= require('body-parser')
const {MongoClient, ObjectId} = require('mongodb');
const dbURI ='mongodb+srv://daniele:Daniele@daniele1.shj1p.mongodb.net/daniele?retryWrites=true&w=majority'
const mongoClient = new MongoClient(dbURI);
let RistoranteDB, articoliCollection;//inserire nome database

//CREAZIONE DEL SERVER E DELLA PORTA
app.listen(8000, function() {
    console.log('ascolto sul server 8000')
  })

//inseriamo il database e connettiamoci ad database
async function run(){
    await mongoClient.connect();
    console.log('Siamo connessi');
    app.listen(7000, () => console.log('Database connesso alla porta 7000...'));
    RistoranteDB = mongoClient.db('Ristorante');//TITOLO DEL DATABASE
    articoliCollection = RistoranteDB.collection('Ristorante');//SOTTOGRUPPO
}
run().catch(err => console.log('Errore di connessione' + err));
app.use(bodyParser.urlencoded({extended: true}))



//RICHIAMA IL FILE HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Ristorante.html')
  })

  app.use(express.static('public'));
  
  //ricevere le informazioni E CREA
  app.post('/prenotazione', (req, res) => {
    articoliCollection.insertOne(req.body)
      .then(result => {
        res.redirect('/')
        console.log(result)
      })
      .catch(error => console.error(error))
  })