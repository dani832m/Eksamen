var express = require('express');
var router = express.Router();

// Inkluderer database og angiver port til forbindelse
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

/*
  1. Komplet liste over transaktioner i databasen indsat i HTML-tabel
*/
router.get('/', function (req, res, next) { // Route handler på roden
  MongoClient.connect(url, function (err, db) { // Connecter til DB via MongoClient
    if (err) throw err; // Viser fejlbesked, hvis der opstår error
    var dbo = db.db("CryptoBank"); // Henviser til databasens navn
    // Leder i collection og tilføjer til array
    dbo.collection("Transaktioner").find({}).toArray(function (err, result) {
      if (err) throw err;
      var obj = {}; // Nyt objekt uden indhold
      obj.title = 'Crypto Bank | Tabel over alle transaktioner i systemet';
      obj.transaktioner = result; // Angiver, at respons fra DB skal tilføjes objektet
      res.render('transaktioner', obj); // Renderer objektets indhold til endpoint
      db.close(); // Lukker forbindelse til database
    });
  });
});

module.exports = router;